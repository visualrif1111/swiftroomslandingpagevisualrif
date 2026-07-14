import { useState, useEffect, useRef } from 'react';
import { FullLogo, LogoIcon, CompactLogo } from './NewLogo';
import { motion, AnimatePresence } from 'motion/react';
import { CTADecoration } from './InteractiveDecorations';

// Brand teal used across the navigation
const BRAND_TEAL = '#007969';

// Three evenly-spaced teal bars forming the hamburger icon
function HamburgerIcon() {
  return (
    <div className="flex h-6 w-6 flex-col justify-center gap-1.5">
      <span className="h-0.5 w-6 rounded bg-[#007969]" />
      <span className="h-0.5 w-6 rounded bg-[#007969]" />
      <span className="h-0.5 w-6 rounded bg-[#007969]" />
    </div>
  );
}

// Two rotated teal bars forming the close (X) icon
function CloseIcon() {
  return (
    <div className="relative h-6 w-6">
      <span className="absolute left-1/2 top-1/2 h-0.5 w-6 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded bg-[#007969]" />
      <span className="absolute left-1/2 top-1/2 h-0.5 w-6 -translate-x-1/2 -translate-y-1/2 -rotate-45 rounded bg-[#007969]" />
    </div>
  );
}

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState('hero');
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount - defer to idle time to prevent blocking
  useEffect(() => {
    const idleCallback = 'requestIdleCallback' in window
      ? window.requestIdleCallback(() => {
          const mobile = window.innerWidth < 1024;
          setIsMobile(mobile);
        })
      : window.setTimeout(() => {
          const mobile = window.innerWidth < 1024;
          setIsMobile(mobile);
        }, 0);

    return () => {
      if ('cancelIdleCallback' in window) {
        window.cancelIdleCallback(idleCallback);
      } else {
        clearTimeout(idleCallback);
      }
    };
  }, []);

  // Desktop horizontal nav links — order mirrors the CRO page flow
  const navItems = [
    { key: 'hero', id: 'hero', label: 'Home' },
    { key: 'benefits', id: 'benefits', label: 'Benefits' },
    { key: 'gallery', id: 'gallery', label: 'Gallery' },
    { key: 'testimonials', id: 'testimonials', label: 'Testimonials' },
    { key: 'swiftrooms-solution', id: 'swiftrooms-solution', label: 'Why Us' },
    { key: 'products', id: 'products', label: 'Products' },
    { key: 'process', id: 'process', label: 'Process' },
    { key: 'faqs', id: 'faqs', label: 'FAQs' },
  ];

  // Mobile full-screen menu links — primary CTA pinned to the top,
  // remaining links follow the CRO page flow
  const mobileNavItems = [
    { id: 'contact-form', label: 'Get Free Quote', isCTA: true },
    { id: 'hero', label: 'Home' },
    { id: 'benefits', label: 'Benefits' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'swiftrooms-solution', label: 'Why Us' },
    { id: 'products', label: 'Products' },
    { id: 'process', label: 'Process' },
    { id: 'faqs', label: 'FAQs' },
  ];

  // Intersection Observer for active section tracking - Deferred to idle time.
  // The observer is hoisted to effect scope so it can be disconnected on
  // cleanup (previously the cleanup returned from inside the idle callback was
  // ignored, leaking the observer and causing stale active-section updates).
  useEffect(() => {
    let observer: IntersectionObserver | null = null;

    const setup = () => {
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id) {
            setActiveSection(entry.target.id);
          }
        });
      }, { root: null, rootMargin: '-50% 0px -50% 0px', threshold: 0 });

      navItems.forEach((item) => {
        const el = document.getElementById(item.id);
        if (el) observer!.observe(el);
      });
    };

    const idleCallback = 'requestIdleCallback' in window
      ? window.requestIdleCallback(setup)
      : window.setTimeout(setup, 100);

    return () => {
      if ('cancelIdleCallback' in window) {
        window.cancelIdleCallback(idleCallback as number);
      } else {
        clearTimeout(idleCallback as number);
      }
      observer?.disconnect();
    };
  }, []);

  const scrollToSection = (id: string) => {
    console.log(`[Navigation] Attempting to scroll to section: ${id}`);

    // Find the target element
    const element = document.getElementById(id);

    if (!element) {
      console.error(`[Navigation] Element with id="${id}" not found!`);
      return;
    }

    console.log(`[Navigation] Element found: ${id}`);

    // Close the mobile menu first for better UX
    setMobileMenuOpen(false);

    // Give the menu time to start closing animation before scrolling
    setTimeout(() => {
      // Method 1: Try to find the custom scroll container
      const scrollContainer = (document.getElementById('app-scroll') || document.querySelector('.overflow-y-scroll')) as HTMLElement;

      if (scrollContainer) {
        console.log(`[Navigation] Using scroll container method for ${id}`);

        // Get the element's position relative to the scroll container
        const containerRect = scrollContainer.getBoundingClientRect();
        const elementRect = element.getBoundingClientRect();
        const scrollTop = scrollContainer.scrollTop;

        // Calculate the target scroll position
        // We want the element at the top of the viewport
        const targetScroll = scrollTop + elementRect.top - containerRect.top;

        console.log(`[Navigation] Scroll calculation:`, {
          currentScroll: scrollTop,
          elementTop: elementRect.top,
          containerTop: containerRect.top,
          targetScroll: targetScroll
        });

        // Perform the scroll
        try {
          scrollContainer.scrollTo({
            top: targetScroll,
            behavior: 'smooth'
          });
          console.log(`[Navigation] ✅ Scrolled to ${id} using scrollTo with smooth behavior`);
        } catch (e) {
          // Fallback: Direct assignment
          scrollContainer.scrollTop = targetScroll;
          console.log(`[Navigation] ✅ Scrolled to ${id} using direct scrollTop assignment`);
        }
      } else {
        // Method 2: Fallback to window scroll (for edge cases)
        console.log(`[Navigation] Using window scroll method for ${id}`);

        try {
          const yOffset = -80; // Navigation height
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

          window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
          });

          console.log(`[Navigation] ✅ Scrolled to ${id} using window.scrollTo`);
        } catch (e) {
          // Ultimate fallback
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          console.log(`[Navigation] ✅ Scrolled to ${id} using scrollIntoView`);
        }
      }

      // For the quote CTA, also open the lead form (parity with the sticky CTA,
      // hero and other entry points) so tapping "Get Free Quote" in the menu
      // expands the form instead of just scrolling near it.
      if (id === 'contact-form') {
        setTimeout(() => window.dispatchEvent(new Event('openLeadForm')), 400);
      }
    }, 150); // 150ms delay to let menu close animation start
  };

  // Android-compatible button handler
  const handleNavButtonClick = (e: React.MouseEvent<HTMLButtonElement> | React.TouchEvent<HTMLButtonElement>, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    scrollToSection(id);
  };

  // Lock background scrolling while the mobile menu is open. The app scrolls
  // via an inner container, so lock that too — not just the body.
  useEffect(() => {
    const inner = (document.getElementById('app-scroll') || document.querySelector('.overflow-y-scroll')) as HTMLElement | null;
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      if (inner) inner.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      if (inner) inner.style.overflow = '';
    }

    // Close the mobile menu on Escape (keyboard / AT users).
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) setMobileMenuOpen(false);
    };
    if (mobileMenuOpen) window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = 'unset';
      if (inner) inner.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: 0, opacity: 1 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md"
        style={{ willChange: 'auto' }}
      >
        <div className="container mx-auto max-w-[1600px] px-4 lg:px-6">
          <div className="flex items-center justify-between h-20">
            {/* Mobile / tablet header: centered logo with hamburger on the right */}
            <div className="flex lg:hidden items-center justify-center w-full relative h-20">
              {/* Centered logo */}
              <motion.button
                onClick={() => scrollToSection('hero')}
                className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex items-center"
                aria-label="Go to home"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                <motion.div
                  initial={{ rotate: 0 }}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                >
                  <LogoIcon className="w-11 h-11" />
                </motion.div>
              </motion.button>

              {/* Hamburger menu button */}
              <motion.button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="absolute right-2 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-md hover:bg-gray-50 transition-colors"
                aria-label="Toggle menu"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                <HamburgerIcon />
              </motion.button>
            </div>

            {/* Desktop: logo on the left */}
            <div className="hidden lg:flex items-center flex-shrink-0">
              <motion.button
                onClick={() => scrollToSection('hero')}
                className="flex items-center hover:opacity-80 transition-opacity cursor-pointer"
                aria-label="Go to home"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                <FullLogo />
              </motion.button>
            </div>

            {/* Desktop: horizontal, scrollable nav links */}
            <div
              ref={scrollContainerRef}
              className="hidden lg:flex items-center overflow-x-auto scrollbar-hide space-x-1 mx-4 flex-1 max-w-3xl"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch'
              }}
            >
              {navItems.map((item, index) => {
                const isActive = activeSection === item.id;
                return (
                  <motion.button
                    key={item.key}
                    onClick={() => scrollToSection(item.id)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 whitespace-nowrap flex-shrink-0 ${
                      isActive
                        ? 'text-[#007969] bg-[#f0fdf4] font-semibold'
                        : 'text-[#3a3a3c] hover:text-[#007969] hover:bg-[#f0fdf4]'
                    }`}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.label}
                  </motion.button>
                );
              })}
            </div>

            {/* Desktop: primary CTA on the right */}
            <div className="hidden lg:block flex-shrink-0">
              <motion.button
                onClick={() => {
                  scrollToSection('contact-form');
                  // Dispatch custom event to open the form
                  setTimeout(() => {
                    window.dispatchEvent(new Event('openLeadForm'));
                  }, 500); // Small delay to ensure smooth scroll then form opens
                }}
                className="btn-brand"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.8,
                  ease: [0.23, 1, 0.32, 1]
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Free Quote
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Full-screen frosted-glass panel */}
            <motion.div
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.03 }}
              transition={{ type: 'tween', duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
              className="fixed inset-0 bg-white/90 backdrop-blur-2xl z-50 lg:hidden overflow-hidden"
              style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
            >
              {/* Menu header: centered logo, close button on the right */}
              <motion.div
                className="relative w-full h-20"
                initial={{ y: -80 }}
                animate={{ y: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
                {/* Centered logo */}
                <motion.div
                  className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-11 h-11"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.1 }}
                >
                  <LogoIcon className="w-11 h-11" />
                </motion.div>

                {/* Close button */}
                <motion.button
                  onClick={() => setMobileMenuOpen(false)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-md hover:bg-gray-50 transition-colors"
                  aria-label="Close menu"
                  initial={{ scale: 0, rotate: 90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.2 }}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <CloseIcon />
                </motion.button>
              </motion.div>

              {/* Menu body: links (scrollable) with contact details pinned below */}
              <div className="relative h-[calc(100svh-5rem)] flex flex-col justify-between py-6">
                {/* Navigation links — justify-start (not center) so an overflowing
                    list scrolls from the top instead of clipping the first item. */}
                <div className="flex-1 min-h-0 flex flex-col justify-start items-center gap-6 overflow-y-auto px-4">
                  {mobileNavItems.map((item, index) => {
                    const isActive = activeSection === item.id;
                    const itemDelay = 0.1 + index * 0.05;
                    const link = (
                      <button
                        onClick={() => scrollToSection(item.id)}
                        className={`inline-flex min-h-11 items-center justify-center px-4 font-['Rajdhani',sans-serif] font-medium uppercase text-2xl leading-none tracking-wide ${
                          isActive ? 'text-[#007969]' : 'text-[#3a3a3c]'
                        } active:scale-95 transition-transform touch-manipulation`}
                        style={{ WebkitTapHighlightColor: 'transparent' }}
                      >
                        {item.label}
                      </button>
                    );

                    return (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: itemDelay, type: 'spring', stiffness: 200, damping: 20 }}
                        className="text-center"
                      >
                        {item.isCTA ? <CTADecoration>{link}</CTADecoration> : link}
                        <motion.div
                          className="h-px w-16 mt-1 mx-auto"
                          style={{
                            backgroundColor: isActive ? BRAND_TEAL : '#e5e7eb',
                            transition: 'background-color 0.3s ease'
                          }}
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ delay: itemDelay + 0.1, duration: 0.3 }}
                        />
                      </motion.div>
                    );
                  })}
                </div>

                {/* Contact details pinned to the bottom */}
                <motion.div
                  className="px-6 space-y-3"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  {/* Tagline */}
                  <motion.p
                    className="font-['Barlow',sans-serif] text-sm text-[#99a1af] text-center tracking-tight"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                  >
                    Dubai's trusted aluminium windows and doors specialist since 2009
                  </motion.p>

                  {/* Email */}
                  <motion.p
                    className="font-['Barlow',sans-serif] text-sm text-[#99a1af] text-center tracking-tight"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    hello@swiftrooms.ae
                  </motion.p>

                  {/* Phone */}
                  <motion.p
                    className="font-['Barlow',sans-serif] text-sm text-[#99a1af] text-center tracking-tight"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                  >
                    050 526 9149
                  </motion.p>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
}
