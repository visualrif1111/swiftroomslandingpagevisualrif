# Security Implementation — Swiftrooms Landing Page

**What / why / how-to-test for the hardening pass.** Companion to
`SECURITY_AUDIT.md` (findings), `SECURITY.md` (deep rationale) and
`SECURITY_RUNBOOK.md` (operator steps).

Stack recap: **static Vite + React 18 SPA on Vercel.** No Next.js, no Sanity, no
server actions, no preview mode. Server logic is a small set of Vercel Edge
Functions under `/api`. Nothing below changes the visual design, layout, copy,
animations, routing, SEO metadata, or Core Web Vitals.

---

## 1. What was changed and why

| Change | File(s) | Why |
|---|---|---|
| Full HTTP security header suite + enforcing CSP + CSP reporting + asset caching | `vercel.json` | Site shipped with no headers; adds XSS/clickjacking/transport hardening without touching the app. |
| Framework-agnostic edge request filtering (fail-open) | `middleware.ts` | Blocks exploit-probe paths (404) and scanner UAs (403) that the SPA fallback would otherwise answer 200. |
| Server-side Google Places proxy | `api/reviews.ts` | Keeps `GOOGLE_PLACES_API_KEY` off the client; `GET`-only; inert (501) until configured. |
| Turnstile-verified lead proxy | `api/lead.ts` | Optional hardened path: same-origin, origin-checked, 64 KB body cap, server-side honeypot + timing re-check, Cloudflare `siteverify`; inert (501) until `LEAD_ENDPOINT` set. |
| CSP violation collector | `api/csp-report.ts` | `POST`-only, 16 KB cap; logs a bounded, sanitised one-line summary; returns 204. |
| Client Turnstile helper | `src/app/utils/turnstile.ts` | Loads the widget only when `VITE_TURNSTILE_SITE_KEY` is set; fully inert otherwise. |
| Lead-form anti-spam + staged submit | `src/app/components/LeadForm.tsx` | Honeypot, ≥2.5 s submit-timing, duplicate-submit guard, file type/size/count validation; routes through `/api/lead` when Turnstile is enabled, else direct, with a 501 fallback so leads never break. |
| Reviews key removal | `src/app/services/googleReviewsService.ts` | Removed all client-side `VITE_GOOGLE_PLACES_API_KEY` reads. |
| Secret hygiene | `.gitignore`, `.env.example` | Ignore `.env*`; document every variable and which side (client/server) it belongs to. |
| SEO/crawler control | `public/robots.txt`, `public/sitemap.xml`, `index.html` | robots, sitemap, canonical + OG/Twitter meta. |
| Dependency scanning | `.github/dependabot.yml`, `.github/workflows/security-audit.yml` | Weekly Dependabot + `npm audit` CI gate. `react-router` (unused, flagged) removed → 0 vulnerabilities. |

## 2. Files modified / added
```
vercel.json
middleware.ts
api/reviews.ts   api/lead.ts   api/csp-report.ts
src/app/utils/turnstile.ts
src/app/components/LeadForm.tsx
src/app/services/googleReviewsService.ts
.gitignore   .env.example
public/robots.txt   public/sitemap.xml   index.html
package.json   package-lock.json          (react-router removed)
.github/dependabot.yml   .github/workflows/security-audit.yml
SECURITY.md   SECURITY_AUDIT.md   SECURITY_IMPLEMENTATION.md   SECURITY_RUNBOOK.md
```

## 3. Environment variables needed

Set in **Vercel → Settings → Environment Variables**. Everything is optional —
each unset var leaves its feature safely inert (the site still builds and runs).

**Client (public, `VITE_` — inlined into the bundle, never a secret):**
- `VITE_LEAD_ENDPOINT` — direct/fallback lead target (e.g. Formspree URL)
- `VITE_TURNSTILE_SITE_KEY` — Turnstile public site key (enables the widget + `/api/lead` path)

**Server (secret, NO `VITE_` prefix):**
- `LEAD_ENDPOINT` — forward target for the `/api/lead` proxy
- `TURNSTILE_SECRET_KEY` — enables server-side Turnstile verification
- `GOOGLE_PLACES_API_KEY`, `GOOGLE_PLACE_ID` — enable live reviews via `/api/reviews`

> `VITE_*` vars are build-time. After setting them, **redeploy** — an existing
> deployment won't pick them up.

## 4. Vercel Dashboard Actions Required

**Already live** (published via `vercel firewall`): custom Firewall rules —
`rate-limit-global` (100/10 s/IP → challenge), `rate-limit-post` (5/10 s/IP →
challenge), `challenge-no-user-agent`; automatic DDoS **System Mitigations** on.

**Still to do (dashboard-only, cannot be set from code):**
- Enable **WAF managed ruleset** (OWASP) — Firewall → Managed Rules.
- Enable **BotID** — Firewall.
- Keep **Deployment Protection** on for preview/staging (currently on).
- Add **spend alerts** (Settings → Billing) and a **log drain** (Observability)
  for the `[csp-report]` / function logs.
- Document who may toggle **Attack Challenge Mode** during an incident.

## 5. How to test the protections

```bash
npm install          # scripts: only "build" and "dev" exist (no lint/typecheck configured)
npm run build        # must succeed — currently ✓ (built in ~10s)
npm audit            # currently: 0 vulnerabilities
```

- **Headers/CSP (after deploy, on the production domain):**
  `curl -sI https://www.swiftrooms.ae/ | grep -iE 'content-security|strict-transport|x-frame|referrer|permissions'`
  Then load the site logged in, DevTools → Console → confirm **zero CSP violations**;
  hero video, reels, and Google Fonts render.
- **Middleware:** `curl -s -o /dev/null -w '%{http_code}\n' https://<domain>/.env` → 404;
  `curl -A 'sqlmap/1' -s -o /dev/null -w '%{http_code}\n' https://<domain>/` → 403.
- **Form anti-spam:** submit normally (works); fill the hidden `company_website`
  field via devtools (silently dropped); submit <2.5 s (rejected); attach a
  `.exe` or >10 MB file (rejected client-side).
- **Proxies inert-by-default:** `GET /api/reviews` → 501 until Google env set;
  `POST /api/lead` → 501 until `LEAD_ENDPOINT` set (form falls back to direct).

## 6. Known limitations

- **CSP** keeps `style-src 'unsafe-inline'` (MUI/Emotion/Framer need it) and uses
  broad `connect-src 'self' https:` / `img-src https:`. Scripts remain strict
  (`script-src 'self'`, no eval). Tighten `connect-src` to the real endpoint host.
- **App-level rate limiting** is handled at the **Vercel Firewall edge**, not in
  the functions (edge instances are ephemeral/per-region, so in-function counters
  are unreliable). For fine-grained per-route limits, add Upstash Redis
  (`UPSTASH_REDIS_REST_URL` / `_TOKEN`) — documented, not required.
- **Lead delivery** is not active until `LEAD_ENDPOINT`/`VITE_LEAD_ENDPOINT` is
  configured. **This is the top open item.**
- The separate **`swiftrooms-newbuild.vercel.app`** project is out of scope of
  this repo and was not modified.

## 7. Future enterprise recommendations

- Enable Turnstile end-to-end (set both keys) once a Cloudflare account exists.
- Add Upstash-backed rate limiting + a WAF managed ruleset + BotID.
- Self-host Google Fonts to drop two CSP third-party entries.
- Add Vercel Web Analytics + Speed Insights and a Sentry (or log-drain → SIEM)
  pipeline for the `[csp-report]` and function error logs.
- Tighten `connect-src`/`img-src` to explicit hosts after the endpoint is fixed.
