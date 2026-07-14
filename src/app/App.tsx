import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { ErrorBoundary } from './components/ErrorBoundary';
import { getAnimationSettings } from './utils/performance';

// Lazy load performance monitor to reduce initial bundle
const PerformanceMonitor = lazy(() => import('./components/PerformanceMonitor').then(m => ({ default: m.PerformanceMonitor })));

// Lazy load sections below the fold for better initial load performance
const KeyBenefitsSection = lazy(() => import('./components/KeyBenefitsSection').then(m => ({ default: m.KeyBenefitsSection })));
const FinalCTASection = lazy(() => import('./components/FinalCTASection').then(m => ({ default: m.FinalCTASection })));
const StickyMobileCTA = lazy(() => import('./components/StickyMobileCTA').then(m => ({ default: m.StickyMobileCTA })));
const ProductsSection = lazy(() => import('./components/ProductsSection').then(m => ({ default: m.ProductsSection })));
const TransformYourSpaceSection = lazy(() => import('./components/TransformYourSpaceSection').then(m => ({ default: m.TransformYourSpaceSection })));
const SwiftroomsSolutionSection = lazy(() => import('./components/SwiftroomsSolutionSection').then(m => ({ default: m.SwiftroomsSolutionSection })));
const ProcessSection = lazy(() => import('./components/ProcessSection').then(m => ({ default: m.ProcessSection })));
const BrandsSection = lazy(() => import('./components/BrandsSection').then(m => ({ default: m.BrandsSection })));
const SocialProofSection = lazy(() => import('./components/SocialProofSection').then(m => ({ default: m.SocialProofSection })));
const FormSection = lazy(() => import('./components/FormSection').then(m => ({ default: m.FormSection })));
const GallerySection = lazy(() => import('./components/GallerySection').then(m => ({ default: m.GallerySection })));
const TestimonialsSection = lazy(() => import('./components/TestimonialsSection').then(m => ({ default: m.TestimonialsSection })));
const FAQSection = lazy(() => import('./components/FAQSection').then(m => ({ default: m.FAQSection })));
const CookieConsent = lazy(() => import('./components/CookieConsent').then(m => ({ default: m.CookieConsent })));
const Footer = lazy(() => import('./components/Footer').then(m => ({ default: m.Footer })));
const BackgroundAnimations = lazy(() => import('./components/BackgroundAnimations').then(m => ({ default: m.BackgroundAnimations })));
const InteractiveDecorations = lazy(() => import('./components/InteractiveDecorations').then(m => ({ default: m.InteractiveDecorations })));
const FormMagnetDecorations = lazy(() => import('./components/InteractiveDecorations').then(m => ({ default: m.FormMagnetDecorations })));
const ScrollProgressIndicator = lazy(() => import('./components/ScrollProgressIndicator').then(m => ({ default: m.ScrollProgressIndicator })));
const FormAttractorParticles = lazy(() => import('./components/ScrollProgressIndicator').then(m => ({ default: m.FormAttractorParticles })));
const SectionTransitionEffect = lazy(() => import('./components/SectionTransitionEffect').then(m => ({ default: m.SectionTransitionEffect })));

// Loading fallback component with stable dimensions to prevent CLS
const SectionLoader = () => (
  <div
    className="h-screen w-full flex items-center justify-center"
    style={{
      contain: 'layout style paint',
      contentVisibility: 'auto',
      minHeight: '100vh',
      height: '100vh',
    }}
  >
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#007969]"></div>
  </div>
);

