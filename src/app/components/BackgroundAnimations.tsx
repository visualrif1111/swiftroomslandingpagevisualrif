import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { CadLogo } from './CadLogo';
import { throttle } from '../utils/performance';

export function BackgroundAnimations() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  
  // Create different parallax layers based on scroll
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -90]);

  useEffect(() => {
    // THROTTLED mouse movement
    const handleMouseMove = throttle((e: MouseEvent) => {
      // Normalize mouse position from -1 to 1
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePosition({ x, y });
    }, 100); // Throttle to 10fps

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Large background filled logo - Top Left - Desktop only */}
      <motion.div 
        className="absolute top-[-10%] left-[-10%] w-[80vw] max-w-[800px] opacity-[0.03] hidden lg:block will-change-transform"
        style={{ 
          x: mousePosition.x * 20, 
          y: mousePosition.y * 20,
          rotate: rotate1
        }}
      >
        <CadLogo className="w-full h-full" />
      </motion.div>

      {/* CAD style wireframe logo - Bottom Right - Reduced size */}
      <motion.div 
        className="absolute bottom-[-10%] right-[-15%] w-[70vw] lg:w-[90vw] max-w-[600px] lg:max-w-[1000px] opacity-[0.05] lg:opacity-[0.08] will-change-transform"
        style={{ 
          y: y2,
          x: mousePosition.x * -15,
          rotate: rotate2 
        }}
      >
        <CadLogo strokeOnly className="w-full h-full" />
      </motion.div>

      {/* Floating middle element - Desktop only */}
      <motion.div 
        className="absolute top-[40%] left-[60%] w-[40vw] max-w-[500px] opacity-[0.05] hidden lg:block will-change-transform"
        style={{ 
          y: y1,
          x: mousePosition.x * -15,
        }}
        animate={{ 
          rotate: [0, 360],
        }}
        transition={{ 
          rotate: { duration: 60, repeat: Infinity, ease: "linear" }
        }}
      >
        <CadLogo strokeOnly className="w-full h-full" />
      </motion.div>
      
      {/* Small floating element - Simplified */}
      <motion.div 
        className="absolute top-[60%] left-[10%] w-[100px] lg:w-[150px] opacity-[0.04] lg:opacity-[0.06] will-change-transform"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <CadLogo strokeOnly className="w-full h-full" />
      </motion.div>
    </div>
  );
}