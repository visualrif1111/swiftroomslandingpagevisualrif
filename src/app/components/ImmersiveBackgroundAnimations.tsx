import { motion } from 'motion/react';
import svgPaths from '../../imports/svg-o9tsfyos99';
import logoSvgPaths from '../../imports/svg-grahy2no78';

interface DiamondOrnamentProps {
  delay?: number;
  scale?: number;
  rotation?: number;
  x?: number;
  y?: number;
  duration?: number;
  opacity?: number;
}

function DiamondOrnament({ 
  delay = 0, 
  scale = 1, 
  rotation = 0, 
  x = 0, 
  y = 0, 
  duration = 20,
  opacity = 0.7 
}: DiamondOrnamentProps) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      initial={{ opacity: 0, scale: 0, rotate: rotation }}
      whileInView={{ 
        opacity: [0, opacity, opacity, 0],
        scale: [0, scale, scale, 0],
        rotate: [rotation, rotation + 360, rotation + 720, rotation + 1080],
        x: [x, x + Math.sin(delay) * 100, x - Math.sin(delay) * 50, x],
        y: [y, y + Math.cos(delay) * 100, y - Math.cos(delay) * 50, y],
      }}
      viewport={{ once: false, margin: "-100px" }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      style={{
        left: `${x}%`,
        top: `${y}%`,
      }}
    >
      <svg className="w-full h-full drop-shadow-2xl" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 613.215 613.234">
        <g opacity={opacity}>
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
    </motion.div>
  );
}

interface ParticleFieldProps {
  count?: number;
  opacity?: number;
  color?: string;
}

function ParticleField({ count = 20, opacity = 0.4, color = "#007969" }: ParticleFieldProps) {
  const particles = Array.from({ length: count }, (_, i) => i);

  return (
    <>
      {particles.map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            backgroundColor: color,
          }}
          initial={{
            x: `${Math.random() * 100}%`,
            y: `${Math.random() * 100}%`,
            opacity: 0,
          }}
          animate={{
            x: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
            y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
            opacity: [0, opacity, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 5,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut",
          }}
        />
      ))}
    </>
  );
}

interface AnimatedLinesProps {
  opacity?: number;
  color?: string;
  pattern?: 'cross' | 'diagonal' | 'grid';
}

function AnimatedLines({ opacity = 0.15, color = "#007969", pattern = 'cross' }: AnimatedLinesProps) {
  if (pattern === 'cross') {
    return (
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <motion.line
          x1="0"
          y1="50%"
          x2="100%"
          y2="50%"
          stroke={color}
          strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: opacity }}
          transition={{ duration: 2, ease: "easeInOut" }}
          viewport={{ once: false }}
        />
        <motion.line
          x1="50%"
          y1="0"
          x2="50%"
          y2="100%"
          stroke={color}
          strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: opacity }}
          transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
          viewport={{ once: false }}
        />
      </svg>
    );
  }

  if (pattern === 'diagonal') {
    return (
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <motion.line
          x1="0"
          y1="0"
          x2="100%"
          y2="100%"
          stroke={color}
          strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: opacity }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
          viewport={{ once: false }}
        />
        <motion.line
          x1="100%"
          y1="0"
          x2="0"
          y2="100%"
          stroke={color}
          strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: opacity }}
          transition={{ duration: 2.5, delay: 0.3, ease: "easeInOut" }}
          viewport={{ once: false }}
        />
      </svg>
    );
  }

  // Grid pattern
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none">
      {[25, 50, 75].map((pos, i) => (
        <motion.line
          key={`v-${i}`}
          x1={`${pos}%`}
          y1="0"
          x2={`${pos}%`}
          y2="100%"
          stroke={color}
          strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: opacity * 0.6 }}
          transition={{ duration: 2, delay: i * 0.2, ease: "easeInOut" }}
          viewport={{ once: false }}
        />
      ))}
      {[25, 50, 75].map((pos, i) => (
        <motion.line
          key={`h-${i}`}
          x1="0"
          y1={`${pos}%`}
          x2="100%"
          y2={`${pos}%`}
          stroke={color}
          strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: opacity * 0.6 }}
          transition={{ duration: 2, delay: 0.5 + i * 0.2, ease: "easeInOut" }}
          viewport={{ once: false }}
        />
      ))}
    </svg>
  );
}

