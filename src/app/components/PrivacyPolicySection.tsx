import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, ExternalLink, ChevronDown } from 'lucide-react';

export function PrivacyPolicySection() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section id="privacy-policy" className="relative bg-gradient-to-b from-white to-gray-50 overflow-hidden lg:snap-center flex items-center py-8 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          
          {/* Mobile: Collapsible Header / Desktop: Full Header */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 mb-4"
            >
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#007969]/10 rounded-lg flex items-center justify-center">
                    <Shield className="w-5 h-5 text-[#007969]" />
                  </div>
                  <div className="text-left">
                    <h2 className="font-['Exo',sans-serif] text-base font-bold text-[#1c1c1e]">
                      Privacy Policy
                    </h2>
                    <p className="font-['Barlow',sans-serif] text-xs text-gray-500">
                      Tap to {isExpanded ? 'collapse' : 'read more'}
                    </p>
                  </div>
                </div>
                <ChevronDown 
                  className={`w-5 h-5 text-gray-400 transition-transform duration-300 flex-shrink-0 ${
                    isExpanded ? 'rotate-180' : ''
                  }`}
                />
              </div>
            </button>
          </div>

          {/* Desktop: Always visible header */}
          <motion.div
            className="hidden lg:block text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#007969] to-[#007969] rounded-2xl mb-6">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h2 className="font-['Exo',sans-serif] text-3xl sm:text-4xl font-bold text-[#1c1c1e] mb-4">
              Privacy Policy
            </h2>
            <p className="font-['Barlow',sans-serif] text-lg text-[#3a3a3c] max-w-2xl mx-auto">
              Your privacy is important to us. Learn how we collect, use, and protect your information.
            </p>
          </motion.div>

          {/* Content - Collapsible on Mobile, Always visible on Desktop */}
          <AnimatePresence>
            {(isExpanded || window.innerWidth >= 1024) && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden lg:overflow-visible"
              >
                <motion.div
                  className="bg-white rounded-2xl shadow-lg p-4 lg:p-10 border border-gray-100"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="space-y-4 lg:space-y-6">
                    {/* Introduction */}
                    <div>
                      <p className="font-['Barlow',sans-serif] text-xs lg:text-base text-[#3a3a3c] leading-relaxed">
                        At SWIFTROOMS, we are committed to protecting your privacy and ensuring the security of your personal information. 
                        We collect and process data in accordance with UAE data protection regulations to provide you with the best service possible.
                      </p>
                    </div>

                    {/* Key Points */}
                    <div className="space-y-2 lg:space-y-4">
                      {[
                        'Information Collection: We collect personal information you provide through our contact forms and quote requests.',
                        'Data Usage: Your information is used solely to process your inquiries and provide our services.',
                        'Data Security: We implement industry-standard security measures to protect your data.',
                        'Your Rights: You have the right to access, modify, or delete your personal information at any time.',
                      ].map((point, index) => (
                        <motion.div
                          key={index}
                          className="flex items-start gap-2 lg:gap-3 p-2 lg:p-4 bg-gray-50 rounded-lg"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                        >
                          <div className="flex-shrink-0 w-5 h-5 lg:w-6 lg:h-6 mt-0.5 rounded-full bg-[#007969] flex items-center justify-center">
                            <svg className="w-3 h-3 lg:w-3.5 lg:h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <p className="font-['Barlow',sans-serif] text-xs lg:text-sm text-[#3a3a3c] leading-relaxed">
                            {point}
                          </p>
                        </motion.div>
                      ))}
                    </div>

                    {/* Full Policy Link */}
                    <motion.div
                      className="pt-3 lg:pt-6 border-t border-gray-200"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.7 }}
                    >
                      <p className="font-['Barlow',sans-serif] text-xs lg:text-base text-[#3a3a3c] mb-3 lg:mb-5">
                        For complete details about our privacy practices, please review our full privacy policy:
                      </p>
                      <a
                        href="https://www.swiftrooms.ae/privacy-policy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 lg:px-8 lg:py-4 bg-gradient-to-r from-[#007969] to-[#007969] text-white rounded-lg font-['Rajdhani',sans-serif] text-sm lg:text-base font-bold hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 group"
                      >
                        <Shield className="w-4 h-4 lg:w-5 lg:h-5" />
                        View Full Privacy Policy
                        <ExternalLink className="w-4 h-4 lg:w-5 lg:h-5 group-hover:translate-x-1 transition-transform" />
                      </a>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                      className="pt-3 lg:pt-6 border-t border-gray-200"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.8 }}
                    >
                      <p className="font-['Barlow',sans-serif] text-xs lg:text-sm text-[#3a3a3c] leading-relaxed">
                        If you have any questions about our privacy practices or wish to exercise your rights, please contact us at{' '}
                        <a 
                          href="mailto:info@swiftrooms.ae" 
                          className="text-[#007969] hover:text-[#007969] font-medium transition-colors"
                        >
                          info@swiftrooms.ae
                        </a>
                        {' '}or call us at{' '}
                        <a 
                          href="tel:+97143474240" 
                          className="text-[#007969] hover:text-[#007969] font-medium transition-colors"
                        >
                          04 347 4240
                        </a>
                        .
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Decorative gradient fade */}
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-gray-50 to-transparent pointer-events-none z-0" />
    </section>
  );
}