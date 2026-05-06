import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import svgPaths from '../../imports/svg-c8s3lgkv08';
import { rafThrottle, throttle } from '../utils/performance';

interface MousePosition {
  x: number;
  y: number;
}

export function InteractiveDecorations() {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse tracking with smooth spring animation
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 100 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Check for mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Mouse movement tracking - THROTTLED
  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = throttle((e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    }, 50); // Throttle to 20fps for mouse movement

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY, isMobile]);

  // Scroll tracking - THROTTLED
  useEffect(() => {
    const handleScroll = rafThrottle(() => setScrollY(window.scrollY));
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate magnetic pull toward form section - THROTTLED
  const [formPosition, setFormPosition] = useState<{ x: number; y: number } | null>(null);
  
  useEffect(() => {
    const updateFormPosition = throttle(() => {
      const formElement = document.getElementById('form');
      if (formElement) {
        const rect = formElement.getBoundingClientRect();
        setFormPosition({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2 + window.scrollY
        });
      }
    }, 200); // Throttle to 5fps for form position

    updateFormPosition();
    window.addEventListener('resize', updateFormPosition);
    window.addEventListener('scroll', updateFormPosition, { passive: true });
    
    return () => {
      window.removeEventListener('resize', updateFormPosition);
      window.removeEventListener('scroll', updateFormPosition);
    };
  }, []);

  return (
    <>
      {/* Floating Diamond Patterns */}
      <FloatingDiamond 
        mouseX={smoothMouseX}
        mouseY={smoothMouseY}
        scrollY={scrollY}
        position={{ top: '10%', left: '5%' }}
        rotation={45}
        scale={0.15}
        delay={0}
        isMobile={isMobile}
        formPosition={formPosition}
      />
      
      <FloatingDiamond 
        mouseX={smoothMouseX}
        mouseY={smoothMouseY}
        scrollY={scrollY}
        position={{ top: '30%', right: '8%' }}
        rotation={-30}
        scale={0.12}
        delay={0.5}
        isMobile={isMobile}
        formPosition={formPosition}
      />
      
      <FloatingDiamond 
        mouseX={smoothMouseX}
        mouseY={smoothMouseY}
        scrollY={scrollY}
        position={{ top: '50%', left: '3%' }}
        rotation={15}
        scale={0.18}
        delay={1}
        isMobile={isMobile}
        formPosition={formPosition}
      />
      
      <FloatingDiamond 
        mouseX={smoothMouseX}
        mouseY={smoothMouseY}
        scrollY={scrollY}
        position={{ top: '70%', right: '5%' }}
        rotation={60}
        scale={0.14}
        delay={1.5}
        isMobile={isMobile}
        formPosition={formPosition}
      />

      {/* Floating Logo Symbols */}
      <FloatingLogo 
        mouseX={smoothMouseX}
        mouseY={smoothMouseY}
        scrollY={scrollY}
        position={{ top: '20%', right: '12%' }}
        scale={0.08}
        delay={0.3}
        isMobile={isMobile}
        formPosition={formPosition}
      />
      
      <FloatingLogo 
        mouseX={smoothMouseX}
        mouseY={smoothMouseY}
        scrollY={scrollY}
        position={{ top: '45%', right: '2%' }}
        scale={0.1}
        delay={0.8}
        isMobile={isMobile}
        formPosition={formPosition}
      />
      
      <FloatingLogo 
        mouseX={smoothMouseX}
        mouseY={smoothMouseY}
        scrollY={scrollY}
        position={{ top: '65%', left: '8%' }}
        scale={0.09}
        delay={1.3}
        isMobile={isMobile}
        formPosition={formPosition}
      />
      
      <FloatingLogo 
        mouseX={smoothMouseX}
        mouseY={smoothMouseY}
        scrollY={scrollY}
        position={{ top: '85%', right: '10%' }}
        scale={0.11}
        delay={1.8}
        isMobile={isMobile}
        formPosition={formPosition}
      />

      {/* Cursor Trail Effect - Desktop Only */}
      {!isMobile && <CursorTrail mouseX={smoothMouseX} mouseY={smoothMouseY} />}
    </>
  );
}

interface FloatingDiamondProps {
  mouseX: any;
  mouseY: any;
  scrollY: number;
  position: { top?: string; bottom?: string; left?: string; right?: string };
  rotation: number;
  scale: number;
  delay: number;
  isMobile: boolean;
  formPosition: { x: number; y: number } | null;
}

function FloatingDiamond({ 
  mouseX, 
  mouseY, 
  scrollY, 
  position, 
  rotation, 
  scale, 
  delay,
  isMobile,
  formPosition
}: FloatingDiamondProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [elementPosition, setElementPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (elementRef.current) {
      const rect = elementRef.current.getBoundingClientRect();
      setElementPosition({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2 + window.scrollY
      });
    }
  }, [scrollY]);

  // Calculate parallax effect
  const parallaxX = useTransform(mouseX, (value) => {
    if (isMobile) return 0;
    const centerX = window.innerWidth / 2;
    return (value - centerX) * 0.02;
  });

  const parallaxY = useTransform(mouseY, (value) => {
    if (isMobile) return 0;
    const centerY = window.innerHeight / 2;
    return (value - centerY) * 0.02;
  });

  // Breathing animation
  const breathingAnimation = {
    scale: [1, 1.05, 1],
    opacity: [0.3, 0.5, 0.3],
  };

  return (
    <motion.div
      ref={elementRef}
      className="fixed pointer-events-none z-[5]"
      style={{
        ...position,
        x: parallaxX,
        y: parallaxY,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: 1,
        scale: 1,
        ...breathingAnimation,
      }}
      transition={{
        opacity: { duration: 2, repeat: Infinity, delay },
        scale: { duration: 3, repeat: Infinity, delay, ease: "easeInOut" },
      }}
    >
      <motion.div
        style={{
          width: isMobile ? 80 : 200,
          height: isMobile ? 80 : 200,
          transform: `scale(${scale})`,
        }}
        animate={{
          rotate: [rotation, rotation + 360],
        }}
        transition={{
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
        }}
      >
        <svg 
          className="w-full h-full" 
          fill="none" 
          preserveAspectRatio="none" 
          viewBox="0 0 1275.8 1275.84"
        >
          <g opacity={isMobile ? "0.2" : "0.4"}>
            <path d={svgPaths.p10b5a400} fill="#007969" />
            <path d={svgPaths.p290a2b00} fill="#007969" />
            <path d={svgPaths.p3fba9e00} fill="#007969" />
            <path d={svgPaths.p2a71fc00} fill="#007969" />
            <path d={svgPaths.p26ccaf00} fill="#007969" />
            <g>
              <path d={svgPaths.p2ba22f00} fill="#007969" />
              <path d={svgPaths.p28cf4500} fill="#007969" />
            </g>
            <g>
              <path d={svgPaths.p34e7e00} fill="#007969" />
              <path d={svgPaths.p3b226580} fill="#007969" />
            </g>
            <g>
              <path d={svgPaths.p7e8b580} fill="#007969" />
              <path d={svgPaths.p1ed2fbf0} fill="#007969" />
            </g>
            <g>
              <path d={svgPaths.p28bbd900} fill="#007969" />
              <path d={svgPaths.p1afe4b00} fill="#007969" />
            </g>
            <g>
              <path d={svgPaths.p229d1270} fill="#007969" />
              <path d={svgPaths.p3865a800} fill="#007969" />
            </g>
            <g>
              <path d={svgPaths.p145a7140} fill="#007969" />
              <path d={svgPaths.p27d8de00} fill="#007969" />
            </g>
            <g>
              <path d={svgPaths.p2ce92d00} fill="#007969" />
              <path d={svgPaths.p31ad300} fill="#007969" />
            </g>
            <g>
              <path d={svgPaths.p26b38c00} fill="#007969" />
              <path d={svgPaths.p35554780} fill="#007969" />
            </g>
            <g>
              <path d={svgPaths.p24626f80} fill="#007969" />
              <path d={svgPaths.p36c6bd00} fill="#007969" />
            </g>
          </g>
        </svg>
      </motion.div>
    </motion.div>
  );
}

