import { LeadForm } from './LeadForm';
import { ImmersiveBackgroundAnimations } from './ImmersiveBackgroundAnimations';
import { motion } from 'motion/react';
import { Star } from 'lucide-react';

// Real Google reviews surfaced right at the decision point (final reassurance before the form).
const formReviews = [
  {
    author: 'Emma Sangster',
    initial: 'E',
    meta: 'Bifold doors',
    text: 'Great quality and extremely competitive pricing. During the storms last year the doors were perfect — they withheld the wind and rain. Highly recommended!',
  },
  {
    author: 'Anna Novikova',
    initial: 'A',
    meta: 'UPVC windows',
    text: 'Completed on time with real skill and attention to detail. Improved energy efficiency, a more beautiful space, and outstanding soundproofing.',
  },
];

export function FormSection() {
  return (
    <section id="contact-form" className="relative min-h-screen bg-gradient-to-b from-white to-gray-50 lg:snap-center flex items-center py-16 lg:pt-32 lg:pb-12">
      <div className="container mx-auto px-4 lg:px-8 relative z-10 py-6 lg:py-8">
        {/* Decorative Background */}
        <ImmersiveBackgroundAnimations />
        
        <div className="max-w-4xl mx-auto space-y-8 lg:space-y-12">
          {/* Section Header */}
          <div className="text-center space-y-3 lg:space-y-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-heading text-xl lg:text-4xl font-medium text-[#1c1c1e]"
            >
              Get Your Free Quote
            </motion.h2>
            <div className="divider-brand mx-auto lg:hidden" />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-body text-base lg:text-xl text-[#3a3a3c] max-w-2xl mx-auto px-2 lg:px-0"
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

          {/* Testimonial reassurance directly above the form (final proof at the decision point) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="grid gap-3 sm:grid-cols-2 max-w-3xl mx-auto"
          >
            {formReviews.map((review) => (
              <div
                key={review.author}
                className="bg-white border border-[#e5e7eb] rounded-xl p-4 lg:p-5 text-left shadow-sm"
              >
                <div className="flex items-center gap-0.5 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#FFA500] text-[#FFA500]" />
                  ))}
                </div>
                <p className="font-body text-sm text-[#3a3a3c] leading-relaxed">
                  "{review.text}"
                </p>
                <div className="mt-3 flex items-center gap-2.5">
                  <div className="w-8 h-8 flex-shrink-0 rounded-full bg-[#007969] text-white flex items-center justify-center font-heading text-sm font-semibold">
                    {review.initial}
                  </div>
                  <div className="min-w-0">
                    <p className="font-heading text-sm font-semibold text-[#1c1c1e] truncate">
                      {review.author}
                    </p>
                    <p className="font-body text-xs text-[#6b7280]">
                      {review.meta} · Verified Google review
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Lead Form - Use same desktop version for all devices */}
          <LeadForm listenForOpenEvent />
        </div>
      </div>
    </section>
  );
}