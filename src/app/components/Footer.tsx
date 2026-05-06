import { Phone, Mail, MapPin, Instagram, Facebook, Linkedin } from 'lucide-react';
import { SwiftRoomsLogo } from './SwiftRoomsLogo';
import { useState } from 'react';
import { PrivacyModal } from './PrivacyModal';
import { TermsModal } from './TermsModal';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer id="footer" className="bg-[#1c1c1e] text-white lg:snap-center">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        
        {/* Mobile: Single Column / Desktop: Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-8">
          
          {/* Left Side - Brand & Contact */}
          <div className="space-y-6">
            {/* Company Info */}
            <div>
              <div className="mb-2">
                <SwiftRoomsLogo size={48} />
              </div>
              <p className="font-['Barlow',sans-serif] text-xs lg:text-sm text-gray-300 leading-relaxed max-w-md">
                Premium aluminum solutions for UAE homes and businesses
              </p>
            </div>
            
            {/* Contact Info - Condensed */}
            <div className="space-y-3">
              <a
                href="tel:+97143474240"
                className="flex items-center gap-2 text-gray-300 hover:text-[#008873] transition-colors group"
              >
                <div className="w-8 h-8 bg-[#008873]/20 rounded-lg flex items-center justify-center group-hover:bg-[#008873]/30 transition-colors">
                  <Phone className="w-4 h-4 text-[#008873]" />
                </div>
                <span className="font-['Barlow',sans-serif] text-sm">04 347 4240</span>
              </a>
              
              <a
                href="mailto:sales@swiftrooms.ae"
                className="flex items-center gap-2 text-gray-300 hover:text-[#008873] transition-colors group"
              >
                <div className="w-8 h-8 bg-[#008873]/20 rounded-lg flex items-center justify-center group-hover:bg-[#008873]/30 transition-colors">
                  <Mail className="w-4 h-4 text-[#008873]" />
                </div>
                <span className="font-['Barlow',sans-serif] text-sm">sales@swiftrooms.ae</span>
              </a>
              
              <div className="flex items-start gap-2 text-gray-300">
                <div className="w-8 h-8 bg-[#008873]/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-[#008873]" />
                </div>
                <div className="font-['Barlow',sans-serif] text-sm leading-relaxed">
                  <div>ETJAR - J1 Complex</div>
                  <div>Block A, Warehouse 11-12</div>
                  <div>Jebel Ali, Ind Area 1</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Quick Links & Social */}
          <div className="space-y-6">
            {/* Quick Links - Horizontal on Mobile */}
            <div>
              <h4 className="font-['Exo',sans-serif] text-base lg:text-lg font-semibold text-white mb-3">
                Quick Links
              </h4>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-2">
                <button
                  onClick={() => scrollToSection('hero')}
                  className="font-['Barlow',sans-serif] text-sm text-gray-300 hover:text-[#00a387] hover:bg-[#007969]/10 px-2 py-1 rounded transition-all duration-200 text-left"
                >
                  Home
                </button>
                <button
                  onClick={() => scrollToSection('products')}
                  className="font-['Barlow',sans-serif] text-sm text-gray-300 hover:text-[#00a387] hover:bg-[#007969]/10 px-2 py-1 rounded transition-all duration-200 text-left"
                >
                  Products
                </button>
                <button
                  onClick={() => scrollToSection('process')}
                  className="font-['Barlow',sans-serif] text-sm text-gray-300 hover:text-[#00a387] hover:bg-[#007969]/10 px-2 py-1 rounded transition-all duration-200 text-left"
                >
                  Process
                </button>
                <button
                  onClick={() => scrollToSection('social')}
                  className="font-['Barlow',sans-serif] text-sm text-gray-300 hover:text-[#00a387] hover:bg-[#007969]/10 px-2 py-1 rounded transition-all duration-200 text-left"
                >
                  Portfolio
                </button>
                <button
                  onClick={() => scrollToSection('faqs')}
                  className="font-['Barlow',sans-serif] text-sm text-gray-300 hover:text-[#00a387] hover:bg-[#007969]/10 px-2 py-1 rounded transition-all duration-200 text-left"
                >
                  FAQs
                </button>
                <button
                  onClick={() => scrollToSection('contact-form')}
                  className="font-['Barlow',sans-serif] text-sm text-gray-300 hover:text-[#00a387] hover:bg-[#007969]/10 px-2 py-1 rounded transition-all duration-200 text-left"
                >
                  Get Quote
                </button>
              </div>
            </div>
            
            {/* Social Media */}
            <div>
              <h4 className="font-['Exo',sans-serif] text-base lg:text-lg font-semibold text-white mb-3">
                Follow Us on Instagram
              </h4>
              <div className="flex gap-3">
                <a
                  href="https://www.instagram.com/swiftrooms.ae/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-[#008873] rounded-lg flex items-center justify-center hover:bg-[#007969] transition-all hover:scale-110 duration-200"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
            <p className="font-['Inter',sans-serif] text-xs text-gray-400 text-center sm:text-left">
              © {currentYear} SWIFTROOMS. All rights reserved.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="font-['Inter',sans-serif] text-xs text-gray-400 hover:text-[#008873] transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  setShowPrivacy(true);
                }}
              >
                Privacy
              </a>
              <a
                href="#"
                className="font-['Inter',sans-serif] text-xs text-gray-400 hover:text-[#008873] transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  setShowTerms(true);
                }}
              >
                Terms
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Privacy Modal */}
      <PrivacyModal
        isOpen={showPrivacy}
        onClose={() => setShowPrivacy(false)}
      />

      {/* Terms Modal */}
      <TermsModal
        isOpen={showTerms}
        onClose={() => setShowTerms(false)}
      />
    </footer>
  );
}