export default function App() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  // Start with minimal features, enable asynchronously to prevent blocking
  const [animationSettings, setAnimationSettings] = useState({
    enableAnimations: false,
    enableParallax: false,
    enableParticles: false,
    enableTransitions: false,
    particleCount: 8,
  });
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 1024 : false);

  // Detect mobile devices - debounced to prevent layout thrashing
  useEffect(() => {
    const checkMobile = () => {
      requestAnimationFrame(() => {
        const newIsMobile = window.innerWidth < 1024;
        setIsMobile(newIsMobile);
      });
    };

    checkMobile();

    let resizeTimeout: number;
    const debouncedResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(checkMobile, 200); // Increased debounce
    };

    // Use passive event listener for better scroll performance
    window.addEventListener('resize', debouncedResize, { passive: true });
    return () => {
      window.removeEventListener('resize', debouncedResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  // Get animation settings asynchronously to prevent blocking initial render
  useEffect(() => {
    const idleCallback = 'requestIdleCallback' in window
      ? window.requestIdleCallback(() => {
          setAnimationSettings(getAnimationSettings());
        }, { timeout: 3000 })
      : window.setTimeout(() => {
          setAnimationSettings(getAnimationSettings());
        }, 500);

    return () => {
      if ('cancelIdleCallback' in window) {
        window.cancelIdleCallback(idleCallback);
      } else {
        clearTimeout(idleCallback);
      }
    };
  }, []);

  // Force scroll to top on page load/reload
  useEffect(() => {
    // Scroll to top immediately (synchronous for better UX)
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
    window.scrollTo(0, 0);

    // Reset history scroll restoration
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  }, []);

  return (
    <ErrorBoundary>
      <Suspense fallback={null}>
        <PerformanceMonitor />
      </Suspense>
      <Navigation />

      {/* Interactive Decorations Layer - ONLY on desktop devices */}
      {!isMobile && animationSettings.enableAnimations && animationSettings.enableParallax && (
        <Suspense fallback={null}>
          <InteractiveDecorations />
          <FormMagnetDecorations />
        </Suspense>
      )}

      {/* Scroll Progress - Simplified on low-end */}
      {animationSettings.enableAnimations && (
        <Suspense fallback={null}>
          <ScrollProgressIndicator />
        </Suspense>
      )}

      {/* Particles - ONLY on desktop devices */}
      {!isMobile && animationSettings.enableParticles && (
        <Suspense fallback={null}>
          <FormAttractorParticles />
        </Suspense>
      )}

      {/* Section Transitions - ONLY on desktop devices */}
      {!isMobile && animationSettings.enableTransitions && (
        <Suspense fallback={null}>
          <SectionTransitionEffect />
        </Suspense>
      )}

      <div
        ref={scrollContainerRef}
        id="app-scroll"
        className="overflow-y-scroll h-[100dvh]"
        style={{
          WebkitOverflowScrolling: 'touch',
          overscrollBehavior: 'contain',
          scrollBehavior: 'auto',
          scrollbarWidth: 'none' as const,
          msOverflowStyle: 'none' as const,
        }}
      >
        {/* Hero Section with optional video background */}
        <ErrorBoundary>
          <HeroSection
            enableVideo={true}
            videoUrl="https://www.youtube.com/embed/xpDcSdw--hg"
            mobileVideoUrl="https://www.youtube.com/embed/xpDcSdw--hg"
          />
        </ErrorBoundary>

        <div className="relative">
          {/* Background Animations - ONLY on desktop devices */}
          {!isMobile && animationSettings.enableParallax && (
            <Suspense fallback={null}>
              <BackgroundAnimations />
            </Suspense>
          )}

          {/* All below-fold sections wrapped in Suspense for lazy loading */}
          {/*
            CRO conversion journey — persuade before the enquiry. The closing
            funnel (Why Choose -> Process -> Lead Form) is kept contiguous so
            nothing interrupts the run-up to the form:
            Hero -> Key Benefits (outcomes) -> Gallery (proof of work)
            -> Testimonials (social proof) -> Products -> Transform -> Brands
            (what we build / premium systems) -> Social Proof (stat reassurance)
            -> Why Choose Swiftrooms (credibility) -> Process (how it works)
            -> Lead Form (the ask) -> Final CTA / Showroom -> FAQ
          */}
          <Suspense fallback={<SectionLoader />}>
            <ErrorBoundary>
              <KeyBenefitsSection />
            </ErrorBoundary>
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <ErrorBoundary>
              <GallerySection />
            </ErrorBoundary>
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <ErrorBoundary>
              <TestimonialsSection />
            </ErrorBoundary>
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <ErrorBoundary>
              <ProductsSection />
            </ErrorBoundary>
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <ErrorBoundary>
              <TransformYourSpaceSection />
            </ErrorBoundary>
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <ErrorBoundary>
              <BrandsSection />
            </ErrorBoundary>
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <ErrorBoundary>
              <SocialProofSection />
            </ErrorBoundary>
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <ErrorBoundary>
              <SwiftroomsSolutionSection />
            </ErrorBoundary>
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <ErrorBoundary>
              <ProcessSection />
            </ErrorBoundary>
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <ErrorBoundary>
              <FormSection />
            </ErrorBoundary>
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <ErrorBoundary>
              <FinalCTASection />
            </ErrorBoundary>
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <ErrorBoundary>
              <FAQSection />
            </ErrorBoundary>
          </Suspense>

          <Suspense fallback={null}>
            <ErrorBoundary>
              <CookieConsent />
            </ErrorBoundary>
          </Suspense>
        </div>

        <Suspense fallback={<SectionLoader />}>
          <ErrorBoundary>
            <Footer />
          </ErrorBoundary>
        </Suspense>
      </div>

      {/* Mobile-only sticky bottom CTA bar */}
      <Suspense fallback={null}>
        <StickyMobileCTA />
      </Suspense>
    </ErrorBoundary>
  );
}