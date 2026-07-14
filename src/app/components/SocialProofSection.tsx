import { motion } from 'motion/react';
import { Instagram } from 'lucide-react';
import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useMultiAxisScroll } from '../utils/useMultiAxisScroll';
import { InstagramVideoPlayer } from './InstagramVideoPlayer';
import { FloatingOrnament } from './FloatingOrnament';
import { ImmersiveBackgroundAnimations } from './ImmersiveBackgroundAnimations';

const stats = [
  { value: '3,400+', label: 'Happy Customers' },
  { value: '3,500+', label: 'Projects Completed' },
  { value: '14+', label: 'Years in the UAE' },
  { value: '70+', label: 'Team Members' },
  { value: '130+', label: 'Google Reviews' },
  { value: '4.4★', label: 'Google Rating' },
  { value: '2011', label: 'Established' },
  { value: 'Dubai', label: 'UAE Showroom' },
];

const communities = [
  ['Arabian Ranches', 'Palm Jumeirah'],
  ['Dubai Hills', 'Emirates Hills'],
  ['Jumeirah Islands', 'Saadiyat Islands'],
];

// Instagram Reels Data - Using placeholder videos that will autoplay
const instagramReels = [
  {
    id: 'iY7D1xLpTgk',
    videoUrl: 'https://www.youtube.com/embed/iY7D1xLpTgk',
    caption: 'Explore our full range of premium aluminium windows, sliding doors, bifolds and luxury glass systems — all under one roof. See the quality, feel the finishes, and get expert advice tailored to your project. Call or WhatsApp Yaseen: 056 307 1536',
    hashtags: ['#SWIFTROOMS', '#DubaiShowroom', '#DubaiHomes', '#AluminiumWindows', '#BifoldDoors'],
    likes: '2.4k',
    comments: '142',
    shares: '89',
    isYouTubeEmbed: true,
  },
  {
    id: '2PiuZIhVJ6g',
    videoUrl: 'https://www.youtube.com/embed/2PiuZIhVJ6g',
    caption: 'Planning to upgrade your home with new windows and doors? Contact us and take advantage of free plan and design service 📞✨ Call Murad @swiftrooms.murad +971 55 505 7319',
    hashtags: ['#swiftrooms', '#cortizo', '#windows', '#doors', '#dubairenovation'],
    likes: '3.1k',
    comments: '198',
    shares: '124',
    isYouTubeEmbed: true,
  },
  {
    id: 'UKKHuFRtLuI',
    videoUrl: 'https://www.youtube.com/embed/UKKHuFRtLuI',
    caption: 'Palm perfection. Another high-end bifold installation complete 🌴✨ DM us to transform your space',
    hashtags: ['#PalmJumeirah', '#BifoldDoors', '#SWIFTROOMS', '#LuxuryHomes', '#DubaiLiving', '#ArchitecturalDesign', '#ModernLiving', '#GlassDoors', '#HomeUpgrade'],
    likes: '2.8k',
    comments: '167',
    shares: '93',
    isYouTubeEmbed: true,
  },
  {
    id: 'rV0EnA0DinE',
    videoUrl: 'https://www.youtube.com/embed/rV0EnA0DinE',
    caption: 'Bifold installation in Damac Hills 🏡✨ Cortizo 6 Panel premium aluminium system for modern luxury living',
    hashtags: ['#damachills', '#BifoldDoors', '#Cortizo', '#AluminiumSystems'],
    likes: '3.5k',
    comments: '215',
    shares: '156',
    isYouTubeEmbed: true,
  },
  {
    id: 'lRxS5tV1EZ4',
    videoUrl: 'https://www.youtube.com/embed/lRxS5tV1EZ4',
    caption: 'Built over 10 years ago.. Still looks new today... 🏡✨ Premium quality that lasts @addressmontgomerie',
    hashtags: ['#swiftrooms', '#windows', '#dubairenovation', '#palmjumeirah', '#aluminium', '#conservatory'],
    likes: '4.2k',
    comments: '278',
    shares: '189',
    isYouTubeEmbed: true,
  },
];

