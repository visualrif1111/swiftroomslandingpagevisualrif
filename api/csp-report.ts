/**
 * POST /api/csp-report — Content-Security-Policy violation collector.
 *
 * WHY (Phase 16 logging / Phase 17 monitoring)
 * --------------------------------------------
 * The CSP in `vercel.json` is *enforcing*. This endpoint gives us passive
 * visibility into what it blocks in the real world — a new third-party script,
 * an injected inline handler (possible XSS attempt), a misconfigured directive.
 * Browsers POST a small JSON report ONLY when a violation occurs, so this adds
 * zero cost to normal page loads and never touches the critical path.
 *
 * The report is logged to the Vercel function log (visible in the dashboard and
 * drainable to a SIEM/log drain). We log a compact, bounded, sanitised summary
 * only — never the full untrusted body, never anything that could be a secret.
 * Always returns 204 quickly so the browser's reporting queue drains fast.
 *
 * Wired up from `vercel.json` via the `report-uri`/`report-to` CSP directives
 * and the `Reporting-Endpoints` response header.
 */

export const config = { runtime: 'edge' };

// Hard cap on the body we will read, so a malicious client can't make us buffer
// a huge payload. Real CSP reports are a few hundred bytes.
const MAX_BODY_BYTES = 16 * 1024;

// Keep individual logged fields short — these are attacker-influenceable.
function clip(value: unknown, max = 512): string | undefined {
  if (typeof value !== 'string') return undefined;
  return value.length > max ? `${value.slice(0, max)}…` : value;
}

const noStore = {
  'cache-control': 'no-store',
  'x-content-type-options': 'nosniff',
} as const;

export default async function handler(request: Request): Promise<Response> {
  // Only POST from the browser's reporting mechanism is meaningful.
  if (request.method !== 'POST') {
    return new Response(null, { status: 405, headers: noStore });
  }

  try {
    const raw = (await request.text()).slice(0, MAX_BODY_BYTES);
    const parsed = JSON.parse(raw);

    // Two wire formats exist:
    //  - legacy `report-uri`:  { "csp-report": { ... } }
    //  - Reporting API `report-to`: [ { "type": "csp-violation", "body": {…} } ]
    const reports = Array.isArray(parsed) ? parsed : [parsed];

    for (const entry of reports) {
      const r = entry?.['csp-report'] ?? entry?.body ?? entry ?? {};
      // Log only stable, non-sensitive diagnostic fields (all are URLs/directive
      // names, never credentials). Bounded length. One structured line.
      console.warn(
        '[csp-report]',
        JSON.stringify({
          documentUri: clip(r['document-uri'] ?? r.documentURL),
          violatedDirective: clip(r['violated-directive'] ?? r.effectiveDirective, 128),
          blockedUri: clip(r['blocked-uri'] ?? r.blockedURL),
          sourceFile: clip(r['source-file'] ?? r.sourceFile),
          lineNumber: typeof r['line-number'] === 'number' ? r['line-number'] : r.lineNumber,
          disposition: clip(r.disposition, 32),
        }),
      );
    }
  } catch {
    // Malformed/oversized report — swallow it. Never surface internals; the
    // browser doesn't read this body anyway.
  }

  // 204: accepted, nothing to return. Keeps the browser's reporting queue happy.
  return new Response(null, { status: 204, headers: noStore });
}
