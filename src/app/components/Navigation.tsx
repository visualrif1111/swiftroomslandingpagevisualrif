import { useState, useEffect, useRef } from 'react';
import { FullLogo, LogoIcon, CompactLogo } from './NewLogo';
import { motion, AnimatePresence } from 'motion/react';
import { CTADecoration } from './InteractiveDecorations';

// Mobile Hamburger Menu Icon (from Figma import)
function HamburgerIcon({ className = '' }: { className?: string }) {
  return (
    <div className={`${className} relative w-[33.09px] h-[25.605px] flex flex-col justify-between`}>
      <div className="bg-[#007969] h-[3.122px] w-[33.09px]" />
      <div className="bg-[#007969] h-[3.122px] w-[33.09px]" />
      <div className="bg-[#007969] h-[3.122px] w-[33.09px]" />
    </div>
  );
}

// Close X Icon - From Figma Frame43-26-517
function CloseIcon({ className = '' }: { className?: string }) {
  return (
    <div className={`${className} relative w-[33.09px] h-[25.605px]`}>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="-rotate-45">
          <div className="bg-[#007969] h-[3.122px] w-[33.09px]" />
        </div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="rotate-45">
          <div className="bg-[#007969] h-[3.122px] w-[33.09px]" />
        </div>
      </div>
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

  const navItems = [
    { key: 'hero', id: 'hero', label: 'Home' },
    { key: 'benefits', id: 'benefits', label: 'Benefits' },
    { key: 'products', id: 'products', label: 'Products' },
    { key: 'gallery', id: 'gallery', label: 'Gallery' },
    { key: 'testimonials', id: 'testimonials', label: 'Testimonials' },
    { key: 'process', id: 'process', label: 'Process' },
    { key: 'social', id: 'social', label: 'Portfolio' },
    { key: 'contact-form', id: 'contact-form', label: 'Get Free Quote' },
    { key: 'faqs', id: 'faqs', label: 'FAQs' },
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
      const scrollContainer = document.querySelector('.overflow-y-scroll.h-screen') as HTMLElement;
      
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
          const yOffset = -82; // Navigation height
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
    }, 150); // 150ms delay to let menu close animation start
  };

  // Android-compatible button handler
  const handleNavButtonClick = (e: React.MouseEvent<HTMLButtonElement> | React.TouchEvent<HTMLButtonElement>, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    scrollToSection(id);
  };

  // Close mobile menu when scrolling
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
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
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between h-[82px] lg:h-20">
            {/* Mobile Header - Figma Design with Centered Logo */}
            <div className="flex lg:hidden items-center justify-center w-full relative h-[82px]">
              {/* Centered Mobile Logo */}
              <motion.button 
                onClick={() => scrollToSection('hero')}
                className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex items-center"
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

              {/* Mobile Hamburger Menu on Right */}
              <motion.button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="absolute right-6 top-1/2 -translate-y-1/2 p-2 rounded-md hover:bg-gray-50 transition-colors"
                aria-label="Toggle menu"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                <HamburgerIcon />
              </motion.button>
            </div>

            {/* Desktop Navigation */}
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

            {/* Desktop Navigation - Horizontal Scrollable */}
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

            {/* Desktop CTA Button */}
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

      {/* Mobile Menu Drawer - Frame43-26-449 Figma Design */}
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

            {/* Full Screen Menu - Exact Figma Design */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed inset-0 bg-white z-50 lg:hidden overflow-hidden"
            >
              {/* Header - Rectangle325 Figma Design */}
              <motion.div 
                className="relative w-full h-[82px]"
                initial={{ y: -82 }}
                animate={{ y: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
                {/* White Rectangle Background */}
                <div className="bg-white absolute inset-0" />
                
                {/* Logo Centered */}
                <motion.div 
                  className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-11 h-11"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.1 }}
                >
                  <LogoIcon className="w-11 h-11" />
                </motion.div>
                
                {/* Close Button on Right */}
                <motion.button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="absolute right-6 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-50 rounded-md transition-colors"
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

              {/* Navigation Items - Compact Layout to Fit One Fold */}
              <div className="relative h-[calc(100vh-82px)] flex flex-col justify-between py-6">
                {/* Navigation Links Container */}
                <div className="flex-1 flex flex-col justify-center items-center space-y-6">
                  {/* Home */}
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1, type: 'spring', stiffness: 200, damping: 20 }}
                    className="text-center"
                  >
                    <button
                      onClick={() => scrollToSection('hero')}
                      className={`font-['Rajdhani',sans-serif] font-medium text-[24px] leading-[24px] whitespace-pre-wrap ${
                        activeSection === 'hero' ? 'text-[#007969]' : 'text-[#3a3a3c]'
                      } active:scale-95 transition-transform touch-manipulation`}
                      style={{ WebkitTapHighlightColor: 'transparent' }}
                    >
                      Home
                    </button>
                    <motion.div 
                      className="h-px w-[62px] mt-[3px] mx-auto"
                      style={{ 
                        backgroundColor: activeSection === 'hero' ? '#007969' : '#e5e7eb',
                        transition: 'background-color 0.3s ease'
                      }}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.2, duration: 0.3 }}
                    />
                  </motion.div>

                  {/* Products */}
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15, type: 'spring', stiffness: 200, damping: 20 }}
                    className="text-center"
                  >
                    <button
                      onClick={() => scrollToSection('products')}
                      className={`font-['Rajdhani',sans-serif] font-medium text-[24px] leading-[24px] whitespace-pre-wrap ${
                        activeSection === 'products' ? 'text-[#007969]' : 'text-[#3a3a3c]'
                      } active:scale-95 transition-transform touch-manipulation`}
                      style={{ WebkitTapHighlightColor: 'transparent' }}
                    >
                      Products
                    </button>
                    <motion.div 
                      className="h-px w-[62px] mt-[3px] mx-auto"
                      style={{ 
                        backgroundColor: activeSection === 'products' ? '#007969' : '#e5e7eb',
                        transition: 'background-color 0.3s ease'
                      }}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.25, duration: 0.3 }}
                    />
                  </motion.div>

                  {/* Process */}
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 20 }}
                    className="text-center"
                  >
                    <button
                      onClick={() => scrollToSection('process')}
                      className={`font-['Rajdhani',sans-serif] font-medium text-[24px] leading-[24px] whitespace-pre-wrap ${
                        activeSection === 'process' ? 'text-[#007969]' : 'text-[#3a3a3c]'
                      } active:scale-95 transition-transform touch-manipulation`}
                      style={{ WebkitTapHighlightColor: 'transparent' }}
                    >
                      Process
                    </button>
                    <motion.div 
                      className="h-px w-[62px] mt-[3px] mx-auto"
                      style={{ 
                        backgroundColor: activeSection === 'process' ? '#007969' : '#e5e7eb',
                        transition: 'background-color 0.3s ease'
                      }}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.3, duration: 0.3 }}
                    />
                  </motion.div>

                  {/* Brands */}
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.25, type: 'spring', stiffness: 200, damping: 20 }}
                    className="text-center"
                  >
                    <button
                      onClick={() => scrollToSection('brands')}
                      className={`font-['Rajdhani',sans-serif] font-medium text-[24px] leading-[24px] whitespace-pre-wrap ${
                        activeSection === 'brands' ? 'text-[#007969]' : 'text-[#3a3a3c]'
                      } active:scale-95 transition-transform touch-manipulation`}
                      style={{ WebkitTapHighlightColor: 'transparent' }}
                    >
                      Brands
                    </button>
                    <motion.div 
                      className="h-px w-[62px] mt-[3px] mx-auto"
                      style={{ 
                        backgroundColor: activeSection === 'brands' ? '#007969' : '#e5e7eb',
                        transition: 'background-color 0.3s ease'
                      }}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.35, duration: 0.3 }}
                    />
                  </motion.div>

                  {/* Portfolio */}
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, type: 'spring', stiffness: 200, damping: 20 }}
                    className="text-center"
                  >
                    <button
                      onClick={() => scrollToSection('social')}
                      className={`font-['Rajdhani',sans-serif] font-medium text-[24px] leading-[24px] whitespace-pre-wrap ${
                        activeSection === 'social' ? 'text-[#007969]' : 'text-[#3a3a3c]'
                      } active:scale-95 transition-transform touch-manipulation`}
                      style={{ WebkitTapHighlightColor: 'transparent' }}
                    >
                      Portfolio
                    </button>
                    <motion.div 
                      className="h-px w-[62px] mt-[3px] mx-auto"
                      style={{ 
                        backgroundColor: activeSection === 'social' ? '#007969' : '#e5e7eb',
                        transition: 'background-color 0.3s ease'
                      }}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.4, duration: 0.3 }}
                    />
                  </motion.div>

                  {/* Get Quote */}
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.35, type: 'spring', stiffness: 200, damping: 20 }}
                    className="text-center"
                  >
                    <CTADecoration>
                      <button
                        onClick={() => scrollToSection('contact-form')}
                        className={`font-['Rajdhani',sans-serif] font-medium text-[24px] leading-[24px] whitespace-pre-wrap ${
                          activeSection === 'contact-form' ? 'text-[#007969]' : 'text-[#3a3a3c]'
                        } active:scale-95 transition-transform touch-manipulation`}
                        style={{ WebkitTapHighlightColor: 'transparent' }}
                      >
                        Get Free Quote
                      </button>
                    </CTADecoration>
                    <motion.div 
                      className="h-px w-[62px] mt-[3px] mx-auto"
                      style={{ 
                        backgroundColor: activeSection === 'contact-form' ? '#007969' : '#e5e7eb',
                        transition: 'background-color 0.3s ease'
                      }}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.45, duration: 0.3 }}
                    />
                  </motion.div>

                  {/* Gallery */}
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, type: 'spring', stiffness: 200, damping: 20 }}
                    className="text-center"
                  >
                    <button
                      onClick={() => scrollToSection('gallery')}
                      className={`font-['Rajdhani',sans-serif] font-medium text-[24px] leading-[24px] whitespace-pre-wrap ${
                        activeSection === 'gallery' ? 'text-[#007969]' : 'text-[#3a3a3c]'
                      } active:scale-95 transition-transform touch-manipulation`}
                      style={{ WebkitTapHighlightColor: 'transparent' }}
                    >
                      Gallery
                    </button>
                    <motion.div 
                      className="h-px w-[62px] mt-[3px] mx-auto"
                      style={{ 
                        backgroundColor: activeSection === 'gallery' ? '#007969' : '#e5e7eb',
                        transition: 'background-color 0.3s ease'
                      }}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.5, duration: 0.3 }}
                    />
                  </motion.div>

                  {/* Testimonials */}
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.45, type: 'spring', stiffness: 200, damping: 20 }}
                    className="text-center"
                  >
                    <button
                      onClick={() => scrollToSection('testimonials')}
                      className={`font-['Rajdhani',sans-serif] font-medium text-[24px] leading-[24px] whitespace-pre-wrap ${
                        activeSection === 'testimonials' ? 'text-[#007969]' : 'text-[#3a3a3c]'
                      } active:scale-95 transition-transform touch-manipulation`}
                      style={{ WebkitTapHighlightColor: 'transparent' }}
                    >
                      Testimonials
                    </button>
                    <motion.div 
                      className="h-px w-[62px] mt-[3px] mx-auto"
                      style={{ 
                        backgroundColor: activeSection === 'testimonials' ? '#007969' : '#e5e7eb',
                        transition: 'background-color 0.3s ease'
                      }}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.55, duration: 0.3 }}
                    />
                  </motion.div>

                  {/* FAQs */}
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5, type: 'spring', stiffness: 200, damping: 20 }}
                    className="text-center"
                  >
                    <button
                      onClick={() => scrollToSection('faqs')}
                      className={`font-['Rajdhani',sans-serif] font-medium text-[24px] leading-[24px] whitespace-pre-wrap ${
                        activeSection === 'faqs' ? 'text-[#007969]' : 'text-[#3a3a3c]'
                      } active:scale-95 transition-transform touch-manipulation`}
                      style={{ WebkitTapHighlightColor: 'transparent' }}
                    >
                      FAQs
                    </button>
                    <motion.div 
                      className="h-px w-[62px] mt-[3px] mx-auto"
                      style={{ 
                        backgroundColor: activeSection === 'faqs' ? '#007969' : '#e5e7eb',
                        transition: 'background-color 0.3s ease'
                      }}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.6, duration: 0.3 }}
                    />
                  </motion.div>
                </div>

                {/* Footer Content - Bottom */}
                <motion.div 
                  className="px-6 space-y-3"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  {/* Tagline */}
                  <motion.p 
                    className="font-['Barlow',sans-serif] text-[14px] text-[#99a1af] text-center leading-[20px] tracking-[-0.3139px]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                  >
                    Dubai's trusted aluminium windows and doors specialist since 2009
                  </motion.p>
                  
                  {/* Email */}
                  <motion.p 
                    className="font-['Barlow',sans-serif] text-[14px] text-[#99a1af] text-center leading-[20px] tracking-[-0.3139px]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    hello@swiftrooms.ae
                  </motion.p>
                  
                  {/* Phone */}
                  <motion.p 
                    className="font-['Barlow',sans-serif] text-[14px] text-[#99a1af] text-center leading-[20px] tracking-[-0.3139px]"
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