# LeadOptimizer CRM Integration — Swift Rooms Landing Page

**CRM:** LeadOptimizer (`go.leadoptimizer.co.uk/v2/`) — a GoHighLevel / HighLevel
white-label. **Site:** Vite + React SPA on Vercel.

> This document is the implementation record + operator runbook. The code side
> is complete and **inert until one credential is set** — nothing breaks before
> setup. The remaining work is CRM-dashboard configuration (§3, §4, §10).

---

## 1. Integration summary

The landing page now delivers **every** form enquiry into LeadOptimizer through a
hardened, same-origin pipeline, and **tracks every** contact action (form, CTA,
WhatsApp, phone, email, lead magnet) with full marketing attribution.

Flow: `form submit → /api/lead → validate → anti-spam → Turnstile → deliver to
LeadOptimizer (retry) → notify → confirmed success`. A lead is only shown as
successful once the server confirms delivery; on failure the visitor sees a
retry (never a false success) and the lead is sent to a backup sink if configured.

**Delivery is dual-mode** (adapter picks automatically):

| Mode | Trigger env | What it does |
|---|---|---|
| **API v2** (preferred) | `LEADOPTIMIZER_PIT_TOKEN` + `LEADOPTIMIZER_LOCATION_ID` | Upserts the contact (dedupe by email/phone), applies routing tags, attaches a full enquiry + attribution note |
| **Inbound webhook** (fallback) | `LEADOPTIMIZER_WEBHOOK_URL` | POSTs the whole normalised lead as flat JSON; the workflow creates the contact + routes + notifies |
| **Inert** | neither set | `/api/lead` returns 501; the client uses its direct fallback so the form still works |

---

## 2. Fields mapped into LeadOptimizer

Standard contact fields: **first/last name, full name, email, phone, source**.
Everything else is delivered as **routing tags** + a structured **note** (API
mode) or as **flat JSON keys** (webhook mode):

Enquiry: `leadType`, `productInterest[]`, `propertyType`, `projectType` (build
stage), `siteLocation`, `timeline`, `budgetRange`, `message`, `fileNames[]`,
`preferredContactMethod`, and showroom-only `showroomDate` / `showroomTime` /
`visitorCount`. Consent: `privacyConsent`, `marketingConsent`.

Attribution (§3): `utmSource/Medium/Campaign/Term/Content`, `gclid`, `fbclid`,
`referrer`, `landingPage`, `sourceSection`, `ctaLabel`, `deviceType`, `browser`,
`sessionId`, `firstSeenAt`, plus server `leadId` + `createdAt`.

> Optional: to land attribution into **dedicated custom fields** (for filtering /
> reporting in LeadOptimizer), create the fields in the dashboard and map them in
> a workflow (webhook mode) — the JSON keys above match one-to-one.

---

## 3. Lead attribution configuration

Captured **once on first page load** (`src/app/utils/attribution.ts`) and stored
in `sessionStorage` with **first-touch-wins** semantics — a later navigation that
drops `?utm_*` never overwrites the original campaign. Attached to every lead and
to every analytics event. No PII is stored in attribution.

---

## 4. Pipeline configuration & routing (operator — in LeadOptimizer)

Routing is **tag-driven** (the idiomatic HighLevel pattern). Each lead carries:

- `website-lead` (all)
- `type:quote` | `type:showroom` | `type:product` | `type:contact`
- `product:<slug>` per product interest
- `campaign:<slug>` / `source:<slug>` when UTMs are present

**To wire pipelines**, build one workflow per `type:*` tag:

| Tag | Suggested pipeline | Starting stage / status |
|---|---|---|
| `type:quote` | Quote Request | New Lead |
| `type:showroom` | Showroom Booking | New Lead |
| `type:product` | Product Enquiry | New Lead |
| `type:contact` | General Contact | New Lead |

Lead lifecycle statuses (§10 of brief): New Lead → Contacted → Qualified → Quote
Sent → Showroom Booked → Won / Lost. Set "New Lead" as the entry status in each
workflow.

---

## 5. Workflow automation summary (operator — in LeadOptimizer)

Trigger each workflow from **Contact Tag added** (API mode) or **Inbound Webhook**
(webhook mode):

- **Quote** (`type:quote`): add to Quote pipeline → notify sales → confirmation
  email → follow-up task.
- **Showroom** (`type:showroom`): add to Showroom pipeline → booking confirmation
  → notify showroom team (uses `showroomDate`/`showroomTime`/`visitorCount`).
- **General** (`type:contact`): assign owner → follow-up workflow.

