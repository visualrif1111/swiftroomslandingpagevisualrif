/**
 * Cloudflare Turnstile — client helper (Phase 6, bot protection).
 *
 * Fully optional and inert until `VITE_TURNSTILE_SITE_KEY` is set: if there's
 * no site key, `turnstileEnabled` is false, no third-party script is ever
 * loaded, and the lead form keeps its existing behaviour. When enabled, the
 * script is lazy-loaded on demand and a token is minted per submission via an
 * invisible, one-off widget — no persistent UI, so the form's design/UX is
 * unchanged.
 *
 * The token is verified server-side in `api/lead.ts` (siteverify). The secret
 * key lives only on the server; only the *public* site key is used here.
 */

const SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY as string | undefined;
const SCRIPT_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
const TOKEN_TIMEOUT_MS = 15000;

/** True only when a public site key is configured. */
export const turnstileEnabled = Boolean(SITE_KEY);

type TurnstileApi = {
  render: (el: HTMLElement, opts: Record<string, unknown>) => string;
  execute: (id: string) => void;
  remove: (id: string) => void;
};

function getApi(): TurnstileApi | undefined {
  return (window as unknown as { turnstile?: TurnstileApi }).turnstile;
}

let scriptPromise: Promise<void> | null = null;

function loadScript(): Promise<void> {
  if (typeof window === 'undefined') return Promise.reject(new Error('no window'));
  if (getApi()) return Promise.resolve();
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise<void>((resolve, reject) => {
    const s = document.createElement('script');
    s.src = SCRIPT_SRC;
    s.async = true;
    s.defer = true;
    s.onload = () => resolve();
    s.onerror = () => {
      scriptPromise = null; // allow a retry on the next submit
      reject(new Error('Turnstile script failed to load'));
    };
    document.head.appendChild(s);
  });
  return scriptPromise;
}

/**
 * Mint a fresh Turnstile token. Renders a hidden, invisible one-off widget,
 * resolves with the token, and always cleans the widget up. Rejects on
 * error/timeout so the caller can surface a retry message rather than silently
 * submit unverified.
 */
export async function getTurnstileToken(): Promise<string> {
  if (!SITE_KEY) throw new Error('Turnstile is not configured');
  await loadScript();
  const api = getApi();
  if (!api) throw new Error('Turnstile is unavailable');

  const container = document.createElement('div');
  container.style.display = 'none';
  document.body.appendChild(container);

  return new Promise<string>((resolve, reject) => {
    let widgetId: string | undefined;
    let settled = false;

    const cleanup = () => {
      try {
        if (widgetId) api.remove(widgetId);
      } catch {
        /* widget already gone */
      }
      container.remove();
    };
    const finish = (fn: () => void) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      cleanup();
      fn();
    };
    const timer = setTimeout(
      () => finish(() => reject(new Error('Turnstile timed out'))),
      TOKEN_TIMEOUT_MS,
    );

    try {
      widgetId = api.render(container, {
        sitekey: SITE_KEY,
        size: 'invisible',
        callback: (token: string) => finish(() => resolve(token)),
        'error-callback': () => finish(() => reject(new Error('Turnstile error'))),
        'timeout-callback': () => finish(() => reject(new Error('Turnstile timed out'))),
      });
      api.execute(widgetId);
    } catch (err) {
      finish(() => reject(err instanceof Error ? err : new Error('Turnstile failed')));
    }
  });
}
