/**
 * GET /api/reviews  — secure server-side Google Places proxy (Phase 7 & 8).
 *
 * WHY THIS EXISTS
 * ---------------
 * The client-side `googleReviewsService.ts` used to be able to call the Google
 * Places API directly with `VITE_GOOGLE_PLACES_API_KEY`. Anything prefixed with
 * `VITE_` is inlined into the public JS bundle, so that key would be exposed to
 * every visitor. This edge function keeps the key server-side: the browser calls
 * same-origin `/api/reviews`, and only the server talks to Google.
 *
 * CONFIGURATION (Vercel → Project → Settings → Environment Variables):
 *   GOOGLE_PLACES_API_KEY   (NOT prefixed with VITE_ — server only)
 *   GOOGLE_PLACE_ID
 *
 * Then set `useStaticReviews: false` in googleReviewsService.ts. Until both env
 * vars are set this endpoint returns 501 and the client keeps its static
 * reviews, so the site never breaks. Responses are edge-cached for 1 hour to
 * stay well within Google's rate limits.
 */

export const config = { runtime: 'edge' };

const GOOGLE_ENDPOINT = 'https://maps.googleapis.com/maps/api/place/details/json';

interface GoogleReview {
  author_name: string;
  rating: number;
  text: string;
  relative_time_description?: string;
  profile_photo_url?: string;
  time?: number;
}

function json(body: unknown, status: number, cache = false): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': cache
        ? 'public, s-maxage=3600, stale-while-revalidate=86400'
        : 'no-store',
      // Same-origin only — this endpoint is for our own frontend.
      'x-content-type-options': 'nosniff',
    },
  });
}

export default async function handler(request: Request): Promise<Response> {
  // Only GET is meaningful here.
  if (request.method !== 'GET') {
    return json({ error: 'Method Not Allowed' }, 405);
  }

  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  // Not configured yet → tell the client to fall back to static reviews.
  if (!apiKey || !placeId) {
    return json({ error: 'Reviews proxy not configured' }, 501);
  }

  try {
    const params = new URLSearchParams({
      place_id: placeId,
      fields: 'name,rating,reviews,user_ratings_total',
      key: apiKey,
    });

    const upstream = await fetch(`${GOOGLE_ENDPOINT}?${params.toString()}`, {
      // Guard against a slow/hanging upstream.
      signal: AbortSignal.timeout(8000),
    });

    if (!upstream.ok) {
      return json({ error: 'Upstream error' }, 502);
    }

    const data = await upstream.json();
    if (data.status !== 'OK' || !data.result) {
      return json({ error: 'No reviews available' }, 502);
    }

    const result = data.result;
    const reviews = (result.reviews || []).map((r: GoogleReview, i: number) => ({
      id: `google-${r.time ?? i}`,
      author: r.author_name,
      rating: r.rating,
      date: r.relative_time_description ?? 'Recently',
      text: r.text,
      platform: 'Google' as const,
      authorPhotoUrl: r.profile_photo_url,
      relativeTimeDescription: r.relative_time_description,
    }));

    return json(
      {
        reviews,
        averageRating: result.rating ?? 5.0,
        totalReviews: result.user_ratings_total ?? reviews.length,
      },
      200,
      true,
    );
  } catch {
    // Never leak internals in the error body.
    return json({ error: 'Failed to fetch reviews' }, 500);
  }
}
