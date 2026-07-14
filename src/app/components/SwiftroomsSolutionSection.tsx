import { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronRight, X, Check } from 'lucide-react';
import { ProblemsCADElements } from './CADFloatingElements';
import { CTADecoration } from './InteractiveDecorations';

export function SwiftroomsSolutionSection() {
  const [activeTab, setActiveTab] = useState<'problems' | 'solutions'>('problems');

  return (
    <section id="swiftrooms-solution" className="relative bg-[#f5f4f0] min-h-screen lg:min-h-screen overflow-y-auto lg:overflow-visible lg:snap-start flex items-start lg:items-start pt-20 lg:pt-24">
      {/* CAD Floating Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <ProblemsCADElements />
      </div>

      <div className="container mx-auto px-4 relative z-30 py-8 lg:py-12 w-full max-w-7xl">

        {/* Solutions Comparison Section */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6 lg:mb-10 relative z-40">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="font-['Rajdhani',sans-serif] text-xs font-semibold tracking-[0.1em] text-[#007969] tabular-nums">09</span>
              <span className="h-px w-10 bg-[#dcdad3]" />
              <span className="font-['Rajdhani',sans-serif] text-xs font-semibold uppercase tracking-[0.22em] text-[#6f6f76]">Why Choose Swiftrooms</span>
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-['Exo',sans-serif] font-medium tracking-[-0.02em] sr-heading lg:text-4xl text-[#0b0b0c] mb-2 lg:mb-3 relative z-40"
            >
              Why Choose Swiftrooms
            </motion.h2>
            <div className="h-px w-16 bg-[#dcdad3] mx-auto mb-3 lg:mb-4" />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-body text-sm lg:text-lg text-[#3d3d42] max-w-2xl mx-auto leading-relaxed relative z-40"
            >
              UAE climate expertise and premium systems — from common problems to premium solutions
            </motion.p>
          </div>

          {/* Mobile Tabs */}
          <div className="lg:hidden flex p-1 bg-[#ebe9e3] border border-[#dcdad3] rounded-[2px] mb-6 mx-auto max-w-sm relative z-40">
            <button
              onClick={() => setActiveTab('problems')}
              className={`flex-1 py-2.5 px-4 min-h-[44px] rounded-[2px] text-sm font-semibold transition-all duration-200 ${
                activeTab === 'problems'
                  ? 'bg-white text-[#0b0b0c] shadow-sm'
                  : 'text-[#6f6f76] hover:text-[#0b0b0c]'
              }`}
            >
              Problems
            </button>
            <button
              onClick={() => setActiveTab('solutions')}
              className={`flex-1 py-2.5 px-4 min-h-[44px] rounded-[2px] text-sm font-semibold transition-all duration-200 ${
                activeTab === 'solutions'
                  ? 'bg-white text-[#007969] shadow-sm'
                  : 'text-[#6f6f76] hover:text-[#0b0b0c]'
              }`}
            >
              Solutions
            </button>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-stretch relative z-30">
            {/* Left Side - Problems */}
            <motion.div
              className={`space-y-4 ${activeTab === 'problems' ? 'block' : 'hidden lg:block'} relative z-30`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-white rounded-[2px] p-6 lg:p-8 border border-[#dcdad3] shadow-sm h-full relative z-30">
                <h4 className="font-['Exo',sans-serif] text-lg lg:text-2xl font-medium tracking-[-0.02em] text-[#0b0b0c] mb-6 flex items-center gap-3">
                  <span className="bh-hex bh-hex-outline flex-shrink-0" style={{ ['--hex-size' as string]: '2rem' }}>
                    <X className="w-4 h-4 text-[#3d3d42]" />
                  </span>
                  Common Frustrations
                </h4>

                <div className="space-y-3">
                  {[
                    "Excessive heat penetration",
                    "Poor noise insulation from outside",
                    "Draughts and air leakage",
                    "Skyrocketing AC bills",
                    "Wasted, unused outdoor space"
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-start gap-3 p-3 rounded-[2px] hover:bg-[#f5f4f0] transition-colors"
                    >
                      <div className="flex-shrink-0 w-4 h-4 mt-1">
                        <X className="w-4 h-4 text-[#6f6f76]" strokeWidth={2} />
                      </div>
                      <p className="font-body text-[#3d3d42] text-sm lg:text-base leading-relaxed">
                        {item}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Side - Solutions */}
            <motion.div
              className={`${activeTab === 'solutions' ? 'block' : 'hidden lg:block'} relative z-30`}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-white rounded-[2px] p-6 lg:p-8 border border-[#dcdad3] shadow-sm h-full relative overflow-hidden group z-30">
                <h4 className="relative z-10 font-['Exo',sans-serif] text-lg lg:text-2xl font-medium tracking-[-0.02em] text-[#0b0b0c] mb-3 flex items-center gap-3">
                  <span className="bh-hex flex-shrink-0" style={{ ['--hex-size' as string]: '2rem' }}>
                    <Check className="w-4 h-4 text-[#007969]" strokeWidth={2.5} />
                  </span>
                  SWIFTROOMS Advantage
                </h4>

                <p className="relative z-10 font-body text-[#3d3d42] mb-5 text-sm lg:text-base leading-relaxed">
                  Engineered specifically for UAE climate conditions, our premium aluminum systems transform your living experience.
                </p>

                <div className="relative z-10 space-y-3 mb-6">
                  {[
                    "Advanced solar-control glazing reduces excessive heat penetration.",
                    "High-performance double and triple glazing improves acoustic insulation.",
                    "Multi-point locking and triple gasket systems enhance air tightness and sealing.",
                    "Thermally broken aluminium profiles minimise heat transfers",
                    "Acoustic laminated glass significantly reduces outside noise.",
                    "Garden rooms and extensions transform unused space into valuable living areas."
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-start gap-3 p-2.5 rounded-[2px] hover:bg-[#f5f4f0] transition-colors"
                    >
                      <div className="flex-shrink-0 w-4 h-4 mt-1">
                        <Check className="w-4 h-4 text-[#007969]" strokeWidth={2.5} />
                      </div>
                      <p className="font-body text-[#3d3d42] text-sm lg:text-base leading-relaxed">
                        {item}
                      </p>
                    </motion.div>
                  ))}
                </div>

                <div className="relative z-10 pt-4 border-t border-[#dcdad3]">
                  <CTADecoration>
                    <button
                      onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                      className="bh-btn bh-btn-primary w-full active:scale-95 group/btn"
                    >
                      Explore Our Products
                      <ChevronRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </CTADecoration>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Why Choose Swiftrooms - Credibility points */}
          <motion.div
            className="mt-8 lg:mt-12 relative z-30"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4">
              {[
                "UAE climate expertise since 2011",
                "Premium aluminium & glazing systems",
                "3,500+ completed projects",
                "Local manufacturing & installation",
                "Professional project management",
                "Showroom consultation available",
                "Dedicated aftercare & support",
                "14+ years, 70+ specialists",
              ].map((point, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-start gap-3 bg-white rounded-[2px] border border-[#dcdad3] shadow-sm p-4 transition-colors hover:border-[#007969]"
                >
                  <div className="flex-shrink-0 w-4 h-4 mt-0.5">
                    <Check className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-[#007969]" strokeWidth={2.5} />
                  </div>
                  <p className="font-body text-[0.9375rem] lg:text-base text-[#0b0b0c] font-medium leading-relaxed">
                    {point}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

      </div>

      {/* Decorative gradient fade at bottom */}
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-[#f5f4f0] to-transparent pointer-events-none z-5" />
    </section>
  );
}
