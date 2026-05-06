import { LeadForm } from './LeadForm';
import { LeadFormAndroid } from './LeadFormAndroid';
import { FloatingOrnament } from './FloatingOrnament';
import { ImmersiveBackgroundAnimations } from './ImmersiveBackgroundAnimations';
import { motion } from 'motion/react';
import { useState, useEffect } from 'react';

export function FormSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section id="contact-form" className="relative min-h-screen bg-gradient-to-b from-white to-gray-50 lg:snap-center flex items-center">
      <div className="container mx-auto px-4 lg:px-8 relative z-10 py-6 lg:py-8">
        {/* Decorative Background */}
        <ImmersiveBackgroundAnimations />
        
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Section Header */}
          <div className="text-center space-y-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-['Exo',sans-serif] text-base lg:text-4xl font-medium text-[#1c1c1e]"
            >
              Ready to Transform Your Space?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-['Barlow',sans-serif] text-lg lg:text-xl text-[#3a3a3c] max-w-2xl mx-auto"
            >
              Get a free consultation and quote from our expert team
            </motion.p>
          </div>

          {/* Lead Form - Use same desktop version for all devices */}
          <LeadForm />
        </div>
      </div>
    </section>
  );
}