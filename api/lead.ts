/**
 * POST /api/lead — hardened, same-origin lead pipeline.
 * Security: Phases 9, 14. CRM: Phases 2, 4-7, 11.
 *
 * Flow (a lead is only ever reported successful once the server confirms it):
 *   1. method + Origin validation (same-origin only)
 *   2. size-capped JSON parse
 *   3. server-side anti-spam re-check (honeypot + submit timing)
 *   4. schema validation + normalisation (never trust the browser)
 *   5. Cloudflare Turnstile verification (enforced only when a secret is set)
 *   6. delivery, in priority order:
 *        a. LeadOptimizer (HighLevel) — API upsert or inbound webhook
 *        b. legacy LEAD_ENDPOINT forward (Formspree/webhook), if still used
 *        c. otherwise 501 → client uses its direct fallback
 *   7. on delivery failure: best-effort backup sink, then return an error so the
 *      UI shows a retry (NEVER a false success) — Phase 11.
 *   8. best-effort operator notification webhook (Slack/email) — Phase 6.
 *
 * INERT BY DEFAULT: with no CRM/endpoint configured this returns 501 and the
 * client keeps its existing direct path, so the form never breaks.
 *
 * SERVER-ONLY env (Vercel → Settings → Environment Variables, NO VITE_ prefix):
 *   LEADOPTIMIZER_PIT_TOKEN / LEADOPTIMIZER_LOCATION_ID  — HighLevel API v2 mode
 *   LEADOPTIMIZER_WEBHOOK_URL                            — inbound-webhook mode
 *   TURNSTILE_SECRET_KEY   — Cloudflare Turnstile secret (enables verification)
 *   LEAD_ENDPOINT          — optional legacy forward target
 *   LEAD_BACKUP_WEBHOOK_URL — optional failure sink so leads are never lost
 *   LEAD_NOTIFY_WEBHOOK_URL — optional Slack/email notification on success
 */

import { validateLead } from './_lib/leadModel';
import { deliverToLeadOptimizer, leadOptimizerConfigured } from './_lib/leadoptimizer';
import type { NormalizedLead } from './_lib/leadModel';

export const config = { runtime: 'edge' };

const SITEVERIFY = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
const MAX_BODY_BYTES = 64 * 1024;
const MIN_FILL_MS = 2500;

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

/** Best-effort side channel (backup / notify). Never throws, never blocks long. */
async function tryPost(url: string | undefined, body: unknown): Promise<void> {
  if (!url) return;
  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(6000),
    });
  } catch {
    /* side channels must never affect the primary response */
  }
}

/** Compact, low-PII notification for the sales team (Phase 6). */
function notification(lead: NormalizedLead) {
  return {
    text:
      `New ${lead.leadType} lead: ${lead.fullName} (${lead.phone})` +
      (lead.productInterest.length ? ` — ${lead.productInterest.join(', ')}` : '') +
      (lead.attribution.utmCampaign ? ` [${lead.attribution.utmCampaign}]` : ''),
    leadType: lead.leadType,
    name: lead.fullName,
    phone: lead.phone,
    email: lead.email,
    productInterest: lead.productInterest,
    section: lead.sourceSection,
    utmCampaign: lead.attribution.utmCampaign,
    submittedAt: lead.createdAt,
    leadId: lead.leadId,
  };
}

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== 'POST') return json({ error: 'Method Not Allowed' }, 405);

  // Origin validation — same-origin front-end only.
  const origin = request.headers.get('origin');
  const host = request.headers.get('host');
  if (origin && host) {
    try {
      if (new URL(origin).host !== host) return json({ error: 'Forbidden' }, 403);
    } catch {
      return json({ error: 'Forbidden' }, 403);
    }
  }

  // Parse a size-capped JSON body.
  let body: any;
  try {
    body = JSON.parse((await request.text()).slice(0, MAX_BODY_BYTES));
  } catch {
    return json({ error: 'Invalid request' }, 400);
  }

  // Anti-spam, re-enforced server-side (defence in depth).
  if (typeof body.honeypot === 'string' && body.honeypot.trim() !== '') {
    // Pretend success so a bot can't distinguish a dropped submission.
    return json({ ok: true }, 200);
  }
  if (typeof body.elapsedMs === 'number' && body.elapsedMs >= 0 && body.elapsedMs < MIN_FILL_MS) {
    return json({ error: 'Please review your details before submitting.' }, 429);
  }

  // Schema validation + normalisation.
  const result = validateLead(body?.payload);
  if (!result.ok || !result.lead) {
    return json({ error: 'Validation failed', fields: result.errors }, 422);
  }
  const lead = result.lead;

  // Turnstile verification — enforced only when a secret is configured.
  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
  if (turnstileSecret) {
    const token = body.turnstileToken;
    if (!token || typeof token !== 'string') return json({ error: 'Verification required' }, 400);
    const form = new URLSearchParams({ secret: turnstileSecret, response: token });
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
    if (ip) form.set('remoteip', ip);
    try {
      const vr = await fetch(SITEVERIFY, { method: 'POST', body: form, signal: AbortSignal.timeout(8000) });
      const verify: any = await vr.json();
      if (!verify?.success) return json({ error: 'Verification failed' }, 403);
    } catch {
      return json({ error: 'Verification unavailable' }, 502);
    }
  }

  // ---- Delivery -----------------------------------------------------------
  const legacyEndpoint = process.env.LEAD_ENDPOINT;

  // (a) LeadOptimizer, if configured.
  if (leadOptimizerConfigured()) {
    const delivery = await deliverToLeadOptimizer(lead);
    if (delivery.ok) {
      await tryPost(process.env.LEAD_NOTIFY_WEBHOOK_URL, notification(lead));
      return json({ ok: true, leadId: lead.leadId, crmId: delivery.id, mode: delivery.mode }, 200);
    }
    // Delivery failed after retries — do not lose the lead, do not fake success.
    await tryPost(process.env.LEAD_BACKUP_WEBHOOK_URL, { reason: delivery.error, lead });
    return json({ error: 'Delivery failed', leadId: lead.leadId }, 502);
  }

  // (b) Legacy forward target (kept for continuity with the prior setup).
  if (legacyEndpoint) {
    try {
      const upstream = await fetch(legacyEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...lead }),
        signal: AbortSignal.timeout(10000),
      });
      if (!upstream.ok) {
        await tryPost(process.env.LEAD_BACKUP_WEBHOOK_URL, { reason: `endpoint ${upstream.status}`, lead });
        return json({ error: 'Delivery failed', leadId: lead.leadId }, 502);
      }
    } catch {
      await tryPost(process.env.LEAD_BACKUP_WEBHOOK_URL, { reason: 'endpoint unreachable', lead });
      return json({ error: 'Delivery failed', leadId: lead.leadId }, 502);
    }
    await tryPost(process.env.LEAD_NOTIFY_WEBHOOK_URL, notification(lead));
    return json({ ok: true, leadId: lead.leadId, mode: 'legacy' }, 200);
  }

  // (c) Nothing configured — client uses its direct fallback.
  return json({ error: 'Lead pipeline not configured' }, 501);
}
