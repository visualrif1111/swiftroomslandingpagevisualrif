import { motion } from 'motion/react';
import { ArrowRight, MessageCircle, MapPin, Star, CalendarCheck, Ruler, FileText, BookOpen } from 'lucide-react';

const WHATSAPP_HREF =
  'https://wa.me/971505269149?text=Hi%20Swiftrooms%2C%20I%27d%20like%20to%20speak%20with%20an%20expert%20about%20windows%2C%20doors%20or%20a%20glass%20room%20for%20my%20villa.';
const SHOWROOM_MAPS_HREF =
  'https://maps.google.com/?q=ETJAR+J1+Complex+Block+A+Warehouse+11-12+Jebel+Ali+Industrial+Area+1+Dubai';

// Low-friction lead magnets for visitors not ready to enquire.
// Each opens WhatsApp with a tailored request so the team can follow up.
const waMagnet = (intent: string) =>
  `https://wa.me/971505269149?text=${encodeURIComponent(`Hi Swiftrooms, I'd like to request: ${intent}.`)}`;

const leadMagnets = [
  { icon: FileText, label: 'Free Project Cost Guide', href: waMagnet('the free project cost guide') },
  { icon: BookOpen, label: "Window Buyer's Guide", href: waMagnet("the aluminium window buyer's guide") },
  { icon: Ruler, label: 'Product Spec Sheets', href: waMagnet('the aluminium product spec sheets') },
  { icon: CalendarCheck, label: 'Brochure & Price Ranges', href: waMagnet('the brochure and price ranges') },
];

function openQuoteForm() {
  const formSection = document.getElementById('contact-form');
  if (formSection) {
    formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setTimeout(() => {
      window.dispatchEvent(new Event('openLeadForm'));
    }, 500);
  }
}

export function FinalCTASection() {
  return (
    <section
      id="final-cta"
      className="relative bg-[#0e0e11] overflow-hidden lg:snap-center flex items-center py-16 lg:py-24"
    >
      <div className="container mx-auto px-4 lg:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center text-[#eceae4]">
          {/* Numbered section motif */}
          <motion.div
            className="flex items-center justify-center gap-3 mb-6"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="font-['Rajdhani',sans-serif] text-xs font-semibold tracking-[0.1em] text-[#3ea99a] tabular-nums">12</span>
            <span className="h-px w-10 bg-[#2a2a30]" />
            <span className="font-['Rajdhani',sans-serif] text-xs font-semibold uppercase tracking-[0.22em] text-[#a8a8ad]">Get Started</span>
          </motion.div>

          {/* Rating strip — monochrome trust marker */}
          <motion.div
            className="inline-flex items-center gap-2.5 border border-[#2a2a30] rounded-none px-4 py-1.5 mb-7"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            <div className="flex items-center gap-0.5">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} className="w-3.5 h-3.5 text-[#eceae4]" fill="#eceae4" />
              ))}
            </div>
            <span className="font-['Barlow',sans-serif] text-xs lg:text-sm text-[#a8a8ad]">
              4.4★ on 130+ Google reviews · 3,500+ projects
            </span>
          </motion.div>

          <motion.h2
            className="font-['Exo',sans-serif] font-medium tracking-[-0.03em] text-[#eceae4] leading-[1.02] mb-4 lg:mb-5 text-[clamp(2rem,5vw,3.5rem)]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Ready to Transform Your Space?
          </motion.h2>

          <motion.p
            className="font-['Barlow',sans-serif] text-sm lg:text-xl text-[#a8a8ad] mb-7 lg:mb-9 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Speak with a Swiftrooms specialist and get expert guidance on the best aluminium,
            glazing or glass room solution for your project.
          </motion.p>

          {/* CTA Hierarchy: Primary / Secondary / Tertiary */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-3 lg:gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Primary — inverted white for strong contrast on noir */}
            <button
              onClick={openQuoteForm}
              className="group bh-btn w-full sm:w-auto bg-white text-[#0e0e11] hover:bg-[#007969] hover:text-white"
            >
              Get Free Quote
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </button>

            {/* Secondary */}
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp w-full sm:w-auto shadow-lg"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp Expert
            </a>
          </motion.div>

          {/* Tertiary */}
          <motion.a
            href={SHOWROOM_MAPS_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 mt-5 text-[#a8a8ad] underline underline-offset-4 font-['Barlow',sans-serif] text-sm hover:text-[#eceae4] transition-colors"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <MapPin className="w-4 h-4" />
            Visit our Dubai showroom
          </motion.a>

          {/* Lead magnets - low-friction options for those not ready to enquire */}
          <motion.div
            className="mt-10 lg:mt-14 pt-8 border-t border-[#2a2a30]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            <p className="font-['Barlow',sans-serif] text-xs lg:text-sm text-[#a8a8ad] mb-4">
              Not ready to enquire? Ask us on WhatsApp for a free resource:
            </p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 lg:gap-3">
              {leadMagnets.map((magnet) => {
                const Icon = magnet.icon;
                return (
                  <a
                    key={magnet.label}
                    href={magnet.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-[#16161a] hover:border-[#a8a8ad] border border-[#2a2a30] rounded-none px-3 py-2.5 text-left transition-colors duration-200"
                  >
                    <Icon className="w-4 h-4 lg:w-5 lg:h-5 flex-shrink-0 text-[#a8a8ad]" />
                    <span className="font-['Barlow',sans-serif] text-[11px] lg:text-sm text-[#eceae4] font-medium leading-tight">
                      {magnet.label}
                    </span>
                  </a>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
