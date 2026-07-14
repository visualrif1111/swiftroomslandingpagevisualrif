import { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronRight, X, Check } from 'lucide-react';
import { ProblemsCADElements } from './CADFloatingElements';
import { CTADecoration } from './InteractiveDecorations';

export function SwiftroomsSolutionSection() {
  const [activeTab, setActiveTab] = useState<'problems' | 'solutions'>('problems');

  return (
    <section id="swiftrooms-solution" className="relative bg-gradient-to-b from-gray-50 to-white min-h-screen lg:min-h-screen overflow-y-auto lg:overflow-visible lg:snap-start flex items-start lg:items-start pt-20 lg:pt-24">
      {/* CAD Floating Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <ProblemsCADElements />
      </div>

      <div className="container mx-auto px-4 relative z-30 py-8 lg:py-12 w-full max-w-7xl">

        {/* Solutions Comparison Section */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6 lg:mb-10 relative z-40">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-heading sr-heading font-semibold lg:font-medium lg:text-4xl text-[#1c1c1e] mb-2 lg:mb-3 relative z-40"
            >
              Why Choose Swiftrooms
            </motion.h2>
            <div className="divider-brand mx-auto mb-3 lg:mb-4" />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-body text-sm lg:text-lg text-[#3a3a3c] max-w-2xl mx-auto leading-relaxed relative z-40"
            >
              UAE climate expertise and premium systems — from common problems to premium solutions
            </motion.p>
          </div>

          {/* Mobile Tabs */}
          <div className="lg:hidden flex p-1 bg-gray-100 rounded-xl mb-6 mx-auto max-w-sm relative z-40">
            <button
              onClick={() => setActiveTab('problems')}
              className={`flex-1 py-2.5 px-4 min-h-[44px] rounded-lg text-sm font-semibold transition-all duration-200 ${
                activeTab === 'problems'
                  ? 'bg-white text-red-600 shadow-md'
                  : 'text-gray-500 hover:text-white hover:bg-red-500'
              }`}
            >
              Problems
            </button>
            <button
              onClick={() => setActiveTab('solutions')}
              className={`flex-1 py-2.5 px-4 min-h-[44px] rounded-lg text-sm font-semibold transition-all duration-200 ${
                activeTab === 'solutions'
                  ? 'bg-[#007969] text-white shadow-md'
                  : 'text-gray-500 hover:text-white hover:bg-[#007969]'
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
              <div className="bg-white rounded-xl p-6 lg:p-8 border border-[#e5e7eb] card-hover h-full relative z-30">
                <h4 className="font-heading text-lg lg:text-2xl font-semibold text-[#1c1c1e] mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-base">✗</span>
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
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      <div className="flex-shrink-0 w-6 h-6 mt-0.5 rounded-full bg-red-100 flex items-center justify-center">
                        <X className="w-4 h-4 text-red-600" />
                      </div>
                      <p className="font-body text-gray-700 text-sm lg:text-base leading-relaxed">
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
              <div className="bg-gradient-to-br from-[#007969] to-[#005a50] rounded-xl p-6 lg:p-8 text-white h-full relative overflow-hidden group z-30">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-125 transition-transform duration-700" />

                <h4 className="relative z-10 font-heading text-lg lg:text-2xl font-semibold mb-3 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center text-base">✓</span>
                  SWIFTROOMS Advantage
                </h4>

                <p className="relative z-10 font-body text-white/90 mb-5 text-sm lg:text-base leading-relaxed">
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
                      className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      <div className="flex-shrink-0 w-6 h-6 mt-0.5 rounded-full bg-[#00a63e] flex items-center justify-center shadow-lg">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                      <p className="font-body text-white text-sm lg:text-base leading-relaxed">
                        {item}
                      </p>
                    </motion.div>
                  ))}
                </div>

                <div className="relative z-10 pt-4 border-t border-white/20">
                  <CTADecoration>
                    <button
                      onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                      className="w-full bg-white text-[#007969] px-5 py-3 lg:py-3.5 rounded-[2px] font-accent uppercase tracking-[0.12em] text-base lg:text-lg font-bold hover:bg-[#005a50] hover:text-white active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 group/btn"
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
                  className="flex items-start gap-3 bg-white sr-card-premium lg:rounded-xl lg:border lg:border-[#e5e7eb] lg:shadow-none p-4 card-hover"
                >
                  <div className="flex-shrink-0 w-6 h-6 mt-0.5 rounded-full bg-[#007969] flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-white" strokeWidth={3} />
                  </div>
                  <p className="font-body text-[0.9375rem] lg:text-base text-[#1c1c1e] font-medium leading-relaxed">
                    {point}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

      </div>

      {/* Decorative gradient fade at bottom */}
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white to-transparent pointer-events-none z-5" />
    </section>
  );
}
