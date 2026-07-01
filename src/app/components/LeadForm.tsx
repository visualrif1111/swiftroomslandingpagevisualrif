import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft, Check, ArrowRight, Building, Home, Store, DoorOpen, Columns, RectangleVertical, Grid3x3, Sun, HardHat, Wrench, MessageCircle, MapPin, Phone, Mail, Instagram, Globe, Glasses, LayoutGrid, ChevronDown, AlertCircle } from 'lucide-react';
import svgPaths from '../../imports/svg-c8s3lgkv08';
import svgPathsSelection from '../../imports/svg-ws080e5oua';

// Country codes for phone number validation
const countryCodes = [
  { code: '+971', country: 'UAE', flag: '🇦🇪', minLength: 9, maxLength: 9 },
  { code: '+966', country: 'Saudi Arabia', flag: '🇸🇦', minLength: 9, maxLength: 9 },
  { code: '+974', country: 'Qatar', flag: '🇶🇦', minLength: 8, maxLength: 8 },
  { code: '+965', country: 'Kuwait', flag: '🇰🇼', minLength: 8, maxLength: 8 },
  { code: '+973', country: 'Bahrain', flag: '🇧🇭', minLength: 8, maxLength: 8 },
  { code: '+968', country: 'Oman', flag: '🇴🇲', minLength: 8, maxLength: 8 },
  { code: '+91', country: 'India', flag: '🇮🇳', minLength: 10, maxLength: 10 },
  { code: '+92', country: 'Pakistan', flag: '🇵🇰', minLength: 10, maxLength: 10 },
  { code: '+20', country: 'Egypt', flag: '🇪🇬', minLength: 10, maxLength: 10 },
  { code: '+44', country: 'UK', flag: '🇧', minLength: 10, maxLength: 10 },
  { code: '+1', country: 'USA/Canada', flag: '🇺🇸', minLength: 10, maxLength: 10 },
];

// Disposable email domains to block (common spam domains)
const disposableEmailDomains = [
  '10minutemail.com', 'guerrillamail.com', 'mailinator.com', 'tempmail.com',
  'throwaway.email', 'temp-mail.org', 'yopmail.com', 'getnada.com',
  'fakeinbox.com', 'maildrop.cc', 'trashmail.com', 'mailnesia.com',
];

// Email validation function
const validateEmail = (email: string): { isValid: boolean; error: string } => {
  if (!email) return { isValid: true, error: '' }; // Optional field
  
  // Basic format validation
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Please enter a valid email address' };
  }
  
  // Check for disposable/temporary email domains
  const domain = email.split('@')[1]?.toLowerCase();
  if (domain && disposableEmailDomains.includes(domain)) {
    return { isValid: false, error: 'Temporary email addresses are not allowed' };
  }
  
  // Check for suspicious patterns
  if (email.includes('..') || email.startsWith('.') || email.endsWith('.')) {
    return { isValid: false, error: 'Invalid email format' };
  }
  
  return { isValid: true, error: '' };
};

// Phone validation function
const validatePhone = (phone: string, countryCode: string): { isValid: boolean; error: string } => {
  if (!phone) return { isValid: false, error: 'Phone number is required' };
  
  // Remove spaces, dashes, and parentheses
  const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
  
  // Check if it contains only digits
  if (!/^\d+$/.test(cleanPhone)) {
    return { isValid: false, error: 'Phone number should contain only digits' };
  }
  
  // Get country config
  const countryConfig = countryCodes.find(c => c.code === countryCode);
  if (!countryConfig) {
    return { isValid: false, error: 'Invalid country code' };
  }
  
  // Check length
  if (cleanPhone.length < countryConfig.minLength) {
    return { isValid: false, error: `Phone number too short (min ${countryConfig.minLength} digits)` };
  }
  
  if (cleanPhone.length > countryConfig.maxLength) {
    return { isValid: false, error: `Phone number too long (max ${countryConfig.maxLength} digits)` };
  }
  
  // Check for suspicious patterns (all same digit, sequential)
  if (/^(\d)\1+$/.test(cleanPhone)) {
    return { isValid: false, error: 'Invalid phone number format' };
  }
  
  return { isValid: true, error: '' };
};

