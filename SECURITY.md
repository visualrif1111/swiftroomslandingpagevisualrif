# Swiftrooms — Security Hardening

This document is the security reference and the final report for the enterprise
hardening pass. It covers what was implemented in code, what must be configured
in the Vercel dashboard (Firewall/WAF/bot management are config, not code), and
the production-readiness checklist.

---

## 0. Architecture context (important)

Swiftrooms is a **static Vite + React 18 single-page app** deployed on Vercel.
It has **no application server, no Next.js, no Sanity CMS, no authentication and
no preview mode**. The lead form submits client-side to an external endpoint
(`VITE_LEAD_ENDPOINT`, e.g. Formspree). This shapes the whole model:

- The realistic attack surface is **edge/CDN + HTTP response headers + the
  client bundle + the lead form + the optional reviews API function**.
- Server-side concerns from a generic brief that **do not apply here**: Sanity
  security, authenticated routes/sessions, server-side CSRF tokens, server-side
  form rate limiting. Where those were requested they are marked N/A below with
  the reason.
- "DDoS mitigation, WAF, Attack Challenge Mode, bot management" are **Vercel
  platform features configured in the dashboard**, not committable code. This
  repo is prepared for them; setup steps are in §5.

---

## 1. What was implemented (code)

| Area | File | Summary |
|------|------|---------|
| Security headers + CSP | `vercel.json` | Full header suite on every route; strict CSP; asset caching |
| Edge request filtering | `middleware.ts` | Blocks exploit-probe paths & scanner UAs; fail-open |
| Secure reviews proxy | `api/reviews.ts` | Keeps the Google Places API key server-side |
| Form anti-spam | `src/app/components/LeadForm.tsx` | Honeypot, submit-timing check, duplicate-submit guard, file validation |
| Reviews key hardening | `src/app/services/googleReviewsService.ts` | Removed all client-side `VITE_GOOGLE_PLACES_API_KEY` reads so the key can never be inlined into the public bundle; live reviews go only through the server-side `/api/reviews` proxy |
| Dependency hygiene | `package.json` | Removed unused `react-router` (cleared a HIGH advisory); patched build toolchain; `npm audit` → **0 vulnerabilities** (prod + dev) |
| Secret hygiene | `.gitignore` | Ignores `.env` / `.env.*` (keeps `.env.example`) |
| SEO/crawler control | `public/robots.txt`, `public/sitemap.xml`, `index.html` | robots, sitemap, canonical + Open Graph/Twitter meta |

No visual/UX change was made — the production bundle hash is unchanged by the
dependency cleanup. No secret is committed.

---

## 2. HTTP security headers (`vercel.json`)

Applied to `/(.*)`:

