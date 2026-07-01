import { useEffect, useState } from 'react';
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

  useEffect(() => {
    const scrollContainer = document.querySelector('.overflow-y-scroll.h-screen') as HTMLElement | null;
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

    const update = () => {
      const scrolledPastHero = getScrollTop() > window.innerHeight * 0.6;
      setVisible(scrolledPastHero && !isFormInView());
    };

    update();
    target.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    return () => {
      target.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
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
              className="flex-[2] bg-[#008873] text-white rounded-xl py-3.5 font-['Rajdhani',sans-serif] text-base font-bold shadow-lg active:scale-[0.98] transition-transform"
            >
              Get Free Quote
            </button>

            {/* Secondary CTA - WhatsApp Expert */}
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 bg-white text-[#25D366] border-2 border-[#25D366] rounded-xl py-3.5 font-['Rajdhani',sans-serif] text-sm font-semibold active:scale-[0.98] transition-transform"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
