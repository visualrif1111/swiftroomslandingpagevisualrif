import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import svgPaths from '../../imports/svg-w7uq9akn3g';
import { FloatingOrnament } from './FloatingOrnament';
import { ImmersiveBackgroundAnimations } from './ImmersiveBackgroundAnimations';
import { SwipeCarousel } from './SwipeCarousel';

const PROCESS_STEPS = [
  { number: '01', title: 'Free Consultation', description: 'We discuss your needs, budget and vision — no obligation, no pressure.' },
  { number: '02', title: 'Site Survey', description: 'We visit and precisely measure your site to plan the right solution.' },
  { number: '03', title: 'Design & Quotation', description: 'You receive detailed designs, specifications and a clear, fixed quote.' },
  { number: '04', title: 'Manufacturing', description: 'Your systems are precision-made locally in our UAE facility.' },
  { number: '05', title: 'Installation', description: 'Our specialist team fits everything cleanly and on schedule.' },
  { number: '06', title: 'Handover & Aftercare', description: 'Final inspection, warranty activation and ongoing aftercare you can rely on.' },
];

// Vertical step card for the mobile swipe carousel.
function ProcessStepCard({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className="h-full bg-white sr-card-premium p-6 flex flex-col">
      <div className="w-14 h-14 bg-[#007969] rounded-full flex items-center justify-center shadow-lg mb-5">
        <span className="font-heading text-xl text-white font-semibold">{number}</span>
      </div>
      <h3 className="font-heading text-[1.125rem] font-semibold text-[#1c1c1e] mb-1.5 leading-snug">
        {title}
      </h3>
      <p className="font-body text-[0.9375rem] text-[#3a3a3c] leading-relaxed">
        {description}
      </p>
    </div>
  );
}

function ProcessIcon() {
  return (
    <svg className="w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 90.8979 90.9007">
      <g>
        <path d={svgPaths.p20dbde00} fill="#007969" />
        <path d={svgPaths.p1179ee00} fill="#007969" />
        <path d={svgPaths.p351f0a00} fill="#007969" />
        <path d={svgPaths.pcdde100} fill="#007969" />
        <path d={svgPaths.p65cf880} fill="#007969" />
        <g>
          <path d={svgPaths.p12ee400} fill="#007969" />
          <path d={svgPaths.p3eba3700} fill="#007969" />
        </g>
        <g>
          <path d={svgPaths.p1f014b00} fill="#007969" />
          <path d={svgPaths.pd8addf0} fill="#007969" />
        </g>
        <g>
          <path d={svgPaths.pa74e380} fill="#007969" />
          <path d={svgPaths.p116a800} fill="#007969" />
        </g>
        <g>
          <path d={svgPaths.p1f976500} fill="#007969" />
          <path d={svgPaths.p3c909800} fill="#007969" />
        </g>
        <g>
          <path d={svgPaths.p177f1280} fill="#007969" />
          <path d={svgPaths.p34a0ac70} fill="#007969" />
        </g>
        <g>
          <path d={svgPaths.p6a5b080} fill="#007969" />
          <path d={svgPaths.p3384900} fill="#007969" />
        </g>
        <g>
          <path d={svgPaths.p9051e80} fill="#007969" />
          <path d={svgPaths.p13c6400} fill="#007969" />
        </g>
        <g>
          <path d={svgPaths.p11c6b380} fill="#007969" />
          <path d={svgPaths.p136e6d00} fill="#007969" />
        </g>
        <g>
          <path d={svgPaths.p2d768f70} fill="#007969" />
          <path d={svgPaths.p1fca7a40} fill="#007969" />
        </g>
      </g>
    </svg>
  );
}

interface ProcessStepProps {
  number: string;
  title: string;
  description: string;
  showConnector?: boolean;
  index: number;
  isActive: boolean;
  onHover: (index: number | null) => void;
}

