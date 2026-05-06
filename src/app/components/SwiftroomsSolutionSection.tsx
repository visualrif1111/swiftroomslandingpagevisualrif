import { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronRight, X, Check } from 'lucide-react';
import { ProblemsCADElements } from './CADFloatingElements';
import { CTADecoration } from './InteractiveDecorations';

export function SwiftroomsSolutionSection() {
  const [activeTab, setActiveTab] = useState<'problems' | 'solutions'>('problems');

  return (
    <section id="swiftrooms-solution" className="relative bg-gradient-to-b from-gray-50 to-white min-h-screen lg:h-screen overflow-y-auto lg:overflow-hidden lg:snap-center flex items-center">
      {/* CAD Floating Elements */}
      <ProblemsCADElements />

      <div className="container mx-auto px-4 relative z-10 py-8 lg:py-16 w-full max-w-7xl">

        {/* Solutions Comparison Section */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6 lg:mb-10">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-['Exo',sans-serif] text-base lg:text-4xl font-medium text-[#1c1c1e] mb-2 lg:mb-3"
            >
              The Swiftrooms Solution
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-['Barlow',sans-serif] text-xs lg:text-lg text-[#3a3a3c] max-w-2xl mx-auto"
            >
              From common problems to premium solutions
            </motion.p>
          </div>

          {/* Mobile Tabs */}
          <div className="lg:hidden flex p-1 bg-gray-100 rounded-xl mb-6 mx-auto max-w-sm">
            <button
              onClick={() => setActiveTab('problems')}
              className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all duration-200 ${
                activeTab === 'problems'
                  ? 'bg-white text-red-600 shadow-md'
                  : 'text-gray-500 hover:text-white hover:bg-red-500'
              }`}
            >
              Problems
            </button>
            <button
              onClick={() => setActiveTab('solutions')}
              className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all duration-200 ${
                activeTab === 'solutions'
                  ? 'bg-[#007969] text-white shadow-md'
                  : 'text-gray-500 hover:text-white hover:bg-[#007969]'
              }`}
            >
              Solutions
            </button>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
            {/* Left Side - Problems */}
            <motion.div
              className={`space-y-4 ${activeTab === 'problems' ? 'block' : 'hidden lg:block'}`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-white rounded-2xl p-6 lg:p-8 border-2 border-gray-100 shadow-lg h-full">
                <h4 className="font-['Barlow',sans-serif] text-lg lg:text-2xl font-semibold text-[#1c1c1e] mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-base">✗</span>
                  Common Frustrations
                </h4>

                <div className="space-y-3">
                  {[
                    "Excessive heat penetration",
                    "Sound resistance for improved acoustic performance",
                    "Better air tightness",
                    "Skyrocketing AC bills",
                    "Making use of unused space"
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
                      <p className="font-['Barlow',sans-serif] text-gray-700 text-sm lg:text-base leading-relaxed">
                        {item}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Side - Solutions */}
            <motion.div
              className={`${activeTab === 'solutions' ? 'block' : 'hidden lg:block'}`}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-gradient-to-br from-[#007969] to-[#005a50] rounded-2xl p-6 lg:p-8 text-white h-full relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-125 transition-transform duration-700" />

                <h4 className="relative z-10 font-['Barlow',sans-serif] text-lg lg:text-2xl font-semibold mb-3 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center text-base">✓</span>
                  SWIFTROOMS Advantage
                </h4>

                <p className="relative z-10 font-['Barlow',sans-serif] text-white/90 mb-5 text-sm lg:text-base leading-relaxed">
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
                      <p className="font-['Barlow',sans-serif] text-white text-sm lg:text-base leading-relaxed">
                        {item}
                      </p>
                    </motion.div>
                  ))}
                </div>

                <div className="relative z-10 pt-4 border-t border-white/20">
                  <CTADecoration>
                    <button
                      onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                      className="w-full bg-white text-[#007969] px-5 py-3 lg:py-3.5 rounded-lg font-['Rajdhani',sans-serif] text-base lg:text-lg font-bold hover:bg-[#007969] hover:text-white hover:shadow-2xl active:scale-95 transition-all duration-200 shadow-lg flex items-center justify-center gap-2 group/btn"
                    >
                      Explore Our Products
                      <ChevronRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </CTADecoration>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

      </div>

      {/* Decorative gradient fade at bottom */}
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white to-transparent pointer-events-none z-20" />
    </section>
  );
}
