# Security Final Report — Swiftrooms Landing Page (Phase 20)

**Report date:** 2026-07-09
**Project:** `swiftroomslandingpagevisualrif` (Vite 6 + React 18 static SPA on Vercel)
**Live:** https://swiftroomslandingpagevisualrif.vercel.app/
**Companion docs:** `SECURITY.md` (rationale) · `SECURITY_AUDIT.md` (findings) ·
`SECURITY_IMPLEMENTATION.md` (what/why/test) · `SECURITY_RUNBOOK.md` (operator steps).

> This is the consolidated Phase-20 deliverable. It maps the 20-phase brief to
> actual status and records **independent live verification** performed against the
> production URL on the report date. It does not duplicate the detailed findings in
> the companion docs — it references them.

---

## 20-phase status map

| Phase | Area | Status | Where |
|------|------|--------|-------|
| 1 | Security audit | ✅ Done | `SECURITY_AUDIT.md` |
| 2 | Vercel edge security (Firewall/WAF/DDoS/bot) | ✅ Edge rules live; managed ruleset + BotID = dashboard | `SECURITY_IMPLEMENTATION.md §4` |
| 3 | Security headers | ✅ Done + **live-verified** | `vercel.json` |
| 4 | Content-Security-Policy | ✅ Strict (scripts `'self'`, no eval) | `vercel.json` |
| 5 | Rate limiting | ✅ At edge (Firewall); app-level = optional Upstash | `SECURITY_IMPLEMENTATION.md §6` |
| 6 | Bot protection (Turnstile + honeypot) | ✅ Code done; **inert until keys set** | `api/lead.ts`, `src/app/utils/turnstile.ts` |
| 7 | API security | ✅ Done (3 edge fns, origin/size/timeout/method) | `api/*.ts` |
| 8 | Sanity security | ⚪ N/A — no Sanity in this repo | `SECURITY_AUDIT.md §0` |
| 9 | Form security | ✅ Done (honeypot, timing, dup-guard, file limits) | `src/app/components/LeadForm.tsx` |
| 10 | Media security | ✅ Immutable caching; YouTube via CSP `frame-src`; lazy hero | `vercel.json`, `HeroSection.tsx` |
| 11 | Middleware | ✅ Done + **live-verified** (fail-open, lightweight) | `middleware.ts` |
| 12 | Authentication | ⚪ N/A — no auth/admin/preview routes exist | `SECURITY_AUDIT.md §0` |
| 13 | SEO safety | ✅ Preserved (robots/sitemap/canonical/OG intact) | `public/*`, `index.html` |
| 14 | Accessibility | ✅ Unaffected — no a11y-relevant changes made | — |
| 15 | Performance | ✅ Preserved — build unchanged, middleware skips assets | `middleware.ts` matcher |
| 16 | Logging | ✅ Bounded/sanitised CSP + function logs | `api/csp-report.ts` |
| 17 | Monitoring | ✅ Reporting wired; log-drain/Sentry = dashboard | `SECURITY_IMPLEMENTATION.md §7` |
| 18 | Deployment review | ⚠️ **Prod runs an older deploy — see below** | this doc |
| 19 | Penetration / OWASP | ✅ Reviewed; see mapping below | this doc |
| 20 | Final report | ✅ This document | — |

---

## Live verification (production URL, report date)

```
GET /                     200  + CSP, HSTS(2y, preload), X-Frame-Options: DENY,
                                X-Content-Type-Options, Referrer-Policy,
                                Permissions-Policy, COOP, CORP  ✅
GET /.env                 404  (middleware blocks probe path)  ✅
GET / (UA: sqlmap/1.7)    403  (middleware blocks scanner UA)  ✅
GET /api/reviews          501  (inert until Google env set)    ✅
No X-Powered-By emitted   ✅   (server: Vercel cannot be stripped via vercel.json)
```

### ⚠️ Phase 18 — production is behind this branch
The **live** CSP is an earlier revision: `script-src 'self'` with **no**
`report-uri`/`report-to` and no `challenges.cloudflare.com` source, and
`GET /api/lead` returns **404** (the route does not exist in prod yet). The current
branch adds CSP violation reporting, the Turnstile-verified `/api/lead` proxy, and
the Cloudflare CSP sources. **These take effect only after this branch is promoted
to production.** Action: merge → deploy → re-run the checks above (expect
`/api/lead` GET → 405 and a `reporting-endpoints` response header).

---

## OWASP Top-10 review (Phase 19)

