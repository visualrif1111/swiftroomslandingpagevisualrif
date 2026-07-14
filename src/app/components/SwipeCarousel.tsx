import { useRef, useState, useCallback, type ReactNode } from 'react';

interface SwipeCarouselProps {
  /** One card per item. Each is wrapped in a snap-aligned, fixed-width slide. */
  items: ReactNode[];
  /** Tailwind width classes for each slide. */
  slideClassName?: string;
  /** Accessible label for the scroll region. */
  ariaLabel?: string;
}

/**
 * Native scroll-snap horizontal carousel for mobile. Uses real overflow
 * scrolling (no transform track, no scroll hijacking) so vertical page
 * scrolling stays smooth and swiping never freezes. Renders brand pagination
 * dots that track the centered slide and support tap-to-jump.
 */
export function SwipeCarousel({
  items,
  slideClassName = 'w-[82vw] max-w-[330px]',
  ariaLabel,
}: SwipeCarouselProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const rafRef = useRef<number | null>(null);

  const handleScroll = useCallback(() => {
    if (rafRef.current !== null) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      const el = scrollerRef.current;
      if (!el) return;
      const viewportCenter = el.getBoundingClientRect().left + el.clientWidth / 2;
      const cards = el.querySelectorAll<HTMLElement>('[data-card]');
      let closest = 0;
      let min = Infinity;
      cards.forEach((card, i) => {
        const rect = card.getBoundingClientRect();
        const dist = Math.abs(rect.left + rect.width / 2 - viewportCenter);
        if (dist < min) {
          min = dist;
          closest = i;
        }
      });
      setActive(closest);
    });
  }, []);

  const scrollToIndex = (i: number) => {
    scrollerRef.current
      ?.querySelectorAll<HTMLElement>('[data-card]')
      [i]?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  };

  return (
    <div>
      <div
        ref={scrollerRef}
        onScroll={handleScroll}
        aria-label={ariaLabel}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-1 pb-5 [-ms-overflow-style:none] [scrollbar-width:none]"
        style={{ WebkitOverflowScrolling: 'touch', scrollPaddingInline: '1rem' }}
      >
        {items.map((item, i) => (
          <div key={i} data-card className={`snap-center shrink-0 ${slideClassName}`}>
            {item}
          </div>
        ))}
      </div>

      {/* Pagination dots — tap to jump */}
      <div className="flex items-center justify-center gap-1.5">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToIndex(i)}
            aria-label={`Go to item ${i + 1}`}
            className="flex h-11 items-center justify-center px-0.5"
          >
            <span
              className={`block rounded-full transition-all duration-300 ${
                active === i ? 'h-1.5 w-6 bg-[#007969]' : 'h-1.5 w-1.5 bg-gray-300'
              }`}
            />
          </button>
        ))}
      </div>

      <p className="mt-1 text-center font-body text-xs text-gray-400">← Swipe to browse →</p>
    </div>
  );
}