**Duplicate detection (§7):** API mode already upserts (dedupe by email/phone
within the location). In workflows, prefer "Update contact" + "Add note/activity"
over "Create contact" so repeat enquiries append rather than duplicate.

---

## 6. Tracking events implemented

Provider-agnostic layer (`src/app/utils/analytics.ts`): pushes to
`window.dataLayer` (GTM-ready) and forwards to `gtag`/`fbq` **only if loaded and
consented**. No external script is added; the strict CSP is unchanged. Events:

`cta_click`, `quote_form_open`, `quote_form_start`, `quote_form_step_complete`,
`quote_form_submit`, `quote_form_success`, `quote_form_error`,
`showroom_form_open`*, `showroom_form_submit`*, `showroom_booking_success`,
`whatsapp_click`, `phone_click`, `email_click`, `lead_magnet_request`,
`lead_magnet_download`*, `lead_created_in_crm`.
(\* reserved — fire once a dedicated showroom-booking entry is added.)

Each event carries non-PII props: `ctaLabel`, `location`, `leadType`,
`productInterest`, `section`, device/browser, `session_id`, and UTM data.
One-shot conversions are de-duplicated per session. **No PII** is sent to
analytics (kept separate from CRM records, per brief §8/§19).

**To activate a destination later:** add a GTM/GA4/Meta ID (and the one CSP host
it needs) — every event above starts flowing with zero code changes.

---

## 7. Security improvements

- All CRM credentials are **server-only** env vars — never in the browser bundle.
- `/api/lead`: same-origin check, method gate, 64 KB body cap, server-side
  honeypot + submit-timing re-check, schema validation + input sanitisation
  (control-char strip, length caps), Turnstile verification (when configured),
  upstream timeouts + bounded retries, `no-store` + `nosniff`, sanitised errors.
- Duplicate-submission guard client-side + upsert dedupe server-side.
- Failure sink (`LEAD_BACKUP_WEBHOOK_URL`) so a valid lead is never lost; no
  false success is ever shown.
- No PII in analytics payloads or URLs. `.env*` remains gitignored.

---

## 8. Files modified

**New:** `src/app/utils/attribution.ts`, `src/app/utils/analytics.ts`,
`api/_lib/leadModel.ts`, `api/_lib/leadoptimizer.ts`.
**Rewritten:** `api/lead.ts` (full validate → deliver → retry/backup/notify
pipeline).
**Instrumented:** `LeadForm.tsx` (attribution + funnel events + leadType),
`Navigation.tsx`, `HeroSection.tsx`, `StickyMobileCTA.tsx`, `FinalCTASection.tsx`,
`GallerySection.tsx`, `FAQSection.tsx`, `ProductsSection.tsx`, `Footer.tsx`
(tracked CTAs / WhatsApp / phone / email; fixed 2 CTAs that didn't open the form;
made nav phone/email clickable). `main.tsx` (early attribution capture).
**Removed:** `LeadFormAndroid.tsx` (dead code — only `console.log`'d).
**Updated:** `.env.example`.

---

## 9. Required environment variables (Vercel → Settings → Environment Variables)

Set **one** delivery mode to go live:

```
# Option A — API v2 (recommended)
LEADOPTIMIZER_PIT_TOKEN=<HighLevel Private Integration token>
LEADOPTIMIZER_LOCATION_ID=<sub-account/location id>

# Option B — Inbound webhook
LEADOPTIMIZER_WEBHOOK_URL=<workflow inbound webhook URL>

# Optional reliability / ops
LEAD_BACKUP_WEBHOOK_URL=<failure sink>
LEAD_NOTIFY_WEBHOOK_URL=<Slack/email notify webhook>

# Optional security / legacy
TURNSTILE_SECRET_KEY=<cloudflare turnstile secret>     # + VITE_TURNSTILE_SITE_KEY (client)
LEAD_ENDPOINT=<legacy forward target>
```

No secret goes in `.env.example` or the client. `VITE_*` values are public.

---

## 10. Remaining manual LeadOptimizer configuration

1. Create a **Private Integration token** (Settings → Private Integrations) with
   Contacts scope, OR create a workflow with an **Inbound Webhook** trigger; put
   the token+location id OR the webhook URL into Vercel env (§9).
2. Build the **pipelines** (§4) and **workflows** (§5); set duplicate handling to
   update-not-create.
3. (Optional) Create **custom fields** for attribution and map them in the
   webhook workflow for dashboard filtering/reporting.
4. (Optional) Add a **GA4/GTM/Meta** ID to activate the analytics destinations.
5. Redeploy / promote the branch, then run the §15 test matrix (valid, invalid,
   duplicate, spam, rate-limited, CRM-timeout) against the preview URL.
