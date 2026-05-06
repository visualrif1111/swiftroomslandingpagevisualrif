import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import svgPaths from '../../imports/svg-w7uq9akn3g';
import { FloatingOrnament } from './FloatingOrnament';
import { ImmersiveBackgroundAnimations } from './ImmersiveBackgroundAnimations';

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
      className="flex flex-col items-center relative cursor-pointer"
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
      {/* Step Number Circle */}
      <motion.div
        className="w-12 h-12 lg:w-20 lg:h-20 bg-[#008873] rounded-full flex items-center justify-center mb-2 lg:mb-6 relative z-10 shadow-lg"
        animate={{
          scale: isActive ? 1.1 : 1,
          backgroundColor: isActive ? "#007969" : "#008873",
          boxShadow: isActive 
            ? "0 10px 30px rgba(0, 136, 115, 0.4)" 
            : "0 4px 10px rgba(0, 0, 0, 0.1)"
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <motion.span
          className="font-['Inter',sans-serif] text-base lg:text-2xl text-white font-normal"
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
        className="text-center max-w-[280px]"
        animate={{ y: isActive ? -5 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <h3 className="font-['Exo',sans-serif] text-sm lg:text-xl font-medium text-[#1c1c1e] mb-1 lg:mb-3 min-h-[2.5rem] lg:min-h-[3.5rem] flex items-center justify-center">
          {title}
        </h3>
        <p className="font-['Rajdhani',sans-serif] text-[10px] lg:text-base text-[#3a3a3c] leading-snug lg:leading-relaxed">
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
    <section id="process" className="relative bg-white min-h-screen overflow-hidden lg:snap-center flex items-center" ref={sectionRef}>
      {/* Animated Background Ornaments */}
      <FloatingOrnament position="left" size="medium" animationSpeed="slow" opacity={0.08} offsetY="-30%" />
      <FloatingOrnament position="right" size="small" animationSpeed="fast" opacity={0.12} offsetY="-70%" />
      
      <div className="container mx-auto px-4 relative z-10 py-4 lg:py-0">
        {/* Section Header */}
        <motion.div
          className="text-center mb-4 lg:mb-20"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="font-['Exo',sans-serif] text-base lg:text-4xl font-medium text-[#1c1c1e] mb-1 lg:mb-3 tracking-wide">
            Simple 5-Step Process
          </h2>
          <p className="font-['Barlow',sans-serif] text-[10px] lg:text-xl text-[#3a3a3c]">
            From quote to installation, we make it easy
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-0 max-w-7xl mx-auto">
          <ProcessStep
            number="01"
            title="Request Quote"
            description="Complete our quick form or call to get started."
            showConnector={true}
            index={0}
            isActive={activeStep === 0}
            onHover={setActiveStep}
          />
          <ProcessStep
            number="02"
            title="Consultation Visit"
            description="Discuss your needs with our expert team & receive an accurate quote"
            showConnector={true}
            index={1}
            isActive={activeStep === 1}
            onHover={setActiveStep}
          />
          <ProcessStep
            number="03"
            title="Contract & Project Measurement"
            description="We confirm site measurements and issue your project contract."
            showConnector={true}
            index={2}
            isActive={activeStep === 2}
            onHover={setActiveStep}
          />
          <ProcessStep
            number="04"
            title="Installation"
            description="Professional installation completed efficiently with minimal disruption."
            showConnector={true}
            index={3}
            isActive={activeStep === 3}
            onHover={setActiveStep}
          />
          <div className="col-span-2 lg:col-span-1 flex justify-center">
            <ProcessStep
              number="05"
              title="Quality Assurance"
              description="Final inspection and warranty activation to ensure your complete satisfaction."
              showConnector={false}
              index={4}
              isActive={activeStep === 4}
              onHover={setActiveStep}
            />
          </div>
        </div>
      </div>
    </section>
  );
}