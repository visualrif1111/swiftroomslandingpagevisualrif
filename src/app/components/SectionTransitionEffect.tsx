import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import svgPaths from '../../imports/svg-c8s3lgkv08';

export function SectionTransitionEffect() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [lastSection, setLastSection] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            const sectionId = entry.target.id;
            setLastSection(activeSection);
            setActiveSection(sectionId);
          }
        });
      },
      { threshold: [0.5] }
    );

    sections.forEach((section) => observer.observe(section));
    
    return () => observer.disconnect();
  }, [activeSection]);

  return (
    <AnimatePresence>
      {activeSection && activeSection !== lastSection && (
        <motion.div
          key={activeSection}
          className="fixed inset-0 pointer-events-none z-[49]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Left side transition - Simplified */}
          <motion.div
            className="fixed left-0 top-0 bottom-0 w-12 lg:w-20 pointer-events-none z-[49]"
            initial={{ x: -80 }}
            animate={{ x: 0 }}
            exit={{ x: -80 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="relative w-full h-full">
              {/* Flowing line */}
              <motion.div
                className="absolute left-0 top-0 bottom-0 w-0.5 lg:w-1 bg-gradient-to-b from-transparent via-[#007969] to-transparent"
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: 1, opacity: 1 }}
                exit={{ scaleY: 0, opacity: 0 }}
                transition={{ duration: 0.6 }}
              />
              
              {/* Animated logos - Reduced count */}
              {[0, 1].map((i) => (
                <motion.div
                  key={i}
                  className="absolute left-2 lg:left-4 w-6 h-6 lg:w-10 lg:h-10"
                  style={{ top: `${30 + i * 40}%` }}
                  initial={{ opacity: 0, x: -50, rotate: -180 }}
                  animate={{ opacity: [0, 0.6, 0], x: 0, rotate: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 1,
                    delay: i * 0.15,
                  }}
                >
                  <svg viewBox="0 0 1275.8 1275.84" className="w-full h-full">
                    <path d={svgPaths.p10b5a400} fill="#007969" opacity="0.4" />
                    <path d={svgPaths.p290a2b00} fill="#007969" opacity="0.4" />
                  </svg>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right side transition - Simplified */}
          <motion.div
            className="fixed right-0 top-0 bottom-0 w-12 lg:w-20 pointer-events-none z-[49]"
            initial={{ x: 80 }}
            animate={{ x: 0 }}
            exit={{ x: 80 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="relative w-full h-full">
              {/* Flowing line */}
              <motion.div
                className="absolute right-0 top-0 bottom-0 w-0.5 lg:w-1 bg-gradient-to-b from-transparent via-[#007969] to-transparent"
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: 1, opacity: 1 }}
                exit={{ scaleY: 0, opacity: 0 }}
                transition={{ duration: 0.6 }}
              />
              
              {/* Animated logos - Reduced count */}
              {[0, 1].map((i) => (
                <motion.div
                  key={i}
                  className="absolute right-2 lg:right-4 w-6 h-6 lg:w-10 lg:h-10"
                  style={{ top: `${30 + i * 40}%` }}
                  initial={{ opacity: 0, x: 50, rotate: 180 }}
                  animate={{ opacity: [0, 0.6, 0], x: 0, rotate: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 1,
                    delay: i * 0.15,
                  }}
                >
                  <svg viewBox="0 0 1275.8 1275.84" className="w-full h-full">
                    <path d={svgPaths.p10b5a400} fill="#007969" opacity="0.4" />
                    <path d={svgPaths.p290a2b00} fill="#007969" opacity="0.4" />
                  </svg>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Center burst effect - Desktop only - Simplified */}
          {!isMobile && (
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.5, 0], opacity: [0, 0.3, 0] }}
              transition={{ duration: 0.8 }}
            >
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="absolute w-16 h-16"
                  initial={{ rotate: i * 90 }}
                  animate={{
                    x: Math.cos((i * Math.PI) / 2) * 120,
                    y: Math.sin((i * Math.PI) / 2) * 120,
                    opacity: [0, 0.5, 0],
                  }}
                  transition={{ duration: 0.8, delay: i * 0.05 }}
                >
                  <svg viewBox="0 0 1275.8 1275.84" className="w-full h-full">
                    <path d={svgPaths.p10b5a400} fill="#007969" opacity="0.3" />
                    <path d={svgPaths.p290a2b00} fill="#007969" opacity="0.3" />
                  </svg>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}