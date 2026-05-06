import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'motion/react';
import { useEffect, useState } from 'react';
import svgPaths from '../../imports/svg-mnx69pr1li';

interface CADElementProps {
  size?: number;
  opacity?: number;
  blur?: number;
  rotationSpeed?: number;
  floatRange?: number;
  delay?: number;
  variant?: 'layer1' | 'layer2' | 'asset';
}

function CADElement({ 
  size = 120, 
  opacity = 0.15, 
  blur = 0,
  rotationSpeed = 20,
  floatRange = 20,
  delay = 0,
  variant = 'layer1'
}: CADElementProps) {
  const renderPaths = () => {
    if (variant === 'asset') {
      return (
        <g>
          <path d={svgPaths.p26b28e00} fill="currentColor" />
          <path d={svgPaths.p36e0880} fill="currentColor" />
          <path d={svgPaths.p179dba00} fill="currentColor" />
          <path d={svgPaths.p959680} fill="currentColor" />
          <path d={svgPaths.p3b225a00} fill="currentColor" />
          <g>
            <path d={svgPaths.p3b0c6a00} fill="currentColor" />
            <path d={svgPaths.p265b1670} fill="currentColor" />
          </g>
          <g>
            <path d={svgPaths.p3018f230} fill="currentColor" />
            <path d={svgPaths.p88e2300} fill="currentColor" />
          </g>
          <g>
            <path d={svgPaths.p1d94b532} fill="currentColor" />
            <path d={svgPaths.p150c3d00} fill="currentColor" />
          </g>
          <g>
            <path d={svgPaths.p2c575440} fill="currentColor" />
            <path d={svgPaths.p2956b200} fill="currentColor" />
          </g>
          <g>
            <path d={svgPaths.p3598aa70} fill="currentColor" />
            <path d={svgPaths.p2423ae0} fill="currentColor" />
          </g>
          <g>
            <path d={svgPaths.p19024200} fill="currentColor" />
            <path d={svgPaths.p37a55100} fill="currentColor" />
          </g>
          <g>
            <path d={svgPaths.p100b6700} fill="currentColor" />
            <path d={svgPaths.p1d76b000} fill="currentColor" />
          </g>
          <g>
            <path d={svgPaths.p7b09e80} fill="currentColor" />
            <path d={svgPaths.p2ff5e280} fill="currentColor" />
          </g>
          <g>
            <path d={svgPaths.p2ee23400} fill="currentColor" />
            <path d={svgPaths.pb6f8900} fill="currentColor" />
          </g>
        </g>
      );
    } else if (variant === 'layer1') {
      return (
        <g>
          <path d={svgPaths.p18ee5c00} fill="currentColor" />
          <path d={svgPaths.p69d7800} fill="currentColor" />
          <path d={svgPaths.p1bd22700} fill="currentColor" />
          <path d={svgPaths.p30d1fd00} fill="currentColor" />
          <path d={svgPaths.p29e0740} fill="currentColor" />
          <g>
            <path d={svgPaths.p3fb0300} fill="currentColor" />
            <path d={svgPaths.p494c200} fill="currentColor" />
          </g>
          <g>
            <path d={svgPaths.p2e3ddbc0} fill="currentColor" />
            <path d={svgPaths.p4790a80} fill="currentColor" />
          </g>
          <g>
            <path d={svgPaths.p39cead00} fill="currentColor" />
            <path d={svgPaths.pfdae680} fill="currentColor" />
          </g>
          <g>
            <path d={svgPaths.p9a84000} fill="currentColor" />
            <path d={svgPaths.p36638300} fill="currentColor" />
          </g>
          <g>
            <path d={svgPaths.p32c0d900} fill="currentColor" />
            <path d={svgPaths.p31c0dd80} fill="currentColor" />
          </g>
          <g>
            <path d={svgPaths.p2e1e9180} fill="currentColor" />
            <path d={svgPaths.p3c8e4280} fill="currentColor" />
          </g>
          <g>
            <path d={svgPaths.p23e3f900} fill="currentColor" />
            <path d={svgPaths.p454da80} fill="currentColor" />
          </g>
          <g>
            <path d={svgPaths.pf14e300} fill="currentColor" />
            <path d={svgPaths.p39003800} fill="currentColor" />
          </g>
          <g>
            <path d={svgPaths.p3f845200} fill="currentColor" />
            <path d={svgPaths.p1bf35800} fill="currentColor" />
          </g>
        </g>
      );
    } else {
      return (
        <g>
          <path d={svgPaths.p2b9ea700} fill="currentColor" />
          <path d={svgPaths.p6cd500} fill="currentColor" />
          <path d={svgPaths.p6cb0a80} fill="currentColor" />
          <path d={svgPaths.p37ac7b80} fill="currentColor" />
          <path d={svgPaths.p23cf19b0} fill="currentColor" />
          <g>
            <path d={svgPaths.p94a400} fill="currentColor" />
            <path d={svgPaths.p32724000} fill="currentColor" />
          </g>
          <g>
            <path d={svgPaths.p282c0bf0} fill="currentColor" />
            <path d={svgPaths.p162d500} fill="currentColor" />
          </g>
          <g>
            <path d={svgPaths.p2ca8d780} fill="currentColor" />
            <path d={svgPaths.p1638cf00} fill="currentColor" />
          </g>
          <g>
            <path d={svgPaths.p1b1ed180} fill="currentColor" />
            <path d={svgPaths.p7651200} fill="currentColor" />
          </g>
          <g>
            <path d={svgPaths.p130d8a80} fill="currentColor" />
            <path d={svgPaths.p3594ea00} fill="currentColor" />
          </g>
          <g>
            <path d={svgPaths.p8422f00} fill="currentColor" />
            <path d={svgPaths.p38055400} fill="currentColor" />
          </g>
          <g>
            <path d={svgPaths.p793d800} fill="currentColor" />
            <path d={svgPaths.p3e2f9c00} fill="currentColor" />
          </g>
          <g>
            <path d={svgPaths.p341dc200} fill="currentColor" />
            <path d={svgPaths.p82a6400} fill="currentColor" />
          </g>
          <g>
            <path d={svgPaths.p201c0d00} fill="currentColor" />
            <path d={svgPaths.p1fb39380} fill="currentColor" />
          </g>
        </g>
      );
    }
  };

  return (
    <motion.div
      className="absolute pointer-events-none text-[#007969]"
      style={{
        width: size,
        height: size,
        opacity: opacity,
        filter: blur > 0 ? `blur(${blur}px)` : 'none',
      }}
      initial={{ 
        rotate: 45,
        y: 0,
        scale: 0.8,
        opacity: 0
      }}
      animate={{ 
        rotate: [45, 45 + rotationSpeed, 45],
        y: [0, -floatRange, 0],
        scale: [0.8, 1, 0.8],
        opacity: [0, opacity, opacity, 0]
      }}
      transition={{
        duration: 12 + delay,
        delay: delay,
        repeat: Infinity,
        ease: "easeInOut",
        times: [0, 0.5, 1]
      }}
    >
      <svg 
        className="w-full h-full" 
        viewBox="0 0 505.245 505.26" 
        fill="none"
        preserveAspectRatio="xMidYMid meet"
      >
        {renderPaths()}
      </svg>
    </motion.div>
  );
}