interface FloatingLogoProps {
  mouseX: any;
  mouseY: any;
  scrollY: number;
  position: { top?: string; bottom?: string; left?: string; right?: string };
  scale: number;
  delay: number;
  isMobile: boolean;
  formPosition: { x: number; y: number } | null;
}

function FloatingLogo({ 
  mouseX, 
  mouseY, 
  scrollY, 
  position, 
  scale, 
  delay,
  isMobile,
  formPosition
}: FloatingLogoProps) {
  // Calculate parallax effect (opposite direction from diamonds)
  const parallaxX = useTransform(mouseX, (value) => {
    if (isMobile) return 0;
    const centerX = window.innerWidth / 2;
    return -(value - centerX) * 0.03;
  });

  const parallaxY = useTransform(mouseY, (value) => {
    if (isMobile) return 0;
    const centerY = window.innerHeight / 2;
    return -(value - centerY) * 0.03;
  });

  return (
    <motion.div
      className="fixed pointer-events-none z-[5] hidden lg:block"
      style={{
        ...position,
        x: parallaxX,
        y: parallaxY,
      }}
      initial={{ opacity: 0, scale: 0, rotate: -180 }}
      animate={{
        opacity: [0.2, 0.4, 0.2],
        scale: 1,
        rotate: 0,
      }}
      transition={{
        opacity: { duration: 3, repeat: Infinity, delay },
        scale: { duration: 0.6, delay },
        rotate: { duration: 0.8, delay },
      }}
    >
      <motion.div
        style={{
          width: 200,
          height: 200,
          transform: `scale(${scale})`,
        }}
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          rotate: { duration: 25, repeat: Infinity, ease: "linear" },
        }}
      >
        <svg 
          className="w-full h-full" 
          fill="none" 
          preserveAspectRatio="none" 
          viewBox="0 0 1275.8 1275.84"
        >
          <g opacity="0.5">
            <path d={svgPaths.p10b5a400} fill="#007969" />
            <path d={svgPaths.p290a2b00} fill="#007969" />
            <path d={svgPaths.p3fba9e00} fill="#007969" />
            <path d={svgPaths.p2a71fc00} fill="#007969" />
            <path d={svgPaths.p26ccaf00} fill="#007969" />
          </g>
        </svg>
      </motion.div>
    </motion.div>
  );
}

