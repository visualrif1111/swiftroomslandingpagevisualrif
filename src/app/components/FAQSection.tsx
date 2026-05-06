import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { FAQCADElements } from './CADFloatingElements';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: 'How much do windows and doors cost in Dubai?',
    answer: 'The cost varies depending on size, specifications, and customization. We offer competitive pricing starting from AED 750 per square meter for standard aluminium windows. For an accurate quote tailored to your specific needs, we recommend scheduling a free consultation where our experts will assess your requirements and provide a detailed estimate.',
  },
  {
    question: 'How long does installation take?',
    answer: 'Installation time depends on the project scope. A standard residential installation typically takes 1-3 days for windows and 2-5 days for doors. Larger commercial projects may require 1-2 weeks. We provide a detailed timeline during the consultation phase and ensure minimal disruption to your daily routine.',
  },
  {
    question: 'Do you offer a warranty?',
    answer: 'Yes! We offer a comprehensive 10-year warranty or life time home ownership warranty on all our aluminum and UPVC windows and doors, covering manufacturing defects and structural integrity. Our products also come with a 2-year warranty on hardware and accessories. Additionally, we provide lifetime after-sales support for maintenance and repairs',
  },
  {
    question: "Are your products suitable for Dubai's climate?",
    answer: "Absolutely! All our windows and doors are specifically designed for Dubai's extreme climate. They feature thermal insulation, UV-resistant coatings, and are tested to withstand high temperatures, humidity, and sandstorms. Our products also include energy-efficient glazing that helps reduce cooling costs by up to 30%.",
  },
  {
    question: 'Do you provide free measurements and quotes?',
    answer: 'Yes, we provide completely free on-site measurements and detailed quotations with no obligation. Our experienced technicians will visit your property at a time convenient for you, take precise measurements, discuss your requirements, and provide a comprehensive quote within 24-48 hours.',
  },
  {
    question: 'Which areas do you serve in UAE?',
    answer: 'We serve all areas across UAE. For locations beyond a 60km radius of our factory in Jebel Ali, a small refundable deposit of AED 1,000 may be required before arranging a site visit. This allows one of our engineers to attend, take precise measurements, prepare a 3D design, and provide a detailed quotation. Should you proceed with the project, the AED 1,000 will be fully deducted from your first invoice.',
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const scrollToForm = () => {
    const formSection = document.getElementById('contact-form');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="faqs" className="relative min-h-screen bg-gradient-to-b from-gray-50 to-white overflow-hidden lg:snap-center flex items-center">
      {/* Animated Background Ornaments */}
      <FAQCADElements />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <motion.div
            className="text-center mb-8 lg:mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-['Exo',sans-serif] text-base lg:text-4xl font-medium text-[#1c1c1e] mb-2 lg:mb-4">
              Frequently Asked Questions
            </h2>
            <p className="font-['Barlow',sans-serif] text-sm lg:text-lg text-[#3a3a3c]">
              Find answers to common questions about our products and services
            </p>
          </motion.div>

          {/* FAQ Items */}
          <div className="space-y-4 mb-12">
            {faqData.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full bg-white rounded-[14px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] px-6 py-5 flex items-center justify-between text-left hover:shadow-xl hover:bg-gray-50 active:scale-[0.98] transition-all duration-200"
                >
                  <span className="font-['Barlow',sans-serif] font-medium text-[#1c1c1e] text-base sm:text-lg leading-7 tracking-[-0.4395px] pr-4">
                    {faq.question}
                  </span>
                  <motion.div
                    className="flex-shrink-0 w-5 h-3"
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown
                      className="block size-full"
                      fill="none"
                      preserveAspectRatio="xMidYMid meet"
                      viewBox="0 0 11.6667 6.66667"
                    />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="bg-white rounded-b-[14px] px-6 pb-5 pt-2 -mt-2">
                        <p className="font-['Barlow',sans-serif] text-[#3a3a3c] text-base leading-7">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            className="text-center pb-12 lg:pb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <p className="font-['Barlow',sans-serif] text-lg text-[#3a3a3c] leading-7 tracking-[-0.4395px] mb-6">
              Still have questions?
            </p>
            <button
              onClick={scrollToForm}
              className="bg-[#008873] text-white px-8 py-4 rounded-[10px] shadow-[0px_10px_15px_0px_rgba(0,0,0,0.1),0px_4px_6px_0px_rgba(0,0,0,0.1)] font-['Rajdhani',sans-serif] font-medium text-lg leading-7 tracking-[-0.4395px] hover:bg-white hover:text-[#008873] hover:ring-2 hover:ring-[#008873] transform hover:scale-105 active:scale-95 transition-all duration-300"
            >
              Get Free Consultation
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}