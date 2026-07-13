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
      className="relative bg-[#007969] overflow-hidden lg:snap-center flex items-center py-16 lg:py-24"
    >
      <div className="container mx-auto px-4 lg:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center text-white">
          {/* Rating strip */}
          <motion.div
            className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 mb-5"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-0.5">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} className="w-4 h-4 text-[#FFC857]" fill="#FFC857" />
              ))}
            </div>
            <span className="font-['Barlow',sans-serif] text-xs lg:text-sm text-white/90">
              4.4★ on 130+ Google reviews · 3,500+ projects
            </span>
          </motion.div>

          <motion.h2
            className="font-['Exo',sans-serif] text-2xl lg:text-5xl font-semibold mb-3 lg:mb-4 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Ready to Transform Your Space?
          </motion.h2>

          <motion.p
            className="font-['Barlow',sans-serif] text-sm lg:text-xl text-white/90 mb-7 lg:mb-9 max-w-2xl mx-auto"
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
            {/* Primary */}
            <button
              onClick={openQuoteForm}
              className="group btn-brand w-full sm:w-auto !bg-white !text-[#007969] hover:!bg-[#FFC857] hover:!text-[#1c1c1e] shadow-2xl"
            >
              Get Free Quote
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
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
            className="inline-flex items-center justify-center gap-1.5 mt-4 text-white/90 underline underline-offset-4 font-['Barlow',sans-serif] text-sm hover:text-white transition-colors"
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
            className="mt-10 lg:mt-12 pt-7 border-t border-white/15"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            <p className="font-['Barlow',sans-serif] text-xs lg:text-sm text-white/80 mb-4">
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
                    className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl px-3 py-2.5 text-left transition-colors duration-200"
                  >
                    <Icon className="w-4 h-4 lg:w-5 lg:h-5 flex-shrink-0 text-[#FFC857]" />
                    <span className="font-['Barlow',sans-serif] text-[11px] lg:text-sm text-white font-medium leading-tight">
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