| Header | Value | Purpose |
|--------|-------|---------|
| `Content-Security-Policy` | see §3 | XSS / injection defence |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` | Force HTTPS for 2 years |
| `X-Content-Type-Options` | `nosniff` | Block MIME sniffing |
| `X-Frame-Options` | `DENY` | Clickjacking (legacy backstop to CSP `frame-ancestors`) |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Minimise referrer leakage |
| `Permissions-Policy` | camera/mic/geo/payment/usb `()`; autoplay/fullscreen/encrypted-media/PiP scoped to YouTube | Least-privilege browser features |
| `Cross-Origin-Opener-Policy` | `same-origin` | Cross-origin isolation of the browsing context |
| `Cross-Origin-Resource-Policy` | `same-origin` | Hotlink protection for our assets |
| `X-Permitted-Cross-Domain-Policies` | `none` | Block Adobe cross-domain policies |
| `X-DNS-Prefetch-Control` | `on` | Perf (safe) |

Static assets (`/assets/*`, images, fonts, media) get
`Cache-Control: public, max-age=31536000, immutable` (filenames are content-hashed);
`/` and `/index.html` get `max-age=0, must-revalidate` so deploys are picked up
immediately.

### Intentional deviations from the brief
- **`Cross-Origin-Embedder-Policy` is deliberately NOT set.** `COEP: require-corp`
  would break the YouTube iframe embeds and Google Fonts, which do not send
  `Cross-Origin-Resource-Policy`. Enabling it would break the site with no
  security benefit for a static marketing page. Revisit only if the site ever
  needs `SharedArrayBuffer`.
- **Platform headers** like `server: Vercel` and `x-vercel-*` cannot be removed
  via `vercel.json`; they are informational and not a real risk. We do not emit
  `X-Powered-By`.

---

## 3. Content Security Policy

```
default-src 'self';
base-uri 'self';
object-src 'none';
frame-ancestors 'none';
form-action 'self' https:;
script-src 'self';
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
font-src 'self' https://fonts.gstatic.com data:;
img-src 'self' data: blob: https:;
media-src 'self' data: blob: https:;
connect-src 'self' https:;
frame-src https://www.youtube.com https://www.youtube-nocookie.com;
worker-src 'self' blob:;
manifest-src 'self';
upgrade-insecure-requests
```

Rationale / known conflicts:
- **`script-src 'self'`** — the production bundle is a single external ES module
  with **no `eval` / `new Function`** (verified against `dist/`), so we avoid
  both `unsafe-inline` and `unsafe-eval`. JSON-LD uses
  `<script type="application/ld+json">`, which is a data block and is **not**
  governed by `script-src`, so structured data still works.
- **`style-src` needs `'unsafe-inline'`** — MUI/Emotion and Framer Motion inject
  runtime inline styles and `style="..."` attributes. A nonce is impractical for
  a static SPA with no server render. This is the one unavoidable relaxation and
  is style-only (not script), so its XSS value is limited.
- **`connect-src 'self' https:`** — pragmatic so the lead form works with **any**
  configured `VITE_LEAD_ENDPOINT` without silently breaking lead capture. It
  still blocks plaintext `http:` and non-web protocols. **Tighten** once the
  endpoint host is known, e.g. `connect-src 'self' https://formspree.io` (add
  `https://maps.googleapis.com` only if the reviews proxy is bypassed).
- **`script-src`/`frame-src` include `https://challenges.cloudflare.com`** for
  the optional Cloudflare Turnstile widget (loads a script + a challenge iframe).
  This only *permits* the source; nothing loads it unless
  `VITE_TURNSTILE_SITE_KEY` is set (see §7). Turnstile's network calls are
  covered by `connect-src 'self' https:`.
- **`frame-src`** allows YouTube (hero + reels embeds). `img-src https:` covers
  YouTube thumbnails and Google review avatars; can be tightened to
  `i.ytimg.com lh3.googleusercontent.com` if you want a stricter policy.

> Deployment note: because the CSP is enforcing, verify the branch **preview
> deployment** in the browser console (no CSP violations) before promoting to
> production. If a legitimate source is ever blocked, add it to the specific
> directive rather than relaxing `script-src`.

---

## 4. Edge middleware (`middleware.ts`)

Framework-agnostic Vercel Edge Middleware. **Fails open** (any error → request
continues) so it can never take the site down. Static assets are excluded via
`config.matcher`, so it adds no latency to rendering.

- Blocks common exploit-probe paths (`/wp-admin`, `/xmlrpc.php`, dotfiles like
  `/.env` / `/.git`, `phpmyadmin`, config/backup dumps) with `404` — otherwise
  the SPA fallback would answer them `200`.
- Blocks high-signal scanner/abusive user-agents (`sqlmap`, `nikto`, `nmap`,
  aggressive SEO scrapers) with `403`. **Legitimate crawlers (Googlebot,
  Bingbot, social preview bots) are never blocked** — SEO is unaffected.
- Adds `X-Content-Type-Options: nosniff` as a backstop.

Durable, distributed **rate limiting is intentionally NOT done here** — edge
instances are ephemeral and per-region. Use Vercel Firewall rate-limit rules
(§5) or an Upstash/Vercel KV counter if you later add first-party APIs.

---

## 5. Vercel platform config (dashboard — do this after deploy)

These are the "prepare for Vercel Firewall" deliverables. The repo is ready; a
project admin enables them in **Vercel → Project → Firewall / Settings**.

1. **DDoS mitigation** — on by default for all projects. No action needed.
2. **Web Application Firewall (WAF)**
   - Enable **Managed Rulesets** (OWASP core) → Firewall → Managed Rules.
   - Add **Rate-limit custom rules**, suggested starting points:
     - `POST` to the site / lead paths: 5 req / 10s per IP → challenge.
     - Any path, 100 req / 10s per IP → challenge.
     - Requests missing a `user-agent`: challenge.
   - Stage rules first (`vercel firewall` CLI supports staging), then publish.
3. **Attack Challenge Mode** — one-click toggle (Firewall tab) to require a
   browser challenge for all visitors during an active attack. Document who can
   flip it; turn off when the incident ends.
4. **Bot management / verification** — enable **BotID** (Firewall) to verify
   real browsers. Optionally add **Cloudflare Turnstile** on the lead form for
   an extra layer (see §7).
5. **Environment variables** (Project → Settings → Environment Variables):
   - `VITE_LEAD_ENDPOINT` — lead form target (Production + Preview).
   - `GOOGLE_PLACES_API_KEY`, `GOOGLE_PLACE_ID` — **server-only**, no `VITE_`
     prefix, needed only if you enable the reviews proxy (§6).

---

## 6. Reviews API — key exposure fix (`api/reviews.ts`)

Previously, enabling live Google reviews would have inlined
`VITE_GOOGLE_PLACES_API_KEY` into the public bundle. The new edge function
`GET /api/reviews` calls Google **server-side** and returns sanitised JSON,
edge-cached for 1h. To enable:

1. Set `GOOGLE_PLACES_API_KEY` + `GOOGLE_PLACE_ID` in Vercel (server env).
2. In `src/app/services/googleReviewsService.ts`, set `useStaticReviews: false`.

Until configured, the endpoint returns `501` and the client keeps its static
reviews, so nothing breaks. Only `GET` is allowed; errors never leak internals.

**Client-side key path fully removed (2026-07 audit).** `googleReviewsService.ts`
previously kept a `CONFIG.apiKey = import.meta.env.VITE_GOOGLE_PLACES_API_KEY`
read plus a commented-out direct-to-Google fetch. Even though it was dead code,
Vite inlines any referenced `VITE_*` value into the public bundle at build time,
so setting that env var would have leaked the key. All such reads and the
direct-fetch path were deleted; the service now calls **only** `/api/reviews`.
Verified: `grep -rE "VITE_GOOGLE|AIza|maps.googleapis.com" dist/assets/*.js`
returns nothing.

---

## 7. Form security (`LeadForm.tsx`)

Implemented client-side (no server exists to enforce more):
- **Honeypot** (`company_website`) — hidden from users & AT (`aria-hidden`,
  off-screen, `tabIndex=-1`); if filled, the submission is silently dropped.
- **Timing check** — submissions faster than 2.5s are rejected as automated.
- **Duplicate-submission guard** — the same enquiry won't POST twice.
- **File validation** — type allowlist (JPG/PNG/WebP/GIF/PDF), 10 MB/file,
  max 8 files. (Files are not uploaded to a third party — only names are sent.)
- Existing protections retained: phone/email validation, disposable-email
  domain blocking, double-submit lock.

**CSRF: N/A** — there is no authenticated, cookie-based server endpoint on our
origin; the form is an unauthenticated POST, so a CSRF token would add nothing.

### Turnstile-protected proxy (`api/lead.ts` + `src/app/utils/turnstile.ts`)
The stronger anti-spam path is now **implemented and inert-by-default** (parity
with the reviews proxy):

- When `VITE_TURNSTILE_SITE_KEY` is set, the form lazy-loads Cloudflare Turnstile
  (invisible, one-off widget per submit — **no visible UI, no UX/CRO change**),
  mints a token, and POSTs the payload to the **same-origin `/api/lead`**
  instead of exposing a third-party endpoint in the bundle.
- `api/lead.ts` (edge) then: validates the request **Origin** (same-origin
  only), re-checks the **honeypot + submit-timing** server-side (defence in
  depth — a bot hitting the endpoint directly can't bypass the client checks),
  verifies the Turnstile token via **`siteverify`** when `TURNSTILE_SECRET_KEY`
  is set, and forwards to a **server-only `LEAD_ENDPOINT`**. Size-capped body,
  request timeouts, sanitised error responses.
- **Staged rollout / never breaks:** with no site key the entire Turnstile path
  is tree-shaken out of the bundle and the form uses its existing direct
  endpoint. If the site key is set but `LEAD_ENDPOINT` isn't, `/api/lead` returns
  `501` and the client falls back to the direct endpoint so no lead is lost.
- Verification is only *enforced* once `TURNSTILE_SECRET_KEY` exists, so you can
  enable the widget and the server check independently.

Server-only env: `LEAD_ENDPOINT`, `TURNSTILE_SECRET_KEY` (no `VITE_` prefix).
Client env: `VITE_TURNSTILE_SITE_KEY` (public site key).

---

## 8. OWASP Top-10 review (Phase 19)

| Risk | Status |
|------|--------|
| Injection (SQL/cmd) | N/A — no server/DB. Edge middleware blocks injection-style probe paths. |
| Broken access control | N/A — no auth/roles; no protected resources. |
| Security misconfiguration | Fixed — headers/CSP added, secrets gitignored, error bodies sanitised in `api/reviews.ts`. |
| Sensitive data exposure | Fixed — Google key moved server-side; no secrets in bundle; `.env*` ignored. |
| Vulnerable components | Fixed — removed unused `react-router` (HIGH advisory) + patched build toolchain; `npm audit` = **0 vulnerabilities**. Keep monitoring (see checklist). |
| SSRF | Low — the only server fetch (`api/reviews.ts`) targets a fixed Google URL; no user-controlled URL. |
| XSS | Mitigated — strict `script-src 'self'`, no `dangerouslySetInnerHTML` on user input (only static JSON-LD). |
| CSRF | N/A — see §7. |
| Open redirects | None — no redirect logic takes user-supplied destinations. |
| Clickjacking | Fixed — `frame-ancestors 'none'` + `X-Frame-Options: DENY`. |

---

## 9. SEO / Accessibility / Performance impact

- **SEO** — added `robots.txt`, `sitemap.xml`, canonical + OG/Twitter meta.
  Crawlers are explicitly allowed; JSON-LD unaffected by CSP. Net positive.
- **Accessibility** — honeypot is `aria-hidden`/off-screen and not focusable;
  no visible UI, focus order, keyboard nav or contrast changed.
- **Performance** — headers/CSP add no runtime cost; asset caching is now
  `immutable` (improves repeat visits). Middleware is excluded from static
  assets (no LCP impact). Bundle size unchanged.

---

## 10. Production-readiness checklist

- [ ] Verify branch **preview** deployment: open DevTools console → **zero CSP
      violations**; hero video + Instagram reels + Google Fonts render.
- [ ] Confirm headers on production: `curl -sI https://<domain>/ | grep -iE 'content-security|strict-transport|x-frame|x-content|referrer|permissions|cross-origin'`.
- [ ] Confirm HTTPS + HSTS active; certificate valid.
- [ ] Test lead form end-to-end (real submit, honeypot drop, duplicate guard,
      file-type rejection).
- [ ] Set `VITE_LEAD_ENDPOINT` in Vercel (Prod + Preview).
- [ ] (Optional) Set `GOOGLE_PLACES_API_KEY` / `GOOGLE_PLACE_ID` + flip
      `useStaticReviews`; hit `/api/reviews`.
- [ ] Enable Vercel WAF managed ruleset + rate-limit rules (§5).
- [ ] Enable BotID; document Attack Challenge Mode runbook.
- [ ] Tighten CSP `connect-src` to the real endpoint host once known.
- [x] `npm audit` — **0 vulnerabilities** (prod + dev) as of 2026-07 audit.
- [x] Automated recurring dependency scanning — **Dependabot**
      (`.github/dependabot.yml`, weekly) + a **Security Audit CI workflow**
      (`.github/workflows/security-audit.yml`) that fails any PR introducing a
      HIGH+ production vulnerability and rebuilds to catch bad dep bumps.
- [ ] Confirm no `.env`/`.env.local` is tracked (`git ls-files | grep -i env`
      should show only `.env.example`).

---

## 11. Remaining recommendations

1. Add **Cloudflare Turnstile** + an `api/lead.ts` server proxy for the lead form
   (removes reliance on client-only anti-spam and hides the endpoint).
2. Tighten CSP `connect-src` and `img-src` to explicit hosts once finalised.
3. Add **Vercel Web Analytics + Speed Insights** and a **Log Drain** for
   security/error monitoring (failed requests, 4xx/5xx, bot blocks).
4. ~~Set up **Dependabot**/`npm audit` in CI for continuous dependency
   scanning.~~ ✅ Done — `.github/dependabot.yml` + `.github/workflows/security-audit.yml`.
