import { useState, useEffect, useRef, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft, Check, ArrowRight, Building, Home, Store, DoorOpen, Columns, RectangleVertical, Grid3x3, Sun, HardHat, Wrench, MessageCircle, MapPin, Phone, Mail, Instagram, Globe, Glasses, LayoutGrid, ChevronDown, AlertCircle, Upload, X } from 'lucide-react';
import svgPaths from '../../imports/svg-c8s3lgkv08';
import svgPathsSelection from '../../imports/svg-ws080e5oua';
import { turnstileEnabled, getTurnstileToken } from '../utils/turnstile';

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
  { code: '+44', country: 'UK', flag: '🇬🇧', minLength: 10, maxLength: 10 },
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
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
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

// --- Client-side file-attachment guardrails (Phase 9/10) -----------------
// Files are never uploaded to a third party by this form (only their names are
// sent with the lead), but we still validate on selection to protect the user
// and keep the payload sane.
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB per file
const MAX_FILES = 8;
const ALLOWED_FILE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'application/pdf',
];

export function LeadForm({ autoOpen = false, ctaVariant = 'green', listenForOpenEvent = false }: { autoOpen?: boolean; ctaVariant?: 'green' | 'white'; listenForOpenEvent?: boolean }) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(true);
  const [currentStep, setCurrentStep] = useState(0); // Two-step wizard: 0 = contact, 1 = project details
  const [isFocused, setIsFocused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [journeyType, setJourneyType] = useState<'showroom' | 'quote' | null>('quote');
  const [selectedCountryCode, setSelectedCountryCode] = useState('+971'); // Default to UAE
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [emailError, setEmailError] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    propertyType: '',
    productsNeeded: [] as string[],
    projectType: '',
    siteLocation: '',
    timeline: '',
    message: '',
    privacyConsent: false,
    marketingConsent: false,
  });
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState('');

  // --- Anti-spam / bot protection (Phase 6/9) ---------------------------
  // Honeypot: a hidden field that real users never see or fill. Bots that
  // auto-fill every input will populate it, letting us silently drop them.
  const [honeypot, setHoneypot] = useState('');
  // Timestamp of when the form was opened. Genuine users take several seconds
  // to complete it; near-instant submits are almost always automated.
  const [formOpenedAt, setFormOpenedAt] = useState<number>(() => Date.now());
  // Signature of the last successfully-sent enquiry, to prevent duplicate
  // submissions (e.g. double-tap / retry) hitting the endpoint twice.
  const submittedSignatureRef = useRef<string | null>(null);

  // Reset the anti-bot timer each time the form is (re)opened.
  useEffect(() => {
    if (isFormOpen) setFormOpenedAt(Date.now());
  }, [isFormOpen]);

  // Validate attachments on selection: allowed types, per-file size, max count.
  const handleFileSelect = (fileList: FileList | null) => {
    setFileError('');
    if (!fileList) {
      setFiles([]);
      return;
    }
    const picked = Array.from(fileList);
    const rejected: string[] = [];
    const accepted = picked.filter((f) => {
      if (!ALLOWED_FILE_TYPES.includes(f.type)) {
        rejected.push(`${f.name} (unsupported type)`);
        return false;
      }
      if (f.size > MAX_FILE_SIZE) {
        rejected.push(`${f.name} (over 10 MB)`);
        return false;
      }
      return true;
    });
    const limited = accepted.slice(0, MAX_FILES);
    if (accepted.length > MAX_FILES) {
      rejected.push(`only the first ${MAX_FILES} files were kept`);
    }
    if (rejected.length > 0) {
      setFileError(`Some files were skipped: ${rejected.join(', ')}.`);
    }
    setFiles(limited);
  };

  // Listen for custom event to open form from navigation. Only the designated
  // instance (the contact-form section) responds, so the global event doesn't
  // also open the hero's off-screen form on desktop.
  useEffect(() => {
    if (!listenForOpenEvent) return;
    const handleOpenForm = () => {
      setIsFormOpen(true);
      setShowMenu(false);
      setCurrentStep(0);
    };

    window.addEventListener('openLeadForm', handleOpenForm);
    return () => window.removeEventListener('openLeadForm', handleOpenForm);
  }, [listenForOpenEvent]);

  // Check if mobile and handle autoOpen behavior - ONLY ON MOUNT
  useEffect(() => {
    const mobile = window.innerWidth < 1024;
    setIsMobile(mobile);
    
    // If autoOpen prop is true and on mobile, skip menu and open directly to selection
    if (autoOpen && mobile) {
      setIsFormOpen(true);
      setShowMenu(false);
      setCurrentStep(0);
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

  const timelines = [
    { value: 'asap', label: 'As soon as possible' },
    { value: '1-3-months', label: 'Within 1–3 months' },
    { value: '3-6-months', label: 'Within 3–6 months' },
    { value: 'exploring', label: 'Just exploring options' },
  ];

  // Desktop: two grouped steps (contact + product, then project details).
  // Mobile: a Typeform-style flow — one question per screen.
  const MOBILE_STEP_KEYS = [
    'name', 'phone', 'email', 'products', 'property', 'build', 'timeline', 'location', 'message',
  ] as const;
  const totalSteps = isMobile ? MOBILE_STEP_KEYS.length : 2;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      // From the first step, close the form
      setIsFormOpen(false);
      setShowMenu(true);
    }
  };

  const handleSubmit = async () => {
    if (isSubmitting) return; // guard against double-submit
    setSubmitError('');

    // Honeypot tripped → almost certainly a bot. Show the normal success
    // screen so we don't reveal the trap, but never send the payload.
    if (honeypot.trim() !== '') {
      setCurrentStep(totalSteps);
      return;
    }

    // Timing check → forms completed in under ~2.5s are automated.
    if (Date.now() - formOpenedAt < 2500) {
      setSubmitError('Please take a moment to review your details before submitting.');
      return;
    }

    setIsSubmitting(true);

    const payload = {
      name: formData.name,
      phone: `${selectedCountryCode} ${formData.phone}`,
      email: formData.email || '',
      propertyType: propertyTypes.find(p => p.value === formData.propertyType)?.label || formData.propertyType,
      productsNeeded: formData.productsNeeded.map(p => products.find(prod => prod.value === p)?.label || p),
      projectType: projectTypes.find(p => p.value === formData.projectType)?.label || formData.projectType,
      siteLocation: formData.siteLocation || '',
      timeline: timelines.find(t => t.value === formData.timeline)?.label || formData.timeline,
      fileNames: files.map(f => f.name),
      message: formData.message || '',
      privacyConsent: formData.privacyConsent,
      marketingConsent: formData.marketingConsent,
      journeyType,
      source: 'landing-page',
      submittedAt: new Date().toISOString(),
    };

    // Duplicate-submission guard: if this exact enquiry was already sent
    // successfully, skip the network call and go straight to the thank-you screen.
    const signature = `${payload.name}|${payload.phone}|${payload.email}|${payload.productsNeeded.join(',')}`;
    if (submittedSignatureRef.current === signature) {
      setIsSubmitting(false);
      setCurrentStep(totalSteps);
      return;
    }

    // Direct fallback: POST straight to VITE_LEAD_ENDPOINT (Formspree/webhook).
    // Kept in env so no endpoint is hardcoded in the bundle. Used when the
    // Turnstile-protected proxy is not enabled/configured.
    const endpoint = import.meta.env.VITE_LEAD_ENDPOINT as string | undefined;
    const deliverDirect = async () => {
      if (endpoint) {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error(`Lead submit failed with status ${res.status}`);
      } else {
        // No endpoint set yet — warn loudly so leads aren't silently lost in dev.
        console.warn('[LeadForm] VITE_LEAD_ENDPOINT is not configured — lead was NOT delivered:', payload);
      }
    };

    try {
      if (turnstileEnabled) {
        // Protected path: mint a Turnstile token and submit through the
        // same-origin /api/lead proxy, which verifies it server-side.
        let token: string;
        try {
          token = await getTurnstileToken();
        } catch {
          setSubmitError('We couldn’t verify your browser. Please try again, or reach us on WhatsApp.');
          setIsSubmitting(false);
          return;
        }
        const res = await fetch('/api/lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            payload,
            turnstileToken: token,
            honeypot,
            elapsedMs: Date.now() - formOpenedAt,
          }),
        });
        if (res.status === 501) {
          // Proxy present but LEAD_ENDPOINT not configured — don't lose the
          // lead; fall back to the direct endpoint.
          await deliverDirect();
        } else if (!res.ok) {
          throw new Error(`Lead proxy failed with status ${res.status}`);
        }
      } else {
        await deliverDirect();
      }
      // Remember this enquiry so an accidental resubmit doesn't double-send.
      submittedSignatureRef.current = signature;
      setCurrentStep(totalSteps);
    } catch (err) {
      console.error('[LeadForm] submission error:', err);
      setSubmitError('Something went wrong sending your request. Please try again, or reach us on WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
    // On success we advance to the thank-you screen; the user returns manually.
  };

  const isStepValid = () => {
    if (isMobile) {
      const key = MOBILE_STEP_KEYS[currentStep];
      switch (key) {
        case 'name':
          return formData.name.trim().length > 0;
        case 'phone':
          return validatePhone(formData.phone, selectedCountryCode).isValid && !phoneError;
        case 'email':
          return !emailError; // optional, but must be valid if provided
        case 'products':
          return formData.productsNeeded.length > 0;
        default:
          return true; // property / build / timeline / location / message are optional
      }
    }
    switch (currentStep) {
      case 0: {
        // Step 1 — need name, a valid phone and at least one product interest.
        const phoneValidation = validatePhone(formData.phone, selectedCountryCode);
        return (
          formData.name.trim().length > 0 &&
          phoneValidation.isValid &&
          !phoneError &&
          !emailError &&
          formData.productsNeeded.length > 0
        );
      }
      case 1:
        // Step 2 — project details are optional; the enquiry can be submitted.
        return true;
      default:
        return false;
    }
  };

  const renderStep = () => {
    if (currentStep >= totalSteps) return renderSuccess();
    if (isMobile) return renderMobileStep();
    switch (currentStep) {
      case 0:
        return (
          <div key="step-0" className="space-y-5">
            <div>
              <h3 className="font-heading text-xl lg:text-3xl font-semibold text-[#1c1c1e] mb-1.5">
                Let's get you a free quote
              </h3>
              <p className="font-body text-sm lg:text-base text-[#3a3a3c]">
                Your details and what you're interested in — a specialist replies within 12 hours.
              </p>
            </div>

            {/* Name + Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
              <div className="space-y-1.5">
                <label className="font-body text-sm font-medium text-[#1c1c1e]">Full name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  autoComplete="name"
                  className="w-full px-4 py-3.5 text-base text-[#1c1c1e] border border-[#e5e7eb] rounded-md focus:ring-1 focus:ring-[#007969] focus:border-[#007969] outline-none transition-all font-body placeholder:text-[#6b7280]"
                  placeholder="Enter your full name"
                  autoFocus
                />
              </div>
              <div className="space-y-1.5">
                <label className="font-body text-sm font-medium text-[#1c1c1e]">Phone number</label>
                <div className="flex gap-2">
                  <select
                    value={selectedCountryCode}
                    onChange={(e) => { setSelectedCountryCode(e.target.value); if (phoneError) setPhoneError(''); }}
                    className="px-2 py-3.5 bg-white border border-[#e5e7eb] rounded-md focus:outline-none focus:ring-1 focus:ring-[#007969] focus:border-[#007969] transition-all font-body text-sm text-[#1c1c1e] cursor-pointer max-w-[92px]"
                    aria-label="Country code"
                  >
                    {countryCodes.map((c) => (
                      <option key={c.code} value={c.code}>{c.flag} {c.code}</option>
                    ))}
                  </select>
                  <input
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel"
                    value={formData.phone}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^\d\s\-\(\)]/g, '');
                      setFormData({ ...formData, phone: value });
                      if (phoneError) setPhoneError('');
                    }}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => {
                      setIsFocused(false);
                      if (formData.phone) setPhoneError(validatePhone(formData.phone, selectedCountryCode).error);
                    }}
                    className={`flex-1 min-w-0 px-4 py-3.5 text-base text-[#1c1c1e] border rounded-md focus:ring-1 focus:ring-[#007969] outline-none transition-all font-body placeholder:text-[#6b7280] ${phoneError ? 'border-[#e40014] focus:border-[#e40014]' : 'border-[#e5e7eb] focus:border-[#007969]'}`}
                    placeholder="Phone number"
                  />
                </div>
              </div>
            </div>
            {phoneError && (
              <div className="flex items-start gap-2 text-[#e40014] text-sm font-body -mt-2">
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{phoneError}</span>
              </div>
            )}

            {/* Email */}
            <div className="space-y-1.5">
              <label className="font-body text-sm font-medium text-[#1c1c1e]">
                Email <span className="text-[#6b7280] font-normal">(optional)</span>
              </label>
              <input
                type="email"
                inputMode="email"
                autoComplete="email"
                value={formData.email}
                onChange={(e) => { setFormData({ ...formData, email: e.target.value }); setEmailError(''); }}
                onFocus={() => setIsFocused(true)}
                onBlur={() => { setIsFocused(false); setEmailError(validateEmail(formData.email).error); }}
                className={`w-full px-4 py-3.5 text-base text-[#1c1c1e] border rounded-md focus:ring-1 focus:ring-[#007969] outline-none transition-all font-body placeholder:text-[#6b7280] ${emailError ? 'border-[#e40014] focus:border-[#e40014]' : 'border-[#e5e7eb] focus:border-[#007969]'}`}
                placeholder="your@email.com"
              />
              {emailError && (
                <div className="flex items-start gap-2 text-[#e40014] text-sm font-body">
                  <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>{emailError}</span>
                </div>
              )}
            </div>

            {/* Product interest */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="font-body text-sm font-medium text-[#1c1c1e]">What are you interested in?</label>
                {formData.productsNeeded.length > 0 && (
                  <span className="font-body text-xs text-[#007969] font-medium">{formData.productsNeeded.length} selected</span>
                )}
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-3">
                {products.map((product) => {
                  const isSelected = formData.productsNeeded.includes(product.value);
                  return (
                    <button
                      key={product.value}
                      type="button"
                      onClick={() => setFormData({
                        ...formData,
                        productsNeeded: isSelected
                          ? formData.productsNeeded.filter((p) => p !== product.value)
                          : [...formData.productsNeeded, product.value],
                      })}
                      className={`relative p-2.5 lg:p-3.5 rounded-[4px] border-2 transition-all text-center group flex flex-col items-center justify-center gap-1.5 active:scale-95 ${isSelected ? 'border-[#007969] bg-[#007969]/5' : 'border-[#e5e7eb] hover:border-[#007969]/40 bg-white'}`}
                    >
                      {isSelected && (
                        <div className="absolute top-1 right-1 w-5 h-5 bg-[#007969] rounded-full flex items-center justify-center">
                          <Check className="w-3 h-3 text-white" strokeWidth={3} />
                        </div>
                      )}
                      <div className="text-[#007969]">{product.icon}</div>
                      <div className={`font-body text-xs lg:text-sm font-medium leading-tight ${isSelected ? 'text-[#007969]' : 'text-[#1c1c1e]'}`}>{product.label}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div key="step-1" className="space-y-5">
            <div>
              <h3 className="font-heading text-xl lg:text-3xl font-semibold text-[#1c1c1e] mb-1.5">
                Tell us about your project
              </h3>
              <p className="font-body text-sm lg:text-base text-[#3a3a3c]">
                Optional — a few details help us prepare a more accurate quote.
              </p>
            </div>

            {/* Property type */}
            <div className="space-y-2">
              <label className="font-body text-sm font-medium text-[#1c1c1e]">Property type</label>
              <div className="grid grid-cols-3 gap-2 lg:gap-3">
                {propertyTypes.map((type) => (
                  <button key={type.value} type="button"
                    onClick={() => setFormData({ ...formData, propertyType: formData.propertyType === type.value ? '' : type.value })}
                    className={`p-3 rounded-[4px] border-2 transition-all text-center group flex flex-col items-center justify-center gap-1.5 active:scale-95 ${formData.propertyType === type.value ? 'border-[#007969] bg-[#007969]/5 text-[#007969]' : 'border-[#e5e7eb] hover:border-[#007969]/40 bg-white text-[#1c1c1e]'}`}>
                    <div className="text-[#007969]">{type.icon}</div>
                    <div className="font-body text-xs lg:text-sm font-medium leading-tight">{type.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Build stage */}
            <div className="space-y-2">
              <label className="font-body text-sm font-medium text-[#1c1c1e]">Build stage</label>
              <div className="grid grid-cols-2 gap-2 lg:gap-3">
                {projectTypes.map((type) => (
                  <button key={type.value} type="button"
                    onClick={() => setFormData({ ...formData, projectType: formData.projectType === type.value ? '' : type.value })}
                    className={`p-3 rounded-[4px] border-2 transition-all text-center group flex flex-col items-center justify-center gap-1.5 active:scale-95 ${formData.projectType === type.value ? 'border-[#007969] bg-[#007969]/5 text-[#007969]' : 'border-[#e5e7eb] hover:border-[#007969]/40 bg-white text-[#1c1c1e]'}`}>
                    <div className="text-[#007969]">{type.icon}</div>
                    <div className="font-body text-xs lg:text-sm font-medium leading-tight">{type.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Site location + timeline */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
              <div className="space-y-1.5">
                <label className="font-body text-sm font-medium text-[#1c1c1e]">Site location</label>
                <input type="text" value={formData.siteLocation}
                  onChange={(e) => setFormData({ ...formData, siteLocation: e.target.value })}
                  onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)}
                  className="w-full px-4 py-3.5 text-base text-[#1c1c1e] border border-[#e5e7eb] rounded-md focus:ring-1 focus:ring-[#007969] focus:border-[#007969] outline-none transition-all font-body placeholder:text-[#6b7280]"
                  placeholder="e.g. Dubai Hills, Dubai" />
              </div>
              <div className="space-y-1.5">
                <label className="font-body text-sm font-medium text-[#1c1c1e]">Ideal timeline</label>
                <select value={formData.timeline}
                  onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                  className={`w-full px-4 py-3.5 text-base border border-[#e5e7eb] rounded-md focus:ring-1 focus:ring-[#007969] focus:border-[#007969] outline-none transition-all font-body cursor-pointer bg-white ${formData.timeline ? 'text-[#1c1c1e]' : 'text-[#6b7280]'}`}>
                  <option value="" disabled>Select a timeline</option>
                  {timelines.map((t) => (<option key={t.value} value={t.value}>{t.label}</option>))}
                </select>
              </div>
            </div>

            {/* Upload files */}
            <div className="space-y-1.5">
              <label className="font-body text-sm font-medium text-[#1c1c1e]">
                Upload plans or photos <span className="text-[#6b7280] font-normal">(optional)</span>
              </label>
              <label className="flex items-center gap-3 w-full px-4 py-3.5 border-2 border-dashed border-[#e5e7eb] rounded-md cursor-pointer hover:border-[#007969]/50 transition-colors">
                <Upload className="w-5 h-5 text-[#007969] flex-shrink-0" />
                <span className="font-body text-sm text-[#6b7280] truncate">
                  {files.length > 0 ? `${files.length} file${files.length !== 1 ? 's' : ''} selected` : 'Browse to attach (PDF, JPG, PNG)'}
                </span>
                <input type="file" multiple accept="image/jpeg,image/png,image/webp,image/gif,application/pdf"
                  onChange={(e) => handleFileSelect(e.target.files)}
                  className="hidden" />
              </label>
              {fileError && (
                <p className="font-body text-xs text-red-600 pt-1" role="alert">{fileError}</p>
              )}
              {files.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {files.map((f, i) => (
                    <span key={i} className="inline-flex items-center gap-1 bg-[#e6f4f1] border border-[#00796933] rounded px-2 py-1 text-xs font-body text-[#007969] max-w-full">
                      <span className="truncate max-w-[140px]">{f.name}</span>
                      <button type="button" onClick={() => setFiles(files.filter((_, idx) => idx !== i))} className="text-[#007969]/70 hover:text-[#007969]" aria-label="Remove file">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Message */}
            <div className="space-y-1.5">
              <label className="font-body text-sm font-medium text-[#1c1c1e]">
                Anything else? <span className="text-[#6b7280] font-normal">(optional)</span>
              </label>
              <textarea value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)}
                rows={3}
                className="w-full px-4 py-3 text-base text-[#1c1c1e] border border-[#e5e7eb] rounded-md focus:ring-1 focus:ring-[#007969] focus:border-[#007969] outline-none transition-all font-body placeholder:text-[#6b7280] resize-none"
                placeholder="Tell us anything that will help us prepare your quote…" />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const renderSuccess = () => {
    return (
          <div
            key="step-success"
            className="text-center py-12 space-y-6"
          >
            <div className="w-20 h-20 lg:w-24 lg:h-24 bg-[#007969] rounded-full flex items-center justify-center mx-auto">
              <Check className="w-10 h-10 lg:w-12 lg:h-12 text-white" strokeWidth={3} />
            </div>

            <div>
              <h3 className="font-heading text-2xl lg:text-4xl font-semibold text-[#1c1c1e] mb-3">
                Thank You, {formData.name}!
              </h3>
              <p className="font-body text-base lg:text-lg text-[#3a3a3c] mb-2">
                We truly appreciate you taking the time to reach out to us.
              </p>
              <p className="font-body text-base lg:text-lg text-[#3a3a3c] mb-6">
                Your quote request has been received and our team will contact you shortly.
              </p>
            </div>

            <div className="bg-[#e6f4f1] border border-[#00796933] rounded-[4px] p-6 max-w-md mx-auto">
              <div className="flex items-center justify-center gap-3 text-[#007969]">
                <Check className="w-6 h-6 flex-shrink-0" strokeWidth={2.5} />
                <p className="font-body text-base lg:text-lg font-medium">
                  We respond within 12 hours
                </p>
              </div>
            </div>

            {/* WhatsApp CTA Card - Minimized Version */}
            <div className="bg-white border border-[#25D366]/30 rounded-[4px] p-4 lg:p-5 max-w-sm mx-auto shadow-[0_16px_40px_#0079691f] hover:shadow-xl transition-shadow">
              {/* Compact Header with Icon and Text - Center Aligned */}
              <div className="flex flex-col items-center text-center gap-3 mb-3">
                <div className="w-10 h-10 bg-[#25D366] rounded-full flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-5 h-5 text-white" fill="white" />
                </div>
                <div>
                  <h4 className="font-heading text-base lg:text-lg font-semibold text-[#1c1c1e] leading-tight">
                    Send Swiftrooms details & location to my phone
                  </h4>
                  <p className="font-body text-xs lg:text-sm text-[#6b7280]">
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
                  `Build Stage: ${projectTypes.find(p => p.value === formData.projectType)?.label || 'Not specified'}\n` +
                  `Site Location: ${formData.siteLocation || 'Not specified'}\n` +
                  `Timeline: ${timelines.find(t => t.value === formData.timeline)?.label || 'Not specified'}\n\n` +
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
                className="btn-whatsapp w-full text-sm lg:text-base shadow-md hover:shadow-lg transition-all duration-300"
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
                  siteLocation: '',
                  timeline: '',
                  message: '',
                  privacyConsent: false,
                  marketingConsent: false,
                });
                setFiles([]);
                setCurrentStep(0);
                setJourneyType('quote');

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
                  // Keep form open and return to the first step
                }
              }}
              className="text-[#007969] font-body text-sm lg:text-base font-medium hover:underline"
            >
              {window.innerWidth < 1024 ? 'Return to Home' : 'Submit another request'}
            </button>
          </div>
        );
  };

  // Typeform-style single-question screen for mobile. `wrap` is a plain JSX
  // helper (not a component) so inputs keep focus across re-renders.
  const inputClass =
    'w-full px-4 py-4 text-base text-[#1c1c1e] border border-[#e5e7eb] rounded-xl focus:ring-2 focus:ring-[#007969]/30 focus:border-[#007969] outline-none transition-all font-body placeholder:text-[#9ca3af]';

  const renderMobileStep = () => {
    const key = MOBILE_STEP_KEYS[currentStep];

    const wrap = (title: string, hint: string, children: ReactNode) => (
      <div key={key} className="space-y-5">
        <div>
          <span className="font-accent text-xs font-semibold uppercase tracking-[.14em] text-[#007969]">
            Question {currentStep + 1}
          </span>
          <h3 className="font-heading text-[1.6rem] font-semibold text-[#1c1c1e] leading-[1.15] mt-1.5">
            {title}
          </h3>
          {hint && <p className="font-body text-[0.95rem] text-[#6b7280] mt-2">{hint}</p>}
        </div>
        {children}
      </div>
    );

    const optionBtn = 'w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left active:scale-[0.99] font-body';

    switch (key) {
      case 'name':
        return wrap("What's your name?", "So we know who we're speaking with.",
          <input
            type="text" autoFocus autoComplete="name" value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={inputClass} placeholder="Your full name"
          />
        );

      case 'phone':
        return wrap('Your best contact number', "We'll arrange your free site visit by call or WhatsApp.",
          <div className="space-y-2">
            <div className="flex gap-2">
              <select
                value={selectedCountryCode}
                onChange={(e) => { setSelectedCountryCode(e.target.value); if (phoneError) setPhoneError(''); }}
                className="px-2 py-4 bg-white border border-[#e5e7eb] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#007969]/30 focus:border-[#007969] font-body text-sm text-[#1c1c1e] max-w-[96px]"
                aria-label="Country code"
              >
                {countryCodes.map((c) => (<option key={c.code} value={c.code}>{c.flag} {c.code}</option>))}
              </select>
              <input
                type="tel" inputMode="numeric" autoComplete="tel" autoFocus value={formData.phone}
                onChange={(e) => { setFormData({ ...formData, phone: e.target.value.replace(/[^\d\s\-\(\)]/g, '') }); if (phoneError) setPhoneError(''); }}
                onBlur={() => { if (formData.phone) setPhoneError(validatePhone(formData.phone, selectedCountryCode).error); }}
                className={`flex-1 min-w-0 px-4 py-4 text-base text-[#1c1c1e] border rounded-xl focus:ring-2 focus:ring-[#007969]/30 outline-none font-body placeholder:text-[#9ca3af] ${phoneError ? 'border-[#e40014]' : 'border-[#e5e7eb] focus:border-[#007969]'}`}
                placeholder="Phone number"
              />
            </div>
            {phoneError && (
              <div className="flex items-start gap-2 text-[#e40014] text-sm font-body">
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" /><span>{phoneError}</span>
              </div>
            )}
          </div>
        );

      case 'email':
        return wrap('Your email address', 'Optional — so we can send your written quote.',
          <div className="space-y-2">
            <input
              type="email" inputMode="email" autoComplete="email" autoFocus value={formData.email}
              onChange={(e) => { setFormData({ ...formData, email: e.target.value }); setEmailError(''); }}
              onBlur={() => setEmailError(validateEmail(formData.email).error)}
              className={`${inputClass} ${emailError ? '!border-[#e40014]' : ''}`}
              placeholder="your@email.com"
            />
            {emailError && (
              <div className="flex items-start gap-2 text-[#e40014] text-sm font-body">
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" /><span>{emailError}</span>
              </div>
            )}
          </div>
        );

      case 'products':
        return wrap('What are you interested in?', 'Select all that apply.',
          <div className="grid grid-cols-2 gap-2.5">
            {products.map((product) => {
              const isSelected = formData.productsNeeded.includes(product.value);
              return (
                <button
                  key={product.value} type="button"
                  onClick={() => setFormData({
                    ...formData,
                    productsNeeded: isSelected
                      ? formData.productsNeeded.filter((p) => p !== product.value)
                      : [...formData.productsNeeded, product.value],
                  })}
                  className={`relative p-4 rounded-xl border-2 transition-all text-center flex flex-col items-center justify-center gap-2 active:scale-95 min-h-[92px] ${isSelected ? 'border-[#007969] bg-[#007969]/5' : 'border-[#e5e7eb] bg-white'}`}
                >
                  {isSelected && (
                    <div className="absolute top-1.5 right-1.5 w-5 h-5 bg-[#007969] rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" strokeWidth={3} />
                    </div>
                  )}
                  <div className="text-[#007969]">{product.icon}</div>
                  <div className={`font-body text-[13px] font-medium leading-tight ${isSelected ? 'text-[#007969]' : 'text-[#1c1c1e]'}`}>{product.label}</div>
                </button>
              );
            })}
          </div>
        );

      case 'property':
        return wrap('What type of property?', 'Optional — helps us tailor your quote.',
          <div className="space-y-2.5">
            {propertyTypes.map((type) => {
              const isSel = formData.propertyType === type.value;
              return (
                <button key={type.value} type="button"
                  onClick={() => setFormData({ ...formData, propertyType: isSel ? '' : type.value })}
                  className={`${optionBtn} ${isSel ? 'border-[#007969] bg-[#007969]/5 text-[#007969]' : 'border-[#e5e7eb] bg-white text-[#1c1c1e]'}`}>
                  <span className="text-[#007969]">{type.icon}</span>
                  <span className="font-medium text-[15px]">{type.label}</span>
                  {isSel && <Check className="w-5 h-5 ml-auto text-[#007969]" strokeWidth={3} />}
                </button>
              );
            })}
          </div>
        );

      case 'build':
        return wrap('New build or renovation?', 'Optional.',
          <div className="space-y-2.5">
            {projectTypes.map((type) => {
              const isSel = formData.projectType === type.value;
              return (
                <button key={type.value} type="button"
                  onClick={() => setFormData({ ...formData, projectType: isSel ? '' : type.value })}
                  className={`${optionBtn} ${isSel ? 'border-[#007969] bg-[#007969]/5 text-[#007969]' : 'border-[#e5e7eb] bg-white text-[#1c1c1e]'}`}>
                  <span className="text-[#007969]">{type.icon}</span>
                  <span className="font-medium text-[15px]">{type.label}</span>
                  {isSel && <Check className="w-5 h-5 ml-auto text-[#007969]" strokeWidth={3} />}
                </button>
              );
            })}
          </div>
        );

      case 'timeline':
        return wrap('When would you like it done?', 'Optional.',
          <div className="space-y-2.5">
            {timelines.map((t) => {
              const isSel = formData.timeline === t.value;
              return (
                <button key={t.value} type="button"
                  onClick={() => setFormData({ ...formData, timeline: isSel ? '' : t.value })}
                  className={`${optionBtn} justify-between ${isSel ? 'border-[#007969] bg-[#007969]/5 text-[#007969]' : 'border-[#e5e7eb] bg-white text-[#1c1c1e]'}`}>
                  <span className="font-medium text-[15px]">{t.label}</span>
                  {isSel && <Check className="w-5 h-5 text-[#007969]" strokeWidth={3} />}
                </button>
              );
            })}
          </div>
        );

      case 'location':
        return wrap("Where's the project located?", 'Optional — e.g. your community or area.',
          <input
            type="text" autoFocus value={formData.siteLocation}
            onChange={(e) => setFormData({ ...formData, siteLocation: e.target.value })}
            className={inputClass} placeholder="e.g. Dubai Hills, Dubai"
          />
        );

      case 'message':
        return wrap('Anything else we should know?', 'Optional — add details, or attach plans and photos.',
          <div className="space-y-3">
            <textarea
              value={formData.message} rows={4}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className={`${inputClass} resize-none`}
              placeholder="Tell us anything that helps us prepare your quote…"
            />
            <label className="flex items-center gap-3 w-full px-4 py-3.5 border-2 border-dashed border-[#e5e7eb] rounded-xl cursor-pointer active:border-[#007969]/50">
              <Upload className="w-5 h-5 text-[#007969] flex-shrink-0" />
              <span className="font-body text-sm text-[#6b7280] truncate">
                {files.length > 0 ? `${files.length} file${files.length !== 1 ? 's' : ''} selected` : 'Attach plans or photos (PDF, JPG, PNG)'}
              </span>
              <input type="file" multiple accept="image/jpeg,image/png,image/webp,image/gif,application/pdf"
                onChange={(e) => handleFileSelect(e.target.files)} className="hidden" />
            </label>
            {fileError && (
              <p className="font-body text-xs text-red-600" role="alert">{fileError}</p>
            )}
            {files.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {files.map((f, i) => (
                  <span key={i} className="inline-flex items-center gap-1 bg-[#e6f4f1] border border-[#00796933] rounded px-2 py-1 text-xs font-body text-[#007969] max-w-full">
                    <span className="truncate max-w-[140px]">{f.name}</span>
                    <button type="button" onClick={() => setFiles(files.filter((_, idx) => idx !== i))} className="text-[#007969]/70" aria-label="Remove file">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
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
            className={`group relative inline-flex items-center gap-3 px-8 py-4 lg:px-12 lg:py-5 rounded-[4px] font-accent uppercase tracking-[.12em] text-lg lg:text-2xl font-semibold shadow-2xl transition-all duration-300 overflow-hidden active:scale-95 ${ctaVariant === 'white' ? 'bg-white text-[#007969] hover:bg-[#007969] hover:text-white' : 'bg-[#007969] text-white hover:bg-white hover:text-[#007969]'}`}
          >
            {/* Button content */}
            <span className="relative z-10">Get Free Quote</span>
            <ArrowRight className="relative z-10 w-6 h-6 lg:w-7 lg:h-7 group-hover:translate-x-1 transition-transform duration-300" />
          </button>

          {/* Trust indicators below CTA — adapt to background: white text on the
              teal hero (ctaVariant='white'), dark text on light sections. */}
          <div className={`flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-sm font-body ${ctaVariant === 'white' ? 'text-white' : 'text-[#3a3a3c]'}`}>
            <div className="flex items-center gap-2">
              <Check className={`w-5 h-5 ${ctaVariant === 'white' ? 'text-white' : 'text-[#007969]'}`} />
              <span>Free Consultation</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className={`w-5 h-5 ${ctaVariant === 'white' ? 'text-white' : 'text-[#007969]'}`} />
              <span>24-Hour Response</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className={`w-5 h-5 ${ctaVariant === 'white' ? 'text-white' : 'text-[#007969]'}`} />
              <span>No Obligation</span>
            </div>
          </div>
        </div>
      )}

      {/* Show Form when opened - SIMPLIFIED FOR ANDROID */}
      {isFormOpen && (
        <div
          id="form"
          className="bg-white rounded-xl border border-[#e5e7eb] shadow-[0_16px_40px_#0079691f] p-5 lg:p-8 w-full relative"
        >
          {/* Honeypot — hidden from real users & assistive tech; bots fill it. */}
          <input
            type="text"
            name="company_website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', opacity: 0, pointerEvents: 'none' }}
          />

          {/* Progress Bar */}
          {currentStep >= 0 && currentStep < totalSteps && (
            <div className="mb-6 lg:mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="font-accent text-[13px] lg:text-sm text-[#1c1c1e] font-semibold uppercase tracking-[.1em]">
                  Step {currentStep + 1} of {totalSteps}
                </span>
                <span className="font-body text-xs lg:text-sm text-[#007969] font-semibold">
                  {Math.round(((currentStep + 1) / totalSteps) * 100)}%
                </span>
              </div>
              <div className="w-full h-2 bg-[#e5e7eb] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#007969] to-[#00a88f] rounded-full transition-[width] duration-500 ease-out"
                  style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* Form Steps - NO ANIMATIONS */}
          <div className="relative min-h-[300px]">
            {renderStep()}
          </div>

          {/* Reassurance at the point of submission */}
          {currentStep === totalSteps - 1 && (
            <p className="mt-5 flex items-center justify-center gap-1.5 text-xs lg:text-sm text-center font-body text-[#6b7280]">
              <svg className="w-3.5 h-3.5 flex-shrink-0 text-[#007969]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Your details are safe with us — no spam. A specialist replies within 12 hours.
            </p>
          )}

          {/* Navigation Buttons — compact Back + full-width primary (wizard feel) */}
          {currentStep >= 0 && currentStep < totalSteps && (
            <div className="flex gap-3 mt-6 lg:mt-8">
              {currentStep >= 0 && (
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={isSubmitting}
                  aria-label="Back"
                  className="btn-outline flex-shrink-0 !px-4 lg:!px-8 text-sm lg:text-base disabled:opacity-50"
                >
                  <ChevronLeft className="w-4 h-4 lg:w-5 lg:h-5" />
                  <span className="hidden sm:inline">Back</span>
                </button>
              )}

              <button
                type="button"
                onClick={currentStep === totalSteps - 1 ? handleSubmit : handleNext}
                disabled={!isStepValid() || isSubmitting}
                className={`flex-1 !py-4 lg:!py-3.5 text-sm lg:text-base transition-all ${
                  isStepValid() && !isSubmitting
                    ? 'btn-brand'
                    : 'inline-flex items-center justify-center gap-2 px-8 rounded-[2px] font-accent uppercase tracking-[.12em] font-semibold bg-[#e5e7eb] text-[#6b7280] cursor-not-allowed'
                }`}
              >
                {isSubmitting ? 'Sending…' : currentStep === totalSteps - 1 ? 'Submit Enquiry' : 'Continue'}
                {!isSubmitting && <ChevronRight className="w-4 h-4 lg:w-5 lg:h-5" />}
              </button>
            </div>
          )}

          {/* Submission error (retryable) */}
          {submitError && currentStep === totalSteps - 1 && (
            <p className="mt-3 text-sm font-body text-[#e40014] text-center">{submitError}</p>
          )}
        </div>
      )}
    </>
  );
}