| Risk | Posture |
|------|---------|
| Injection | No SQL/DB; forms forward JSON only; no `eval`; CSP blocks inline script. |
| Broken access control | No auth/admin/preview surface. API fns are origin-checked, method-gated. |
| Security misconfiguration | Full header suite; scanner/probe filtering; no secrets in bundle. |
| Vulnerable dependencies | `npm audit` = 0; Dependabot + CI audit gate on every PR. |
| Sensitive data exposure | Google/Turnstile secrets are **server-only** (no `VITE_` prefix). |
| SSRF | API fns fetch only fixed, hardcoded upstreams (Google, Cloudflare) — no user-controlled URLs. |
| XSS | Strict CSP (`script-src 'self'`, no eval); React auto-escaping; CSP reporting. |
| CSRF | State-changing `/api/lead` is origin-validated + (optionally) Turnstile-gated; no cookies/sessions. |
| Open redirect | No redirect logic that consumes user input. |

---

## Phase 20 required items

1. **Security improvements implemented** — full header suite + strict enforcing CSP;
   edge request filtering; 3 hardened edge API fns; lead-form anti-spam + optional
   Turnstile proxy; Google key moved server-side; CSP violation reporting; secret
   hygiene; robots/sitemap/canonical; Dependabot + audit CI gate.
2. **Files modified** — see `SECURITY_IMPLEMENTATION.md §2`.
3. **Middleware changes** — `middleware.ts`: probe-path 404s, scanner-UA 403s,
   fail-open, asset-excluding matcher, backstop `nosniff`. Live-verified.
4. **Security header configuration** — `vercel.json` headers block (CSP, HSTS,
   XFO, nosniff, Referrer-Policy, Permissions-Policy, COOP, CORP, +hardening).
5. **API improvements** — origin validation, method gating, body-size caps,
   upstream timeouts, no-store + nosniff, sanitised errors, inert-by-default.
6. **Form protection** — honeypot, ≥2.5s submit-timing, duplicate-guard, file
   type/size/count limits, staged Turnstile proxy path.
7. **Sanity review** — N/A (no Sanity present; verified absent).
8. **Performance impact** — none: no bundle/route/asset changes; middleware skips
   hashed assets; headers are edge-applied.
9. **Remaining recommendations** — see below.
10. **Production readiness checklist** — see below.
11. **Posture before** — **~3/10.** Static SPA with zero headers/CSP, a client-side
    Google API key, an unprotected in-bundle form endpoint, no probe filtering, no
    dependency gate.
12. **Posture after** — **~8.5/10** once this branch is deployed and dashboard items
    (managed WAF ruleset, BotID, log drain) + lead endpoint env are set. Code-side
    hardening is complete and verified; the residual gap is deploy + operator config.

---

## Remaining recommendations (not code-blocking)

- **Deploy this branch to production** (closes the Phase-18 gap above). Highest priority.
- **Set `LEAD_ENDPOINT` / `VITE_LEAD_ENDPOINT`** — until then leads are not delivered.
  This is the single most important functional open item.
- **Enable Turnstile end-to-end** (`VITE_TURNSTILE_SITE_KEY` + `TURNSTILE_SECRET_KEY`).
- **Dashboard-only:** WAF managed (OWASP) ruleset, BotID, spend alerts, log drain.
- **Tighten `connect-src`/`img-src`** from `https:` to explicit hosts once the lead
  endpoint host is fixed.
- **Dead code:** `src/app/components/LeadFormAndroid.tsx` is not imported anywhere and
  its `handleSubmit` only `console.log`s form data (no network call). Remove it or wire
  it through the same protected path as `LeadForm` to avoid a future insecure copy-paste.
- **Package-manager hygiene:** standardise on one manager. The repo tracks
  `package-lock.json` and CI/Vercel use npm; keep pnpm artifacts out of the committed
  tree (or fully switch and update CI) to avoid a silent lockfile/PM divergence.
- Consider a `.well-known/security.txt` (RFC 9116) for coordinated disclosure.

## Production readiness checklist

- [x] HTTPS enforced (HSTS 2y + preload; `upgrade-insecure-requests`)
- [x] Security headers live on production
- [x] Strict CSP (scripts `'self'`, no eval) — **reporting variant pending deploy**
- [x] Middleware probe/scanner filtering live
- [x] API endpoints hardened + inert-by-default
- [x] No secrets in client bundle; `.env*` gitignored
- [x] Dependencies: 0 audit findings + CI gate
- [ ] This branch promoted to production (Phase-18 gap)
- [ ] `LEAD_ENDPOINT` configured (lead delivery)
- [ ] Turnstile keys set (bot protection active)
- [ ] Dashboard: managed WAF ruleset + BotID + log drain
