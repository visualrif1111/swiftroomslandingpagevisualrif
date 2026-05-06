import { useEffect, RefObject } from 'react';

/**
 * Swipe-based section navigation with fold locking.
 *
 * Features:
 * - One swipe = navigate to next/previous section
 * - Locks into section after swipe completes
 * - Horizontal carousel scrolling within locked sections
 * - Clean, paginated vertical navigation
 */
function findScrollParent(node: Element | null): Element {
  if (!node || node === document.documentElement) return document.documentElement;
  const { overflowY } = window.getComputedStyle(node);
  if ((overflowY === 'auto' || overflowY === 'scroll') && node.scrollHeight > node.clientHeight) {
    return node;
  }
  return findScrollParent(node.parentElement);
}

function getCurrentSectionIndex(scrollParent: Element): number {
  const sections = Array.from(scrollParent.querySelectorAll('section, [data-section]'));
  if (sections.length === 0) return 0;

  const scrollTop = scrollParent.scrollTop;
  const viewportHeight = window.innerHeight;
  const midpoint = scrollTop + viewportHeight / 2;

  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    const rect = section.getBoundingClientRect();
    const sectionTop = scrollTop + rect.top;
    const sectionBottom = sectionTop + rect.height;

    if (midpoint >= sectionTop && midpoint < sectionBottom) {
      return i;
    }
  }

  return 0;
}

function navigateToSection(scrollParent: Element, direction: 'up' | 'down') {
  const sections = Array.from(scrollParent.querySelectorAll('section, [data-section]'));
  if (sections.length === 0) return;

  const currentIndex = getCurrentSectionIndex(scrollParent);
  let targetIndex = currentIndex;

  if (direction === 'down' && currentIndex < sections.length - 1) {
    targetIndex = currentIndex + 1;
  } else if (direction === 'up' && currentIndex > 0) {
    targetIndex = currentIndex - 1;
  }

  const targetSection = sections[targetIndex];
  if (targetSection) {
    const rect = targetSection.getBoundingClientRect();
    const scrollTop = scrollParent.scrollTop;
    const targetScroll = scrollTop + rect.top;

    scrollParent.scrollTo({
      top: targetScroll,
      behavior: 'smooth'
    });
  }
}

export function useMultiAxisScroll(ref: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let startX = 0;
    let startY = 0;
    let lastX = 0;
    let lastY = 0;
    let velX = 0;
    let velY = 0;
    let lastTime = 0;
    let rafId = 0;
    let scrollParent: Element | null = null;
    let activeDirection: 'horizontal' | 'vertical' | null = null;

    // Sensitivity controls
    const DIRECTION_THRESHOLD = 20; // px - initial movement required
    const HORIZONTAL_BIAS = 1.8; // horizontal needs to be 1.8x stronger than vertical
    const VERTICAL_BIAS = 1.5; // vertical needs to be 1.5x stronger than horizontal

    const onTouchStart = (e: TouchEvent) => {
      cancelAnimationFrame(rafId);
      const t = e.touches[0];
      startX = lastX = t.clientX;
      startY = lastY = t.clientY;
      velX = 0;
      velY = 0;
      activeDirection = null;
      lastTime = Date.now();
      scrollParent = findScrollParent(el.parentElement);
    };

    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      const now = Date.now();
      const dt = Math.max(now - lastTime, 1);

      const dx = lastX - t.clientX;
      const dy = lastY - t.clientY;

      // Cumulative movement from start
      const totalDx = Math.abs(t.clientX - startX);
      const totalDy = Math.abs(t.clientY - startY);

      // Determine active direction if not set
      if (activeDirection === null && (totalDx > DIRECTION_THRESHOLD || totalDy > DIRECTION_THRESHOLD)) {
        if (totalDx > totalDy * HORIZONTAL_BIAS) {
          activeDirection = 'horizontal';
        } else if (totalDy > totalDx * VERTICAL_BIAS) {
          activeDirection = 'vertical';
        }
      }

      // Track velocity
      velX = dx / dt;
      velY = dy / dt;

      // Apply movement based on active direction
      if (activeDirection === 'horizontal') {
        e.preventDefault();
        el.scrollLeft += dx;
      } else if (activeDirection === 'vertical') {
        e.preventDefault();
        if (scrollParent) {
          // Apply natural scroll with subtle resistance (70% of actual movement)
          // This gives smooth feedback during swipe with gentle resistance
          scrollParent.scrollTop += dy * 0.7;
        }
      }

      lastX = t.clientX;
      lastY = t.clientY;
      lastTime = now;
    };

    const onTouchEnd = () => {
      if (activeDirection === 'horizontal') {
        // Apply horizontal momentum for carousel
        let vx = velX * 16;
        const decay = 0.92;

        const momentumX = () => {
          if (Math.abs(vx) < 0.3) return;
          el.scrollLeft += vx;
          vx *= decay;
          rafId = requestAnimationFrame(momentumX);
        };

        rafId = requestAnimationFrame(momentumX);
      } else if (activeDirection === 'vertical' && scrollParent) {
        // Gentle swipe-based section navigation
        const totalSwipeDistance = startY - lastY;
        const SWIPE_THRESHOLD = 80; // px minimum for section change (higher = more intentional)
        const swipeVelocity = Math.abs(velY);

        // Determine target section based on swipe distance or velocity
        const shouldNavigate = Math.abs(totalSwipeDistance) > SWIPE_THRESHOLD || swipeVelocity > 0.5;

        if (shouldNavigate) {
          if (totalSwipeDistance > 0) {
            // Swiped up - go to next section
            navigateToSection(scrollParent, 'down');
          } else {
            // Swiped down - go to previous section
            navigateToSection(scrollParent, 'up');
          }
        } else {
          // Gentle snap back to current section
          const sections = Array.from(scrollParent.querySelectorAll('section, [data-section]'));
          const currentIndex = getCurrentSectionIndex(scrollParent);
          const currentSection = sections[currentIndex];

          if (currentSection) {
            const rect = currentSection.getBoundingClientRect();
            const scrollTop = scrollParent.scrollTop;
            const targetScroll = scrollTop + rect.top;

            // Only snap if we're off by more than a small amount
            if (Math.abs(rect.top) > 10) {
              scrollParent.scrollTo({
                top: targetScroll,
                behavior: 'smooth'
              });
            }
          }
        }
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