5. Consider serving Google Fonts self-hosted to drop the two `fonts.g*` CSP
   entries and remove a third-party dependency.

---

## 12. Deployment / domain status (OPEN — verified live 2026-07-08)

Live header verification found that **the hardening in this repo currently
protects only the Vercel deployment, not the primary customer-facing domain.**

| Host | Server | Security posture |
|------|--------|------------------|
| `swiftroomslandingpagevisualrif.vercel.app` | Vercel | ✅ Full hardened suite (CSP, HSTS w/ `includeSubDomains; preload`, `X-Frame-Options: DENY`, COOP/CORP, Permissions-Policy); middleware blocks `/.env` (404), scanner UAs (403); `/api/reviews` → 501 safe fallback. |
| `www.swiftrooms.ae` (canonical prod) | **nginx** (not Vercel) | ⚠️ Weak: `X-Frame-Options: SAMEORIGIN`, near-empty CSP (`frame-ancestors 'self'` only — no script/style/connect rules), HSTS `max-age=31536000` without `includeSubDomains`/`preload`. |
| `swiftrooms.ae` | nginx | 301 → `www` |
| `swiftrooms-newbuild.vercel.app` | Vercel | Separate deployment. |

**Decision (2026-07-08): do NOT attach `swiftrooms.ae` to this Vercel project
yet.** The domain remains on its existing nginx origin by owner instruction.
Consequence: none of the header/CSP/middleware/WAF hardening in this repo reaches
real visitors until the domain is cut over. Two future paths when ready:
1. **Cutover** — point `swiftrooms.ae` DNS at this Vercel project; hardening then
   applies automatically. (Re-verify canonical/redirects and lead endpoint first.)