function ProcessStep({ number, title, description, showConnector = true, index, isActive, onHover }: ProcessStepProps) {
  return (
    <motion.div
      className="flex flex-row items-start gap-4 relative cursor-pointer lg:flex-col lg:items-center lg:gap-0"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.25, 0.4, 0.25, 1]
      }}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
      onTouchStart={() => onHover(index)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Mobile vertical timeline connector - runs through badge centers */}
      {showConnector && (
        <div className="lg:hidden absolute left-6 top-12 -bottom-8 w-px -translate-x-1/2 bg-gradient-to-b from-[#007969]/40 to-[#007969]/10 z-0" />
      )}

      {/* Step Number Circle */}
      <motion.div
        className="w-12 h-12 lg:w-20 lg:h-20 flex-shrink-0 bg-[#007969] rounded-full flex items-center justify-center mb-2 lg:mb-6 relative z-10 shadow-lg"
        animate={{
          scale: isActive ? 1.1 : 1,
          backgroundColor: isActive ? "#007969" : "#007969",
          boxShadow: isActive 
            ? "0 10px 30px rgba(0, 136, 115, 0.4)" 
            : "0 4px 10px rgba(0, 0, 0, 0.1)"
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <motion.span
          className="font-heading text-base lg:text-2xl text-white font-medium"
          animate={{ scale: isActive ? 1.1 : 1 }}
          transition={{ duration: 0.3 }}
        >
          {number}
        </motion.span>
      </motion.div>

      {/* Decorative Icon - Hidden on mobile */}
      <motion.div
        className="hidden lg:block w-12 h-12 mb-4"
        animate={{ 
          opacity: isActive ? 1 : 0.3,
          rotate: isActive ? 360 : 0
        }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <ProcessIcon />
      </motion.div>

      {/* Step Content */}
      <motion.div
        className="flex-1 min-w-0 text-left pt-1 pb-1 lg:pt-0 lg:pb-0 lg:text-center lg:max-w-[280px]"
        animate={{ y: isActive ? -5 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <h3 className="font-heading text-[1.0625rem] lg:text-xl font-semibold lg:font-medium text-[#1c1c1e] mb-1 lg:mb-3 lg:min-h-[3.5rem] flex items-center justify-start lg:justify-center">
          {title}
        </h3>
        <p className="font-body text-[0.9375rem] lg:text-base text-[#3a3a3c] leading-relaxed">
          {description}
        </p>
      </motion.div>

      {/* Connector Line - Desktop only */}
      {showConnector && (
        <motion.div
          className="hidden lg:block absolute top-8 left-[calc(50%+2.5rem)] w-full h-0.5 bg-gradient-to-r from-[#007969] to-[rgba(0,136,115,0.3)] overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ 
            duration: 0.3,
            delay: index * 0.5 + 0.4,
            ease: "easeOut"
          }}
        >
          <motion.div
            className="h-full w-full bg-gradient-to-r from-[#007969] to-[#00a389] origin-left"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ 
              duration: 0.6,
              delay: index * 0.5 + 0.5,
              ease: [0.4, 0, 0.2, 1]
            }}
            style={{ transformOrigin: "left" }}
          />
        </motion.div>
      )}
    </motion.div>
  );
}

export function ProcessSection() {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [hasViewed, setHasViewed] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasViewed) {
            setHasViewed(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasViewed]);

  return (
    <section id="process" className="relative bg-white min-h-screen overflow-hidden lg:snap-start flex items-start pt-20 lg:pt-24 pb-12" ref={sectionRef}>
      {/* Animated Background Ornaments */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <FloatingOrnament position="left" size="medium" animationSpeed="slow" opacity={0.08} offsetY="-30%" />
        <FloatingOrnament position="right" size="small" animationSpeed="fast" opacity={0.12} offsetY="-70%" />
      </div>

      <div className="container mx-auto px-4 relative z-30 py-4 lg:py-0">
        {/* Section Header */}
        <motion.div
          className="text-center mb-8 lg:mb-20 relative z-40"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="font-heading sr-heading font-semibold lg:font-medium lg:text-4xl text-[#1c1c1e] mb-2 lg:mb-3 tracking-wide relative z-40">
            How It Works
          </h2>
          <div className="divider-brand mx-auto mb-3 lg:mb-4" />
          <p className="font-body text-sm lg:text-xl text-[#3a3a3c] max-w-md mx-auto leading-relaxed lg:max-w-none">
            From your free quote to aftercare, we handle every step — so you know exactly what to expect
          </p>
        </motion.div>

        {/* Process Steps — desktop horizontal row */}
        <div className="hidden lg:grid lg:grid-cols-6 lg:gap-0 max-w-7xl mx-auto">
          {PROCESS_STEPS.map((step, i) => (
            <ProcessStep
              key={step.number}
              number={step.number}
              title={step.title}
              description={step.description}
              showConnector={i < PROCESS_STEPS.length - 1}
              index={i}
              isActive={activeStep === i}
              onHover={setActiveStep}
            />
          ))}
        </div>

        {/* Process Steps — mobile swipeable carousel */}
        <div className="lg:hidden">
          <SwipeCarousel
            ariaLabel="How it works steps"
            items={PROCESS_STEPS.map((step) => (
              <ProcessStepCard key={step.number} {...step} />
            ))}
          />
        </div>
      </div>
    </section>
  );
}