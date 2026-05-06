import { useEffect, useRef, useState } from 'react';
import svgPaths from '../../imports/svg-8x8crl5gmo';

export function AnimatedOrnament() {
  const ornamentRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Intersection Observer for scroll animations
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

  return (
    <div
      ref={ornamentRef}
      className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none hidden lg:block overflow-visible"
      style={{
        transform: `translate(${200 + mousePosition.x}px, ${-50 + mousePosition.y}%)`,
        transition: 'transform 0.3s ease-out',
        opacity: isVisible ? 0.15 : 0,
        filter: 'blur(0.5px)',
      }}
    >
      {/* Main rotating ornament */}
      <div
        className="absolute inset-0 animate-spin-slow"
        style={{
          animation: 'spin-slow 30s linear infinite',
          transformStyle: 'preserve-3d',
        }}
      >
        <div className="relative w-full h-full">
          {/* Central ornament */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px]">
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

          {/* Orbital satellites - 6 smaller ornaments rotating around */}
          {[0, 1, 2, 3, 4, 5].map((index) => {
            const angle = (index * 60 * Math.PI) / 180;
            const radius = 200;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            return (
              <div
                key={index}
                className="absolute left-1/2 top-1/2"
                style={{
                  transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                  animation: `orbit-reverse 20s linear infinite`,
                  animationDelay: `${-index * 3.33}s`,
                }}
              >
                <div
                  className="w-[80px] h-[80px]"
                  style={{
                    animation: 'spin-fast 10s linear infinite',
                  }}
                >
                  <svg
                    className="w-full h-full opacity-70"
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
              </div>
            );
          })}
        </div>
      </div>

      {/* Particle field effect */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => {
          const angle = (i * 30 * Math.PI) / 180;
          const radius = 150 + Math.random() * 100;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          return (
            <div
              key={i}
              className="absolute left-1/2 top-1/2 w-1 h-1 bg-[#007969] rounded-full"
              style={{
                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                animation: `pulse 3s ease-in-out infinite`,
                animationDelay: `${i * 0.25}s`,
                opacity: 0.4,
              }}
            />
          );
        })}
      </div>

      <style>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes spin-fast {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(-360deg);
          }
        }

        @keyframes orbit-reverse {
          from {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(-360deg);
          }
        }

        @keyframes pulse {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.4;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.5);
            opacity: 0.8;
          }
        }
      `}</style>
    </div>
  );
}
