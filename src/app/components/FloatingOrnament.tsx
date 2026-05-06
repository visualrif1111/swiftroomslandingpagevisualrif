import { useEffect, useRef, useState } from 'react';
import svgPaths from '../../imports/svg-8x8crl5gmo';

interface FloatingOrnamentProps {
  position?: 'left' | 'right' | 'center';
  size?: 'small' | 'medium' | 'large';
  animationSpeed?: 'slow' | 'medium' | 'fast';
  opacity?: number;
  offsetY?: string;
}

export function FloatingOrnament({
  position = 'right',
  size = 'medium',
  animationSpeed = 'medium',
  opacity = 0.1,
  offsetY = '-50%',
}: FloatingOrnamentProps) {
  const ornamentRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const sizeMap = {
    small: { main: 150, satellite: 40, orbit: 100 },
    medium: { main: 250, satellite: 60, orbit: 150 },
    large: { main: 400, satellite: 80, orbit: 200 },
  };

  const speedMap = {
    slow: { main: 40, satellite: 15, orbit: 30 },
    medium: { main: 25, satellite: 10, orbit: 20 },
    fast: { main: 15, satellite: 6, orbit: 12 },
  };

  const currentSize = sizeMap[size];
  const currentSpeed = speedMap[animationSpeed];

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Scroll parallax
  useEffect(() => {
    const handleScroll = () => {
      if (ornamentRef.current) {
        const rect = ornamentRef.current.getBoundingClientRect();
        const scrollProgress = (window.innerHeight - rect.top) / window.innerHeight;
        setScrollY(scrollProgress * 50);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (ornamentRef.current) {
      observer.observe(ornamentRef.current);
    }

    return () => {
      if (ornamentRef.current) {
        observer.unobserve(ornamentRef.current);
      }
    };
  }, []);

  const getPositionStyles = () => {
    const base = {
      top: '50%',
      transform: `translate(${mousePosition.x}px, ${offsetY}) translateY(${scrollY}px)`,
      transition: 'transform 0.5s ease-out',
    };

    if (position === 'left') {
      return { ...base, left: '0', transform: `translate(${-150 + mousePosition.x}px, ${offsetY}) translateY(${scrollY}px)` };
    } else if (position === 'right') {
      return { ...base, right: '0', transform: `translate(${150 + mousePosition.x}px, ${offsetY}) translateY(${scrollY}px)` };
    } else {
      return { ...base, left: '50%', transform: `translate(calc(-50% + ${mousePosition.x}px), ${offsetY}) translateY(${scrollY}px)` };
    }
  };

  return (
    <div
      ref={ornamentRef}
      className="absolute pointer-events-none hidden lg:block"
      style={{
        ...getPositionStyles(),
        width: `${currentSize.main + 200}px`,
        height: `${currentSize.main + 200}px`,
        opacity: isVisible ? opacity : 0,
        filter: 'blur(0.5px)',
        zIndex: 0,
      }}
    >
      {/* Main rotating ornament */}
      <div
        className="absolute inset-0"
        style={{
          animation: `spin-ornament ${currentSpeed.main}s linear infinite`,
          transformStyle: 'preserve-3d',
        }}
      >
        <div className="relative w-full h-full">
          {/* Central ornament */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ width: currentSize.main, height: currentSize.main }}
          >
            <svg
              className="w-full h-full"
              viewBox="0 0 613.215 613.234"
              fill="none"
              preserveAspectRatio="xMidYMid meet"
            >
              <g>
                <path d={svgPaths.p5501680} fill="#007969" />
                <path d={svgPaths.p283f4d00} fill="#007969" />
                <path d={svgPaths.p2b80a100} fill="#007969" />
                <path d={svgPaths.p28198470} fill="#007969" />
                <path d={svgPaths.p2b88e00} fill="#007969" />
                <g>
                  <path d={svgPaths.p17f3f000} fill="#007969" />
                  <path d={svgPaths.p158a0c80} fill="#007969" />
                </g>
                <g>
                  <path d={svgPaths.p37eb4400} fill="#007969" />
                  <path d={svgPaths.p17b28640} fill="#007969" />
                </g>
                <g>
                  <path d={svgPaths.p242f1a80} fill="#007969" />
                  <path d={svgPaths.p14229700} fill="#007969" />
                </g>
                <g>
                  <path d={svgPaths.p37775500} fill="#007969" />
                  <path d={svgPaths.p3754f370} fill="#007969" />
                </g>
                <g>
                  <path d={svgPaths.p304d1b00} fill="#007969" />
                  <path d={svgPaths.p4364930} fill="#007969" />
                </g>
                <g>
                  <path d={svgPaths.p283dda80} fill="#007969" />
                  <path d={svgPaths.p361aab40} fill="#007969" />
                </g>
                <g>
                  <path d={svgPaths.p129909c0} fill="#007969" />
                  <path d={svgPaths.p1e2e4c80} fill="#007969" />
                </g>
                <g>
                  <path d={svgPaths.p3d59c600} fill="#007969" />
                  <path d={svgPaths.p3b321480} fill="#007969" />
                </g>
                <g>
                  <path d={svgPaths.p2a159a00} fill="#007969" />
                  <path d={svgPaths.p272f4d00} fill="#007969" />
                </g>
              </g>
            </svg>
          </div>

          {/* Orbital satellites */}
          {[0, 1, 2, 3].map((index) => {
            const angle = (index * 90 * Math.PI) / 180;
            const x = Math.cos(angle) * currentSize.orbit;
            const y = Math.sin(angle) * currentSize.orbit;

            return (
              <div
                key={index}
                className="absolute left-1/2 top-1/2"
                style={{
                  transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                  animation: `orbit-path ${currentSpeed.orbit}s linear infinite`,
                  animationDelay: `${-index * (currentSpeed.orbit / 4)}s`,
                }}
              >
                <div
                  style={{
                    width: currentSize.satellite,
                    height: currentSize.satellite,
                    animation: `spin-reverse ${currentSpeed.satellite}s linear infinite`,
                  }}
                >
                  <svg
                    className="w-full h-full opacity-60"
                    viewBox="0 0 613.215 613.234"
                    fill="none"
                    preserveAspectRatio="xMidYMid meet"
                  >
                    <g>
                      <path d={svgPaths.p5501680} fill="#007969" />
                      <path d={svgPaths.p283f4d00} fill="#007969" />
                      <path d={svgPaths.p2b80a100} fill="#007969" />
                      <path d={svgPaths.p28198470} fill="#007969" />
                      <path d={svgPaths.p2b88e00} fill="#007969" />
                    </g>
                  </svg>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => {
          const angle = (i * 45 * Math.PI) / 180;
          const radius = currentSize.orbit * 0.7;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          return (
            <div
              key={i}
              className="absolute left-1/2 top-1/2 w-1.5 h-1.5 bg-[#007969] rounded-full"
              style={{
                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                animation: `float-particle ${3 + i * 0.5}s ease-in-out infinite`,
                animationDelay: `${i * 0.3}s`,
                opacity: 0.5,
              }}
            />
          );
        })}
      </div>

      <style>{`
        @keyframes spin-ornament {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes spin-reverse {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }

        @keyframes orbit-path {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(-360deg); }
        }

        @keyframes float-particle {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.5;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.8);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
