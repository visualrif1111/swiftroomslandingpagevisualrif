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
    <section id="contact-form" className="relative min-h-screen bg-gradient-to-b from-white to-gray-50 lg:snap-center flex items-center py-16 lg:py-0">
      <div className="container mx-auto px-4 lg:px-8 relative z-10 py-6 lg:py-8">
        {/* Decorative Background */}
        <ImmersiveBackgroundAnimations />
        
        <div className="max-w-4xl mx-auto space-y-8 lg:space-y-12">
          {/* Section Header */}
          <div className="text-center space-y-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-heading text-base lg:text-4xl font-medium text-[#1c1c1e]"
            >
              Get Your Free Quote
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-body text-lg lg:text-xl text-[#3a3a3c] max-w-2xl mx-auto"
            >
              Takes under a minute. No obligation. A specialist responds within 12 hours.
            </motion.p>

            {/* Trust signals near the form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 pt-2"
            >
              {[
                '4.4★ · 130+ reviews',
                '3,500+ projects completed',
                '14+ years in the UAE',
                'Showroom in Dubai',
              ].map((stat) => (
                <span
                  key={stat}
                  className="font-body text-xs lg:text-sm text-[#007969] font-medium bg-[#e6f4f1] border border-[#00796933] rounded-[4px] px-3 py-1.5"
                >
                  {stat}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Lead Form - Use same desktop version for all devices */}
          <LeadForm />
        </div>
      </div>
    </section>
  );
}