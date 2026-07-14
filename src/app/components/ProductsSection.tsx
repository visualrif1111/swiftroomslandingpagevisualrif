import { useState, useRef, useEffect, useMemo, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useMultiAxisScroll } from '../utils/useMultiAxisScroll';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Slider from 'react-slick';
import { ProductsCADElements } from './CADFloatingElements';
import { CTADecoration } from './InteractiveDecorations';
import imgImageAluminumSlidingDoors from "figma:asset/d6422ad60ba0d7acbef896831a31188dca8bc66a.png";
import imgImageUpvcWindowsAndDoors from "figma:asset/d76e6c1b22e3f7ed8fc8e68c24b7ccfae1eb3155.png";
import imgImageBiFoldDoors from "figma:asset/a873a74894e42cdff9ecd2c1fb02a14d38a18687.png";
import imgImageAluminumWindows from "figma:asset/0f08c2480ba1dad0ecba17dddf82fcfe35766557.png";
import imgImageSkylights from "figma:asset/265343b936147e3cea1b239d59964ed5e2657d8a.png";

interface Product {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  category: string;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Aluminum Sliding Doors',
    description: 'Open your living space with slim-frame systems designed for seamless indoor-outdoor villa living.',
    imageUrl: imgImageAluminumSlidingDoors,
    category: 'Doors'
  },
  {
    id: 2,
    name: 'Bi-Fold Doors',
    description: 'Create a seamless connection between home and garden for brighter, more open living.',
    imageUrl: imgImageBiFoldDoors,
    category: 'Doors'
  },
  {
    id: 3,
    name: 'Aluminum Windows',
    description: 'Improve insulation, comfort and natural light while reducing heat transfer in UAE homes.',
    imageUrl: imgImageAluminumWindows,
    category: 'Windows'
  },
  {
    id: 4,
    name: 'UPVC Windows and Doors',
    description: 'Lower cooling costs and enjoy quieter, more comfortable rooms with high-performance glazing.',
    imageUrl: imgImageUpvcWindowsAndDoors,
    category: 'Windows & Doors'
  },
  {
    id: 5,
    name: 'Skylights and Garden Rooms',
    description: 'Bring more daylight into your space and gain a year-round architectural extension that adds value.',
    imageUrl: imgImageSkylights,
    category: 'Outdoor Spaces'
  },
];

interface ArrowProps {
  onClick?: () => void;
}

