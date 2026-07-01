import { useEffect, RefObject } from 'react';

/**
 * Horizontal carousel panning for touch devices.
 *
 * A horizontal swipe pans the referenced carousel (with momentum). Vertical
 * swipes are intentionally NOT handled here — they fall through to the
 * browser's native scrolling so the page scrolls naturally on mobile (no
 * custom pan resistance or section-snap "pan scroll").
 */
export function useMultiAxisScroll(ref: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let startX = 0;
    let startY = 0;
    let lastX = 0;
    let velX = 0;
    let lastTime = 0;
    let rafId = 0;
    let activeDirection: 'horizontal' | 'vertical' | null = null;

    // Sensitivity controls
    const DIRECTION_THRESHOLD = 20; // px - initial movement required
    const HORIZONTAL_BIAS = 1.8; // horizontal needs to be 1.8x stronger than vertical

    const onTouchStart = (e: TouchEvent) => {
      cancelAnimationFrame(rafId);
      const t = e.touches[0];
      startX = lastX = t.clientX;
      startY = t.clientY;
      velX = 0;
      activeDirection = null;
      lastTime = Date.now();
    };

    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      const now = Date.now();
      const dt = Math.max(now - lastTime, 1);

      const dx = lastX - t.clientX;

      // Cumulative movement from start
      const totalDx = Math.abs(t.clientX - startX);
      const totalDy = Math.abs(t.clientY - startY);

      // Lock direction once past the threshold. Only a clearly-horizontal swipe
      // is captured for the carousel; anything else stays vertical/native.
      if (activeDirection === null && (totalDx > DIRECTION_THRESHOLD || totalDy > DIRECTION_THRESHOLD)) {
        activeDirection = totalDx > totalDy * HORIZONTAL_BIAS ? 'horizontal' : 'vertical';
      }

      velX = dx / dt;

      // Horizontal moves drive the carousel. Vertical moves are left entirely to
      // native scrolling — no preventDefault, no custom pan or section-snap.
      if (activeDirection === 'horizontal') {
        e.preventDefault();
        el.scrollLeft += dx;
      }

      lastX = t.clientX;
      lastTime = now;
    };

    const onTouchEnd = () => {
      // Momentum for the carousel only; vertical scrolling is native.
      if (activeDirection === 'horizontal') {
        let vx = velX * 16;
        const decay = 0.92;

        const momentumX = () => {
          if (Math.abs(vx) < 0.3) return;
          el.scrollLeft += vx;
          vx *= decay;
          rafId = requestAnimationFrame(momentumX);
        };

        rafId = requestAnimationFrame(momentumX);
      }

      activeDirection = null;
    };

    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchmove', onTouchMove, { passive: false });
    el.addEventListener('touchend', onTouchEnd, { passive: true });

    return () => {
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchmove', onTouchMove);
      el.removeEventListener('touchend', onTouchEnd);
      cancelAnimationFrame(rafId);
    };
  }, [ref]);
}
