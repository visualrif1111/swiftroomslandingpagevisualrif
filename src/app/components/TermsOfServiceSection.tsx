import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FileText, ExternalLink, ChevronDown } from 'lucide-react';

export function TermsOfServiceSection() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section id="terms-of-service" className="relative bg-white overflow-hidden lg:snap-center flex items-center py-8 lg:py-20">
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
                    <FileText className="w-5 h-5 text-[#007969]" />
                  </div>
                  <div className="text-left">
                    <h2 className="font-['Exo',sans-serif] text-base font-bold text-[#1c1c1e]">
                      Terms of Service
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
              <FileText className="w-10 h-10 text-white" />
            </div>
            <h2 className="font-['Exo',sans-serif] text-3xl sm:text-4xl font-bold text-[#1c1c1e] mb-4">
              Terms of Service
            </h2>
            <p className="font-['Barlow',sans-serif] text-lg text-[#3a3a3c] max-w-2xl mx-auto">
              Please read these terms and conditions carefully before using our services.
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
                        By accessing and using the SWIFTROOMS website and services, you agree to be bound by these Terms of Service. 
                        These terms govern your use of our website, quote requests, and all services provided by SWIFTROOMS.
                      </p>
                    </div>

                    {/* Key Terms */}
                    <div className="space-y-2 lg:space-y-4">
                      {[
                        {
                          title: 'Service Usage',
                          description: 'Our website is provided for informational purposes and quote requests. You agree to use our services lawfully and in accordance with UAE regulations.',
                        },
                        {
                          title: 'Quote Accuracy',
                          description: 'All quotes provided are estimates based on information you provide. Final pricing may vary after on-site inspection and accurate measurements.',
                        },
                        {
                          title: 'Intellectual Property',
                          description: 'All content, designs, logos, and materials on this website are the property of SWIFTROOMS and protected by UAE copyright laws.',
                        },
                        {
                          title: 'Limitation of Liability',
                          description: 'SWIFTROOMS is not liable for any indirect, incidental, or consequential damages arising from the use of our website or services.',
                        },
                        {
                          title: 'Data Collection',
                          description: 'We collect personal information only for service delivery purposes. Please refer to our Privacy Policy for detailed information.',
                        },
                        {
                          title: 'Governing Law',
                          description: 'These terms are governed by the laws of the United Arab Emirates. Any disputes will be resolved under UAE jurisdiction.',
                        },
                      ].map((term, index) => (
                        <motion.div
                          key={index}
                          className="p-2 lg:p-4 bg-gray-50 rounded-lg border border-gray-200"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                        >
                          <h4 className="font-['Exo',sans-serif] text-sm lg:text-base font-semibold text-[#1c1c1e] mb-1 lg:mb-2">
                            {term.title}
                          </h4>
                          <p className="font-['Barlow',sans-serif] text-xs lg:text-sm text-[#3a3a3c] leading-relaxed">
                            {term.description}
                          </p>
                        </motion.div>
                      ))}
                    </div>

                    {/* Full Terms Link */}
                    <motion.div
                      className="pt-3 lg:pt-6 border-t border-gray-200"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.9 }}
                    >
                      <p className="font-['Barlow',sans-serif] text-xs lg:text-base text-[#3a3a3c] mb-3 lg:mb-5">
                        For complete terms and conditions, please review our full documentation:
                      </p>
                      <a
                        href="https://www.swiftrooms.ae/terms-of-service"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 lg:px-8 lg:py-4 bg-gradient-to-r from-[#007969] to-[#007969] text-white rounded-lg font-['Rajdhani',sans-serif] text-sm lg:text-base font-bold hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 group"
                      >
                        <FileText className="w-4 h-4 lg:w-5 lg:h-5" />
                        View Full Terms of Service
                        <ExternalLink className="w-4 h-4 lg:w-5 lg:h-5 group-hover:translate-x-1 transition-transform" />
                      </a>
                    </motion.div>

                    {/* Last Updated */}
                    <motion.div
                      className="pt-3 lg:pt-6 border-t border-gray-200"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 1.0 }}
                    >
                      <p className="font-['Barlow',sans-serif] text-xs lg:text-sm text-[#3a3a3c] leading-relaxed">
                        <strong>Last Updated:</strong> February 27, 2026
                        <br />
                        <strong>Questions?</strong> Contact us at{' '}
                        <a 
                          href="mailto:info@swiftrooms.ae" 
                          className="text-[#007969] hover:text-[#007969] font-medium transition-colors"
                        >
                          info@swiftrooms.ae
                        </a>
                        {' '}or call{' '}
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
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white to-transparent pointer-events-none z-0" />
    </section>
  );
}