interface FloatingElementsProps {
  density?: 'low' | 'medium' | 'high';
  section?: string;
}

export function CADFloatingElements({ density = 'medium', section = 'hero' }: FloatingElementsProps) {
  const { scrollYProgress } = useScroll();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isReady, setIsReady] = useState(false);

  // Defer rendering to idle time to prevent blocking main thread
  useEffect(() => {
    const idleCallback = 'requestIdleCallback' in window
      ? window.requestIdleCallback(() => setIsReady(true), { timeout: 3000 })
      : window.setTimeout(() => setIsReady(true), 500);

    return () => {
      if ('cancelIdleCallback' in window) {
        window.cancelIdleCallback(idleCallback);
      } else {
        clearTimeout(idleCallback);
      }
    };
  }, []);

  // Parallax scroll effects
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, 100]);

  // Smooth mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    if (!isReady) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      setMousePosition({ x: clientX, y: clientY });
      mouseX.set((clientX - innerWidth / 2) / 50);
      mouseY.set((clientY - innerHeight / 2) / 50);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY, isReady]);

  // Don't render until ready
  if (!isReady) return null;

  const elements = {
    low: 3,
    medium: 5,
    high: 8
  }[density];

  const positions = [
    // Top right
    { top: '5%', right: '8%', size: 100, variant: 'layer1' as const },
    // Middle left
    { top: '35%', left: '5%', size: 80, variant: 'layer2' as const },
    // Bottom right
    { bottom: '15%', right: '12%', size: 120, variant: 'asset' as const },
    // Top left (medium+)
    { top: '15%', left: '15%', size: 70, variant: 'layer1' as const },
    // Middle right (medium+)
    { top: '55%', right: '6%', size: 90, variant: 'layer2' as const },
    // Bottom left (high)
    { bottom: '25%', left: '8%', size: 110, variant: 'asset' as const },
    // Top middle (high)
    { top: '8%', left: '50%', size: 75, variant: 'layer1' as const },
    // Bottom middle (high)
    { bottom: '10%', left: '45%', size: 85, variant: 'layer2' as const },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {positions.slice(0, elements).map((pos, index) => (
        <motion.div
          key={`cad-element-${section}-${index}`}
          className="absolute"
          style={{
            ...pos,
            x: index % 3 === 0 ? y1 : index % 3 === 1 ? y2 : y3,
          }}
        >
          <motion.div
            style={{
              x: smoothMouseX,
              y: smoothMouseY,
            }}
          >
            <CADElement
              size={pos.size}
              opacity={0.08 + (index * 0.02)}
              blur={index % 2 === 0 ? 0.5 : 0}
              rotationSpeed={15 + (index * 3)}
              floatRange={15 + (index * 5)}
              delay={index * 1.5}
              variant={pos.variant}
            />
          </motion.div>
        </motion.div>
      ))}
      
      {/* Mobile-optimized elements - smaller and fewer */}
      <div className="lg:hidden">
        <motion.div
          className="absolute top-[10%] right-[5%]"
          style={{ x: y1 }}
        >
          <CADElement
            size={60}
            opacity={0.1}
            rotationSpeed={12}
            floatRange={10}
            delay={0}
            variant="layer1"
          />
        </motion.div>
        
        <motion.div
          className="absolute bottom-[15%] left-[8%]"
          style={{ x: y2 }}
        >
          <CADElement
            size={70}
            opacity={0.12}
            rotationSpeed={15}
            floatRange={12}
            delay={1}
            variant="layer2"
          />
        </motion.div>
      </div>
    </div>
  );
}

// Preset configurations for different sections
export function HeroCADElements() {
  return <CADFloatingElements density="low" section="hero" />;
}

export function ProductsCADElements() {
  return <CADFloatingElements density="medium" section="products" />;
}

export function ProblemsCADElements() {
  return <CADFloatingElements density="low" section="problems" />;
}

export function SocialProofCADElements() {
  return <CADFloatingElements density="medium" section="social" />;
}

export function TestimonialsCADElements() {
  return <CADFloatingElements density="medium" section="testimonials" />;
}

export function FAQCADElements() {
  return <CADFloatingElements density="low" section="faq" />;
}