export function SocialProofSection() {
  const [activeReel, setActiveReel] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  useMultiAxisScroll(scrollContainerRef);
  const [isScrollingHorizontally, setIsScrollingHorizontally] = useState(false);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const isScrollingRef = useRef(false);

  const totalReels = instagramReels.length;
  const infiniteReels = useMemo(() => [...instagramReels, ...instagramReels, ...instagramReels], []);

  // Check if mobile - ONLY on mount to avoid keyboard resize issues
  useEffect(() => {
    const mobile = window.innerWidth < 1024;
    setIsMobile(mobile);
  }, []);

  // Initialize scroll position to middle set - deferred to idle time
  useEffect(() => {
    if (!isMobile) return;

    const container = scrollContainerRef.current;
    if (!container) return;

    const idleCallback = 'requestIdleCallback' in window
      ? window.requestIdleCallback(() => {
          const slideWidth = container.offsetWidth;
          const initialPosition = totalReels * slideWidth;
          container.scrollLeft = initialPosition;
        })
      : window.setTimeout(() => {
          const slideWidth = container.offsetWidth;
          const initialPosition = totalReels * slideWidth;
          container.scrollLeft = initialPosition;
        }, 100);

    return () => {
      if ('cancelIdleCallback' in window) {
        window.cancelIdleCallback(idleCallback);
      } else {
        clearTimeout(idleCallback);
      }
    };
  }, [isMobile, totalReels]);

  // Handle scroll to update active dot on mobile and handle infinite loop
  useEffect(() => {
    if (!isMobile) return;

    const container = scrollContainerRef.current;
    if (!container) return;

    let scrollTimeout: number;

    const handleScroll = () => {
      if (isScrollingRef.current) return;

      clearTimeout(scrollTimeout as unknown as NodeJS.Timeout);
      scrollTimeout = setTimeout(() => {
        // Use requestAnimationFrame to prevent blocking main thread
        requestAnimationFrame(() => {
          const scrollLeft = container.scrollLeft;
          const slideWidth = container.offsetWidth;
          const currentPosition = Math.round(scrollLeft / slideWidth);

          setActiveReel(currentPosition % totalReels);

          // Reset position when reaching edges (with safety check)
          if (currentPosition <= 0 && scrollLeft > 0) {
            isScrollingRef.current = true;
            container.scrollLeft = totalReels * slideWidth;
            setTimeout(() => { isScrollingRef.current = false; }, 100);
          } else if (currentPosition >= totalReels * 2 && currentPosition < totalReels * 3) {
            isScrollingRef.current = true;
            container.scrollLeft = totalReels * slideWidth;
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
  }, [isMobile, totalReels]);

  // Smart touch handling - detect horizontal vs vertical scroll
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
    setIsScrollingHorizontally(false);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!touchStartRef.current) return;

    const deltaX = Math.abs(e.touches[0].clientX - touchStartRef.current.x);
    const deltaY = Math.abs(e.touches[0].clientY - touchStartRef.current.y);

    // Detect scroll direction with threshold
    if (deltaX > 10 || deltaY > 10) {
      // If horizontal movement is greater, lock to horizontal
      if (deltaX > deltaY * 1.5) {
        setIsScrollingHorizontally(true);
      }
      // If vertical movement is greater, allow page scroll
      else if (deltaY > deltaX) {
        setIsScrollingHorizontally(false);
      }
    }
  }, []);

  const handleTouchEnd = useCallback(() => {
    touchStartRef.current = null;
    setIsScrollingHorizontally(false);
  }, []);

  // Handle bar click to scroll to specific slide
  const scrollToSlide = useCallback((index: number) => {
    if (isMobile) {
      const container = scrollContainerRef.current;
      if (!container) return;

      const slideWidth = container.offsetWidth;
      const scrollPosition = (totalReels + index) * slideWidth;
      container.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    } else {
      // Desktop behavior
      setActiveReel(index);
    }
  }, [isMobile, totalReels]);

  return (
    <section id="social" className="relative bg-white min-h-screen overflow-hidden lg:snap-start flex items-start pt-20 lg:pt-24 pb-12">
      {/* Animated Background Ornaments - Only on Desktop */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {!isMobile && (
          <>
            <FloatingOrnament position="right" size="large" animationSpeed="slow" opacity={0.05} offsetY="-45%" />
            <FloatingOrnament position="left" size="medium" animationSpeed="fast" opacity={0.08} offsetY="-75%" />
            <ImmersiveBackgroundAnimations />
          </>
        )}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-30 py-4 lg:py-6">
        {/* Header */}
        {isMobile ? (
          <div className="relative text-center mb-4 z-40">
            <h2 className="font-heading text-base font-medium text-[#1c1c1e] mb-1 relative z-40">
              Our Portfolio
            </h2>
            <p className="font-body text-xs text-[#3a3a3c] mb-2 relative z-40">
              Watch our latest installations
            </p>
            <div className="inline-flex items-center gap-1.5 font-body text-[#007969] cursor-default relative z-40">
              <Instagram className="w-3.5 h-3.5" />
              <span className="font-medium text-xs">@swiftrooms.ae</span>
              <span className="text-[10px]">• Follow for more</span>
            </div>
          </div>
        ) : (
          <motion.div
            className="relative text-center mb-6 z-40"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading sr-heading font-semibold lg:font-medium lg:text-4xl text-[#1c1c1e] mb-2 lg:mb-2 relative z-40">
              Our Portfolio
            </h2>
            <p className="font-body text-xs lg:text-base text-[#3a3a3c] mb-2 lg:mb-3 relative z-40">
              Watch our latest installations
            </p>
            <div className="inline-flex items-center gap-1.5 font-body text-[#007969] cursor-default relative z-40">
              <Instagram className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
              <span className="font-medium text-xs lg:text-sm">@swiftrooms.ae</span>
              <span className="text-[10px] lg:text-xs">• Follow for more</span>
            </div>
          </motion.div>
        )}
        
        <div className="relative grid lg:grid-cols-2 gap-6 lg:gap-8 items-start">
          {/* Instagram Reels/Videos */}
          <div className="relative">
            {/* Mobile: Horizontal Scroll */}
            <div className="lg:hidden">
              <div
                ref={scrollContainerRef}
                className="flex overflow-x-auto scrollbar-hide"
                style={{
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                  WebkitOverflowScrolling: 'touch',
                  // pan-y: vertical page scroll passes through; horizontal handled by useMultiAxisScroll
                  touchAction: 'pan-y',
                  scrollBehavior: 'auto',
                  willChange: 'scroll-position',
                  overscrollBehavior: 'contain',
                  pointerEvents: 'auto',
                }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {infiniteReels.map((reel, index) => (
                  <div
                    key={`reel-${index}`}
                    className="flex-shrink-0 w-full px-2"
                    style={{ touchAction: 'auto' }}
                  >
                    <div className="max-w-[320px] mx-auto">
                      <InstagramVideoPlayer
                        videoUrl={reel.videoUrl}
                        caption={reel.caption}
                        hashtags={reel.hashtags}
                        likes={reel.likes}
                        comments={reel.comments}
                        shares={reel.shares}
                        isInstagramEmbed={reel.isYouTubeEmbed}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Mobile Sliding Bar Indicators */}
              <div className="flex justify-center gap-2 mt-4">
                {instagramReels.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => scrollToSlide(index)}
                    className="flex items-center justify-center h-11 px-1 -my-4"
                    aria-label={`Go to video ${index + 1}`}
                  >
                    <span
                      className={`block rounded-full transition-all duration-300 ${
                        activeReel === index
                          ? 'bg-[#007969] w-8 h-2'
                          : 'bg-gray-300 hover:bg-[#007969]/50 w-2 h-2'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Desktop: Original Layout */}
            <motion.div
              className="hidden lg:block max-w-[320px] mx-auto lg:mx-0"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Main Featured Reel - Full Instagram Embed with Social Data */}
              <div className="relative mb-3">
                <InstagramVideoPlayer
                  key={activeReel}
                  videoUrl={instagramReels[activeReel].videoUrl}
                  caption={instagramReels[activeReel].caption}
                  hashtags={instagramReels[activeReel].hashtags}
                  likes={instagramReels[activeReel].likes}
                  comments={instagramReels[activeReel].comments}
                  shares={instagramReels[activeReel].shares}
                  isInstagramEmbed={instagramReels[activeReel].isYouTubeEmbed}
                />
              </div>

              {/* Desktop: Reel Selector Buttons */}
              <div className="flex gap-2 justify-center">
                {instagramReels.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => scrollToSlide(index)}
                    className={`w-8 h-8 lg:w-10 lg:h-10 rounded-lg border-2 transition-all duration-300 ${
                      activeReel === index
                        ? 'border-[#007969] bg-[#007969]/10 scale-110'
                        : 'border-gray-300 hover:border-[#007969] hover:bg-[#007969]/5'
                    }`}
                    aria-label={`View reel ${index + 1}`}
                  >
                    <div className="flex items-center justify-center">
                      <div className={`w-4 h-4 lg:w-5 lg:h-5 rounded flex items-center justify-center ${
                        activeReel === index ? 'bg-[#007969]' : 'bg-gray-400'
                      }`}>
                        <svg className="w-2 h-2 lg:w-2.5 lg:h-2.5 text-white" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M3 2v12l10-6L3 2z"/>
                        </svg>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* View More Button */}
              <motion.div
                className="text-center mt-4 lg:mt-5"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
              >
                <div className="inline-flex items-center gap-1.5 px-4 py-2 lg:px-5 lg:py-2.5 bg-gradient-to-r from-[#007969] to-[#007969] text-white rounded-full font-body text-xs lg:text-sm font-medium shadow-lg cursor-default">
                  <Instagram className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                  Watch All Reels
                </div>
              </motion.div>
            </motion.div>

            {/* Mobile: View More Button */}
            <div className="lg:hidden text-center mt-4">
              <div className="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-[#007969] to-[#007969] text-white rounded-full font-body text-xs font-medium shadow-lg cursor-default">
                <Instagram className="w-3.5 h-3.5" />
                Watch All Reels
              </div>
            </div>
          </div>

          {/* Stats and Communities */}
          {isMobile ? (
            <div className="relative space-y-6">
              {/* Heading */}
              <div className="relative">
                <div className="divider-brand mb-3" />
                <h3 className="font-heading text-xl font-semibold text-[#1c1c1e] mb-2 tracking-tight">
                  Real Projects, Real Results
                </h3>
                <p className="font-body text-sm text-[#3a3a3c] leading-relaxed">
                  Transforming homes across Dubai's most prestigious communities.
                </p>
              </div>

              {/* Stats Grid */}
              <div className="relative grid grid-cols-2 gap-3">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="relative bg-white px-4 py-5 rounded-xl border border-[#e5e7eb] card-hover flex flex-col items-center justify-center text-center"
                  >
                    <div className="font-heading font-bold text-3xl sm:text-4xl text-[#007969] leading-none mb-1.5 break-words max-w-full">
                      {stat.value}
                    </div>
                    <div className="font-body text-xs text-[#6b7280] leading-snug">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Featured Communities */}
              <div className="relative">
                <h4 className="text-label text-[#6b7280] mb-3">
                  Featured Communities
                </h4>
                <div className="relative grid grid-cols-2 gap-2.5">
                  {communities.flat().map((community) => (
                    <div
                      key={community}
                      className="relative flex items-center gap-2 bg-white px-3 py-2.5 rounded-lg border border-[#e5e7eb]"
                    >
                      <span className="text-[#007969] font-body text-sm leading-none">✓</span>
                      <span className="font-body text-xs text-[#3a3a3c] leading-tight">
                        {community}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <motion.div
              className="relative space-y-6"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {/* Heading */}
              <div className="relative">
                <h3 className="font-heading text-lg lg:text-2xl font-medium text-[#1c1c1e] mb-2 lg:mb-3">
                  Real Projects, Real Results
                </h3>
                <p className="font-body text-xs lg:text-sm text-[#3a3a3c] leading-relaxed">
                  Transforming homes across Dubai's most prestigious communities.
                </p>
              </div>

              {/* Stats Grid */}
              <div className="relative grid grid-cols-2 gap-3">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="relative bg-white p-3 lg:p-4 rounded-xl border border-[#e5e7eb] card-hover flex flex-col items-center justify-center text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    whileHover={{ y: -2, transition: { duration: 0.2 } }}
                  >
                    <div className="font-heading font-bold text-2xl lg:text-3xl text-[#007969] leading-tight mb-1">
                      {stat.value}
                    </div>
                    <div className="font-body text-xs lg:text-sm text-[#3a3a3c]">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Featured Communities */}
              <div className="relative">
                <h4 className="font-heading text-sm lg:text-lg font-medium text-[#1c1c1e] mb-2 lg:mb-3">
                  Featured Communities
                </h4>
                <div className="relative space-y-2">
                  {communities.map((row, rowIndex) => (
                    <div key={rowIndex} className="relative grid grid-cols-2 gap-3">
                      {row.map((community, colIndex) => (
                        <motion.div
                          key={community}
                          className="relative flex items-center gap-1.5"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 1 + rowIndex * 0.1 + colIndex * 0.05 }}
                        >
                          <span className="text-[#007969] font-body text-xs">✓</span>
                          <span className="font-body text-xs lg:text-sm text-[#3a3a3c]">
                            {community}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}