function NextArrow({ onClick }: ArrowProps) {
  return (
    <button
      onClick={onClick}
      className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white border border-[#dcdad3] hover:border-[#0b0b0c] text-[#0b0b0c] rounded-full p-3 transition-colors duration-300"
      aria-label="Next slide"
    >
      <ChevronRight className="w-6 h-6" />
    </button>
  );
}

function PrevArrow({ onClick }: ArrowProps) {
  return (
    <button
      onClick={onClick}
      className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white border border-[#dcdad3] hover:border-[#0b0b0c] text-[#0b0b0c] rounded-full p-3 transition-colors duration-300"
      aria-label="Previous slide"
    >
      <ChevronLeft className="w-6 h-6" />
    </button>
  );
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = memo(({ product }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect if mobile on mount
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    const handleResize = () => checkMobile();
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleTouchStart = useCallback(() => {
    setIsTouched(true);
    setIsHovered(true);
  }, []);

  const handleTouchEnd = useCallback(() => {
    setTimeout(() => {
      setIsTouched(false);
      setIsHovered(false);
    }, 3000);
  }, []);

  return (
    <div className="px-2 sm:px-3 lg:px-4 py-2 sm:py-4">
      <motion.div
        className="group relative flex flex-col overflow-hidden rounded-md bg-white border border-[#dcdad3] shadow-sm cursor-pointer h-full pointer-events-none lg:pointer-events-auto"
        onMouseEnter={() => !isTouched && !isMobile && setIsHovered(true)}
        onMouseLeave={() => !isTouched && !isMobile && setIsHovered(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        whileHover={{ y: -8 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.3 }}
      >
        {/* Image Container: fixed-height area with a cover image */}
        <div className="relative h-64 sm:h-72 lg:h-80 overflow-hidden">
          <motion.img
            src={product.imageUrl}
            alt={product.name}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
            animate={{
              scale: isHovered ? 1.05 : 1,
            }}
            transition={{ duration: 0.4 }}
          />

          {/* Category chip — monochrome hairline */}
          <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
            <span className="bg-white/90 backdrop-blur-sm border border-[#dcdad3] text-[#3d3d42] px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-['Rajdhani',sans-serif] font-semibold tracking-[0.14em] uppercase">
              {product.category}
            </span>
          </div>
        </div>

        {/* Content — white surface, ink text */}
        <div className="flex flex-col flex-1 p-5 sm:p-5 lg:p-6">
          <motion.h3
            className="font-['Exo',sans-serif] font-medium tracking-[-0.02em] text-[#0b0b0c] text-xl sm:text-xl lg:text-2xl mb-2 leading-tight"
            animate={{
              y: isHovered ? -2 : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            {product.name}
          </motion.h3>

          <motion.p
            className="font-body text-sm sm:text-base text-[#3d3d42] leading-snug sm:leading-relaxed mb-4"
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {product.description}
          </motion.p>

          {/* Get A Quote Button - Always visible, no animation on mobile */}
          <CTADecoration>
            <motion.button
              className="mt-auto bh-btn bh-btn-ghost pointer-events-auto"
              initial={false}
              animate={{
                opacity: 1,
                y: 0
              }}
              onClick={(e) => {
                e.stopPropagation();
                const formSection = document.getElementById('contact-form');
                if (formSection) {
                  formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              whileTap={{ scale: 0.97 }}
            >
              Get A Quote
            </motion.button>
          </CTADecoration>
        </div>
      </motion.div>
    </div>
  );
});

ProductCard.displayName = 'ProductCard';

export function ProductsSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  useMultiAxisScroll(scrollContainerRef);
  const isScrollingRef = useRef(false);

  const totalProducts = products.length;
  const infiniteProducts = useMemo(() => [...products, ...products, ...products], []);

  // Initialize scroll position to middle set - deferred to idle time
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // Use requestIdleCallback for non-critical initialization
    const idleCallback = 'requestIdleCallback' in window
      ? window.requestIdleCallback(() => {
          const slideWidth = container.offsetWidth;
          const initialPosition = totalProducts * slideWidth;
          container.scrollLeft = initialPosition;
        })
      : window.setTimeout(() => {
          const slideWidth = container.offsetWidth;
          const initialPosition = totalProducts * slideWidth;
          container.scrollLeft = initialPosition;
        }, 100);

    return () => {
      if ('cancelIdleCallback' in window) {
        window.cancelIdleCallback(idleCallback);
      } else {
        clearTimeout(idleCallback);
      }
    };
  }, [totalProducts]);

  // Handle scroll to update active dot on mobile and handle infinite loop
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let scrollTimeout: number;
    let rafId: number;

    const handleScroll = () => {
      if (isScrollingRef.current) return;

      // Cancel any pending animation frame
      if (rafId) cancelAnimationFrame(rafId);

      clearTimeout(scrollTimeout as unknown as NodeJS.Timeout);
      scrollTimeout = setTimeout(() => {
        // Use requestAnimationFrame to prevent blocking
        rafId = requestAnimationFrame(() => {
          const scrollLeft = container.scrollLeft;
          const slideWidth = container.offsetWidth;
          const currentPosition = Math.round(scrollLeft / slideWidth);

          setActiveSlide(currentPosition % totalProducts);

          // Reset position when reaching edges (with safety check)
          if (currentPosition <= 0 && scrollLeft > 0) {
            isScrollingRef.current = true;
            container.scrollLeft = totalProducts * slideWidth;
            setTimeout(() => { isScrollingRef.current = false; }, 100);
          } else if (currentPosition >= totalProducts * 2 && currentPosition < totalProducts * 3) {
            isScrollingRef.current = true;
            container.scrollLeft = totalProducts * slideWidth;
            setTimeout(() => { isScrollingRef.current = false; }, 100);
          }
        });
      }, 50);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      container.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout as unknown as NodeJS.Timeout);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [totalProducts]);

  // Handle dot click to scroll to specific slide
  const scrollToSlide = useCallback((index: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const slideWidth = container.offsetWidth;
    const scrollPosition = (totalProducts + index) * slideWidth;
    container.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    });
  }, [totalProducts]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <section
      id="products"
      className="relative bg-[#f5f4f0] min-h-screen overflow-hidden lg:snap-center flex items-center lg:pt-32 lg:pb-12"
      style={{
        contain: 'layout style',
        contentVisibility: 'auto',
        containIntrinsicSize: '1px 100vh',
      }}
    >
      {/* CAD Floating Elements */}
      <ProductsCADElements />
      
      <div className="container mx-auto max-w-[1600px] px-3 sm:px-4 relative z-10 py-4 lg:py-0">
        {/* Section Header */}
        <motion.div
          className="text-center mb-6 lg:mb-16 px-2"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="font-['Rajdhani',sans-serif] text-xs font-semibold tracking-[0.1em] text-[#007969] tabular-nums">05</span>
            <span className="h-px w-10 bg-[#dcdad3]" />
            <span className="font-['Rajdhani',sans-serif] text-xs font-semibold uppercase tracking-[0.22em] text-[#6f6f76]">Featured Products</span>
          </div>
          <h2 className="font-['Exo',sans-serif] text-2xl sm:text-3xl lg:text-4xl font-medium tracking-[-0.02em] text-[#0b0b0c] mb-3 lg:mb-4">
            Featured Products
          </h2>
          <p className="font-body text-sm sm:text-base lg:text-xl text-[#3d3d42] max-w-2xl mx-auto px-4">
            Premium systems engineered for comfort, lower cooling costs and brighter living in the UAE climate
          </p>
        </motion.div>

        {/* Mobile: Horizontal Scroll */}
        <div className="md:hidden">
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto scrollbar-hide pb-4"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
              // pan-y lets the page scroll vertically through the carousel;
              // horizontal swipes are driven by useMultiAxisScroll (never 'none', which freezes the page)
              touchAction: 'pan-y',
              scrollBehavior: 'auto',
              willChange: 'scroll-position',
              overscrollBehavior: 'contain',
              pointerEvents: 'auto',
            }}
          >
            {infiniteProducts.map((product, index) => (
              <div
                key={`product-${index}`}
                className="flex-shrink-0 w-full px-2"
                style={{ touchAction: 'pan-y' }}
              >
                <div className="pointer-events-none">
                  <ProductCard product={product} />
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Dots */}
          <div className="flex justify-center gap-2 mt-4">
            {products.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToSlide(index)}
                className="group flex items-center justify-center h-11 min-w-[24px] -my-4"
                aria-label={`Go to slide ${index + 1}`}
              >
                <span
                  className={`block rounded-full transition-all duration-300 ${
                    activeSlide === index
                      ? 'bg-[#0b0b0c] w-8 h-2'
                      : 'bg-[#dcdad3] group-hover:bg-[#6f6f76] w-2 h-2'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Desktop: React Slick Carousel */}
        <motion.div
          className="hidden md:block products-carousel relative pb-8 sm:pb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Slider {...settings}>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Slider>
        </motion.div>
      </div>

      <style>{`
        .products-carousel .slick-dots {
          bottom: -20px;
        }
        
        @media (min-width: 640px) {
          .products-carousel .slick-dots {
            bottom: -40px;
          }
        }
        
        .products-carousel .slick-dots li button:before {
          color: #dcdad3;
          opacity: 1;
          font-size: 6px;
        }

        @media (min-width: 640px) {
          .products-carousel .slick-dots li button:before {
            font-size: 10px;
          }
        }

        .products-carousel .slick-dots li.slick-active button:before {
          color: #0b0b0c;
          opacity: 1;
        }

        .products-carousel .slick-track {
          display: flex;
          align-items: stretch;
        }
        
        .products-carousel .slick-slide {
          height: auto;
        }
        
        .products-carousel .slick-slide > div {
          height: 100%;
        }

        /* Hide scrollbar for mobile horizontal scroll */
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}