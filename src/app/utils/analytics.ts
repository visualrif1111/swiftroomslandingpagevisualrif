/**
 * Conversion analytics event layer (Phase 8).
 *
 * A single, provider-agnostic `track()` that every CTA / form / contact-link in
 * the app calls. It is DORMANT by design:
 *   - It always pushes a structured event onto `window.dataLayer` (the Google
 *     Tag Manager contract) — inert until a GTM container is actually loaded.
 *   - It forwards to `gtag()` (GA4 / Google Ads) and `fbq()` (Meta Pixel) ONLY
 *     if those globals exist, so nothing fires until you add the tag.
 * No external script is loaded here and the site's strict CSP is untouched.
 * Drop in a GTM/GA4/Meta ID later and every event below starts flowing with
 * zero code changes.
 *
 * PRIVACY (Phase 8 / §19)
 * -----------------------
 * - Analytics is kept SEPARATE from CRM records: only fire non-PII properties
 *   here (labels, sections, lead type, product interest, UTM). Never pass
 *   name / phone / email into `track()`.
 * - Marketing/analytics destinations (gtag/fbq) fire only when the visitor has
 *   granted the matching cookie consent. The first-party dataLayer push is
 *   allowed regardless (it carries no PII and goes nowhere until GTM loads).
 * - One-shot conversion events are de-duplicated per session so a double-tap or
 *   a component re-render can't inflate conversions.
 */

import { getAttribution, currentPage } from './attribution';

export type AnalyticsEvent =
  | 'cta_click'
  | 'quote_form_open'
  | 'quote_form_start'
  | 'quote_form_step_complete'
  | 'quote_form_submit'
  | 'quote_form_success'
  | 'quote_form_error'
  | 'showroom_form_open'
  | 'showroom_form_submit'
  | 'showroom_booking_success'
  | 'whatsapp_click'
  | 'phone_click'
  | 'email_click'
  | 'lead_magnet_request'
  | 'lead_magnet_download'
  | 'lead_created_in_crm';

export interface TrackProps {
  /** Human label of the control, e.g. "Get Free Quote". */
  ctaLabel?: string;
  /** Where on the page it lives, e.g. "navigation", "hero", "sticky-mobile". */
  location?: string;
  /** Page section id the interaction relates to. */
  section?: string;
  /** 'quote' | 'showroom' | 'product' | 'contact' | 'lead-magnet'. */
  leadType?: string;
  /** Product(s) of interest when known. */
  productInterest?: string;
  /** Free-form, non-PII detail (e.g. destination "whatsapp"). */
  detail?: string;
  /** Allow additional non-PII scalar props. */
  [key: string]: string | number | boolean | undefined | string[];
}

interface ConsentState {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

// One-shot events that must fire at most once per session.
const oneShot = new Set<AnalyticsEvent>([
  'quote_form_success',
  'showroom_booking_success',
  'lead_created_in_crm',
]);
const fired = new Set<string>();

function readConsent(): ConsentState {
  // Absent choice → treat analytics/marketing as not granted (privacy-first).
  const fallback: ConsentState = { necessary: true, analytics: false, marketing: false };
  try {
    const raw = localStorage.getItem('swiftrooms-cookie-consent');
    if (!raw) return fallback;
    const c = JSON.parse(raw);
    return {
      necessary: true,
      analytics: Boolean(c?.analytics),
      marketing: Boolean(c?.marketing),
    };
  } catch {
    return fallback;
  }
}

function ensureDataLayer(): Record<string, unknown>[] {
  if (!window.dataLayer) window.dataLayer = [];
  return window.dataLayer;
}

/**
 * Fire a conversion/interaction event. Non-blocking and never throws — a
 * tracking failure must never interrupt a click or a form submission.
 */
export function track(event: AnalyticsEvent, props: TrackProps = {}): void {
  try {
    if (typeof window === 'undefined') return;

    // One-shot conversion events fire at most once per session; all other
    // events (clicks, funnel steps) may legitimately repeat.
    if (oneShot.has(event)) {
      if (fired.has(event)) return;
      fired.add(event);
    }

    const attribution = getAttribution();
    const payload = {
      event,
      ...props,
      page: currentPage(),
      device_type: attribution.deviceType,
      browser: attribution.browser,
      session_id: attribution.sessionId,
      utm_source: attribution.utmSource || undefined,
      utm_medium: attribution.utmMedium || undefined,
      utm_campaign: attribution.utmCampaign || undefined,
      utm_term: attribution.utmTerm || undefined,
      utm_content: attribution.utmContent || undefined,
      ts: new Date().toISOString(),
    };

    // 1) First-party dataLayer — always safe (no PII, inert without GTM).
    ensureDataLayer().push(payload);

    const consent = readConsent();

    // 2) GA4 / Google Ads (gtag) — only with analytics consent, only if loaded.
    if (consent.analytics && typeof window.gtag === 'function') {
      window.gtag('event', event, payload);
    }

    // 3) Meta Pixel (fbq) — only with marketing consent, only if loaded.
    if (consent.marketing && typeof window.fbq === 'function') {
      // Map our lead events onto Meta's standard events where it helps ads.
      const isLead =
        event === 'quote_form_success' ||
        event === 'showroom_booking_success' ||
        event === 'lead_created_in_crm';
      window.fbq('trackCustom', event, props as Record<string, unknown>);
      if (isLead) window.fbq('track', 'Lead', { content_name: props.leadType || 'lead' });
    }
  } catch {
    /* analytics must never break the UX */
  }
}

/** Reset one-shot guards (used only by the form when starting a fresh enquiry). */
export function resetConversionGuards(): void {
  fired.delete('quote_form_success');
  fired.delete('showroom_booking_success');
  fired.delete('lead_created_in_crm');
}
