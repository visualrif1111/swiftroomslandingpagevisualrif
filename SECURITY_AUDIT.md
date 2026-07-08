# Security Audit — Swiftrooms Landing Page

**Audit date:** 2026-07-08
**Scope:** this repository (`swiftroomslandingpagevisualrif`) — the Swiftrooms
lead-generation landing page.
**Companion docs:** `SECURITY.md` (reference + rationale), `SECURITY_IMPLEMENTATION.md`
(what changed + how to test), `SECURITY_RUNBOOK.md` (operator steps).

> This file is the Phase 1 audit deliverable. Because most fixes have already
> been implemented on the `security/*` branch, each finding is listed with its
> **current status** (Fixed / Mitigated / Dashboard / N/A) rather than as an open
> item.

---

## 0. Inspection results — what this project actually is

The brief assumed a possible Next.js + Sanity stack and referenced
`https://swiftrooms-newbuild.vercel.app/`. **Inspection contradicts both assumptions
for this repo:**

| Checked | Result |
|---|---|
| Framework | **Vite 6 + React 18 SPA** (`vite build` → static `dist/`). No `next.config.*`. |
| Routing | Client-side only; single-page scroll site. `react-router` was present but unused → **removed**. |
| Sanity CMS | **Not present** — no `@sanity/*` dependency, no client, no GROQ, no Studio. |
| Server actions / SSR | **None** — static output. |
| API routes | **None originally.** Three hardened Vercel Edge Functions were *added*: `/api/reviews`, `/api/lead`, `/api/csp-report`. |
| Middleware | **Added** — `middleware.ts` (Vercel Edge Middleware, framework-agnostic). |
| Forms | One lead form (`src/app/components/LeadForm.tsx`) serving both "Get a Quote" and "Book Showroom Visit" journeys. |
| Email provider | None in-repo — leads POST to an external endpoint (`VITE_LEAD_ENDPOINT`) or the `/api/lead` proxy → `LEAD_ENDPOINT`. |
| Env vars | `VITE_LEAD_ENDPOINT`, `VITE_TURNSTILE_SITE_KEY` (client, public); `LEAD_ENDPOINT`, `TURNSTILE_SECRET_KEY`, `GOOGLE_PLACES_API_KEY`, `GOOGLE_PLACE_ID` (server). |
| Preview mode | **None** (no CMS/draft mode). |

**`swiftrooms-newbuild.vercel.app` is a *different* project.** `src/styles/theme.css`
notes the landing page's visual tokens were "extracted from" that URL to match it.
Its files are **not in this working directory**, so it could not be audited here
(see §"Areas that could not be verified locally").

**Consequence:** the Sanity, server-actions, and preview-mode phases of the brief
are **N/A** for this repo. They are marked as such below rather than faked.

---

## 1. Areas reviewed

Application architecture · API routes (added) · middleware · form handling ·
Sanity integration (absent) · environment variables · public vs private keys ·
preview mode (absent) · security headers · CORS · CSP · image optimisation ·
third-party scripts · email/form submission logic · error handling · logging ·
build configuration · Vercel configuration.

---

## 2. Findings

### High-risk

| # | Finding | Status |
|---|---------|--------|
| H1 | **No HTTP security headers / no CSP** — the static site shipped with none. | ✅ Fixed — `vercel.json` adds the full header suite + enforcing CSP. |
| H2 | **Google Places API key exposed to the client** — `googleReviewsService.ts` read `VITE_GOOGLE_PLACES_API_KEY`, which Vite inlines into the public bundle. | ✅ Fixed — all client-side key reads removed; live reviews go only through the server-side `/api/reviews` proxy (`GOOGLE_PLACES_API_KEY` is server-only). |
| H3 | **Lead form had no bot/spam protection** and posted an endpoint that lived in the bundle. | ✅ Fixed — honeypot + submit-timing + duplicate-guard client-side; optional Turnstile-verified same-origin `/api/lead` proxy re-checks all signals server-side. |
| H4 | **Vulnerable/unused dependency** (`react-router`) flagged by `npm audit`. | ✅ Fixed — removed; `npm audit` → **0 vulnerabilities** (prod + dev). |
| H5 | **`.env*` not gitignored** — risk of committing secrets. | ✅ Fixed — `.gitignore` ignores `.env` / `.env.*` (keeps `.env.example`). |

### Medium-risk