interface FloatingWatermarkProps {
  opacity?: number;
  size?: number;
  rotation?: boolean;
}

function FloatingWatermark({ opacity = 0.03, size = 400, rotation = true }: FloatingWatermarkProps) {
  return (
    <motion.div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      style={{ width: size, height: size }}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: opacity, scale: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      viewport={{ once: false }}
    >
      <motion.div
        animate={rotation ? { rotate: [0, 360] } : {}}
        transition={{
          duration: 60,
          repeat: Infinity,
          ease: "linear"
        }}
        className="w-full h-full"
      >
        <svg 
          className="w-full h-full" 
          fill="none" 
          preserveAspectRatio="xMidYMid meet" 
          viewBox="0 0 618.432 617.342"
        >
          <g opacity="1">
            <path d={logoSvgPaths.p3acf9600} fill="#007969" />
            <path d={logoSvgPaths.p171d0500} fill="#007969" />
          </g>
        </svg>
      </motion.div>
    </motion.div>
  );
}

export interface ImmersiveBackgroundAnimationsProps {
  particles?: boolean;
  particleCount?: number;
  particleOpacity?: number;
  ornaments?: boolean;
  ornamentCount?: number;
  ornamentOpacity?: number;
  lines?: boolean;
  linePattern?: 'cross' | 'diagonal' | 'grid';
  lineOpacity?: number;
  watermark?: boolean;
  watermarkOpacity?: number;
  watermarkSize?: number;
  watermarkRotation?: boolean;
  gradient?: boolean;
  gradientOpacity?: number;
  hideOnMobile?: boolean;
}

export function ImmersiveBackgroundAnimations({
  particles = false,
  particleCount = 20,
  particleOpacity = 0.4,
  ornaments = false,
  ornamentCount = 3,
  ornamentOpacity = 0.5,
  lines = false,
  linePattern = 'cross',
  lineOpacity = 0.15,
  watermark = false,
  watermarkOpacity = 0.03,
  watermarkSize = 400,
  watermarkRotation = true,
  gradient = false,
  gradientOpacity = 0.05,
  hideOnMobile = true,
}: ImmersiveBackgroundAnimationsProps) {
  const ornamentPositions = [
    { x: 10, y: 15, scale: 0.25, rotation: 0, duration: 18 },
    { x: 85, y: 20, scale: 0.22, rotation: 45, duration: 20 },
    { x: 15, y: 75, scale: 0.28, rotation: 90, duration: 16 },
    { x: 80, y: 80, scale: 0.3, rotation: 135, duration: 22 },
    { x: 50, y: 10, scale: 0.2, rotation: 180, duration: 19 },
    { x: 45, y: 85, scale: 0.26, rotation: 225, duration: 17 },
  ];

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${hideOnMobile ? 'hidden lg:block' : ''}`}>
      {/* Gradient Background */}
      {gradient && (
        <motion.div
          className="absolute inset-0 bg-gradient-radial from-[#007969] via-transparent to-transparent"
          style={{ opacity: gradientOpacity }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      {/* Particle Field */}
      {particles && <ParticleField count={particleCount} opacity={particleOpacity} />}

      {/* Animated Lines */}
      {lines && <AnimatedLines opacity={lineOpacity} pattern={linePattern} />}

      {/* Floating Watermark */}
      {watermark && (
        <FloatingWatermark 
          opacity={watermarkOpacity} 
          size={watermarkSize} 
          rotation={watermarkRotation}
        />
      )}

      {/* Ornaments */}
      {ornaments && (
        <>
          {ornamentPositions.slice(0, ornamentCount).map((pos, i) => (
            <div key={i} className="w-12 h-12 lg:w-16 lg:h-16">
              <DiamondOrnament
                delay={i * 0.5}
                scale={pos.scale}
                rotation={pos.rotation}
                x={pos.x}
                y={pos.y}
                duration={pos.duration}
                opacity={ornamentOpacity}
              />
            </div>
          ))}
        </>
      )}
    </div>
  );
}
