import { useState, useEffect, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import svgPaths from '../../imports/svg-xtdnlxzlx3';
import { HeroCADElements } from './CADFloatingElements';
import { CTADecoration } from './InteractiveDecorations';

// Lazy load heavy form components to reduce initial bundle
const LeadForm = lazy(() => import('./LeadForm').then(m => ({ default: m.LeadForm })));
const LeadFormAndroid = lazy(() => import('./LeadFormAndroid').then(m => ({ default: m.LeadFormAndroid })));

interface HeroSectionProps {
  enableVideo?: boolean;
  videoUrl?: string;
  mobileVideoUrl?: string;
}

export function HeroSection({ enableVideo = false, videoUrl, mobileVideoUrl }: HeroSectionProps) {
  const [showMobileForm, setShowMobileForm] = useState(false);

  // Ensure page loads at the top on mobile and when switching viewports
  useEffect(() => {
    // Scroll to top on initial load
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // Track previous viewport size to detect mobile/desktop switches
    let previousIsMobile = window.innerWidth < 1024;
    let resizeTimeout: number;

    const handleResize = () => {
      // Debounce resize to prevent excessive re-renders
      clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(() => {
        const currentIsMobile = window.innerWidth < 1024;

        // If viewport type changed (mobile to desktop or desktop to mobile)
        if (previousIsMobile !== currentIsMobile) {
          // Use requestAnimationFrame to prevent layout thrashing
          requestAnimationFrame(() => {
            window.scrollTo({ top: 0, behavior: 'auto' }); // Use 'auto' to prevent janky scroll
            previousIsMobile = currentIsMobile;
          });
        }
      }, 150); // Debounce 150ms
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  const handleMobileCTA = () => {
    // On mobile, show the form in place
    if (window.innerWidth < 1024) {
      setShowMobileForm(true);
    } else {
      // On desktop, scroll to form as before
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center lg:snap-center"
      style={{
        contain: 'layout style',
        minHeight: '100vh',
        height: '100vh',
        contentVisibility: 'auto',
        containIntrinsicSize: '100vw 100vh',
      }}
    >
      {/* CAD Floating Elements */}
      <HeroCADElements />
      
      {/* Desktop Video Background */}
      {enableVideo && videoUrl && (
        <div className="absolute inset-0 overflow-hidden hidden lg:block" style={{ contain: 'strict' }}>
          <iframe
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none scale-110"
            style={{
              minWidth: '100vw',
              minHeight: '100vh',
              width: '120vw',
              height: '120vh',
              contain: 'strict',
              aspectRatio: '16 / 9',
            }}
            src={`${videoUrl}?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&vq=hd1080&playlist=${videoUrl.split('/').pop()?.split('?')[0] || ''}&origin=${typeof window !== 'undefined' ? window.location.origin : ''}`}
            title="Background Video"
            allow="autoplay; fullscreen; encrypted-media; accelerometer; gyroscope; picture-in-picture"
            allowFullScreen
            frameBorder="0"
            loading="eager"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-[#007969]/60 pointer-events-none" />
        </div>
      )}

      {/* Mobile Video Background */}
      {enableVideo && mobileVideoUrl && (
        <div className="absolute inset-0 overflow-hidden lg:hidden" style={{ contain: 'strict' }}>
          <iframe
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none scale-110"
            style={{
              minWidth: '100vw',
              minHeight: '100vh',
              width: '120vw',
              height: '120vh',
              contain: 'strict',
              aspectRatio: '16 / 9',
            }}
            src={`${mobileVideoUrl}?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&vq=hd720&playlist=${mobileVideoUrl.split('/').pop()?.split('?')[0] || ''}&origin=${typeof window !== 'undefined' ? window.location.origin : ''}`}
            title="Mobile Background Video"
            allow="autoplay; fullscreen; encrypted-media; accelerometer; gyroscope; picture-in-picture"
            allowFullScreen
            frameBorder="0"
            loading="eager"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-[#007969]/60 pointer-events-none" />
        </div>
      )}

      {/* Static Background (if no video) */}
      {!enableVideo && (
        <div className="absolute inset-0 bg-[#007969]" />
      )}

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 lg:px-6 w-full py-6 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-center">
          {/* Left Side - Content (Mobile switches between content and form) */}
          <div className="text-white space-y-3 lg:space-y-6">
            <AnimatePresence mode="wait">
              {!showMobileForm ? (
                <motion.div
                  key="hero-content"
                  initial={{ opacity: 1 }}
                  exit={{ 
                    opacity: 0,
                    scale: 0.95,
                    y: -20,
                  }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="space-y-3 lg:space-y-6"
                >
                  {/* Main Heading */}
                  <h1 className="font-['Exo',sans-serif] text-sm lg:text-2xl xl:text-3xl font-semibold leading-tight tracking-[0.12em] lg:tracking-[0.15em] uppercase">
                    <span className="block whitespace-nowrap">Performance Windows &amp; Doors</span>{' '}
                    <span className="block whitespace-nowrap">Engineered for Excellence</span>{' '}
                    <span className="block whitespace-nowrap">Built for the UAE Climate</span>
                  </h1>

                  {/* Benefits List - All 5 benefits visible on mobile and desktop */}
                  <div className="space-y-1.5 lg:space-y-3 pt-0.5 lg:pt-2">
                    {/* Benefit 1 */}
                    <div className="flex items-start space-x-1.5 lg:space-x-2.5">
                      <div className="flex-shrink-0 w-3.5 h-3.5 lg:w-5 lg:h-5 mt-0.5">
                        <svg className="w-full h-full" fill="none" viewBox="0 0 24 24">
                          <path d={svgPaths.p3cd23900} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                          <path d="M9 11L12 14L22 4" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                        </svg>
                      </div>
                      <p className="font-['Barlow',sans-serif] text-xs lg:text-base leading-4 lg:leading-6">Free quote & site visit within 24 hours</p>
                    </div>

                    {/* Benefit 2 */}
                    <div className="flex items-start space-x-1.5 lg:space-x-2.5">
                      <div className="flex-shrink-0 w-3.5 h-3.5 lg:w-5 lg:h-5 mt-0.5">
                        <svg className="w-full h-full" fill="none" viewBox="0 0 24 24">
                          <path d={svgPaths.p3cd23900} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                          <path d="M9 11L12 14L22 4" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                        </svg>
                      </div>
                      <p className="font-['Barlow',sans-serif] text-xs lg:text-base leading-4 lg:leading-6">Custom-manufactured for perfect fit</p>
                    </div>

                    {/* Benefit 3 */}
                    <div className="flex items-start space-x-1.5 lg:space-x-2.5">
                      <div className="flex-shrink-0 w-3.5 h-3.5 lg:w-5 lg:h-5 mt-0.5">
                        <svg className="w-full h-full" fill="none" viewBox="0 0 24 24">
                          <path d={svgPaths.p3cd23900} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                          <path d="M9 11L12 14L22 4" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                        </svg>
                      </div>
                      <p className="font-['Barlow',sans-serif] text-xs lg:text-base leading-4 lg:leading-6">Heat & dust insulation for UAE climate</p>
                    </div>

                    {/* Benefit 4 */}
                    <div className="flex items-start space-x-1.5 lg:space-x-2.5">
                      <div className="flex-shrink-0 w-3.5 h-3.5 lg:w-5 lg:h-5 mt-0.5">
                        <svg className="w-full h-full" fill="none" viewBox="0 0 24 24">
                          <path d={svgPaths.p3cd23900} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                          <path d="M9 11L12 14L22 4" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                        </svg>
                      </div>
                      <p className="font-['Barlow',sans-serif] text-xs lg:text-base leading-4 lg:leading-6">Professional installation with 10-year warranty</p>
                    </div>

                    {/* Benefit 5 */}
                    <div className="flex items-start space-x-1.5 lg:space-x-2.5">
                      <div className="flex-shrink-0 w-3.5 h-3.5 lg:w-5 lg:h-5 mt-0.5">
                        <svg className="w-full h-full" fill="none" viewBox="0 0 24 24">
                          <path d={svgPaths.p3cd23900} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                          <path d="M9 11L12 14L22 4" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                        </svg>
                      </div>
                      <p className="font-['Barlow',sans-serif] text-xs lg:text-base leading-4 lg:leading-6">European quality systems from AED 800/sqm</p>
                    </div>
                  </div>

                  {/* CTA Button for Mobile */}
                  <div className="pt-4 lg:hidden">
                    <CTADecoration>
                      <button
                        onClick={handleMobileCTA}
                        className="w-full bg-white text-[#008873] px-6 py-4 rounded-xl font-['Rajdhani',sans-serif] text-base font-bold hover:bg-[#008873] hover:text-white hover:ring-2 hover:ring-white active:scale-95 transition-all duration-200 shadow-2xl"
                      >
                        Start Your Swiftrooms Journey
                      </button>
                    </CTADecoration>
                  </div>

                  {/* Bottom Tagline */}
                  <div className="pt-2 lg:pt-8">
                    <p className="font-['Exo',sans-serif] text-[10px] lg:text-base font-medium tracking-[0.12em] lg:tracking-[0.2em] uppercase">
                      Book Your Showroom Visit Today
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="hero-form"
                  initial={{ 
                    opacity: 0,
                    scale: 0.9,
                    y: 20,
                  }}
                  animate={{ 
                    opacity: 1,
                    scale: 1,
                    y: 0,
                  }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="lg:hidden"
                >
                  {/* Back Button */}
                  <button
                    onClick={() => setShowMobileForm(false)}
                    className="mb-4 text-white text-sm font-['Barlow',sans-serif] flex items-center gap-2 hover:opacity-80 transition-opacity"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Home
                  </button>

                  <Suspense fallback={<div className="flex items-center justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div></div>}>
                    <LeadForm autoOpen={true} ctaVariant="white" />
                  </Suspense>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Side - Lead Form (Desktop only) */}
          <div className="hidden lg:block lg:pl-6">
            <Suspense fallback={<div className="flex items-center justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div></div>}>
              <LeadForm ctaVariant="white" />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
}