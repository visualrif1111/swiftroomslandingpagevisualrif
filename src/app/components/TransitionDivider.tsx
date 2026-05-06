import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'motion/react';
import svgPaths from '../../imports/svg-o9tsfyos99';
import logoSvgPaths from '../../imports/svg-grahy2no78';

interface DiamondOrnamentProps {
  delay?: number;
  scale?: number;
  rotation?: number;
  x?: number;
  y?: number;
  duration?: number;
}

function DiamondOrnament({ delay = 0, scale = 1, rotation = 0, x = 0, y = 0, duration = 20 }: DiamondOrnamentProps) {
  return (
    <motion.div
      className="absolute"
      initial={{ opacity: 0, scale: 0, rotate: rotation }}
      whileInView={{ 
        opacity: [0, 1, 1, 0],
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
        <g opacity="0.7">
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

function ParticleField() {
  const particles = Array.from({ length: 30 }, (_, i) => i);

  return (
    <>
      {particles.map((i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-[#007969] rounded-full"
          initial={{
            x: `${Math.random() * 100}%`,
            y: `${Math.random() * 100}%`,
            opacity: 0,
          }}
          animate={{
            x: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
            y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
            opacity: [0, 0.6, 0],
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

export function TransitionDivider() {
  return (
    <div className="relative w-full h-96 lg:h-[500px] bg-gradient-to-b from-gray-50 via-white to-gray-50 overflow-hidden flex items-center justify-center" style={{ position: 'relative' }}>
      {/* Animated Background Gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-radial from-[#007969]/5 via-transparent to-transparent"
        animate={{
          scale: 1.5,
          opacity: 1,
        }}
        transition={{ duration: 1, ease: "easeOut" }}
      />

      {/* Particle Field */}
      <ParticleField />

      {/* Central Main Ornament */}
      <motion.div
        className="relative z-10 mx-auto w-32 sm:w-40 lg:w-56 h-32 sm:h-40 lg:h-56"
        style={{
          rotateZ: 0,
          scale: 1.2,
          opacity: 1,
        }}
      >
        <motion.div
          style={{
            y: 0,
            x: 0,
          }}
        >
          <motion.div
            animate={{
              rotateY: [0, 360],
              rotateX: 15,
            }}
            transition={{
              rotateY: { duration: 20, repeat: Infinity, ease: "linear" },
              rotateX: { duration: 0.5 }
            }}
            style={{ 
              transformStyle: "preserve-3d",
              y: 0
            }}
          >
            <svg 
              className="w-full h-full drop-shadow-2xl filter hover:drop-shadow-[0_0_30px_rgba(0,121,105,0.6)]" 
              fill="none" 
              preserveAspectRatio="xMidYMid meet" 
              viewBox="0 0 613.215 613.234"
            >
              <motion.g
                animate={{
                  scale: 1.1,
                }}
                transition={{ duration: 0.3 }}
              >
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
              </motion.g>
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Orbiting Smaller Ornaments - Hidden on mobile for performance */}
      <div className="hidden lg:block">
        <div className="w-16 h-16">
          <DiamondOrnament delay={0} scale={0.3} rotation={0} x={20} y={20} duration={15} />
        </div>
        <div className="w-12 h-12">
          <DiamondOrnament delay={1} scale={0.25} rotation={45} x={80} y={30} duration={18} />
        </div>
        <div className="w-20 h-20">
          <DiamondOrnament delay={2} scale={0.35} rotation={90} x={15} y={70} duration={20} />
        </div>
        <div className="w-14 h-14">
          <DiamondOrnament delay={3} scale={0.28} rotation={135} x={85} y={75} duration={16} />
        </div>
        <div className="w-10 h-10">
          <DiamondOrnament delay={1.5} scale={0.22} rotation={180} x={50} y={10} duration={22} />
        </div>
        <div className="w-16 h-16">
          <DiamondOrnament delay={2.5} scale={0.32} rotation={225} x={40} y={85} duration={19} />
        </div>
      </div>

      {/* Animated Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
        <motion.line
          x1="0"
          y1="50%"
          x2="100%"
          y2="50%"
          stroke="#007969"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.3 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          viewport={{ once: false }}
        />
        <motion.line
          x1="50%"
          y1="0"
          x2="50%"
          y2="100%"
          stroke="#007969"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.3 }}
          transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
          viewport={{ once: false }}
        />
      </svg>

      {/* Floating Logo Watermark */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[400px] lg:w-[500px] h-[300px] sm:h-[400px] lg:h-[500px] pointer-events-none z-0"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.04, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <motion.div
          animate={{
            rotate: [0, 360],
          }}
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
              {/* Inner "T" shape */}
              <path d={logoSvgPaths.p3acf9600} fill="#007969" />
              {/* Outer circle */}
              <path d={logoSvgPaths.p171d0500} fill="#007969" />
            </g>
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
}