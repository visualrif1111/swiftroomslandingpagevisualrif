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
    answer: 'Yes. Every installation is covered by a 10-year manufacturer warranty on our aluminium profiles, plus a 2-year warranty on hardware and accessories — covering manufacturing defects and structural integrity. We also provide lifetime after-sales support for maintenance and repairs.',
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
    question: 'What happens after I enquire?',
    answer: 'Once you submit the form, a specialist contacts you within 12 hours to understand your project. We then arrange a free site visit and precise measurement, prepare a 3D design and detailed quotation, and — if you decide to proceed — schedule manufacturing and installation by our own in-house team. Every project finishes with warranty activation and ongoing after-sales support.',
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
      setTimeout(() => {
        window.dispatchEvent(new Event('openLeadForm'));
      }, 500);
    }
  };

  // FAQ structured data for Google rich results
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <section id="faqs" className="relative min-h-screen bg-gradient-to-b from-gray-50 to-white overflow-hidden lg:snap-center flex items-start pt-20 pb-14 lg:pt-28 lg:pb-20">
      {/* FAQ structured data for SEO rich results */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

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
            <h2 className="font-heading sr-heading font-semibold lg:font-medium lg:text-4xl text-[#1c1c1e] mb-2 lg:mb-4">
              Frequently Asked Questions
            </h2>
            <div className="divider-brand mx-auto mb-3 lg:mb-4" />
            <p className="font-body text-sm lg:text-lg text-[#3a3a3c]">
              Find answers to common questions about our products and services
            </p>
          </motion.div>

          {/* FAQ Items */}
          <div className="space-y-3 lg:space-y-4 mb-12">
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
                  className={`w-full bg-white rounded-xl border card-hover min-h-[44px] px-5 py-4 lg:px-6 lg:py-5 flex items-center justify-between gap-3 text-left transition-all duration-200 shadow-sm lg:shadow-none ${openIndex === index ? 'border-[#007969] shadow-md lg:shadow-none' : 'border-[#e5e7eb]'}`}
                >
                  <span className={`font-body font-medium text-base sm:text-lg leading-7 tracking-tight transition-colors ${openIndex === index ? 'text-[#007969] lg:text-[#1c1c1e]' : 'text-[#1c1c1e]'}`}>
                    {faq.question}
                  </span>
                  <motion.div
                    className={`flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full transition-colors duration-200 lg:w-5 lg:h-5 lg:rounded-none lg:bg-transparent lg:text-[#007969] ${openIndex === index ? 'bg-[#007969] text-white' : 'bg-[#e6f4f1] text-[#007969]'}`}
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="block w-4 h-4 lg:w-5 lg:h-5" />
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
                      <div className="bg-white rounded-b-xl px-5 lg:px-6 pb-5 pt-3 lg:pt-2 -mt-2">
                        <p className="font-body text-[#3a3a3c] text-[15px] sm:text-base leading-7">
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
            <p className="font-body text-lg text-[#3a3a3c] leading-7 tracking-tight mb-6">
              Still have questions?
            </p>
            <button
              onClick={scrollToForm}
              className="btn-brand text-lg"
            >
              Get Free Consultation
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}