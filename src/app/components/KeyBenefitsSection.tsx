import { motion } from 'motion/react';
import { Thermometer, Sun, Snowflake, TrendingUp, HardHat, Store } from 'lucide-react';

const benefits = [
  {
    icon: Thermometer,
    title: 'Improve indoor comfort in UAE heat',
    description: 'Keep rooms cooler and more stable all year with systems built for the Gulf climate.',
  },
  {
    icon: Sun,
    title: 'Create brighter, more open living spaces',
    description: 'Maximise natural light and seamless indoor-outdoor flow across your villa.',
  },
  {
    icon: Snowflake,
    title: 'Reduce heat transfer with premium glazing',
    description: 'High-performance glass lowers cooling costs and cuts outside noise.',
  },
  {
    icon: TrendingUp,
    title: 'Increase property value',
    description: 'Architectural aluminium systems elevate the look and resale value of your home.',
  },
  {
    icon: HardHat,
    title: 'Installed by experienced specialists',
    description: 'Manufactured locally and fitted by our own team across 3,500+ completed projects.',
  },
  {
    icon: Store,
    title: 'Visit a UAE showroom before deciding',
    description: 'See and feel the systems in person at our Dubai showroom — no pressure.',
  },
];

export function KeyBenefitsSection() {
  return (
    <section
      id="benefits"
      className="relative bg-white min-h-screen overflow-hidden lg:snap-start flex items-center pt-20 lg:pt-24 pb-12"
      style={{
        contain: 'layout style',
        contentVisibility: 'auto',
        containIntrinsicSize: '1px 100vh',
      }}
    >
      <div className="container mx-auto px-4 lg:px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-6 lg:mb-12 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-['Exo',sans-serif] text-base lg:text-4xl font-medium text-[#1c1c1e] mb-2 lg:mb-3">
            Why UAE Homeowners Choose Swiftrooms
          </h2>
          <p className="font-['Barlow',sans-serif] text-xs lg:text-xl text-[#3a3a3c]">
            More than windows and doors — real outcomes for comfort, light and value in your home.
          </p>
        </motion.div>

        {/* Benefit Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-6 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
                className="group bg-white border-2 border-[#e5e7eb] rounded-xl lg:rounded-2xl p-4 lg:p-6 hover:border-[#008873] hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ y: -6 }}
              >
                <div className="w-11 h-11 lg:w-14 lg:h-14 rounded-xl bg-[#008873]/10 flex items-center justify-center mb-3 lg:mb-4 group-hover:bg-[#008873] transition-colors duration-300">
                  <Icon className="w-5 h-5 lg:w-7 lg:h-7 text-[#008873] group-hover:text-white transition-colors duration-300" strokeWidth={2} />
                </div>
                <h3 className="font-['Exo',sans-serif] text-sm lg:text-xl font-semibold text-[#1c1c1e] mb-1.5 lg:mb-2 leading-tight">
                  {benefit.title}
                </h3>
                <p className="font-['Barlow',sans-serif] text-xs lg:text-base text-[#3a3a3c] leading-snug lg:leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
