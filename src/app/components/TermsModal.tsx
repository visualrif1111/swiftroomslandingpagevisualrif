import { X } from 'lucide-react';
import { useEffect } from 'react';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TermsModal({ isOpen, onClose }: TermsModalProps) {
  // Prevent body scroll when modal is open + close on Escape
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    if (isOpen) window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[85dvh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Terms & Conditions"
      >
        {/* Header */}
        <div className="flex-shrink-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="font-['Exo',sans-serif] text-xl lg:text-2xl font-bold text-[#1c1c1e]">
            Terms & Conditions
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 min-h-0 overflow-y-auto px-6 py-6">
          <div className="prose prose-sm max-w-none">
            <p className="font-['Barlow',sans-serif] text-sm text-gray-600 mb-6">
              Last Updated: March 2026
            </p>

            <section className="mb-6">
              <h3 className="font-['Exo',sans-serif] text-lg font-semibold text-[#1c1c1e] mb-3">
                Agreement to Terms
              </h3>
              <p className="font-['Barlow',sans-serif] text-sm text-gray-700">
                By accessing and using SWIFTROOMS services, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.
              </p>
            </section>

            <section className="mb-6">
              <h3 className="font-['Exo',sans-serif] text-lg font-semibold text-[#1c1c1e] mb-3">
                Services
              </h3>
              <p className="font-['Barlow',sans-serif] text-sm text-gray-700 mb-3">
                SWIFTROOMS provides premium aluminum windows, doors, and glass room solutions. Our services include:
              </p>
              <ul className="font-['Barlow',sans-serif] text-sm text-gray-700 list-disc pl-5 space-y-2">
                <li>Design consultation and product selection</li>
                <li>Custom fabrication and manufacturing</li>
                <li>Professional installation services</li>
                <li>After-sales support and warranty services</li>
              </ul>
            </section>

            <section className="mb-6">
              <h3 className="font-['Exo',sans-serif] text-lg font-semibold text-[#1c1c1e] mb-3">
                Quotes and Pricing
              </h3>
              <p className="font-['Barlow',sans-serif] text-sm text-gray-700">
                All quotes provided are valid for 30 days from the date of issue unless otherwise specified. Prices are subject to change based on material costs, project specifications, and other factors. Final pricing will be confirmed before project commencement.
              </p>
            </section>

            <section className="mb-6">
              <h3 className="font-['Exo',sans-serif] text-lg font-semibold text-[#1c1c1e] mb-3">
                Payment Terms
              </h3>
              <p className="font-['Barlow',sans-serif] text-sm text-gray-700 mb-3">
                Payment terms will be outlined in your project agreement. Typically:
              </p>
              <ul className="font-['Barlow',sans-serif] text-sm text-gray-700 list-disc pl-5 space-y-2">
                <li>Deposit required upon order confirmation</li>
                <li>Progress payments as per project milestones</li>
                <li>Final payment upon project completion and approval</li>
              </ul>
            </section>

            <section className="mb-6">
              <h3 className="font-['Exo',sans-serif] text-lg font-semibold text-[#1c1c1e] mb-3">
                Installation and Timeline
              </h3>
              <p className="font-['Barlow',sans-serif] text-sm text-gray-700">
                Installation timelines are provided as estimates and may vary based on project complexity, material availability, weather conditions, and site access. We will keep you informed of any significant delays.
              </p>
            </section>

            <section className="mb-6">
              <h3 className="font-['Exo',sans-serif] text-lg font-semibold text-[#1c1c1e] mb-3">
                Warranty
              </h3>
              <p className="font-['Barlow',sans-serif] text-sm text-gray-700">
                We provide warranties on our products and installation services as outlined in your project agreement. Warranty terms vary by product type and manufacturer specifications. Warranties do not cover damage caused by misuse, improper maintenance, or natural disasters.
              </p>
            </section>

            <section className="mb-6">
              <h3 className="font-['Exo',sans-serif] text-lg font-semibold text-[#1c1c1e] mb-3">
                Cancellation and Refunds
              </h3>
              <p className="font-['Barlow',sans-serif] text-sm text-gray-700">
                Cancellation terms will be specified in your project agreement. Custom-fabricated products may not be eligible for full refunds once production has commenced. Please contact us to discuss any concerns before cancellation.
              </p>
            </section>

            <section className="mb-6">
              <h3 className="font-['Exo',sans-serif] text-lg font-semibold text-[#1c1c1e] mb-3">
                Limitation of Liability
              </h3>
              <p className="font-['Barlow',sans-serif] text-sm text-gray-700">
                SWIFTROOMS shall not be liable for any indirect, incidental, or consequential damages arising from the use of our products or services. Our liability is limited to the value of the products and services provided.
              </p>
            </section>

            <section className="mb-6">
              <h3 className="font-['Exo',sans-serif] text-lg font-semibold text-[#1c1c1e] mb-3">
                Intellectual Property
              </h3>
              <p className="font-['Barlow',sans-serif] text-sm text-gray-700">
                All designs, drawings, and project documentation remain the property of SWIFTROOMS unless otherwise agreed in writing. You may not reproduce, distribute, or use our designs for other projects without permission.
              </p>
            </section>

            <section className="mb-6">
              <h3 className="font-['Exo',sans-serif] text-lg font-semibold text-[#1c1c1e] mb-3">
                Governing Law
              </h3>
              <p className="font-['Barlow',sans-serif] text-sm text-gray-700">
                These terms are governed by the laws of the United Arab Emirates. Any disputes shall be subject to the exclusive jurisdiction of the courts of Dubai, UAE.
              </p>
            </section>

            <section className="mb-6">
              <h3 className="font-['Exo',sans-serif] text-lg font-semibold text-[#1c1c1e] mb-3">
                Contact Information
              </h3>
              <p className="font-['Barlow',sans-serif] text-sm text-gray-700">
                For questions regarding these terms, please contact us at:
              </p>
              <p className="font-['Barlow',sans-serif] text-sm text-gray-700 mt-2">
                Email: <a href="mailto:sales@swiftrooms.ae" className="text-[#007969] hover:underline">sales@swiftrooms.ae</a><br />
                Phone: <a href="tel:+97143474240" className="text-[#007969] hover:underline">04 347 4240</a>
              </p>
            </section>
          </div>
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 bg-gray-50 border-t border-gray-200 px-6 py-4">
          <button
            onClick={onClose}
            className="w-full bg-[#007969] text-white px-6 py-3 rounded-lg font-['Rajdhani',sans-serif] font-semibold hover:bg-[#006156] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