2. **Harden nginx in place** — if the domain stays on nginx, replicate the
   `vercel.json` header suite in the nginx `server` block.

This is a DNS/ops action, not a code change; tracked here so it isn't forgotten.

---

## 13. Logging & monitoring — CSP violation reporting (Phases 16–17)

The enforcing CSP now reports what it blocks. `vercel.json` adds
`report-uri /api/csp-report; report-to csp-endpoint` to the policy plus a
`Reporting-Endpoints: csp-endpoint="/api/csp-report"` header; the collector is
`api/csp-report.ts`.

- **Passive & free** — browsers POST a small JSON report **only on an actual
  violation**, so normal page loads are unaffected (no critical-path cost).
- **What it catches** — a newly-added third-party script that the policy blocks,
  an injected inline event handler (a possible XSS attempt), or a directive
  that's too strict for a legitimate resource.
- **Where it lands** — one compact, bounded, **sanitised** structured line per
  report in the Vercel function log (`[csp-report] {...}`), visible in the
  dashboard and **drainable to a SIEM via a Log Drain**. Only URL/directive
  diagnostic fields are logged — never the full untrusted body, never secrets.
- **Hardening of the collector itself** — POST-only (405 otherwise), 16 KB body
  cap, per-field length clipping, fails closed to `204` on malformed input,
  `no-store`.

This is the recommended hook for external monitoring: point a **Vercel Log
Drain** (or Datadog/Sentry) at the function logs to alert on `[csp-report]`
lines and on 4xx/5xx spikes from the middleware bot/probe blocks.
