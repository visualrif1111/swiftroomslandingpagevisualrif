/**
 * Lead attribution capture (LeadOptimizer integration — Phase 3).
 *
 * Captures marketing/source attribution ONCE per browser session and persists
 * it so it can be attached to any lead the visitor later submits — even if they
 * navigate around the single-page site or open the form minutes later. This is
 * what lets LeadOptimizer report which campaign / section / device produced the
 * highest-quality leads.
 *
 * DESIGN
 * ------
 * - First-touch wins: the original UTM/referrer/landing page is stored on the
 *   first page view and is NEVER overwritten by a later empty value. This keeps
 *   the campaign source stable across the session (brief Phase 3 / §8).
 * - Session-scoped: stored in sessionStorage so it resets on a genuinely new
 *   visit but survives in-session navigation. No PII is stored here.
 * - Fail-safe: every storage/`navigator` access is guarded; on any error we
 *   degrade to an in-memory snapshot so a locked-down browser never breaks the
 *   form or the page.
 */

const STORAGE_KEY = 'swiftrooms-attribution';

export interface Attribution {
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmTerm: string;
  utmContent: string;
  gclid: string; // Google Ads click id (bonus, useful for offline conversion import)
  fbclid: string; // Meta click id
  referrer: string;
  landingPage: string;
  deviceType: 'mobile' | 'tablet' | 'desktop';
  browser: string;
  sessionId: string;
  firstSeenAt: string;
}

const EMPTY: Attribution = {
  utmSource: '',
  utmMedium: '',
  utmCampaign: '',
  utmTerm: '',
  utmContent: '',
  gclid: '',
  fbclid: '',
  referrer: '',
  landingPage: '',
  deviceType: 'desktop',
  browser: '',
  sessionId: '',
  firstSeenAt: '',
};

let memo: Attribution | null = null;

function detectDevice(): Attribution['deviceType'] {
  try {
    const ua = navigator.userAgent || '';
    const w = window.innerWidth || 1024;
    if (/iPad|Tablet|PlayBook|Silk|(Android(?!.*Mobile))/i.test(ua)) return 'tablet';
    if (/Mobi|Android|iPhone|iPod|Windows Phone/i.test(ua) || w < 768) return 'mobile';
    if (w < 1024) return 'tablet';
    return 'desktop';
  } catch {
    return 'desktop';
  }
}

function detectBrowser(): string {
  try {
    const ua = navigator.userAgent || '';
    if (/Edg\//i.test(ua)) return 'Edge';
    if (/SamsungBrowser/i.test(ua)) return 'Samsung Internet';
    if (/OPR\/|Opera/i.test(ua)) return 'Opera';
    if (/Firefox\//i.test(ua)) return 'Firefox';
    if (/Chrome\//i.test(ua)) return 'Chrome';
    if (/Safari\//i.test(ua)) return 'Safari';
    return 'Other';
  } catch {
    return 'Other';
  }
}

function newSessionId(): string {
  try {
    const c = (window.crypto || (window as unknown as { msCrypto?: Crypto }).msCrypto) as Crypto | undefined;
    if (c?.randomUUID) return c.randomUUID();
  } catch {
    /* fall through */
  }
  // Fallback: timestamp + random, adequate for a client-side correlation id.
  return `sr-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

function readStored(): Attribution | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object') return { ...EMPTY, ...parsed };
  } catch {
    /* ignore malformed / blocked storage */
  }
  return null;
}

function persist(a: Attribution): void {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(a));
  } catch {
    /* storage blocked (private mode / disabled) — memo still holds it */
  }
}

/**
 * Capture (once) and return the attribution snapshot for this session.
 * Safe to call repeatedly and very early — it initialises lazily.
 */
export function getAttribution(): Attribution {
  if (memo) return memo;
  if (typeof window === 'undefined') return { ...EMPTY };

  const stored = readStored();

  let params: URLSearchParams;
  try {
    params = new URLSearchParams(window.location.search);
  } catch {
    params = new URLSearchParams();
  }
  const p = (k: string) => (params.get(k) || '').slice(0, 200).trim();

  // First-touch semantics: prefer an already-stored non-empty value; only fall
  // back to the current URL when nothing was captured before. This prevents a
  // later navigation (which usually drops the ?utm_* params) from wiping the
  // original campaign attribution.
  const keep = (current: string, prior: string | undefined) => prior && prior.length > 0 ? prior : current;

  const attribution: Attribution = {
    utmSource: keep(p('utm_source'), stored?.utmSource),
    utmMedium: keep(p('utm_medium'), stored?.utmMedium),
    utmCampaign: keep(p('utm_campaign'), stored?.utmCampaign),
    utmTerm: keep(p('utm_term'), stored?.utmTerm),
    utmContent: keep(p('utm_content'), stored?.utmContent),
    gclid: keep(p('gclid'), stored?.gclid),
    fbclid: keep(p('fbclid'), stored?.fbclid),
    referrer: stored?.referrer || (() => { try { return (document.referrer || '').slice(0, 300); } catch { return ''; } })(),
    landingPage: stored?.landingPage || (() => { try { return (window.location.pathname + window.location.search).slice(0, 300); } catch { return ''; } })(),
    deviceType: stored?.deviceType || detectDevice(),
    browser: stored?.browser || detectBrowser(),
    sessionId: stored?.sessionId || newSessionId(),
    firstSeenAt: stored?.firstSeenAt || new Date().toISOString(),
  };

  memo = attribution;
  persist(attribution);
  return attribution;
}

/** Convenience: current page path at call time (not the first landing page). */
export function currentPage(): string {
  try {
    return (window.location.pathname + window.location.search).slice(0, 300);
  } catch {
    return '';
  }
}
