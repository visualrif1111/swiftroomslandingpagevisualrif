/**
 * LeadOptimizer (GoHighLevel / HighLevel white-label) delivery adapter.
 * Phases 2, 4, 5, 6, 7, 11.
 *
 * Dual-mode, and INERT until a credential is configured (parity with the rest
 * of this repo's server functions — nothing breaks before setup):
 *
 *   1. LEADOPTIMIZER_PIT_TOKEN + LEADOPTIMIZER_LOCATION_ID
 *        → HighLevel API v2: upsert the contact (dedupes by email/phone within
 *          the location, satisfying Phase 7), tag it for pipeline/workflow
 *          routing, and attach a structured note with the full enquiry +
 *          attribution so nothing is lost even before custom fields exist.
 *   2. LEADOPTIMIZER_WEBHOOK_URL (Inbound Webhook trigger on a workflow)
 *        → POST the whole normalised lead as flat JSON; the workflow creates the
 *          contact, assigns the pipeline, dedupes and notifies.
 *   3. neither set → { ok:false, status:501 } (caller falls back / retries).
 *
 * Routing is driven by TAGS, which is the idiomatic HighLevel pattern: the
 * operator builds a workflow per tag ("type:quote" → Quote pipeline + notify,
 * "type:showroom" → Showroom pipeline, etc.). See SECURITY_RUNBOOK / the
 * integration doc for the exact tag list.
 *
 * No secret is ever sent to the browser — this module only runs server-side.
 */

import type { NormalizedLead } from './leadModel';
import { splitName } from './leadModel';

const DEFAULT_API_BASE = 'https://services.leadconnectorhq.com';
const DEFAULT_API_VERSION = '2021-07-28';
const UPSTREAM_TIMEOUT_MS = 10000;
const MAX_ATTEMPTS = 3;

export interface DeliveryResult {
  ok: boolean;
  mode: 'api' | 'webhook' | 'none';
  status: number;
  id?: string;
  error?: string;
}

function slug(v: string): string {
  return v.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '').slice(0, 40);
}

/** Tags that drive LeadOptimizer pipeline routing + workflow automation. */
export function tagsFor(lead: NormalizedLead): string[] {
  const tags = new Set<string>(['website-lead', `type:${lead.leadType}`]);
  for (const p of lead.productInterest) {
    const t = slug(p);
    if (t) tags.add(`product:${t}`);
  }
  if (lead.attribution.utmCampaign) tags.add(`campaign:${slug(lead.attribution.utmCampaign)}`);
  if (lead.attribution.utmSource) tags.add(`source:${slug(lead.attribution.utmSource)}`);
  return Array.from(tags);
}

/** Human-readable enquiry + attribution summary, stored as a contact note. */
export function noteFor(lead: NormalizedLead): string {
  const a = lead.attribution;
  const lines = [
    `New ${lead.leadType} enquiry from the Swift Rooms website`,
    `Lead ID: ${lead.leadId}`,
    `Submitted: ${lead.createdAt}`,
    '',
    `Name: ${lead.fullName}`,
    `Phone: ${lead.phone}`,
    lead.email ? `Email: ${lead.email}` : '',
    lead.productInterest.length ? `Product interest: ${lead.productInterest.join(', ')}` : '',
    lead.propertyType ? `Property type: ${lead.propertyType}` : '',
    lead.projectType ? `Build stage: ${lead.projectType}` : '',
    lead.siteLocation ? `Site location: ${lead.siteLocation}` : '',
    lead.timeline ? `Timeline: ${lead.timeline}` : '',
    lead.budgetRange ? `Budget: ${lead.budgetRange}` : '',
    lead.leadType === 'showroom' && lead.showroomDate ? `Preferred date: ${lead.showroomDate}` : '',
    lead.leadType === 'showroom' && lead.showroomTime ? `Preferred time: ${lead.showroomTime}` : '',
    lead.leadType === 'showroom' && lead.visitorCount ? `Visitors: ${lead.visitorCount}` : '',
    lead.fileNames.length ? `Attachments: ${lead.fileNames.join(', ')}` : '',
    lead.message ? `Message: ${lead.message}` : '',
    '',
    '--- Attribution ---',
    a.utmSource ? `UTM source: ${a.utmSource}` : '',
    a.utmMedium ? `UTM medium: ${a.utmMedium}` : '',
    a.utmCampaign ? `UTM campaign: ${a.utmCampaign}` : '',
    a.utmTerm ? `UTM term: ${a.utmTerm}` : '',
    a.utmContent ? `UTM content: ${a.utmContent}` : '',
    a.gclid ? `gclid: ${a.gclid}` : '',
    a.fbclid ? `fbclid: ${a.fbclid}` : '',
    lead.sourceSection ? `Section: ${lead.sourceSection}` : '',
    lead.ctaLabel ? `CTA: ${lead.ctaLabel}` : '',
    a.referrer ? `Referrer: ${a.referrer}` : '',
    a.landingPage ? `Landing page: ${a.landingPage}` : '',
    `Device: ${a.deviceType || 'unknown'} · ${a.browser || 'unknown'}`,
    a.sessionId ? `Session: ${a.sessionId}` : '',
    `Marketing consent: ${lead.marketingConsent ? 'yes' : 'no'}`,
  ];
  return lines.filter((l) => l !== '').join('\n');
}