interface CursorTrailProps {
  mouseX: any;
  mouseY: any;
}

function CursorTrail({ mouseX, mouseY }: CursorTrailProps) {
  const [trails, setTrails] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const trailIdRef = useRef(0);

  useEffect(() => {
    const unsubscribeX = mouseX.on('change', (x: number) => {
      const y = mouseY.get();
      
      // Only add trail if mouse is moving
      if (Math.random() > 0.7) {
        const newTrail = { id: trailIdRef.current++, x, y };
        setTrails(prev => [...prev.slice(-8), newTrail]);
      }
    });

    return () => unsubscribeX();
  }, [mouseX, mouseY]);

  return (
    <>
      {trails.map((trail) => (
        <motion.div
          key={trail.id}
          className="fixed pointer-events-none z-[4]"
          style={{
            left: trail.x,
            top: trail.y,
            width: 20,
            height: 20,
            marginLeft: -10,
            marginTop: -10,
          }}
          initial={{ opacity: 0.6, scale: 1 }}
          animate={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <svg viewBox="0 0 1275.8 1275.84" className="w-full h-full">
            <path d={svgPaths.p10b5a400} fill="#007969" opacity="0.3" />
            <path d={svgPaths.p290a2b00} fill="#007969" opacity="0.3" />
          </svg>
        </motion.div>
      ))}
    </>
  );
}

// Form Magnet Effect - Attracts decorations when near form
export function FormMagnetDecorations() {
  const [isNearForm, setIsNearForm] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const checkProximity = () => {
      const formElement = document.getElementById('form');
      if (!formElement) return;

      const rect = formElement.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Check if form is in viewport
      const isInView = rect.top < viewportHeight && rect.bottom > 0;
      setIsNearForm(isInView);
    };

    window.addEventListener('scroll', checkProximity, { passive: true });
    checkProximity();
    
    return () => window.removeEventListener('scroll', checkProximity);
  }, []);

  if (!isNearForm) return null;

  // Fewer elements for mobile
  const angles = isMobile ? [0, 120, 240] : [0, 60, 120, 180, 240, 300];
  const radius = isMobile ? 80 : 150;

  return (
    <div className="fixed inset-0 pointer-events-none z-[6]">
      {/* Orbiting elements around form */}
      <motion.div
        className="absolute"
        style={{
          left: '50%',
          top: '50%',
        }}
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          rotate: { duration: 8, repeat: Infinity, ease: "linear" },
        }}
      >
        {angles.map((angle, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              width: isMobile ? 20 : 30,
              height: isMobile ? 20 : 30,
              left: Math.cos((angle * Math.PI) / 180) * radius,
              top: Math.sin((angle * Math.PI) / 180) * radius,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          >
            <svg viewBox="0 0 1275.8 1275.84" className="w-full h-full">
              <path d={svgPaths.p10b5a400} fill="#007969" />
              <path d={svgPaths.p290a2b00} fill="#007969" />
            </svg>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

// Interactive hover effect for CTAs
export function CTADecoration({ children }: { children: React.ReactNode }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleTouchStart = () => {
    setIsTouched(true);
    setTimeout(() => setIsTouched(false), 1000);
  };

  const isActive = isHovered || isTouched;

  return (
    <div
      className="relative"
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
    >
      {children}
      
      {isActive && (
        <>
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="absolute pointer-events-none"
              style={{
                width: isMobile ? 16 : 20,
                height: isMobile ? 16 : 20,
                left: '50%',
                top: '50%',
                marginLeft: isMobile ? -8 : -10,
                marginTop: isMobile ? -8 : -10,
              }}
              initial={{ scale: 0, rotate: i * 90 }}
              animate={{
                scale: [0, 1.5, 0],
                x: [0, Math.cos((i * Math.PI) / 2) * (isMobile ? 30 : 40)],
                y: [0, Math.sin((i * Math.PI) / 2) * (isMobile ? 30 : 40)],
                opacity: [0.8, 0],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            >
              <svg viewBox="0 0 1275.8 1275.84" className="w-full h-full">
                <path d={svgPaths.p10b5a400} fill="#007969" />
                <path d={svgPaths.p290a2b00} fill="#007969" />
              </svg>
            </motion.div>
          ))}
        </>
      )}
    </div>
  );
}