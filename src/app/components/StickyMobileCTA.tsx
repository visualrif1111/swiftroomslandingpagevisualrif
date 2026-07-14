import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle } from 'lucide-react';

const WHATSAPP_HREF =
  'https://wa.me/971505269149?text=Hi%20Swiftrooms%2C%20I%27d%20like%20to%20speak%20with%20an%20expert%20about%20windows%2C%20doors%20or%20a%20glass%20room%20for%20my%20villa.';

/**
 * Mobile-only sticky bottom CTA bar.
 * Primary: Get Free Quote (opens the multi-step lead form).
 * Secondary: WhatsApp Expert.
 * Appears once the user scrolls past the hero, and hides while the
 * lead form section is in view so it never overlaps the form controls.
 */
export function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);
  const visibleRef = useRef(false);

  useEffect(() => {
    const scrollContainer = (document.getElementById('app-scroll') || document.querySelector('.overflow-y-scroll')) as HTMLElement | null;
    const target = scrollContainer || window;

    const getScrollTop = () =>
      scrollContainer ? scrollContainer.scrollTop : window.scrollY;

    const isFormInView = () => {
      const form = document.getElementById('contact-form');
      if (!form) return false;
      const rect = form.getBoundingClientRect();
      // Treat the form as "in view" when a meaningful part of it is on screen
      return rect.top < window.innerHeight * 0.85 && rect.bottom > window.innerHeight * 0.15;
    };

    let lastScroll = getScrollTop();
    let ticking = false;

    const evaluate = () => {
      ticking = false;
      const current = getScrollTop();
      const delta = current - lastScroll;
      const scrolledPastHero = current > window.innerHeight * 0.6;

      // Scroll-direction aware: reveal on scroll up, hide on a deliberate
      // scroll down (ignore tiny jitters). Always hidden over the hero and
      // while the lead form is in view so it never covers form controls.
      let next = visibleRef.current;
      if (!scrolledPastHero || isFormInView()) {
        next = false;
      } else if (delta < -6) {
        next = true; // scrolling up
      } else if (delta > 6) {
        next = false; // scrolling down
      }

      // Reset lastScroll only on a meaningful move to keep direction stable.
      if (Math.abs(delta) > 6) lastScroll = current;

      if (next !== visibleRef.current) {
        visibleRef.current = next;
        setVisible(next);
      }
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(evaluate);
      }
    };

    evaluate();
    target.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      target.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const handleQuote = () => {
    const formSection = document.getElementById('contact-form');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout(() => {
        window.dispatchEvent(new Event('openLeadForm'));
      }, 500);
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'tween', duration: 0.25, ease: 'easeOut' }}
          className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]"
          style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
        >
          <div className="flex items-stretch gap-2 px-3 py-2.5">
            {/* Primary CTA - Get Free Quote (dominant) */}
            <button
              onClick={handleQuote}
              className="btn-brand flex-[2] shadow-lg !px-3 min-h-11 whitespace-nowrap"
            >
              Get Free Quote
            </button>

            {/* Secondary CTA - WhatsApp Expert. Label collapses to icon-only on
                the narrowest phones (<380px) so it never clips. */}
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp flex-1 !px-3 min-h-11 whitespace-nowrap"
              aria-label="Message a WhatsApp expert"
            >
              <MessageCircle className="w-4 h-4 shrink-0" />
              <span className="hidden min-[380px]:inline">WhatsApp</span>
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
