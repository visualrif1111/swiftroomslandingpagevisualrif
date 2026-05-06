import { useState, useRef, useEffect, forwardRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'motion/react';
import { useMultiAxisScroll } from '../utils/useMultiAxisScroll';
import { Instagram, ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import svgPaths from '../../imports/svg-tso0h1bvi5';

// Import gallery images from Figma
import imgComponent40 from "figma:asset/543f4bf8a25135f8a5309f98469cc735abb51163.png";
import imgScreenshot from "figma:asset/d5f8b1fa2f31142d3146b34b31993458dfa20d62.png";
import imgComponent41 from "figma:asset/fb642fa8b0498c0c18344a88c44a5659d3d9a1a7.png";
import imgComponent42 from "figma:asset/b652f7273996c3088ffbdf6b375a00ac50d72203.png";
import imgComponent44 from "figma:asset/1cac0798dde90459c7d50ecdaa36c478c66f709a.png";
import imgComponent45 from "figma:asset/22dea6c44e167d98c69bc78a430be9dee74811ba.png";
import imgComponent46 from "figma:asset/47aeaa3e673d1d2bb9b8c4e57078e17afa3e3b37.png";
import imgGroup143726098 from "figma:asset/639a0701a47d0ff247dfd6029da5b3d5e4976a0d.png";
import imgComponent48 from "figma:asset/e49332f3e7c1bcb35ae200ff9618a5d4cde800e5.png";
import imgComponent49 from "figma:asset/464d9fe1b70fd273266d99bf2014729adeaada53.png";
import imgComponent50 from "figma:asset/2a076fc1e8f572becd354b35b7727696183b5436.png";
import imgComponent51 from "figma:asset/c568cc5308d6af54e01491f1a0397cfe754bf68d.png";
import imgComponent52 from "figma:asset/7bc7f4a248e23f904fc8529f0c110383f1db67c0.png";
import imgComponent53 from "figma:asset/4db06d323b51658b3160642751a1dff35e2e6663.png";

// Gallery images showcasing SWIFTROOMS projects - Starting with second image from left as center
const galleryImages = [
  {
    id: 1,
    url: imgComponent40,
    alt: 'SWIFTROOMS premium aluminum structure project',
    location: 'SWIFTROOMS',
    description: 'Premium aluminum structure project',
  },
  {
    id: 2,
    url: imgScreenshot,
    alt: 'Modern luxury home exterior with SWIFTROOMS aluminum installations',
    location: 'LUXURY HOME',
    description: 'Modern exterior with aluminum installations',
  },
  {
    id: 3,
    url: imgComponent41,
    alt: 'Contemporary villa with premium aluminum windows and doors',
    location: 'CONTEMPORARY VILLA',
    description: 'Premium aluminum windows and doors',
  },
  {
    id: 4,
    url: imgComponent42,
    alt: 'JUMEIRAH GOLF ESTATES - Luxury aluminum structure project',
    location: 'JUMEIRAH GOLF ESTATES',
    description: 'Luxury aluminum structure project',
  },
  {
    id: 5,
    url: imgComponent44,
    alt: 'DUBAI HILLS - Premium residential aluminum installation',
    location: 'DUBAI HILLS',
    description: 'Premium residential aluminum installation',
  },
  {
    id: 6,
    url: imgComponent45,
    alt: 'PALM JUMEIRAH - Exclusive aluminum doors and windows',
    location: 'PALM JUMEIRAH',
    description: 'Exclusive aluminum doors and windows',
  },
  {
    id: 7,
    url: imgComponent46,
    alt: 'THE MEADOWS - High-end aluminum structure solutions',
    location: 'THE MEADOWS',
    description: 'High-end aluminum structure solutions',
  },
  {
    id: 8,
    url: imgGroup143726098,
    alt: 'PHILLIAS FOGGS - Custom aluminum installations',
    location: 'PHILLIAS FOGGS',
    description: 'Custom aluminum installations',
  },
  {
    id: 9,
    url: imgComponent48,
    alt: 'THE SPRINGS - Modern aluminum architectural design',
    location: 'THE SPRINGS',
    description: 'Modern aluminum architectural design',
  },
  {
    id: 10,
    url: imgComponent49,
    alt: 'AL BARARI - THE NEST - Premium aluminum structures',
    location: 'AL BARARI - THE NEST',
    description: 'Premium aluminum structures',
  },
  {
    id: 11,
    url: imgComponent50,
    alt: 'UMM SEQUIMM - Contemporary aluminum installations',
    location: 'UMM SEQUIMM',
    description: 'Contemporary aluminum installations',
  },
  {
    id: 12,
    url: imgComponent51,
    alt: 'DAMAC HILLS - Luxury aluminum doors and windows',
    location: 'DAMAC HILLS',
    description: 'Luxury aluminum doors and windows',
  },
  {
    id: 13,
    url: imgComponent52,
    alt: 'DAMAC HILLS - Modern aluminum structure project',
    location: 'DAMAC HILLS',
    description: 'Modern aluminum structure project',
  },
  {
    id: 14,
    url: imgComponent53,
    alt: 'ARABIAN RANCHES - Premium aluminum architectural solutions',
    location: 'ARABIAN RANCHES',
    description: 'Premium aluminum architectural solutions',
  },
];

interface GalleryImageProps {
  image: typeof galleryImages[0];
  offset: number;
  isCenter: boolean;
  onClick: () => void;
  width: number;
  height: number;
  scale: number;
  opacity: number;
  zIndex: number;
  xOffset: number;
  onImageDragStart?: () => void;
  onImageDragEnd?: (event: any, info: any) => void;
}

const GalleryImage = forwardRef<HTMLDivElement, GalleryImageProps>(({
  image,
  offset,
  isCenter,
  onClick,
  width,
  height,
  scale,
  opacity,
  zIndex,
  xOffset,
  onImageDragStart,
  onImageDragEnd,
}, ref) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDraggingImage, setIsDraggingImage] = useState(false);
  
  // Mouse position tracking for parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Smooth spring animations for parallax
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), {
    stiffness: 150,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), {
    stiffness: 150,
    damping: 20,
  });
  
  // Enhanced parallax for image content
  const imageX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-18, 18]), {
    stiffness: 200,
    damping: 25,
  });
  const imageY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-18, 18]), {
    stiffness: 200,
    damping: 25,
  });

  // Dynamic shadow based on mouse position
  const shadowX = useTransform(mouseX, [-0.5, 0.5], [-20, 20]);
  const shadowY = useTransform(mouseY, [-0.5, 0.5], [-20, 20]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDraggingImage) return; // Don't update parallax while dragging
    
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Normalize mouse position to -0.5 to 0.5 range
    const x = (e.clientX - centerX) / rect.width;
    const y = (e.clientY - centerY) / rect.height;
    
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleDragStart = () => {
    setIsDraggingImage(true);
    onImageDragStart?.();
  };

  const handleDragEnd = (event: any, info: any) => {
    setIsDraggingImage(false);
    onImageDragEnd?.(event, info);
  };

  return (
    <motion.div
      ref={ref}
      className="absolute"
      style={{
        zIndex: isHovered && !isCenter ? Math.min(zIndex + 5, 25) : zIndex, // Cap hover z-index below center
        width: `${width}px`,
        height: `${width}px`, // Changed to use width for perfect 1:1 ratio
        perspective: 1500,
        cursor: isDraggingImage ? 'grabbing' : (isHovered ? 'grab' : 'pointer'),
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        x: xOffset,
        scale: isHovered ? scale * 1.08 : scale,
        opacity: isHovered ? Math.min(opacity * 1.3, 1) : opacity,
      }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{
        type: 'spring',
        stiffness: 200,
        damping: 25,
        duration: 0.5,
      }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.2}
      dragMomentum={true}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onClick={(e) => {
        if (!isDraggingImage) {
          onClick();
        }
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="relative overflow-hidden w-full h-full"
        style={{
          rotateX: !isDraggingImage && isCenter && isHovered ? rotateX : 0,
          rotateY: !isDraggingImage && isCenter && isHovered ? rotateY : 0,
          transformStyle: 'preserve-3d',
          boxShadow: isCenter && isHovered
            ? '0 40px 80px -20px rgba(0, 136, 115, 0.5), 0 0 40px rgba(0, 136, 115, 0.3)'
            : '0 20px 25px -5px rgba(0, 0, 0, 0.3)',
        }}
        animate={{
          z: isCenter && isHovered ? 50 : 0,
        }}
        whileHover={!isCenter ? { scale: 1.05, y: -5 } : {}}
        transition={{ duration: 0.3 }}
      >
        {/* Subtle glow effect on center hover */}
        {isCenter && isHovered && !isDraggingImage && (
          <motion.div
            className="absolute inset-0 z-0 rounded-xl"
            style={{
              background: 'radial-gradient(circle at center, rgba(0, 136, 115, 0.1), transparent 70%)',
              filter: 'blur(15px)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}

        {/* Image with enhanced parallax movement and brightness enhancement */}
        <motion.div
          className="w-full h-full relative z-[2]"
          style={{
            x: !isDraggingImage && isCenter ? imageX : 0,
            y: !isDraggingImage && isCenter ? imageY : 0,
            scale: !isDraggingImage && isCenter && isHovered ? 1.08 : 1,
          }}
          animate={{
            filter: isCenter && isHovered 
              ? 'brightness(1.15) contrast(1.2) saturate(1.1)'
              : 'brightness(1) contrast(1) saturate(1)',
          }}
          transition={{ 
            scale: { duration: 0.3 },
            filter: { duration: 0.3 }
          }}
        >
          <div
            className="w-full h-full"
            style={{
              transform: !isDraggingImage && isCenter && isHovered ? 'scale(1.03)' : 'scale(1)',
              transition: 'transform 0.6s ease-out',
            }}
          >
            <ImageWithFallback
              src={image.url}
              alt={image.alt}
              className="w-full h-full object-cover pointer-events-none"
            />
          </div>
        </motion.div>
        
        {/* Dynamic gradient overlay */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-[3]"
          style={{
            background: isCenter && isHovered
              ? 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(0, 136, 115, 0.2), transparent 60%)'
              : isCenter 
                ? 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(0, 136, 115, 0.15), transparent 60%)'
                : 'linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.3))',
          }}
        />

        {/* Enhanced shimmer effect on hover */}
        {isHovered && isCenter && !isDraggingImage && (
          <motion.div
            className="absolute inset-0 pointer-events-none z-[5]"
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{
              duration: 2,
              ease: 'easeInOut',
              repeat: Infinity,
              repeatDelay: 3,
            }}
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), transparent)',
            }}
          />
        )}

        {/* Enhanced border glow on center image */}
        {isCenter && (
          <motion.div
            className="absolute inset-0 rounded-xl pointer-events-none z-[6]"
            style={{
              boxShadow: isHovered 
                ? 'inset 0 0 20px rgba(0, 136, 115, 0.2), inset 0 0 5px rgba(255, 255, 255, 0.15)'
                : 'inset 0 0 10px rgba(0, 136, 115, 0.1)',
            }}
            transition={{ duration: 0.3 }}
          />
        )}

        {/* Drag indicator - shows when hovering */}
        {isHovered && !isDraggingImage && (
          <motion.div
            className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-3 py-1.5 rounded-full font-['Inter',sans-serif] text-xs font-medium pointer-events-none"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <span className="flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8L22 12L18 16M6 8L2 12L6 16"/>
              </svg>
              {isCenter ? 'Drag to navigate' : 'Click to view'}
            </span>
          </motion.div>
        )}

        {/* Info overlay for center image on hover */}
        {isCenter && isHovered && !isDraggingImage && (
          <motion.div
            className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/60 to-transparent pointer-events-none z-[7]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-white font-['Exo',sans-serif] font-semibold text-lg mb-1.5 tracking-wide">
              {image.location}
            </h3>
            <p className="text-white/90 font-['Barlow',sans-serif] text-sm leading-relaxed">
              {image.description}
            </p>
          </motion.div>
        )}

        {/* Click indicator for side images */}
        {!isCenter && isHovered && !isDraggingImage && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-black/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white/90 text-[#008873] px-4 py-2 rounded-full font-['Inter',sans-serif] font-medium text-sm"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              Click to view
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
});

export function GallerySection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  useMultiAxisScroll(scrollContainerRef);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [transitionVariant, setTransitionVariant] = useState<'fade' | 'slide' | 'zoom' | 'rotate' | 'flip'>('fade');
  const isScrollingRef = useRef(false);

  const totalImages = galleryImages.length;
  const infiniteImages = useMemo(() => [...galleryImages, ...galleryImages, ...galleryImages], []);

  // Background parallax effect
  const mouseXBg = useMotionValue(0);
  const mouseYBg = useMotionValue(0);
  const bgX = useSpring(useTransform(mouseXBg, [0, 1], [-20, 20]), { stiffness: 50, damping: 20 });
  const bgY = useSpring(useTransform(mouseYBg, [0, 1], [-20, 20]), { stiffness: 50, damping: 20 });

  // Continuous drag position for fluid carousel navigation
  const dragX = useMotionValue(0);
  const dragProgress = useSpring(dragX, { 
    stiffness: 300, 
    damping: 30,
    mass: 0.8
  });

  // Calculate continuous carousel position
  const carouselPosition = useTransform(dragProgress, (latest) => {
    const imageWidth = 700; // Base distance between images
    return -currentIndex * imageWidth + latest;
  });

  // CAD pattern animations - react to drag
  const leftPatternX = useTransform(dragX, [-200, 200], [-30, 30]);
  const rightPatternX = useTransform(dragX, [-200, 200], [30, -30]);

  // Initialize scroll position to middle set - deferred to idle time
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const idleCallback = 'requestIdleCallback' in window
      ? window.requestIdleCallback(() => {
          const slideWidth = container.offsetWidth;
          const initialPosition = totalImages * slideWidth;
          container.scrollLeft = initialPosition;
        })
      : window.setTimeout(() => {
          const slideWidth = container.offsetWidth;
          const initialPosition = totalImages * slideWidth;
          container.scrollLeft = initialPosition;
        }, 100);

    return () => {
      if ('cancelIdleCallback' in window) {
        window.cancelIdleCallback(idleCallback);
      } else {
        clearTimeout(idleCallback);
      }
    };
  }, [totalImages]);

  // Handle scroll to update active dot on mobile and handle infinite loop
  useEffect(() => {
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

          setCurrentIndex(currentPosition % totalImages);

          // Reset position when reaching edges (with safety check)
          if (currentPosition <= 0 && scrollLeft > 0) {
            isScrollingRef.current = true;
            container.scrollLeft = totalImages * slideWidth;
            setTimeout(() => { isScrollingRef.current = false; }, 100);
          } else if (currentPosition >= totalImages * 2 && currentPosition < totalImages * 3) {
            isScrollingRef.current = true;
            container.scrollLeft = totalImages * slideWidth;
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
  }, [totalImages]);

  // Handle mouse move for background parallax
  const handleSectionMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) return; // Don't update background parallax while dragging
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    mouseXBg.set(x);
    mouseYBg.set(y);
  };

  // Handle dot click to scroll to specific slide on mobile
  const scrollToSlide = useCallback((index: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const slideWidth = container.offsetWidth;
    const scrollPosition = (totalImages + index) * slideWidth;
    container.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    });
  }, [totalImages]);

  // Navigate to next/previous image with creative transitions
  const goNext = useCallback(() => {
    const transitions: Array<'fade' | 'slide' | 'zoom' | 'rotate' | 'flip'> = ['fade', 'slide', 'zoom', 'rotate', 'flip'];
    const randomTransition = transitions[Math.floor(Math.random() * transitions.length)]!;
    setTransitionVariant(randomTransition);
    setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
    dragX.set(0);
  }, [dragX]);

  const goPrev = useCallback(() => {
    const transitions: Array<'fade' | 'slide' | 'zoom' | 'rotate' | 'flip'> = ['fade', 'slide', 'zoom', 'rotate', 'flip'];
    const randomTransition = transitions[Math.floor(Math.random() * transitions.length)]!;
    setTransitionVariant(randomTransition);
    setCurrentIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
    dragX.set(0);
  }, [dragX]);

  // Handle drag with momentum and free movement
  const handleDragEnd = (_event: any, info: any) => {
    setIsDragging(false);
    
    const offset = info.offset.x;
    const velocity = info.velocity.x;
    
    // More lenient thresholds for natural feeling
    const swipeThreshold = 50; // Reduced from 100
    const velocityThreshold = 300; // Reduced from 500
    
    // Calculate how many images to skip based on velocity and distance
    const dragDistance = Math.abs(offset);
    const imagesToSkip = Math.max(1, Math.floor(dragDistance / 200));
    
    // Select creative transition for drag interactions
    const transitions: Array<'fade' | 'slide' | 'zoom' | 'rotate' | 'flip'> = ['slide', 'zoom', 'rotate'];
    const randomTransition = transitions[Math.floor(Math.random() * transitions.length)]!;
    setTransitionVariant(randomTransition);
    
    // High velocity = skip multiple images for momentum feel
    if (Math.abs(velocity) > 1000) {
      const skipCount = Math.min(3, Math.ceil(Math.abs(velocity) / 1000));
      if (velocity > 0) {
        setCurrentIndex((prev) => (prev - skipCount + galleryImages.length) % galleryImages.length);
      } else {
        setCurrentIndex((prev) => (prev + skipCount) % galleryImages.length);
      }
      dragX.set(0);
    }
    // Medium drag or velocity
    else if (offset > swipeThreshold || velocity > velocityThreshold) {
      setCurrentIndex((prev) => (prev - imagesToSkip + galleryImages.length) % galleryImages.length);
      dragX.set(0);
    } else if (offset < -swipeThreshold || velocity < -velocityThreshold) {
      setCurrentIndex((prev) => (prev + imagesToSkip) % galleryImages.length);
      dragX.set(0);
    } else {
      // Gentle snap back with spring physics
      dragX.set(0);
    }
  };

  // Calculate all gallery images in infinite loop
  const getInfiniteItems = () => {
    const items = [];
    const visibleRange = 4; // Show more images for smoother scroll
    
    for (let i = -visibleRange; i <= visibleRange; i++) {
      const index = (currentIndex + i + galleryImages.length) % galleryImages.length;
      items.push({
        ...galleryImages[index],
        offset: i,
        actualIndex: index,
        uniqueKey: `carousel-${currentIndex}-offset-${i}`, // Unique key based on current position and offset
      });
    }
    return items;
  };

  const infiniteItems = getInfiniteItems();

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="relative bg-gradient-to-b from-white via-gray-50 to-white h-screen lg:min-h-screen overflow-y-auto lg:overflow-hidden lg:snap-center flex items-center py-6 lg:pt-32 lg:pb-48"
      onMouseMove={handleSectionMouseMove}
    >
      {/* Animated background elements */}
      <motion.div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          x: bgX,
          y: bgY,
        }}
      >
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#008873]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-[#008873]/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-[#008873]/5 rounded-full blur-2xl" />
      </motion.div>

      {/* Interactive CAD Pattern Graphic - Reacts to Gallery State */}
      <motion.div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{
          opacity: isDragging ? 0.15 : 0.08,
        }}
        animate={{
          opacity: isDragging ? 0.15 : 0.08,
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Center diamond pattern - rotates with currentIndex */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          animate={{
            rotate: currentIndex * 51.43, // 360 / 7 = 51.43° per image
            scale: isDragging ? 1.1 : 1,
          }}
          transition={{
            rotate: { type: 'spring', stiffness: 100, damping: 20 },
            scale: { duration: 0.3 },
          }}
        >
          <svg className="w-[500px] h-[500px]" fill="none" preserveAspectRatio="none" viewBox="0 0 2552.46 1064.63">
            <g transform="translate(1000, 350) scale(0.3)">
              <motion.g
                animate={{
                  opacity: [0.4, 0.7, 0.4],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <path d={svgPaths.p230b9600} fill="#007969" />
                <path d={svgPaths.p132b7f00} fill="#007969" />
                <path d={svgPaths.p116d4d40} fill="#007969" />
                <path d={svgPaths.p32efee80} fill="#007969" />
                <path d={svgPaths.p2fd18570} fill="#007969" />
              </motion.g>
            </g>
          </svg>
        </motion.div>

        {/* Left diamond pattern - counter-rotates */}
        <motion.div
          className="absolute left-[10%] top-1/2 -translate-y-1/2"
          animate={{
            rotate: -currentIndex * 51.43,
            x: isDragging ? -20 : 0,
            scale: isDragging ? 0.9 : 0.8,
          }}
          transition={{
            rotate: { type: 'spring', stiffness: 80, damping: 18 },
            x: { duration: 0.3 },
            scale: { duration: 0.3 },
          }}
          style={{
            x: leftPatternX,
          }}
        >
          <svg className="w-[300px] h-[300px]" fill="none" preserveAspectRatio="none" viewBox="0 0 2552.46 1064.63">
            <g transform="translate(1000, 350) scale(0.18)">
              <motion.g
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.5,
                }}
              >
                <path d={svgPaths.p25d1c780} fill="#007969" />
                <path d={svgPaths.p3867bf00} fill="#007969" />
                <path d={svgPaths.p33920100} fill="#007969" />
                <path d={svgPaths.p30cd6e00} fill="#007969" />
              </motion.g>
            </g>
          </svg>
        </motion.div>

        {/* Right diamond pattern - rotates with gallery */}
        <motion.div
          className="absolute right-[10%] top-1/2 -translate-y-1/2"
          animate={{
            rotate: currentIndex * 51.43,
            x: isDragging ? 20 : 0,
            scale: isDragging ? 0.9 : 0.8,
          }}
          transition={{
            rotate: { type: 'spring', stiffness: 80, damping: 18 },
            x: { duration: 0.3 },
            scale: { duration: 0.3 },
          }}
          style={{
            x: rightPatternX,
          }}
        >
          <svg className="w-[300px] h-[300px]" fill="none" preserveAspectRatio="none" viewBox="0 0 2552.46 1064.63">
            <g transform="translate(1000, 350) scale(0.18)">
              <motion.g
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 1,
                }}
              >
                <path d={svgPaths.p31983800} fill="#007969" />
                <path d={svgPaths.p17123040} fill="#007969" />
                <path d={svgPaths.p1341a540} fill="#007969" />
                <path d={svgPaths.p263b2f80} fill="#007969" />
              </motion.g>
            </g>
          </svg>
        </motion.div>

        {/* Top-left corner accent */}
        <motion.div
          className="absolute left-[5%] top-[15%]"
          animate={{
            rotate: -currentIndex * 25.71, // Half speed rotation
            scale: isDragging ? 1.05 : 0.9,
          }}
          transition={{
            rotate: { type: 'spring', stiffness: 60, damping: 15 },
            scale: { duration: 0.3 },
          }}
        >
          <svg className="w-[180px] h-[180px]" fill="none" preserveAspectRatio="none" viewBox="0 0 2552.46 1064.63">
            <g transform="translate(1000, 350) scale(0.1)">
              <motion.g
                animate={{
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <path d={svgPaths.pbb49900} fill="#007969" />
                <path d={svgPaths.p22c4700} fill="#007969" />
              </motion.g>
            </g>
          </svg>
        </motion.div>

        {/* Bottom-right corner accent */}
        <motion.div
          className="absolute right-[5%] bottom-[15%]"
          animate={{
            rotate: currentIndex * 25.71,
            scale: isDragging ? 1.05 : 0.9,
          }}
          transition={{
            rotate: { type: 'spring', stiffness: 60, damping: 15 },
            scale: { duration: 0.3 },
          }}
        >
          <svg className="w-[180px] h-[180px]" fill="none" preserveAspectRatio="none" viewBox="0 0 2552.46 1064.63">
            <g transform="translate(1000, 350) scale(0.1)">
              <motion.g
                animate={{
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 2,
                }}
              >
                <path d={svgPaths.p30ad6100} fill="#007969" />
                <path d={svgPaths.pa184b00} fill="#007969" />
              </motion.g>
            </g>
          </svg>
        </motion.div>

        {/* Floating elements - react to drag momentum */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`float-${i}`}
            className="absolute"
            style={{
              left: `${15 + i * 18}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 180, 360],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 6 + i,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.5,
            }}
          >
            <svg className="w-[80px] h-[80px]" fill="none" preserveAspectRatio="none" viewBox="0 0 2552.46 1064.63">
              <g transform="translate(1200, 450) scale(0.05)">
                <path d={svgPaths.p3edc9880} fill="#007969" />
                <path d={svgPaths.p193f3300} fill="#007969" />
              </g>
            </svg>
          </motion.div>
        ))}

        {/* Transition variant indicator pattern */}
        <motion.div
          className="absolute left-1/2 top-[10%] -translate-x-1/2"
          animate={{
            scale: transitionVariant === 'zoom' ? [1, 1.2, 1] : 1,
            rotate: transitionVariant === 'rotate' ? [0, 360] : 0,
            opacity: transitionVariant === 'fade' ? [0.3, 0.6, 0.3] : 0.4,
          }}
          transition={{
            duration: 1.5,
            ease: 'easeInOut',
          }}
        >
          <svg className="w-[120px] h-[120px]" fill="none" preserveAspectRatio="none" viewBox="0 0 2552.46 1064.63">
            <g transform="translate(1100, 400) scale(0.08)">
              <path d={svgPaths.p26c62200} fill="#007969" />
              <path d={svgPaths.p3b9ebe00} fill="#007969" />
            </g>
          </svg>
        </motion.div>
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-4 lg:px-16 w-full z-10">
        {/* Header - Matching Portfolio Section Style */}
        <motion.div
          className="text-center mb-6 lg:mb-16 mt-0 lg:mt-0"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Heading */}
          <motion.h2
            className="font-['Exo',sans-serif] font-medium text-base lg:text-4xl text-[#1c1c1e] mb-1 lg:mb-2"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            Our Gallery
          </motion.h2>

          {/* Paragraph */}
          <p className="font-['Barlow',sans-serif] text-xs lg:text-base text-[#3a3a3c] mb-1.5 lg:mb-3 px-4">
            Feel free to browse our work
          </p>

          {/* Instagram Link */}
          <motion.a
            href="https://www.instagram.com/swiftrooms.ae/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 font-['Inter',sans-serif] text-[#008873] hover:text-[#007969] transition-colors text-xs lg:text-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Instagram className="w-3.5 h-3.5 lg:w-5 lg:h-5" />
            <span className="tracking-tight text-[11px] lg:text-sm">
              @swiftrooms
            </span>
            <span className="text-[10px] lg:text-xs">
              • Follow us for more
            </span>
          </motion.a>
        </motion.div>

        {/* Desktop Fan Layout */}
        <div className="hidden lg:block relative">
          {/* Draggable Container */}
          <motion.div
            className="relative h-[600px] flex items-center justify-center select-none"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            dragMomentum={true}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={handleDragEnd}
            style={{
              x: dragX,
              cursor: isDragging ? 'grabbing' : 'grab',
            }}
          >
            <AnimatePresence mode="popLayout">
              {infiniteItems.map((item) => {
                const offset = item.offset;
                const isCenter = offset === 0;

                // Calculate positions and styles based on offset - embedded/stacked design with comfortable spacing
                let scale, opacity, zIndex, xOffset, width, height;

                if (offset === 0) {
                  scale = 1;
                  opacity = 1;
                  zIndex = 30;
                  xOffset = 0;
                  width = 550; // Reduced from 800 for small laptops
                  height = 500;
                } else if (offset === -1) {
                  scale = 0.75;
                  opacity = 0.6;
                  zIndex = 20;
                  xOffset = -320; // Reduced spacing for small screens
                  width = 380; // Reduced from 500
                  height = 400;
                } else if (offset === 1) {
                  scale = 0.75;
                  opacity = 0.7;
                  zIndex = 20;
                  xOffset = 320; // Reduced spacing for small screens
                  width = 380; // Reduced from 500
                  height = 400;
                } else if (offset === -2) {
                  scale = 0.5;
                  opacity = 0.3;
                  zIndex = 10;
                  xOffset = -520; // Reduced from -660
                  width = 280; // Reduced from 350
                  height = 300;
                } else {
                  scale = 0.5;
                  opacity = 0.2;
                  zIndex = 10;
                  xOffset = 520; // Reduced from 660
                  width = 280; // Reduced from 350
                  height = 300;
                }

                return (
                  <GalleryImage
                    key={item.uniqueKey}
                    image={item}
                    offset={offset}
                    isCenter={isCenter}
                    onClick={() => {
                      if (!isCenter && !isDragging) {
                        const targetIndex = galleryImages.findIndex((img) => img.id === item.id);
                        setCurrentIndex(targetIndex);
                        dragX.set(0);
                      }
                    }}
                    width={width}
                    height={height}
                    scale={scale}
                    opacity={opacity}
                    zIndex={zIndex}
                    xOffset={xOffset}
                    onImageDragStart={() => setIsDragging(true)}
                    onImageDragEnd={handleDragEnd}
                  />
                );
              })}
            </AnimatePresence>
          </motion.div>

          {/* Navigation Arrows with enhanced hover */}
          <motion.button
            onClick={goPrev}
            className="absolute left-8 top-1/2 -translate-y-1/2 z-40 group"
            aria-label="Previous image"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="relative w-16 h-16 flex items-center justify-center">
              {/* Outer ring */}
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-br from-white/90 to-white/70 shadow-2xl backdrop-blur-sm"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
              
              {/* Animated glow ring */}
              <motion.div
                className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100"
                style={{
                  background: 'radial-gradient(circle, rgba(0, 136, 115, 0.3), transparent 70%)',
                  filter: 'blur(8px)',
                }}
                transition={{ duration: 0.3 }}
              />

              {/* Inner animated ring */}
              <motion.div
                className="absolute inset-2 rounded-full border-2 border-[#008873]/20 group-hover:border-[#008873]/60"
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />

              {/* Abstract arrow design - multiple layered lines */}
              <div className="relative z-10 flex items-center justify-center">
                {/* Main arrow line */}
                <motion.div
                  className="absolute"
                  initial={{ x: 0 }}
                  whileHover={{ x: -3 }}
                  transition={{ duration: 0.3 }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#008873] group-hover:text-[#007969]">
                    <motion.path
                      d="M15 18L9 12L15 6"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    />
                  </svg>
                </motion.div>
                
                {/* Secondary ghost arrow */}
                <motion.div
                  className="absolute opacity-0 group-hover:opacity-40"
                  initial={{ x: 8 }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3, delay: 0.05 }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#008873]">
                    <path
                      d="M15 18L9 12L15 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.div>

                {/* Tertiary ghost arrow */}
                <motion.div
                  className="absolute opacity-0 group-hover:opacity-20"
                  initial={{ x: 12 }}
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#008873]">
                    <path
                      d="M15 18L9 12L15 6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.div>
              </div>

              {/* Corner accent marks */}
              <motion.div
                className="absolute top-1 left-1 w-2 h-2 border-l-2 border-t-2 border-[#008873]/30 group-hover:border-[#008873]/60"
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              <motion.div
                className="absolute bottom-1 right-1 w-2 h-2 border-r-2 border-b-2 border-[#008873]/30 group-hover:border-[#008873]/60"
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 1,
                }}
              />
            </div>
          </motion.button>
          
          <motion.button
            onClick={goNext}
            className="absolute right-8 top-1/2 -translate-y-1/2 z-40 group"
            aria-label="Next image"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="relative w-16 h-16 flex items-center justify-center">
              {/* Outer ring */}
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-br from-white/90 to-white/70 shadow-2xl backdrop-blur-sm"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
              
              {/* Animated glow ring */}
              <motion.div
                className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100"
                style={{
                  background: 'radial-gradient(circle, rgba(0, 136, 115, 0.3), transparent 70%)',
                  filter: 'blur(8px)',
                }}
                transition={{ duration: 0.3 }}
              />

              {/* Inner animated ring */}
              <motion.div
                className="absolute inset-2 rounded-full border-2 border-[#008873]/20 group-hover:border-[#008873]/60"
                animate={{
                  rotate: -360,
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />

              {/* Abstract arrow design - multiple layered lines */}
              <div className="relative z-10 flex items-center justify-center">
                {/* Main arrow line */}
                <motion.div
                  className="absolute"
                  initial={{ x: 0 }}
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.3 }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#008873] group-hover:text-[#007969]">
                    <motion.path
                      d="M9 18L15 12L9 6"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    />
                  </svg>
                </motion.div>
                
                {/* Secondary ghost arrow */}
                <motion.div
                  className="absolute opacity-0 group-hover:opacity-40"
                  initial={{ x: -8 }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3, delay: 0.05 }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#008873]">
                    <path
                      d="M9 18L15 12L9 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.div>

                {/* Tertiary ghost arrow */}
                <motion.div
                  className="absolute opacity-0 group-hover:opacity-20"
                  initial={{ x: -12 }}
                  whileHover={{ x: -3 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#008873]">
                    <path
                      d="M9 18L15 12L9 6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.div>
              </div>

              {/* Corner accent marks */}
              <motion.div
                className="absolute top-1 left-1 w-2 h-2 border-l-2 border-t-2 border-[#008873]/30 group-hover:border-[#008873]/60"
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              <motion.div
                className="absolute bottom-1 right-1 w-2 h-2 border-r-2 border-b-2 border-[#008873]/30 group-hover:border-[#008873]/60"
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 1,
                }}
              />
            </div>
          </motion.button>
        </div>

        {/* Mobile: Horizontal Scroll */}
        <div className="lg:hidden">
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto scrollbar-hide pb-3"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
              touchAction: 'none',
              scrollBehavior: 'auto',
              willChange: 'scroll-position',
              overscrollBehavior: 'auto',
              pointerEvents: 'auto',
            }}
          >
            {infiniteImages.map((image, index) => (
              <div
                key={`gallery-${index}`}
                className="flex-shrink-0 w-full px-2"
                style={{ touchAction: 'none' }}
              >
                <div className="pointer-events-none">
                  <div className="relative overflow-hidden rounded-lg shadow-lg">
                    <div className="relative h-[280px] overflow-hidden">
                      <ImageWithFallback
                        src={image.url}
                        alt={image.alt}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                      {/* Location Name Overlay - Always visible on mobile */}
                      <div className="absolute bottom-0 left-0 right-0 p-3 pointer-events-none">
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.2 }}
                        >
                          <h3 className="font-['Exo',sans-serif] font-semibold text-white text-xs mb-0.5 tracking-wide">
                            {image.location}
                          </h3>
                          <p className="font-['Barlow',sans-serif] text-white/80 text-[11px] leading-relaxed">
                            {image.description}
                          </p>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Dots */}
          <div className="flex justify-center gap-1.5 mt-3">
            {galleryImages.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => scrollToSlide(index)}
                className={`transition-all duration-300 pointer-events-auto ${
                  currentIndex === index
                    ? 'bg-[#008873] w-6 h-1.5'
                    : 'bg-gray-300 hover:bg-[#008873]/50 w-1.5 h-1.5'
                } rounded-full`}
                aria-label={`Go to image ${index + 1}`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>

          {/* Swipe Hint */}
          <motion.p
            className="text-center text-xs text-gray-400 mt-2 font-['Barlow',sans-serif]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            ← Swipe to browse →
          </motion.p>
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}