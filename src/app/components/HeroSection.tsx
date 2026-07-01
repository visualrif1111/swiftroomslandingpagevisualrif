import { useState, useEffect, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle } from 'lucide-react';
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

      {/* Base brand backdrop — always rendered as the first layer so the hero
          always has a proper background: on mobile (no mobile video is passed)
          and behind the desktop video/overlay. Prevents white-on-nothing text. */}
      <div className="absolute inset-0 bg-[#007969]" />

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
                  {/* Eyebrow / location label — Rajdhani uppercase with brand divider */}
                  <motion.div
                    className="flex items-center gap-2.5 lg:gap-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.05 }}
                  >
                    <span className="h-px w-6 lg:w-8 bg-white/50" />
                    <span className="font-['Rajdhani',sans-serif] text-[10px] lg:text-sm font-semibold uppercase tracking-[0.18em] text-white/85">
                      Dubai · Abu Dhabi · UAE
                    </span>
                  </motion.div>

                  {/* Main Heading — oversized Exo display for maximum impact */}
                  <motion.h1
                    className="font-['Exo',sans-serif] font-extrabold text-white leading-[1.02] lg:leading-[0.98] tracking-[-0.015em] text-[1.9rem] sm:text-4xl lg:text-[2.75rem] xl:text-5xl"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
                  >
                    Premium Windows, Doors<br className="hidden sm:block" /> &amp; Glass Rooms
                    <span className="block font-medium text-white/70 text-base sm:text-xl lg:text-2xl tracking-normal mt-1 lg:mt-2">
                      Engineered for UAE villas.
                    </span>
                  </motion.h1>

                  {/* Subheadline */}
                  <p className="font-['Barlow',sans-serif] text-xs lg:text-lg text-white/90 leading-snug lg:leading-relaxed max-w-xl">
                    Premium aluminium windows, sliding doors &amp; glass rooms — designed for UAE climates, manufactured locally, and installed by specialists with over 3,500 completed projects.
                  </p>

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

                  {/* CTA Hierarchy for Mobile: Primary / Secondary / Tertiary */}
                  <div className="pt-4 lg:hidden space-y-2.5">
                    {/* Primary CTA - Get Free Quote (most dominant) */}
                    <CTADecoration>
                      <button
                        onClick={handleMobileCTA}
                        className="btn-brand w-full !bg-white !text-[#007969] hover:!bg-[#007969] hover:!text-white shadow-2xl"
                      >
                        Get Free Quote
                      </button>
                    </CTADecoration>

                    {/* Secondary CTA - WhatsApp Expert */}
                    <a
                      href="https://wa.me/971505269149?text=Hi%20Swiftrooms%2C%20I%27d%20like%20to%20speak%20with%20an%20expert%20about%20windows%2C%20doors%20or%20a%20glass%20room%20for%20my%20villa."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-whatsapp w-full shadow-lg"
                    >
                      <MessageCircle className="w-5 h-5" />
                      WhatsApp Expert
                    </a>

                    {/* Tertiary CTA - Visit Showroom */}
                    <a
                      href="https://maps.google.com/?q=ETJAR+J1+Complex+Block+A+Warehouse+11-12+Jebel+Ali+Industrial+Area+1+Dubai"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full text-center text-white/90 underline underline-offset-4 font-['Barlow',sans-serif] text-sm py-1 active:opacity-80 transition-opacity"
                    >
                      Visit Showroom
                    </a>
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