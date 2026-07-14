import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import svgPaths from '../../imports/svg-c8s3lgkv08';
import { ChevronDown } from 'lucide-react';
import { rafThrottle } from '../utils/performance';

export function ScrollProgressIndicator() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // The app scrolls inside the #app-scroll container, not the document, so
    // read scroll position from it (falling back to window if absent).
    const el = document.getElementById('app-scroll');
    const target: HTMLElement | Window = el ?? window;

    // Throttled scroll handler - limits to 60fps
    const handleScroll = rafThrottle(() => {
      const scrollTop = el ? el.scrollTop : window.scrollY;
      const totalHeight = el
        ? el.scrollHeight - el.clientHeight
        : document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (scrollTop / totalHeight) * 100 : 0;
      setScrollProgress(progress);

      // Hide when near bottom (90%+)
      setIsVisible(progress < 90);
    });

    target.addEventListener('scroll', handleScroll as EventListener, { passive: true });
    handleScroll();

    return () => target.removeEventListener('scroll', handleScroll as EventListener);
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      className="hidden lg:flex fixed right-4 lg:right-8 top-1/2 -translate-y-1/2 z-[40] flex-col items-center gap-4"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 1 }}
    >
      {/* Progress Bar */}
      <div className="relative h-48 lg:h-64 w-1 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className="absolute bottom-0 left-0 right-0 bg-[#007969] rounded-full"
          style={{ height: `${scrollProgress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      {/* Animated Icons - Reduced animation complexity */}
      <div className="flex flex-col gap-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-6 h-6 lg:w-8 lg:h-8"
            initial={{ opacity: 0, y: -10 }}
            animate={{
              opacity: scrollProgress > 33 * (i + 1) ? 1 : 0.3,
              y: 0,
            }}
          >
            <svg viewBox="0 0 1275.8 1275.84" className="w-full h-full">
              <path 
                d={svgPaths.p10b5a400} 
                fill={scrollProgress > 33 * (i + 1) ? "#007969" : "#cccccc"} 
              />
              <path 
                d={svgPaths.p290a2b00} 
                fill={scrollProgress > 33 * (i + 1) ? "#007969" : "#cccccc"} 
              />
            </svg>
          </motion.div>
        ))}
      </div>

      {/* Down Arrow - Simplified animation */}
      <motion.div
        className="text-[#007969] opacity-50"
        animate={{
          y: [0, 8, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <ChevronDown className="w-4 h-4 lg:w-6 lg:h-6" />
      </motion.div>
    </motion.div>
  );
}

// Animated particles that float toward the form
export function FormAttractorParticles() {
  const [isActive, setIsActive] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Throttled scroll handler
    const checkFormProximity = rafThrottle(() => {
      const formElement = document.getElementById('form');
      if (!formElement) return;

      const rect = formElement.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Activate when form is getting close to viewport
      const isNear = rect.top < viewportHeight * 1.5 && rect.bottom > -viewportHeight * 0.5;
      setIsActive(isNear);
    });

    window.addEventListener('scroll', checkFormProximity, { passive: true });
    checkFormProximity();
    
    return () => window.removeEventListener('scroll', checkFormProximity);
  }, []);

  if (!isActive) return null;

  // Reduced particle count for better performance
  const particleCount = isMobile ? 2 : 4;
  const particles = Array.from({ length: particleCount }, (_, i) => ({
    id: i,
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    delay: Math.random() * 2,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-[3]">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute will-change-transform"
          style={{
            left: particle.x,
            top: particle.y,
            width: isMobile ? 16 : 24,
            height: isMobile ? 16 : 24,
          }}
          animate={{
            x: [0, (window.innerWidth / 2 - particle.x) * 0.5],
            y: [0, (window.innerHeight * 0.7 - particle.y) * 0.5],
            opacity: [0, 0.6, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 3,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <svg viewBox="0 0 1275.8 1275.84" className="w-full h-full">
            <path d={svgPaths.p10b5a400} fill="#007969" opacity="0.4" />
            <path d={svgPaths.p290a2b00} fill="#007969" opacity="0.4" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}