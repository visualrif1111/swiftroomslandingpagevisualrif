import { next } from '@vercel/edge';

/**
 * Vercel Edge Middleware — lightweight, framework-agnostic request filtering.
 *
 * This runs at the edge BEFORE the static SPA / functions are served. It is
 * intentionally minimal (Phase 11 — "keep middleware lightweight") and
 * FAILS OPEN: any unexpected error falls through to `next()` so the site can
 * never be taken down by this file.
 *
 * What it does:
 *   - Blocks common vulnerability-scanner / exploit probe paths (wp-admin,
 *     dotfiles, config leaks) that would otherwise be answered by the SPA
 *     fallback with a 200.
 *   - Blocks a small set of abusive/headless bot user-agents on navigations.
 *   - Adds a couple of defensive response headers as a backstop to vercel.json.
 *
 * It does NOT try to do durable rate limiting — edge instances are ephemeral
 * and per-region, so real rate limiting belongs in Vercel Firewall / WAF
 * (see SECURITY.md). Static assets are excluded via `config.matcher` so this
 * adds no measurable latency to the critical rendering path.
 */

// Paths that only scanners/attackers request. Matched case-insensitively
// against the pathname. Kept deliberately small and high-signal.
const BLOCKED_PATH_PATTERNS: RegExp[] = [
  /^\/wp-(admin|login|content|includes)/i,
  /^\/xmlrpc\.php/i,
  /^\/(\.env|\.git|\.svn|\.hg|\.aws|\.ssh)(\/|$)/i,
  /\/\.(env|git|aws|ssh|htaccess|htpasswd)(\/|$)/i,
  /^\/(phpmyadmin|pma|adminer|administrator)(\/|$)/i,
  /^\/(vendor|config|backup|dump)\.(php|sql|bak|old|zip|tar|gz)$/i,
  /\/(shell|cmd|eval|exec)\.php/i,
];

// High-signal abusive user-agents. Legitimate crawlers (Googlebot, Bingbot,
// social preview bots) are intentionally NOT blocked so SEO is unaffected.
const BLOCKED_UA_PATTERNS: RegExp[] = [
  /(sqlmap|nikto|nmap|masscan|acunetix|nessus|zgrab|dirbuster|wpscan|fuzz)/i,
  /(petalbot|semrushbot|ahrefsbot|mj12bot|dotbot|blexbot)/i,
];

export const config = {
  // Run on everything EXCEPT hashed static assets and public files that must
  // always be served with zero overhead.
  matcher: '/((?!assets/|favicon\\.svg|robots\\.txt|sitemap\\.xml).*)',
};

export default function middleware(request: Request): Response {
  try {
    const url = new URL(request.url);
    const pathname = url.pathname;
    const ua = request.headers.get('user-agent') || '';

    // 1) Block known exploit-probe paths outright.
    if (BLOCKED_PATH_PATTERNS.some((re) => re.test(pathname))) {
      return new Response('Not Found', {
        status: 404,
        headers: { 'content-type': 'text/plain; charset=utf-8' },
      });
    }

    // 2) Block obvious scanner / abusive-bot user-agents.
    if (ua && BLOCKED_UA_PATTERNS.some((re) => re.test(ua))) {
      return new Response('Forbidden', {
        status: 403,
        headers: { 'content-type': 'text/plain; charset=utf-8' },
      });
    }

    // 3) Continue to the SPA / function, adding a defensive backstop header.
    const response = next();
    response.headers.set('X-Content-Type-Options', 'nosniff');
    return response;
  } catch {
    // Never break the site because of middleware.
    return next();
  }
}