export function LeadForm({ autoOpen = false, ctaVariant = 'green' }: { autoOpen?: boolean; ctaVariant?: 'green' | 'white' }) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(true);
  const [currentStep, setCurrentStep] = useState(-1); // Start at -1 for selection screen
  const [isFocused, setIsFocused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [journeyType, setJourneyType] = useState<'showroom' | 'quote' | null>(null);
  const [selectedCountryCode, setSelectedCountryCode] = useState('+971'); // Default to UAE
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [phoneError, setPhoneError] = useState('');
  const [emailError, setEmailError] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    propertyType: '',
    productsNeeded: [] as string[],
    projectType: '',
    message: '',
    privacyConsent: false,
    marketingConsent: false,
  });

  // Listen for custom event to open form from navigation
  useEffect(() => {
    const handleOpenForm = () => {
      setIsFormOpen(true);
      setShowMenu(false);
      setCurrentStep(-1);
    };

    window.addEventListener('openLeadForm', handleOpenForm);
    return () => window.removeEventListener('openLeadForm', handleOpenForm);
  }, []);

  // Check if mobile and handle autoOpen behavior - ONLY ON MOUNT
  useEffect(() => {
    const mobile = window.innerWidth < 1024;
    setIsMobile(mobile);
    
    // If autoOpen prop is true and on mobile, skip menu and open directly to selection
    if (autoOpen && mobile) {
      setIsFormOpen(true);
      setShowMenu(false);
      setCurrentStep(-1);
    } else {
      // Show menu button on both mobile and desktop when autoOpen is false
      setShowMenu(true);
      setIsFormOpen(false);
    }
    // Only run once on mount, don't listen to resize (keyboard triggers resize on Android)
  }, [autoOpen]);

  // Track mobile state separately for display purposes only
  useEffect(() => {
    const updateMobileState = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    updateMobileState();
    window.addEventListener('resize', updateMobileState);
    return () => window.removeEventListener('resize', updateMobileState);
  }, []);

  // Detect Android and keyboard visibility
  useEffect(() => {
    const isAndroid = /Android/i.test(navigator.userAgent);
    setIsAndroid(isAndroid);

    if (isAndroid && isMobile) {
      // Store original viewport height
      const originalHeight = window.visualViewport?.height || window.innerHeight;
      
      // Handle keyboard show
      const handleResize = () => {
        const currentHeight = window.visualViewport?.height || window.innerHeight;
        const keyboardOpen = currentHeight < originalHeight * 0.75;
        setKeyboardVisible(keyboardOpen);
        
        // Scroll active input into view on Android
        if (keyboardOpen) {
          setTimeout(() => {
            const activeElement = document.activeElement as HTMLElement;
            if (activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA' || activeElement.tagName === 'SELECT')) {
              activeElement.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center'
              });
            }
          }, 300);
        }
      };

      // Listen to visualViewport for better keyboard detection
      if (window.visualViewport) {
        window.visualViewport.addEventListener('resize', handleResize);
        window.visualViewport.addEventListener('scroll', handleResize);
      } else {
        window.addEventListener('resize', handleResize);
      }

      // Also track focus events
      const handleFocus = (e: FocusEvent) => {
        const target = e.target as HTMLElement;
        if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT')) {
          setKeyboardVisible(true);
          setTimeout(() => {
            target.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'center'
            });
          }, 300);
        }
      };

      const handleBlur = () => {
        setTimeout(() => {
          if (document.activeElement === document.body) {
            setKeyboardVisible(false);
          }
        }, 100);
      };

      document.addEventListener('focusin', handleFocus);
      document.addEventListener('focusout', handleBlur);

      return () => {
        if (window.visualViewport) {
          window.visualViewport.removeEventListener('resize', handleResize);
          window.visualViewport.removeEventListener('scroll', handleResize);
        } else {
          window.removeEventListener('resize', handleResize);
        }
        document.removeEventListener('focusin', handleFocus);
        document.removeEventListener('focusout', handleBlur);
      };
    }
  }, [isMobile]);

  const propertyTypes = [
    { value: 'apartment', label: 'Apartment', icon: <Building className="w-6 h-6 lg:w-7 lg:h-7" /> },
    { value: 'villa', label: 'Villa or Townhouse', icon: <Home className="w-6 h-6 lg:w-7 lg:h-7" /> },
    { value: 'commercial', label: 'Commercial Property', icon: <Store className="w-6 h-6 lg:w-7 lg:h-7" /> },
  ];

  const products = [
    { value: 'aluminum-sliding-doors', label: 'Aluminum Sliding Doors', icon: <DoorOpen className="w-6 h-6 lg:w-7 lg:h-7" /> },
    { value: 'bifold-doors', label: 'Bi-Fold Doors', icon: <Columns className="w-6 h-6 lg:w-7 lg:h-7" /> },
    { value: 'aluminum-windows', label: 'Aluminum Windows', icon: <Grid3x3 className="w-6 h-6 lg:w-7 lg:h-7" /> },
    { value: 'upvc-windows-doors', label: 'UPVC Windows and Doors', icon: <RectangleVertical className="w-6 h-6 lg:w-7 lg:h-7" /> },
    { value: 'skylights', label: 'Skylights and Garden Rooms', icon: <Sun className="w-6 h-6 lg:w-7 lg:h-7" /> },
  ];

  const projectTypes = [
    { value: 'new-build', label: 'New Build', icon: <HardHat className="w-6 h-6 lg:w-7 lg:h-7" /> },
    { value: 'renovation', label: 'Renovation Project', icon: <Wrench className="w-6 h-6 lg:w-7 lg:h-7" /> },
  ];

  const totalSteps = 6;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > -1) {
      setCurrentStep(currentStep - 1);
    } else if (currentStep === -1) {
      // From selection screen, close the form
      setIsFormOpen(false);
      setShowMenu(true);
    }
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    setCurrentStep(totalSteps);
    // Don't auto-close - let user manually return via "Return to Home" button
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return formData.projectType !== '';
      case 1:
        return formData.propertyType !== '';
      case 2:
        return formData.productsNeeded.length > 0;
      case 3:
        return formData.name.trim().length > 0;
      case 4:
        // Don't set error state here, only check validity
        const phoneValidation = validatePhone(formData.phone, selectedCountryCode);
        return phoneValidation.isValid && !phoneError;
      case 5:
        // Email is optional, so always valid (errors shown but don't block)
        return true;
      default:
        return false;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case -1:
        return (
          <div
            key="step-selection"
            className="relative w-full max-w-md mx-auto py-4"
          >
            {/* Android-Friendly Container - Two Stacked Buttons */}
            <div className="space-y-3 px-4">
              {/* Visit Showroom Button - Android Optimized */}
              <div
                onClick={() => {
                  console.log('Visit Showroom clicked - setting state');
                  setJourneyType('showroom');
                  setCurrentStep(0);
                }}
                onTouchStart={(e) => {
                  // Prevent any scroll interference
                  e.currentTarget.style.opacity = '0.9';
                }}
                onTouchEnd={(e) => {
                  e.currentTarget.style.opacity = '1';
                  // Direct state update on touch end
                  console.log('Visit Showroom touch end');
                  setJourneyType('showroom');
                  setCurrentStep(0);
                }}
                style={{ 
                  WebkitTapHighlightColor: 'rgba(0, 121, 105, 0.1)',
                  touchAction: 'manipulation',
                  userSelect: 'none',
                  WebkitUserSelect: 'none',
                  cursor: 'pointer'
                }}
                className="w-full bg-[#007969] text-white px-6 py-4 rounded-xl shadow-lg active:shadow-md active:scale-[0.98] transition-all font-['Rajdhani',sans-serif] font-semibold text-base flex items-center justify-between group"
              >
                <div className="flex items-center gap-3 pointer-events-none">
                  <Glasses className="w-6 h-6" strokeWidth={2} />
                  <div className="text-left">
                    <div className="text-base font-semibold">Visit Our Showroom</div>
                    <div className="text-xs text-white/80 font-['Barlow',sans-serif] font-normal">Experience products firsthand</div>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 transition-transform pointer-events-none" />
              </div>

              {/* Divider with OR */}
              <div className="flex items-center gap-3 py-1 pointer-events-none">
                <div className="flex-1 h-px bg-gray-200" />
                <span className="text-sm font-['Rajdhani',sans-serif] font-semibold text-gray-400">OR</span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>

              {/* Get a Quote Button - Android Optimized */}
              <div
                onClick={() => {
                  console.log('Get a Quote clicked - setting state');
                  setJourneyType('quote');
                  setCurrentStep(0);
                }}
                onTouchStart={(e) => {
                  e.currentTarget.style.opacity = '0.9';
                }}
                onTouchEnd={(e) => {
                  e.currentTarget.style.opacity = '1';
                  // Direct state update on touch end
                  console.log('Get a Quote touch end');
                  setJourneyType('quote');
                  setCurrentStep(0);
                }}
                style={{ 
                  WebkitTapHighlightColor: 'rgba(0, 121, 105, 0.1)',
                  touchAction: 'manipulation',
                  userSelect: 'none',
                  WebkitUserSelect: 'none',
                  cursor: 'pointer'
                }}
                className="w-full bg-white text-[#007969] px-6 py-4 rounded-xl shadow-lg active:shadow-md active:scale-[0.98] transition-all font-['Rajdhani',sans-serif] font-semibold text-base flex items-center justify-between border-2 border-[#007969] group"
              >
                <div className="flex items-center gap-3 pointer-events-none">
                  <MessageCircle className="w-6 h-6" strokeWidth={2} />
                  <div className="text-left">
                    <div className="text-base font-semibold">Get a Free Quote</div>
                    <div className="text-xs text-[#007969]/70 font-['Barlow',sans-serif] font-normal">Receive quote in minutes</div>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 transition-transform pointer-events-none" />
              </div>
            </div>
          </div>
        );

      case 0:
        return (
          <div
            key="step-0"
            className="space-y-6"
          >
            <div>
              <h3 className="font-['Exo',sans-serif] text-2xl lg:text-3xl font-semibold text-[#1c1c1e] mb-2">
                Tell us about your project
              </h3>
              <p className="font-['Barlow',sans-serif] text-sm lg:text-base text-[#3a3a3c]">
                What type of project are you working on?
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4">
              {projectTypes.map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => {
                    setFormData({ ...formData, projectType: type.value });
                    setTimeout(() => handleNext(), 300);
                  }}
                  className={`p-5 lg:p-6 rounded-xl border-2 transition-all text-center hover:shadow-lg group flex flex-col items-center justify-center active:scale-95 ${
                    formData.projectType === type.value
                      ? 'border-[#008873] bg-[#008873]/5'
                      : 'border-[#e5e7eb] hover:border-[#008873] bg-white'
                  }`}
                >
                  <div className={`mb-3 ${
                    formData.projectType === type.value 
                      ? 'text-[#008873]' 
                      : 'text-[#008873] group-hover:text-[#007969]'
                  }`}>{type.icon}</div>
                  <div className={`font-['Inter',sans-serif] text-base lg:text-lg font-medium ${
                    formData.projectType === type.value 
                      ? 'text-[#008873]' 
                      : 'text-[#1c1c1e] group-hover:text-[#008873]'
                  }`}>
                    {type.label}
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 1:
        return (
          <div
            key="step-1"
            className="space-y-6"
          >
            <div>
              <h3 className="font-['Exo',sans-serif] text-2xl lg:text-3xl font-semibold text-[#1c1c1e] mb-2">
                What type of property?
              </h3>
              <p className="font-['Barlow',sans-serif] text-sm lg:text-base text-[#3a3a3c]">
                Select the property type you need services for
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 lg:gap-4">
              {propertyTypes.map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => {
                    setFormData({ ...formData, propertyType: type.value });
                    setTimeout(() => handleNext(), 300);
                  }}
                  className={`p-4 lg:p-5 rounded-xl border-2 transition-all text-center hover:shadow-lg group flex flex-col items-center justify-center active:scale-95 ${
                    formData.propertyType === type.value
                      ? 'border-[#008873] bg-[#008873]/5'
                      : 'border-[#e5e7eb] hover:border-[#008873] bg-white'
                  }`}
                >
                  <div className={`mb-2 ${
                    formData.propertyType === type.value 
                      ? 'text-[#008873]' 
                      : 'text-[#008873] group-hover:text-[#007969]'
                  }`}>{type.icon}</div>
                  <div className={`font-['Inter',sans-serif] text-sm lg:text-base font-medium ${
                    formData.propertyType === type.value 
                      ? 'text-[#008873]' 
                      : 'text-[#1c1c1e] group-hover:text-[#008873]'
                  }`}>
                    {type.label}
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div
            key="step-2"
            className="space-y-4 lg:space-y-6"
          >
            <div>
              <h3 className="font-['Exo',sans-serif] text-xl lg:text-3xl font-semibold text-[#1c1c1e] mb-1 lg:mb-2">
                Which products do you need?
              </h3>
              <p className="font-['Barlow',sans-serif] text-xs lg:text-base text-[#3a3a3c]">
                Select all products you're interested in
              </p>
            </div>
            
            {/* Selection counter */}
            {formData.productsNeeded.length > 0 && (
              <div className="bg-[#008873]/10 border border-[#008873]/20 rounded-lg px-3 py-2 inline-flex items-center gap-2">
                <Check className="w-4 h-4 text-[#008873]" />
                <span className="font-['Inter',sans-serif] text-sm text-[#008873] font-medium">
                  {formData.productsNeeded.length} product{formData.productsNeeded.length !== 1 ? 's' : ''} selected
                </span>
              </div>
            )}
            
            <div className="grid grid-cols-2 gap-2 lg:gap-4 max-h-[45vh] lg:max-h-none overflow-y-auto">
              {products.map((product) => {
                const isSelected = formData.productsNeeded.includes(product.value);
                return (
                  <button
                    key={product.value}
                    type="button"
                    onClick={() => {
                      setFormData({
                        ...formData,
                        productsNeeded: isSelected
                          ? formData.productsNeeded.filter((p) => p !== product.value)
                          : [...formData.productsNeeded, product.value],
                      });
                    }}
                    className={`relative p-2.5 lg:p-5 rounded-lg lg:rounded-xl border-2 transition-all text-center group flex flex-col items-center justify-center active:scale-95 ${
                      isSelected
                        ? 'border-[#008873] bg-[#008873]/5'
                        : 'border-[#e5e7eb] hover:border-[#008873]/40 bg-white'
                    }`}
                  >
                    {/* Checkmark indicator */}
                    {isSelected && (
                      <div className="absolute top-1 right-1 lg:top-2 lg:right-2 w-5 h-5 lg:w-6 lg:h-6 bg-[#008873] rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 lg:w-4 lg:h-4 text-white" strokeWidth={3} />
                      </div>
                    )}
                    
                    <div className={`mb-1 lg:mb-2 ${
                      isSelected 
                        ? 'text-[#008873]' 
                        : 'text-[#008873] group-hover:text-[#007969]'
                    }`}>{product.icon}</div>
                    <div className={`font-['Inter',sans-serif] text-xs lg:text-base font-medium leading-tight ${
                      isSelected 
                        ? 'text-[#008873]' 
                        : 'text-[#1c1c1e] group-hover:text-[#008873]'
                    }`}>
                      {product.label}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        );

      case 3:
        return (
          <div
            key="step-3"
            className="space-y-6"
          >
            <div>
              <h3 className="font-['Exo',sans-serif] text-2xl lg:text-3xl font-semibold text-[#1c1c1e] mb-2">
                Please enter your full name
              </h3>
              <p className="font-['Barlow',sans-serif] text-sm lg:text-base text-[#3a3a3c]">
                Let's start with your full name
              </p>
            </div>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              onKeyPress={(e) => e.key === 'Enter' && isStepValid() && handleNext()}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="w-full px-4 py-4 text-lg text-[#1c1c1e] border-2 border-[#e5e7eb] rounded-xl focus:ring-2 focus:ring-[#008873] focus:border-[#008873] outline-none transition-all font-['Inter',sans-serif] placeholder:text-[rgba(10,10,10,0.3)]"
              placeholder="Enter your full name"
              autoFocus
            />
          </div>
        );

      case 4:
        return (
          <div
            key="step-4"
            className="space-y-6"
          >
            <div>
              <h3 className="font-['Exo',sans-serif] text-2xl lg:text-3xl font-semibold text-[#1c1c1e] mb-2">
                What's your phone number?
              </h3>
              <p className="font-['Barlow',sans-serif] text-sm lg:text-base text-[#3a3a3c]">
                We'll use this to send you your quote
              </p>
            </div>
            {/* Phone Input with Country Code Selector */}
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Country Code Select */}
                <select
                  value={selectedCountryCode}
                  onChange={(e) => {
                    setSelectedCountryCode(e.target.value);
                    if (phoneError) setPhoneError('');
                  }}
                  className="px-4 py-4 bg-white border-2 border-[#e5e7eb] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#008873] focus:border-[#008873] transition-all font-['Inter',sans-serif] text-base text-gray-900 cursor-pointer"
                >
                  {countryCodes.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.flag} {country.code} - {country.country}
                    </option>
                  ))}
                </select>

                {/* Phone Number Input */}
                <input
                  type="tel"
                  inputMode="numeric"
                  value={formData.phone}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^\d\s\-\(\)]/g, '');
                    setFormData({ ...formData, phone: value });
                    if (phoneError) setPhoneError('');
                  }}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      const validation = validatePhone(formData.phone, selectedCountryCode);
                      if (validation.isValid) {
                        handleNext();
                      }
                    }
                  }}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => {
                    setIsFocused(false);
                    if (formData.phone) {
                      const validation = validatePhone(formData.phone, selectedCountryCode);
                      setPhoneError(validation.error);
                    }
                  }}
                  className={`flex-1 px-4 py-4 text-lg text-[#1c1c1e] border-2 rounded-xl focus:ring-2 focus:ring-[#008873] outline-none transition-all font-['Inter',sans-serif] placeholder:text-[rgba(10,10,10,0.3)] ${
                    phoneError ? 'border-red-500 focus:border-red-500' : 'border-[#e5e7eb] focus:border-[#008873]'
                  }`}
                  placeholder="Enter phone number"
                  autoFocus
                />
              </div>
              
              {/* Error Message */}
              {phoneError && (
                <div className="flex items-start gap-2 text-red-600 text-sm font-['Barlow',sans-serif]">
                  <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>{phoneError}</span>
                </div>
              )}
              
              {/* Hint Text */}
              {!phoneError && (
                <div className="text-xs text-[#6b7280] font-['Barlow',sans-serif]">
                  Enter {countryCodes.find(c => c.code === selectedCountryCode)?.minLength} digits without country code
                </div>
              )}
            </div>
          </div>
        );

      case 5:
        return (
          <div
            key="step-5"
            className="space-y-6"
          >
            <div>
              <h3 className="font-['Exo',sans-serif] text-2xl lg:text-3xl font-semibold text-[#1c1c1e] mb-2">
                What's your email?
              </h3>
              <p className="font-['Barlow',sans-serif] text-sm lg:text-base text-[#3a3a3c]">
                Optional - for sending you detailed quotes
              </p>
            </div>
            <div className="space-y-2">
              <input
                type="email"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  setEmailError(''); // Clear error on input
                }}
                onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                onFocus={() => setIsFocused(true)}
                onBlur={() => {
                  setIsFocused(false);
                  // Validate on blur
                  const validation = validateEmail(formData.email);
                  setEmailError(validation.error);
                }}
                className={`w-full px-4 py-4 text-lg text-[#1c1c1e] border-2 rounded-xl focus:ring-2 focus:ring-[#008873] outline-none transition-all font-['Inter',sans-serif] placeholder:text-[rgba(10,10,10,0.3)] ${
                  emailError ? 'border-red-500 focus:border-red-500' : 'border-[#e5e7eb] focus:border-[#008873]'
                }`}
                placeholder="your@email.com"
                autoFocus
              />
              
              {/* Error Message */}
              {emailError && (
                <div className="flex items-start gap-2 text-red-600 text-sm font-['Barlow',sans-serif]">
                  <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>{emailError}</span>
                </div>
              )}
            </div>
          </div>
        );

      case 6:
        return (
          <div
            key="step-6"
            className="text-center py-12 space-y-6"
          >
            <div className="w-20 h-20 lg:w-24 lg:h-24 bg-[#008873] rounded-full flex items-center justify-center mx-auto">
              <Check className="w-10 h-10 lg:w-12 lg:h-12 text-white" strokeWidth={3} />
            </div>
            
            <div>
              <h3 className="font-['Exo',sans-serif] text-2xl lg:text-4xl font-semibold text-[#1c1c1e] mb-3">
                Thank You, {formData.name}!
              </h3>
              <p className="font-['Barlow',sans-serif] text-base lg:text-lg text-[#3a3a3c] mb-2">
                We truly appreciate you taking the time to reach out to us.
              </p>
              <p className="font-['Barlow',sans-serif] text-base lg:text-lg text-[#3a3a3c] mb-6">
                Your quote request has been received and our team will contact you shortly.
              </p>
            </div>

            <div className="bg-[#008873]/10 border-2 border-[#008873]/20 rounded-xl p-6 max-w-md mx-auto">
              <div className="flex items-center justify-center gap-3 text-[#008873]">
                <Check className="w-6 h-6 flex-shrink-0" strokeWidth={2.5} />
                <p className="font-['Inter',sans-serif] text-base lg:text-lg font-medium">
                  We respond within 12 hours
                </p>
              </div>
            </div>

            {/* WhatsApp CTA Card - Minimized Version */}
            <div className="bg-white border-2 border-[#25D366]/30 rounded-xl p-4 lg:p-5 max-w-sm mx-auto shadow-lg hover:shadow-xl transition-shadow">
              {/* Compact Header with Icon and Text - Center Aligned */}
              <div className="flex flex-col items-center text-center gap-3 mb-3">
                <div className="w-10 h-10 bg-[#25D366] rounded-full flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-5 h-5 text-white" fill="white" />
                </div>
                <div>
                  <h4 className="font-['Exo',sans-serif] text-base lg:text-lg font-semibold text-[#1c1c1e] leading-tight">
                    Send Swiftrooms details & location to my phone
                  </h4>
                  <p className="font-['Barlow',sans-serif] text-xs lg:text-sm text-[#6b7280]">
                    Save our details for your visit.
                  </p>
                </div>
              </div>

              {/* Compact WhatsApp CTA Button */}
              <a
                href={`https://wa.me/971505269149?text=${encodeURIComponent(
                  `Thank you for your enquiry. Our team will be in touch shortly, however you are welcome to contact us directly at any time.\n\n` +
                  `YOUR INQUIRY DETAILS:\n` +
                  `Name: ${formData.name}\n` +
                  `Phone: ${selectedCountryCode} ${formData.phone}\n` +
                  `Email: ${formData.email || 'Not provided'}\n` +
                  `Property Type: ${propertyTypes.find(p => p.value === formData.propertyType)?.label || 'Not specified'}\n` +
                  `Products Needed: ${formData.productsNeeded.map(p => products.find(prod => prod.value === p)?.label).join(', ') || 'Not specified'}\n` +
                  `Project Type: ${projectTypes.find(p => p.value === formData.projectType)?.label || 'Not specified'}\n\n` +
                  `---\n\n` +
                  `Showroom Location: ETJAR – J1 Complex, Block A, Warehouse 11 & 12, Jebel Ali Industrial Area 1, Dubai.\n\n` +
                  `For directions, please use Google Maps:\n` +
                  `https://maps.google.com/?q=ETJAR+J1+Complex+Block+A+Warehouse+11-12+Jebel+Ali+Industrial+Area+1+Dubai\n\n` +
                  `Call on +971 4 347 4240, or visit www.swiftrooms.ae\n` +
                  `We look forward to welcoming you to our showroom soon!\n\n` +
                  `The Swiftrooms Team`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-lg font-['Rajdhani',sans-serif] text-sm lg:text-base font-semibold shadow-md hover:shadow-lg transition-all duration-300 active:scale-95"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Send to My Phone</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <button
              onClick={() => {
                // Check if mobile
                const isMobile = window.innerWidth < 1024;
                
                // Reset form data
                setFormData({
                  name: '',
                  phone: '',
                  email: '',
                  propertyType: '',
                  productsNeeded: [] as string[],
                  projectType: '',
                  message: '',
                  privacyConsent: false,
                  marketingConsent: false,
                });
                setCurrentStep(-1);
                setJourneyType(null);
                
                if (isMobile) {
                  // On mobile: Close form WITHOUT showing the menu button
                  setIsFormOpen(false);
                  setShowMenu(false); // Don't show "Start Your Swiftrooms Journey" button
                  
                  // Scroll to hero section
                  setTimeout(() => {
                    const heroSection = document.getElementById('hero');
                    if (heroSection) {
                      heroSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    } else {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }, 300);
                } else {
                  // On desktop: Reset form for another submission
                  // Keep form open and return to selection screen
                }
              }}
              className="text-[#008873] font-['Barlow',sans-serif] text-sm lg:text-base font-medium hover:underline"
            >
              {window.innerWidth < 1024 ? 'Return to Home' : 'Submit another request'}
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      {/* Show CTA on Desktop - Simplified */}
      {showMenu && !isFormOpen && (
        <div className="w-full flex flex-col items-center justify-center gap-6">
          {/* CTA Button */}
          <button
            onClick={() => {
              setShowMenu(false);
              setIsFormOpen(true);
            }}
            className={`group relative inline-flex items-center gap-3 px-8 py-4 lg:px-12 lg:py-5 rounded-2xl font-['Rajdhani',sans-serif] text-lg lg:text-2xl font-semibold shadow-2xl transition-all duration-300 overflow-hidden active:scale-95 ${ctaVariant === 'white' ? 'bg-white text-[#007969] hover:bg-[#007969] hover:text-white' : 'bg-[#007969] text-white hover:bg-white hover:text-[#007969]'}`}
          >
            {/* Button content */}
            <span className="relative z-10">Get Free Quote</span>
            <ArrowRight className="relative z-10 w-6 h-6 lg:w-7 lg:h-7 group-hover:translate-x-1 transition-transform duration-300" />
          </button>

          {/* Trust indicators below CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-sm text-white font-['Barlow',sans-serif]">
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-white" />
              <span>Free Consultation</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-white" />
              <span>24-Hour Response</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-white" />
              <span>No Obligation</span>
            </div>
          </div>
        </div>
      )}

      {/* Show Form when opened - SIMPLIFIED FOR ANDROID */}
      {isFormOpen && (
        <div
          id="form" 
          className="bg-white rounded-2xl shadow-2xl p-5 lg:p-8 w-full relative"
        >
          {/* Progress Bar */}
          {currentStep >= 0 && currentStep < totalSteps && (
            <div className="mb-6 lg:mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="font-['Inter',sans-serif] text-xs lg:text-sm text-[#3a3a3c] font-medium">
                  Question {currentStep + 1} of {totalSteps}
                </span>
                <span className="font-['Inter',sans-serif] text-xs lg:text-sm text-[#008873] font-medium">
                  {Math.round(((currentStep + 1) / totalSteps) * 100)}%
                </span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#008873] rounded-full transition-all duration-400"
                  style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* Form Steps - NO ANIMATIONS */}
          <div className="relative min-h-[300px]">
            {renderStep()}
          </div>

          {/* Navigation Buttons */}
          {currentStep >= 0 && currentStep < totalSteps && (
            <div className="flex gap-3 mt-6 lg:mt-8">
              {currentStep > 0 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="flex items-center gap-2 px-4 lg:px-6 py-2.5 lg:py-3 rounded-xl border-2 border-[#e5e7eb] text-[#3a3a3c] font-['Barlow',sans-serif] text-sm lg:text-base font-medium hover:border-[#008873] hover:text-white hover:bg-[#008873] active:bg-[#006d5c] transition-all duration-200"
                >
                  <ChevronLeft className="w-4 h-4 lg:w-5 lg:h-5" />
                  Back
                </button>
              )}
              
              <button
                type="button"
                onClick={currentStep === 5 ? handleSubmit : handleNext}
                disabled={!isStepValid()}
                className={`flex items-center gap-2 px-4 lg:px-6 py-2.5 lg:py-3 rounded-xl font-['Barlow',sans-serif] text-sm lg:text-base font-medium transition-all ml-auto ${
                  isStepValid()
                    ? 'bg-[#008873] text-white hover:bg-white hover:text-[#008873] hover:ring-2 hover:ring-[#008873] hover:shadow-lg active:scale-95'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                {currentStep === 5 ? 'Submit' : 'Next'}
                <ChevronRight className="w-4 h-4 lg:w-5 lg:h-5" />
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}