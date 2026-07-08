# Swiftrooms — Security Operator Runbook

Practical, followable steps for the **dashboard / environment** work that can't
live in the repo. Code hardening is done and committed (see `SECURITY.md`); this
covers what a Vercel project admin does to make it fully effective.

> Scope note: applies to the **Vercel project** `swiftroomslandingpagevisualrif`.
> The domain `www.swiftrooms.ae` is currently on a separate nginx origin and is
> **not** being attached to Vercel yet (owner decision — `SECURITY.md` §12), so
> these steps protect the `.vercel.app` deployment until any future cutover.

---

## 1. Environment variables  ⏳ TODO

Vercel → Project → **Settings → Environment Variables**. Set for **Production**
and **Preview** (never commit real values — `.env*` is gitignored).

| Name | Scope | Required? | Purpose |
|------|-------|-----------|---------|
| `VITE_LEAD_ENDPOINT` | Prod + Preview | **YES — highest priority** | Lead-form direct/fallback target (Formspree form URL / webhook). **Until set (and with Turnstile off), the form drops submissions.** |
| `VITE_TURNSTILE_SITE_KEY` | Prod + Preview | Optional (client) | Cloudflare Turnstile **public** site key. Enables the protected `/api/lead` path + invisible bot check (§5). |
| `LEAD_ENDPOINT` | Prod + Preview | For `/api/lead` | **Server-only** (NO `VITE_`). Forward target the proxy delivers to. |
| `TURNSTILE_SECRET_KEY` | Prod + Preview | For verification | **Server-only** (NO `VITE_`). Enables Turnstile `siteverify` in `/api/lead`. |
| `GOOGLE_PLACES_API_KEY` | Prod + Preview | Optional | Server-only (NO `VITE_` prefix). Enables live Google reviews via `/api/reviews`. |
| `GOOGLE_PLACE_ID` | Prod + Preview | Optional | Paired with the key above. |

After setting `GOOGLE_*`, flip `useStaticReviews: false` in
`src/app/services/googleReviewsService.ts` and redeploy. Until both are set,
`/api/reviews` returns `501` and the client keeps bundled static reviews.

**Verify:** after redeploy, submit the lead form once and confirm the lead
arrives at your endpoint. `curl -s https://<deployment>/api/reviews` → `200`
(configured) or `501` (fallback), never a key.

---

## 2. Web Application Firewall (WAF)

### 2a. Rate-limit custom rules — ✅ ALREADY LIVE
Published to production via `vercel firewall`. Current rules:
- `rate-limit-global` — 100 req / 10s per IP → challenge
- `rate-limit-post` — 5 POST / 10s per IP → challenge
- `challenge-no-user-agent` — requests with no UA → challenge

Manage: `vercel firewall overview | rules | publish | discard`.
**Do not recreate these** — only adjust thresholds if false positives appear.

### 2b. OWASP Managed Ruleset — ⏳ TODO (dashboard only)
Vercel → Project → **Firewall → Managed Rules** → enable the **OWASP core
ruleset**. Start in **Log** mode for 24–48h, review the Firewall analytics for
false positives (esp. on the lead POST), then switch to **Block**.

---

## 3. Bot management — BotID  ⏳ TODO
Vercel → Project → **Firewall → BotID** → enable. Verifies real browsers and
challenges automated clients. Legitimate crawlers (Googlebot/Bingbot) are
allowlisted by the platform, so **SEO is unaffected**. Monitor Firewall
analytics for the first day to confirm no impact on conversions.

---

## 4. Attack Challenge Mode — runbook (incident use)
One-click toggle: Vercel → Project → **Firewall → Attack Challenge Mode**.
Forces an interstitial browser challenge for **all** visitors.

- **When:** active DDoS / credential-stuffing / scraping storm that rate limits
  aren't absorbing (watch for a sustained 4xx/5xx or bandwidth spike).
- **Who:** _<fill in: name the on-call owner(s) authorised to flip it>_.
- **Cost:** adds friction/latency for real users — it will dent conversions, so
  treat it as break-glass, not a default.
- **After:** turn **off** once traffic normalises; note start/stop times in the
  incident log.

---

## 5. Cloudflare Turnstile on the lead form — ✅ CODE SHIPPED, needs keys
The code is implemented and inert by default (`api/lead.ts`,
`src/app/utils/turnstile.ts`; CSP already allows `challenges.cloudflare.com`).
Enable it by adding keys — no code change, no redeploy risk to the form design:

1. Cloudflare dashboard → Turnstile → create a widget for the site's domain(s)
   (add both `*.vercel.app` preview and the prod domain). Choose **Managed**;
   the integration renders it **invisible** so there's no visible UI. Copy the
   **site key** and **secret**.
2. Set env (§1): `VITE_TURNSTILE_SITE_KEY` (public), plus server-only
   `LEAD_ENDPOINT` and `TURNSTILE_SECRET_KEY`. Redeploy.
3. Staged rollout options:
   - Site key only (no secret) → widget runs client-side, `/api/lead` forwards
     without hard verification. Good for a canary.
   - Add the secret → server-side `siteverify` is enforced; unverified/bot
     submissions are rejected `403`.
4. **Verify on a preview:** submit the form (should succeed silently, no visible
   challenge for a real browser), confirm the lead arrives, and check DevTools
   console for **zero CSP violations**. If the site key is unset the whole
   Turnstile path is tree-shaken out — the form behaves exactly as before.

---

## 6. Verification commands (run against any deployment URL)
```sh
D=https://swiftroomslandingpagevisualrif.vercel.app

# Security headers present on the document
curl -sSI "$D/" | grep -iE 'content-security-policy|strict-transport|x-frame|x-content-type|referrer-policy|permissions-policy|cross-origin'

# Middleware blocks exploit probes / scanners, allows real browsers
curl -so /dev/null -w '%{http_code}\n' "$D/.env"                 # expect 404
curl -so /dev/null -w '%{http_code}\n' -A 'sqlmap/1.7' "$D/"     # expect 403
curl -so /dev/null -w '%{http_code}\n' -A 'Mozilla/5.0' "$D/"    # expect 200

# Reviews proxy never leaks the key
curl -s "$D/api/reviews"                                          # 200 or 501, never a key

# Dependency baseline
npm audit --omit=dev --audit-level=high                           # expect: found 0 vulnerabilities
```

---

## 7. Quick status
| Item | State |
|------|-------|
| Security headers + strict CSP | ✅ Live on `.vercel.app` |
| Edge middleware (probe/scanner filtering) | ✅ Live & verified |
| Reviews key exposure | ✅ Closed (no client-side key) |
| Dependency vulns | ✅ 0 (prod+dev) + Dependabot/CI gate |
| WAF rate-limit rules | ✅ Live |
| OWASP managed ruleset | ⏳ TODO (§2b) |
| BotID | ⏳ TODO (§3) |
| `VITE_LEAD_ENDPOINT` | ⏳ **TODO — form drops leads until set (§1)** |
| Turnstile + `/api/lead` proxy | ✅ Code shipped; ⏳ needs keys to activate (§5) |
| Attack Challenge Mode owner | ⏳ Assign (§4) |
| Domain `swiftrooms.ae` on Vercel | ⛔ Deferred by owner (`SECURITY.md` §12) |