async function fetchWithRetry(url: string, init: RequestInit): Promise<Response> {
  let lastErr: unknown;
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      const res = await fetch(url, { ...init, signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS) });
      // Retry only on transient upstream conditions.
      if (res.status === 429 || res.status >= 500) {
        lastErr = new Error(`upstream ${res.status}`);
        if (attempt < MAX_ATTEMPTS) {
          await new Promise((r) => setTimeout(r, 300 * attempt));
          continue;
        }
      }
      return res;
    } catch (err) {
      lastErr = err;
      if (attempt < MAX_ATTEMPTS) {
        await new Promise((r) => setTimeout(r, 300 * attempt));
        continue;
      }
    }
  }
  throw lastErr instanceof Error ? lastErr : new Error('request failed');
}

function apiEnv() {
  const token = process.env.LEADOPTIMIZER_PIT_TOKEN;
  const locationId = process.env.LEADOPTIMIZER_LOCATION_ID;
  const base = process.env.LEADOPTIMIZER_API_BASE || DEFAULT_API_BASE;
  const version = process.env.LEADOPTIMIZER_API_VERSION || DEFAULT_API_VERSION;
  return { token, locationId, base, version };
}

async function deliverViaApi(lead: NormalizedLead): Promise<DeliveryResult> {
  const { token, locationId, base, version } = apiEnv();
  const { firstName, lastName } = splitName(lead.fullName);

  const headers: Record<string, string> = {
    Authorization: `Bearer ${token}`,
    Version: version,
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  // Upsert dedupes by email/phone within the location (Phase 7).
  const body = {
    locationId,
    firstName,
    lastName,
    name: lead.fullName,
    email: lead.email || undefined,
    phone: lead.phone || undefined,
    source: lead.sourceSection || 'swiftrooms-landing-page',
    tags: tagsFor(lead),
  };

  let res: Response;
  try {
    res = await fetchWithRetry(`${base}/contacts/upsert`, { method: 'POST', headers, body: JSON.stringify(body) });
  } catch {
    return { ok: false, mode: 'api', status: 502, error: 'crm unreachable' };
  }
  if (!res.ok) {
    return { ok: false, mode: 'api', status: res.status === 401 || res.status === 403 ? 502 : 502, error: `crm ${res.status}` };
  }

  // Extract the contact id (HighLevel returns { contact: { id } } or { id }).
  let contactId: string | undefined;
  try {
    const data: any = await res.json();
    contactId = data?.contact?.id || data?.id || data?.contactId;
  } catch {
    /* body parse is non-fatal — the upsert already succeeded */
  }

  // Best-effort: attach the full enquiry + attribution as a note. Never fatal —
  // if this fails the contact still exists and the lead is not lost.
  if (contactId) {
    try {
      await fetchWithRetry(`${base}/contacts/${contactId}/notes`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ body: noteFor(lead) }),
      });
    } catch {
      /* note is supplementary; ignore */
    }
  }

  return { ok: true, mode: 'api', status: 200, id: contactId };
}

async function deliverViaWebhook(lead: NormalizedLead): Promise<DeliveryResult> {
  const url = process.env.LEADOPTIMIZER_WEBHOOK_URL as string;
  const body = {
    ...lead,
    tags: tagsFor(lead),
    note: noteFor(lead),
  };
  let res: Response;
  try {
    res = await fetchWithRetry(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(body),
    });
  } catch {
    return { ok: false, mode: 'webhook', status: 502, error: 'webhook unreachable' };
  }
  if (!res.ok) return { ok: false, mode: 'webhook', status: 502, error: `webhook ${res.status}` };
  return { ok: true, mode: 'webhook', status: 200 };
}

/** True when at least one delivery mode is configured. */
export function leadOptimizerConfigured(): boolean {
  const { token, locationId } = apiEnv();
  return Boolean((token && locationId) || process.env.LEADOPTIMIZER_WEBHOOK_URL);
}

/**
 * Deliver a validated lead to LeadOptimizer. Prefers the API (richer) and falls
 * back to the inbound webhook. Returns a structured result; the caller decides
 * whether to surface success, retry, or route to the backup sink.
 */
export async function deliverToLeadOptimizer(lead: NormalizedLead): Promise<DeliveryResult> {
  const { token, locationId } = apiEnv();
  if (token && locationId) return deliverViaApi(lead);
  if (process.env.LEADOPTIMIZER_WEBHOOK_URL) return deliverViaWebhook(lead);
  return { ok: false, mode: 'none', status: 501, error: 'LeadOptimizer not configured' };
}
