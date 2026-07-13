import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cookie, X, Shield, Settings } from 'lucide-react';

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true, // Always required
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('swiftrooms-cookie-consent');
    if (!consent) {
      // Show banner after a short delay for better UX
      setTimeout(() => setShowBanner(true), 1000);
    }
  }, []);

  const acceptAll = () => {
    const consent = {
      necessary: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('swiftrooms-cookie-consent', JSON.stringify(consent));
    setShowBanner(false);
  };

  const acceptNecessary = () => {
    const consent = {
      necessary: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('swiftrooms-cookie-consent', JSON.stringify(consent));
    setShowBanner(false);
  };

  const savePreferences = () => {
    const consent = {
      ...preferences,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('swiftrooms-cookie-consent', JSON.stringify(consent));
    setShowBanner(false);
    setShowSettings(false);
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          className="fixed bottom-0 left-0 right-0 z-[9999] p-4 lg:p-6"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="max-w-6xl mx-auto">
            {/* Main Banner */}
            {!showSettings && (
              <motion.div
                className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-4 lg:p-6"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 items-start lg:items-center">
                  {/* Icon & Content */}
                  <div className="flex-1 flex gap-3 lg:gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 lg:w-12 lg:h-12 bg-[#007969] rounded-xl flex items-center justify-center">
                        <Cookie className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-['Exo',sans-serif] text-base lg:text-lg font-bold text-[#1c1c1e] mb-1 lg:mb-2">
                        Cookie & Privacy Notice
                      </h3>
                      <p className="font-['Barlow',sans-serif] text-xs lg:text-sm text-[#3a3a3c] leading-relaxed">
                        We use cookies and similar technologies to enhance your browsing experience, analyze site traffic, 
                        and deliver personalized content. By clicking "Accept All", you consent to our use of cookies. 
                        You can manage your preferences or learn more in our{' '}
                        <a 
                          href="https://www.swiftrooms.ae/privacy-policy" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-[#007969] hover:text-[#007969] font-medium underline"
                        >
                          Privacy Policy
                        </a>.
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-2 lg:gap-3 w-full lg:w-auto">
                    <button
                      onClick={() => setShowSettings(true)}
                      className="px-4 py-2.5 lg:px-5 lg:py-3 border-2 border-gray-300 text-[#3a3a3c] rounded-lg font-['Rajdhani',sans-serif] text-sm lg:text-base font-bold hover:border-[#007969] hover:bg-gray-50 transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      <Settings className="w-4 h-4" />
                      <span className="hidden sm:inline">Customize</span>
                      <span className="sm:hidden">Settings</span>
                    </button>
                    <button
                      onClick={acceptNecessary}
                      className="px-4 py-2.5 lg:px-5 lg:py-3 border-2 border-[#007969] text-[#007969] rounded-lg font-['Rajdhani',sans-serif] text-sm lg:text-base font-bold hover:bg-[#007969]/5 transition-all duration-200"
                    >
                      Necessary Only
                    </button>
                    <button
                      onClick={acceptAll}
                      className="px-4 py-2.5 lg:px-5 lg:py-3 bg-gradient-to-r from-[#007969] to-[#007969] text-white rounded-lg font-['Rajdhani',sans-serif] text-sm lg:text-base font-bold hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200"
                    >
                      Accept All
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Settings Panel */}
            {showSettings && (
              <motion.div
                className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-4 lg:p-6 max-h-[85dvh] overflow-y-auto"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center justify-between mb-4 lg:mb-6">
                  <h3 className="font-['Exo',sans-serif] text-lg lg:text-xl font-bold text-[#1c1c1e]">
                    Cookie Preferences
                  </h3>
                  <button
                    onClick={() => setShowSettings(false)}
                    className="w-11 h-11 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
                    aria-label="Close cookie preferences"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                <div className="space-y-4 mb-6">
                  {/* Necessary Cookies */}
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Shield className="w-4 h-4 text-[#007969]" />
                          <h4 className="font-['Exo',sans-serif] text-sm lg:text-base font-semibold text-[#1c1c1e]">
                            Necessary Cookies
                          </h4>
                          <span className="px-2 py-0.5 bg-[#007969] text-white text-xs rounded-full font-['Barlow',sans-serif] font-medium">
                            Required
                          </span>
                        </div>
                        <p className="font-['Barlow',sans-serif] text-xs lg:text-sm text-[#3a3a3c]">
                          Essential for website functionality, security, and form submissions. Cannot be disabled.
                        </p>
                      </div>
                      <div className="flex-shrink-0">
                        <div className="w-12 h-6 bg-[#007969] rounded-full relative cursor-not-allowed opacity-50">
                          <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Analytics Cookies */}
                  <div className="p-4 bg-white rounded-lg border border-gray-200">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h4 className="font-['Exo',sans-serif] text-sm lg:text-base font-semibold text-[#1c1c1e] mb-1">
                          Analytics Cookies
                        </h4>
                        <p className="font-['Barlow',sans-serif] text-xs lg:text-sm text-[#3a3a3c]">
                          Help us understand how visitors interact with our website by collecting anonymous information.
                        </p>
                      </div>
                      <button
                        onClick={() => setPreferences({ ...preferences, analytics: !preferences.analytics })}
                        className="flex-shrink-0 inline-flex items-center justify-center min-h-11 min-w-11"
                        role="switch"
                        aria-checked={preferences.analytics}
                        aria-label="Analytics cookies"
                      >
                        <div className={`w-12 h-6 rounded-full relative transition-colors duration-200 ${
                          preferences.analytics ? 'bg-[#007969]' : 'bg-gray-300'
                        }`}>
                          <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-200 ${
                            preferences.analytics ? 'right-1' : 'left-1'
                          }`} />
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Marketing Cookies */}
                  <div className="p-4 bg-white rounded-lg border border-gray-200">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h4 className="font-['Exo',sans-serif] text-sm lg:text-base font-semibold text-[#1c1c1e] mb-1">
                          Marketing Cookies
                        </h4>
                        <p className="font-['Barlow',sans-serif] text-xs lg:text-sm text-[#3a3a3c]">
                          Used to deliver relevant ads and track ad campaign performance across websites.
                        </p>
                      </div>
                      <button
                        onClick={() => setPreferences({ ...preferences, marketing: !preferences.marketing })}
                        className="flex-shrink-0 inline-flex items-center justify-center min-h-11 min-w-11"
                        role="switch"
                        aria-checked={preferences.marketing}
                        aria-label="Marketing cookies"
                      >
                        <div className={`w-12 h-6 rounded-full relative transition-colors duration-200 ${
                          preferences.marketing ? 'bg-[#007969]' : 'bg-gray-300'
                        }`}>
                          <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-200 ${
                            preferences.marketing ? 'right-1' : 'left-1'
                          }`} />
                        </div>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 lg:gap-3">
                  <button
                    onClick={() => setShowSettings(false)}
                    className="flex-1 px-4 py-2.5 lg:px-5 lg:py-3 border-2 border-gray-300 text-[#3a3a3c] rounded-lg font-['Rajdhani',sans-serif] text-sm lg:text-base font-bold hover:bg-gray-50 transition-all duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={savePreferences}
                    className="flex-1 px-4 py-2.5 lg:px-5 lg:py-3 bg-gradient-to-r from-[#007969] to-[#007969] text-white rounded-lg font-['Rajdhani',sans-serif] text-sm lg:text-base font-bold hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200"
                  >
                    Save Preferences
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