| # | Finding | Status |
|---|---------|--------|
| M1 | No clickjacking protection. | ✅ Fixed — `frame-ancestors 'none'` + `X-Frame-Options: DENY`. |
| M2 | No rate limiting on public surface / form. | ✅ Mitigated at the edge — **Vercel Firewall rules live**: 100 req/10s/IP global, 5 req/10s/IP on POST, challenge-no-UA (see §Dashboard). App-level durable limiting deferred to Upstash (documented, optional). |
| M3 | No malicious-request filtering (exploit-path / scanner scans hit the SPA 200). | ✅ Fixed — `middleware.ts` blocks probe paths (404) and scanner UAs (403), fail-open. |
| M4 | File input had no type/size enforcement. | ✅ Fixed — client validates type allowlist, 10 MB/file, max 8 files (files are not uploaded to third parties — only names are sent). |
| M5 | No visibility into CSP violations in production. | ✅ Fixed — `report-uri`/`report-to` → `/api/csp-report` logs bounded, sanitised reports. |
| M6 | No `robots.txt` / `sitemap.xml`. | ✅ Fixed — both added; crawlers explicitly allowed (SEO neutral-to-positive). |

### Low-risk

| # | Finding | Status |
|---|---------|--------|
| L1 | `style-src` must permit `'unsafe-inline'` (MUI/Emotion/Framer inject runtime styles). | ⚠️ Accepted — style-only relaxation; scripts stay strict `'self'`. Documented in `SECURITY.md §3`. |
| L2 | `connect-src 'self' https:` is broad. | ⚠️ Accepted (pragmatic) — lets the form reach any configured endpoint without breaking; tighten to the real host once known. |
| L3 | `COEP: require-corp` not set. | ✅ Intentional — would break YouTube/Fonts embeds; no benefit for a static marketing SPA. |
| L4 | Platform headers (`server: Vercel`, `x-vercel-*`) can't be stripped via `vercel.json`. | ℹ️ Informational only; no `X-Powered-By` is emitted. |

---

## 3. Fixes implemented (code)

`vercel.json` (headers + CSP + reporting + caching) · `middleware.ts` (edge
filtering) · `api/reviews.ts` (Google proxy) · `api/lead.ts` (Turnstile lead
proxy) · `api/csp-report.ts` (CSP collector) · `src/app/utils/turnstile.ts`
(client helper, inert until configured) · `src/app/components/LeadForm.tsx`
(anti-spam + staged proxy submit) · `src/app/services/googleReviewsService.ts`
(key removed) · `.gitignore` · `.env.example` · `public/robots.txt` ·
`public/sitemap.xml` · `index.html` (canonical/OG) · `.github/dependabot.yml` +
`.github/workflows/security-audit.yml` (dependency scanning gate).

## 4. Fixes requiring Vercel dashboard configuration

See §"Vercel Dashboard Actions Required" in `SECURITY_IMPLEMENTATION.md` and
`SECURITY_RUNBOOK.md`. Summary: **already live** — Firewall custom rules (rate
limits + challenge-no-UA) and automatic DDoS mitigation. **Still to enable
(dashboard-only):** OWASP managed ruleset, BotID, deployment protection for
previews (currently on), spend alerts, and a log drain. Env vars must be set for
the proxies to activate (`LEAD_ENDPOINT`, `TURNSTILE_SECRET_KEY`,
`GOOGLE_PLACES_API_KEY`, `GOOGLE_PLACE_ID`, `VITE_TURNSTILE_SITE_KEY`,
`VITE_LEAD_ENDPOINT`).

## 5. Assumptions made

- The production domain is `https://www.swiftrooms.ae` (used in canonical/sitemap);
  adjust if the canonical host differs.
- Formspree is the likely lead endpoint (per `.env.example`), but the code is
  endpoint-agnostic.
- CSP `img-src https:` / `connect-src 'self' https:` are intentionally broad for
  a media-heavy marketing site; they can be tightened to explicit hosts.

## 6. Areas that could not be verified locally

- **`swiftrooms-newbuild.vercel.app`** — a separate project not present in this
  repo. If *that* site (and not this landing page) is the intended hardening
  target, its own repository must be provided; the fixes here do not apply to it.
- **Live production headers/Firewall** — verified via `vercel firewall overview`
  (rules live) and a logged-in browser check (enforcing CSP → zero console
  violations). Unauthenticated `curl` of preview URLs is blocked by Vercel
  Deployment Protection (302 to SSO), so headless header assertion on previews
  isn't possible; check on the production domain after promotion.
- **Deliverability of forwarded leads** — depends on the (unset) `LEAD_ENDPOINT`/
  `VITE_LEAD_ENDPOINT`; until a developer configures it, submissions are not
  delivered. This is the single most important open item.
