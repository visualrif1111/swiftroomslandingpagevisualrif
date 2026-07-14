import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { motion } from 'motion/react';
import { useMultiAxisScroll } from '../utils/useMultiAxisScroll';
import { Gem } from 'lucide-react';

export function TransformYourSpaceSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  useMultiAxisScroll(scrollContainerRef);
  const [activeCard, setActiveCard] = useState(0);
  const isScrollingRef = useRef(false);

  const totalCards = 3;
  const cards = useMemo(() => [
    { id: 1, title: 'Performance windows & doors', desc: 'Engineered to perform. Built to outlast.', bg: '#fff7ed', border: '#ffedd5', iconBg: '#ffedd5' },
    { id: 2, title: 'Panoramic Slim Sliding Systems', desc: 'Ultra-slim profiles. Seamless design. Maximum light.', bg: '#fef2f2', border: '#fee2e2', iconBg: '#fee2e2' },
    { id: 3, title: 'Garden rooms & extensions', desc: 'Transform unused space into living space.', bg: '#eff6ff', border: '#dbeafe', iconBg: '#dbeafe' },
  ], []);

  // Create infinite loop array: [cards, cards, cards]
  const infiniteCards = useMemo(() => [...cards, ...cards, ...cards], [cards]);

  // Initialize scroll position to middle set - deferred to idle time
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const idleCallback = 'requestIdleCallback' in window
      ? window.requestIdleCallback(() => {
          const slideWidth = container.offsetWidth;
          const initialPosition = totalCards * slideWidth;
          container.scrollLeft = initialPosition;
        })
      : window.setTimeout(() => {
          const slideWidth = container.offsetWidth;
          const initialPosition = totalCards * slideWidth;
          container.scrollLeft = initialPosition;
        }, 100);

    return () => {
      if ('cancelIdleCallback' in window) {
        window.cancelIdleCallback(idleCallback);
      } else {
        clearTimeout(idleCallback);
      }
    };
  }, [totalCards]);

  // Track scroll position for active card indicator and handle infinite loop
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let scrollTimeout: number;

    const handleScroll = () => {
      if (isScrollingRef.current) return;

      // Debounce scroll handling
      clearTimeout(scrollTimeout as unknown as NodeJS.Timeout);
      scrollTimeout = setTimeout(() => {
        // Use requestAnimationFrame to prevent blocking main thread
        requestAnimationFrame(() => {
          const scrollLeft = container.scrollLeft;
          const slideWidth = container.offsetWidth;

          const currentPosition = Math.round(scrollLeft / slideWidth);

          // Update active indicator (wrap to 0-2)
          setActiveCard(currentPosition % totalCards);

          // Reset position when reaching edges (with safety check)
          if (currentPosition <= 0 && scrollLeft > 0) {
            isScrollingRef.current = true;
            container.scrollLeft = totalCards * slideWidth;
            setTimeout(() => { isScrollingRef.current = false; }, 100);
          } else if (currentPosition >= totalCards * 2 && currentPosition < totalCards * 3) {
            isScrollingRef.current = true;
            container.scrollLeft = totalCards * slideWidth;
            setTimeout(() => { isScrollingRef.current = false; }, 100);
          }
        });
      }, 50);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      container.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout as unknown as NodeJS.Timeout);
    };
  }, [totalCards]);

  // Scroll to specific card function
  const scrollToCard = useCallback((index: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const slideWidth = container.offsetWidth;
    // Always scroll to middle set + index
    const scrollPosition = (totalCards + index) * slideWidth;

    container.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    });
  }, [totalCards]);

  return (
    <section id="transform-space" className="relative bg-white min-h-screen lg:min-h-screen overflow-y-auto lg:overflow-visible lg:snap-start flex items-start pt-20 lg:pt-24 pb-12">
      <div className="container mx-auto max-w-[1600px] px-4 relative z-30 py-6 lg:py-8 w-full">

        {/* Main Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6 lg:mb-12 relative z-40"
        >
          <h2 className="font-['Exo',sans-serif] text-2xl sm:text-3xl lg:text-4xl font-medium text-[#1c1c1e] mb-2 lg:mb-3 relative z-40">
            Transform Your Space
          </h2>
          <p className="font-['Barlow',sans-serif] text-sm sm:text-base lg:text-lg text-[#3a3a3c] max-w-2xl mx-auto">
            Premium aluminum solutions engineered for UAE's climate
          </p>
        </motion.div>

        {/* Cards - Horizontal Scroll */}
        <div className="relative">
          {/* Swipe hint for mobile */}
          <div className="md:hidden text-center mb-3">
            <p className="font-['Barlow',sans-serif] text-xs text-gray-400 flex items-center justify-center gap-1.5 animate-pulse">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8L22 12L18 16M6 8L2 12L6 16"/>
              </svg>
              Swipe to explore
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8L22 12L18 16M6 8L2 12L6 16"/>
              </svg>
            </p>
          </div>

          {/* Mobile: Horizontal Scroll with Infinite Loop */}
          <div className="md:hidden">
            <div
              ref={scrollContainerRef}
              className="flex overflow-x-auto pb-4 hide-scrollbar"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch',
                // pan-y: vertical page scroll passes through; horizontal handled by useMultiAxisScroll
                touchAction: 'pan-y',
                scrollBehavior: 'auto',
                willChange: 'scroll-position',
                overscrollBehavior: 'contain',
              }}
            >
              {infiniteCards.map((card, idx) => (
                <div key={`card-${idx}`} className="w-full flex-shrink-0 px-2"
                  style={{ touchAction: 'pan-y' }}
                >
                  <div className="rounded-xl p-5 h-full border-2 transition-all duration-300 flex flex-col items-center text-center pointer-events-none" style={{ backgroundColor: card.bg, borderColor: card.border }}>
                    <div className="mb-4 w-14 h-14 rounded-xl flex items-center justify-center transition-transform duration-300" style={{ backgroundColor: card.iconBg }}>
                      {card.id === 1 && (
                        <svg className="w-7 h-7 pointer-events-none" viewBox="0 0 24 24" fill="none">
                          <path d="M12 2L4 6V11C4 16 7.5 20.5 12 22C16.5 20.5 20 16 20 11V6L12 2Z" stroke="#007969" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          <rect x="9" y="9" width="6" height="7" stroke="#007969" strokeWidth="1.5" fill="none" />
                          <line x1="12" y1="9" x2="12" y2="16" stroke="#007969" strokeWidth="1.5" />
                          <line x1="9" y1="12.5" x2="15" y2="12.5" stroke="#007969" strokeWidth="1.5" />
                        </svg>
                      )}
                      {card.id === 2 && (
                        <Gem className="w-7 h-7 text-[#007969] stroke-[2] pointer-events-none" />
                      )}
                      {card.id === 3 && (
                        <svg className="w-7 h-7 pointer-events-none" viewBox="0 0 24 24" fill="none">
                          <path d="M12 3L4 10H20L12 3Z" stroke="#007969" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                          <path d="M4 10V19C4 19.5 4.5 20 5 20H19C19.5 20 20 19.5 20 19V10" stroke="#007969" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          <line x1="12" y1="3" x2="12" y2="20" stroke="#007969" strokeWidth="1.5" />
                          <line x1="8" y1="10" x2="8" y2="20" stroke="#007969" strokeWidth="1.5" />
                          <line x1="16" y1="10" x2="16" y2="20" stroke="#007969" strokeWidth="1.5" />
                          <path d="M10 17C10 17 10.5 15 12 15C13.5 15 14 17 14 17" stroke="#007969" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                          <circle cx="12" cy="18" r="0.8" fill="#007969" />
                        </svg>
                      )}
                    </div>
                    <h3 className="font-['Exo',sans-serif] text-lg font-semibold text-[#1c1c1e] mb-3">
                      {card.title}
                    </h3>
                    <p className="font-['Barlow',sans-serif] text-sm text-gray-600 leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop: Static Grid (3 cards only) */}
          <div className="hidden md:grid md:grid-cols-3 gap-6 lg:max-w-6xl lg:mx-auto">
            {cards.map((card) => (
              <div key={card.id}>
                <div className="rounded-xl p-6 lg:p-8 h-full border-2 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col items-center text-center" style={{ backgroundColor: card.bg, borderColor: card.border }}>
                  <div className="mb-4 w-16 h-16 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: card.iconBg }}>
                    {card.id === 1 && (
                      <svg className="w-9 h-9" viewBox="0 0 24 24" fill="none">
                        <path d="M12 2L4 6V11C4 16 7.5 20.5 12 22C16.5 20.5 20 16 20 11V6L12 2Z" stroke="#007969" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <rect x="9" y="9" width="6" height="7" stroke="#007969" strokeWidth="1.5" fill="none" />
                        <line x1="12" y1="9" x2="12" y2="16" stroke="#007969" strokeWidth="1.5" />
                        <line x1="9" y1="12.5" x2="15" y2="12.5" stroke="#007969" strokeWidth="1.5" />
                      </svg>
                    )}
                    {card.id === 2 && (
                      <Gem className="w-9 h-9 text-[#007969] stroke-[2]" />
                    )}
                    {card.id === 3 && (
                      <svg className="w-9 h-9" viewBox="0 0 24 24" fill="none">
                        <path d="M12 3L4 10H20L12 3Z" stroke="#007969" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                        <path d="M4 10V19C4 19.5 4.5 20 5 20H19C19.5 20 20 19.5 20 19V10" stroke="#007969" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <line x1="12" y1="3" x2="12" y2="20" stroke="#007969" strokeWidth="1.5" />
                        <line x1="8" y1="10" x2="8" y2="20" stroke="#007969" strokeWidth="1.5" />
                        <line x1="16" y1="10" x2="16" y2="20" stroke="#007969" strokeWidth="1.5" />
                        <path d="M10 17C10 17 10.5 15 12 15C13.5 15 14 17 14 17" stroke="#007969" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                        <circle cx="12" cy="18" r="0.8" fill="#007969" />
                      </svg>
                    )}
                  </div>
                  <h3 className="font-['Exo',sans-serif] text-2xl font-semibold text-[#1c1c1e] mb-3">
                    {card.title}
                  </h3>
                  <p className="font-['Barlow',sans-serif] text-lg text-gray-600 leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        {/* Mobile Scroll Indicator */}
        <div className="flex justify-center gap-1.5 md:hidden mt-4">
          {cards.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToCard(i)}
              className="group flex items-center justify-center h-11 min-w-[20px] -my-4"
              aria-label={`Go to card ${i + 1}`}
            >
              <span
                className={`block rounded-full transition-all duration-300 ${
                  activeCard === i
                    ? 'bg-[#007969] w-6 h-1.5'
                    : 'bg-gray-300 group-hover:bg-[#007969]/50 w-1.5 h-1.5'
                }`}
              />
            </button>
          ))}
        </div>
        </div>

      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
