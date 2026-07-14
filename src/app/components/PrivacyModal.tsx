import { X } from 'lucide-react';
import { useEffect } from 'react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PrivacyModal({ isOpen, onClose }: PrivacyModalProps) {
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
        aria-label="Privacy Policy"
      >
        {/* Header */}
        <div className="flex-shrink-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="font-['Exo',sans-serif] text-xl lg:text-2xl font-bold text-[#1c1c1e]">
            Privacy Policy
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
                Information We Collect
              </h3>
              <p className="font-['Barlow',sans-serif] text-sm text-gray-700 mb-3">
                We collect information you provide directly to us when you request a quote, contact us, or use our services. This may include:
              </p>
              <ul className="font-['Barlow',sans-serif] text-sm text-gray-700 list-disc pl-5 space-y-2">
                <li>Name and contact information (email, phone number)</li>
                <li>Project details and location</li>
                <li>Property type and specifications</li>
                <li>Communication preferences</li>
              </ul>
            </section>

            <section className="mb-6">
              <h3 className="font-['Exo',sans-serif] text-lg font-semibold text-[#1c1c1e] mb-3">
                How We Use Your Information
              </h3>
              <p className="font-['Barlow',sans-serif] text-sm text-gray-700 mb-3">
                We use the information we collect to:
              </p>
              <ul className="font-['Barlow',sans-serif] text-sm text-gray-700 list-disc pl-5 space-y-2">
                <li>Provide quotes and respond to your inquiries</li>
                <li>Process and fulfill your orders</li>
                <li>Send you updates about your project</li>
                <li>Improve our services and customer experience</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section className="mb-6">
              <h3 className="font-['Exo',sans-serif] text-lg font-semibold text-[#1c1c1e] mb-3">
                Information Sharing
              </h3>
              <p className="font-['Barlow',sans-serif] text-sm text-gray-700">
                We do not sell, trade, or rent your personal information to third parties. We may share your information with trusted service providers who assist us in operating our business, conducting our services, or servicing you, as long as those parties agree to keep this information confidential.
              </p>
            </section>

            <section className="mb-6">
              <h3 className="font-['Exo',sans-serif] text-lg font-semibold text-[#1c1c1e] mb-3">
                Data Security
              </h3>
              <p className="font-['Barlow',sans-serif] text-sm text-gray-700">
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
              </p>
            </section>

            <section className="mb-6">
              <h3 className="font-['Exo',sans-serif] text-lg font-semibold text-[#1c1c1e] mb-3">
                Your Rights
              </h3>
              <p className="font-['Barlow',sans-serif] text-sm text-gray-700 mb-3">
                You have the right to:
              </p>
              <ul className="font-['Barlow',sans-serif] text-sm text-gray-700 list-disc pl-5 space-y-2">
                <li>Access your personal information</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of marketing communications</li>
              </ul>
            </section>

            <section className="mb-6">
              <h3 className="font-['Exo',sans-serif] text-lg font-semibold text-[#1c1c1e] mb-3">
                Cookies
              </h3>
              <p className="font-['Barlow',sans-serif] text-sm text-gray-700">
                Our website uses cookies to enhance your browsing experience. You can control cookie preferences through your browser settings.
              </p>
            </section>

            <section className="mb-6">
              <h3 className="font-['Exo',sans-serif] text-lg font-semibold text-[#1c1c1e] mb-3">
                Contact Us
              </h3>
              <p className="font-['Barlow',sans-serif] text-sm text-gray-700">
                If you have any questions about this Privacy Policy, please contact us at:
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
