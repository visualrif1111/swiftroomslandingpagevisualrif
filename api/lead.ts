/**
 * POST /api/lead — hardened, same-origin lead-form proxy (Phases 6, 7, 9).
 *
 * WHY THIS EXISTS
 * ---------------
 * The lead form can POST directly to a third-party endpoint (Formspree/webhook)
 * via `VITE_LEAD_ENDPOINT`, but that inlines the endpoint URL into the public
 * bundle (spammable directly) and can't do server-side bot verification. This
 * edge function is the *upgrade path*: the browser posts same-origin to
 * `/api/lead`, and the server:
 *   1. validates the request Origin (same-origin only),
 *   2. re-checks the anti-spam signals (honeypot + submit timing) server-side,
 *   3. verifies a Cloudflare Turnstile token via `siteverify` (if configured),
 *   4. forwards the sanitised payload to the real endpoint held in SERVER env.
 *
 * INERT BY DEFAULT (parity with api/reviews.ts): until `LEAD_ENDPOINT` is set
 * this returns 501 and the client keeps using its existing direct path, so the
 * form never breaks. Turnstile is only *enforced* once `TURNSTILE_SECRET_KEY`
 * is set — so you can roll it out in stages.
 *
 * SERVER-ONLY env (Vercel → Settings → Environment Variables, NO VITE_ prefix):
 *   LEAD_ENDPOINT         — where verified leads are forwarded (e.g. Formspree)
 *   TURNSTILE_SECRET_KEY  — Cloudflare Turnstile secret (enables verification)
 */

export const config = { runtime: 'edge' };

const SITEVERIFY = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
const MAX_BODY_BYTES = 64 * 1024; // generous for a JSON lead; blocks abuse.
const MIN_FILL_MS = 2500; // submissions faster than this are automated.

function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
      'x-content-type-options': 'nosniff',
    },
  });
}

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== 'POST') {
    return json({ error: 'Method Not Allowed' }, 405);
  }

  // Origin validation — this endpoint only serves our own front-end. Reject
  // cross-origin POSTs (a browser always sends Origin on a cross-origin fetch).
  const origin = request.headers.get('origin');
  const host = request.headers.get('host');
  if (origin && host) {
    try {
      if (new URL(origin).host !== host) return json({ error: 'Forbidden' }, 403);
    } catch {
      return json({ error: 'Forbidden' }, 403);
    }
  }

  // Server-only forward target. Not set → tell the client to use its fallback.
  const leadEndpoint = process.env.LEAD_ENDPOINT;
  if (!leadEndpoint) return json({ error: 'Lead proxy not configured' }, 501);
  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;

  // Parse a size-capped JSON body.
  let body: any;
  try {
    body = JSON.parse((await request.text()).slice(0, MAX_BODY_BYTES));
  } catch {
    return json({ error: 'Invalid request' }, 400);
  }

  const payload = body?.payload;
  if (!payload || typeof payload !== 'object') {
    return json({ error: 'Invalid request' }, 400);
  }

  // Anti-spam, re-enforced server-side (defence in depth — the client checks
  // these too, but a bot hitting this endpoint directly bypasses the client).
  if (typeof body.honeypot === 'string' && body.honeypot.trim() !== '') {
    // Pretend success so a bot can't distinguish a dropped submission.
    return json({ ok: true }, 200);
  }
  if (typeof body.elapsedMs === 'number' && body.elapsedMs >= 0 && body.elapsedMs < MIN_FILL_MS) {
    return json({ error: 'Please review your details before submitting.' }, 429);
  }

  // Turnstile verification — enforced only when a secret is configured.
  if (turnstileSecret) {
    const token = body.turnstileToken;
    if (!token || typeof token !== 'string') {
      return json({ error: 'Verification required' }, 400);
    }
    const form = new URLSearchParams({ secret: turnstileSecret, response: token });
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
    if (ip) form.set('remoteip', ip);
    try {
      const vr = await fetch(SITEVERIFY, {
        method: 'POST',
        body: form,
        signal: AbortSignal.timeout(8000),
      });
      const verify: any = await vr.json();
      if (!verify?.success) return json({ error: 'Verification failed' }, 403);
    } catch {
      return json({ error: 'Verification unavailable' }, 502);
    }
  }

  // Forward the payload server-side. The real endpoint is never in the bundle.
  try {
    const upstream = await fetch(leadEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10000),
    });
    if (!upstream.ok) return json({ error: 'Delivery failed' }, 502);
  } catch {
    return json({ error: 'Delivery failed' }, 502);
  }

  return json({ ok: true }, 200);
}
