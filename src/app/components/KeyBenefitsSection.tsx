import { motion } from 'motion/react';
import { Thermometer, Sun, Snowflake, TrendingUp, HardHat, Store, type LucideIcon } from 'lucide-react';
import { SwipeCarousel } from './SwipeCarousel';

// Vertical benefit card — used in the desktop grid and the mobile carousel.
function BenefitCard({
  icon: Icon,
  title,
  description,
  fullHeight = false,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  fullHeight?: boolean;
}) {
  return (
    <div
      className={`group bg-white sr-card-premium lg:rounded-2xl lg:shadow-none lg:border lg:border-[#e5e7eb] hover:border-[#007969] lg:card-hover p-6 lg:p-6 ${
        fullHeight ? 'h-full' : ''
      }`}
    >
      <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-2xl lg:rounded-xl bg-[#007969]/10 flex items-center justify-center mb-4 group-hover:bg-[#007969] transition-colors duration-300">
        <Icon className="w-6 h-6 lg:w-7 lg:h-7 text-[#007969] group-hover:text-white transition-colors duration-300" strokeWidth={2} />
      </div>
      <h3 className="font-heading text-[1.125rem] lg:text-xl font-semibold text-[#1c1c1e] mb-1.5 lg:mb-2 leading-snug">
        {title}
      </h3>
      <p className="font-body text-[0.9375rem] lg:text-base text-[#3a3a3c] leading-relaxed">
        {description}
      </p>
    </div>
  );
}

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
      className="relative bg-white sr-section overflow-hidden lg:min-h-screen lg:snap-start flex items-center pt-20 lg:pt-24 pb-12"
      style={{
        contain: 'layout style',
        contentVisibility: 'auto',
        containIntrinsicSize: '1px 100vh',
      }}
    >
      <div className="container mx-auto max-w-[1600px] px-5 lg:px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-8 lg:mb-12 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="sr-eyebrow">The Swift Rooms difference</span>
          <div className="divider-brand mx-auto mb-3 mt-2 lg:mb-4" />
          <h2 className="sr-heading font-semibold lg:font-medium text-[#1c1c1e] mb-3 lg:mb-3 lg:text-4xl">
            Why UAE homeowners choose Swiftrooms
          </h2>
          <p className="sr-subheading lg:text-xl text-[#3a3a3c]">
            More than windows and doors — real outcomes for comfort, light and value in your home.
          </p>
        </motion.div>

        {/* Desktop: grid */}
        <div className="hidden lg:grid grid-cols-3 gap-6 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
            >
              <BenefitCard {...benefit} fullHeight />
            </motion.div>
          ))}
        </div>

        {/* Mobile: swipeable carousel */}
        <div className="lg:hidden">
          <SwipeCarousel
            ariaLabel="Key benefits"
            items={benefits.map((benefit) => (
              <BenefitCard key={benefit.title} {...benefit} fullHeight />
            ))}
          />
        </div>
      </div>
    </section>
  );
}
