// Performance utilities for mobile optimization

/**
 * Throttle function - limits execution rate
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  let lastResult: ReturnType<T>;

  return function (this: any, ...args: Parameters<T>): void {
    if (!inThrottle) {
      inThrottle = true;
      lastResult = func.apply(this, args);
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Debounce function - delays execution until after calls have stopped
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function (this: any, ...args: Parameters<T>): void {
    const later = () => {
      timeout = null;
      func.apply(this, args);
    };

    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Request Animation Frame throttle - limits to 60fps
 */
export function rafThrottle<T extends (...args: any[]) => any>(
  func: T
): (...args: Parameters<T>) => void {
  let rafId: number | null = null;

  return function (this: any, ...args: Parameters<T>): void {
    if (rafId === null) {
      rafId = requestAnimationFrame(() => {
        func.apply(this, args);
        rafId = null;
      });
    }
  };
}

/**
 * Detect device performance tier
 */
export function getDevicePerformanceTier(): 'high' | 'medium' | 'low' {
  // Check for low-end indicators
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  const isOldDevice = /Android [1-6]\.|iPhone OS [1-9]_/i.test(navigator.userAgent);
  
  // Check hardware concurrency (CPU cores)
  const cores = navigator.hardwareConcurrency || 1;
  
  // Check memory (if available)
  const memory = (navigator as any).deviceMemory || 4;
  
  // Low tier: Old devices, <2 cores, or <2GB RAM
  if (isOldDevice || cores < 2 || memory < 2) {
    return 'low';
  }
  
  // Medium tier: Mobile with 2-4 cores or 2-4GB RAM
  if (isMobile && (cores <= 4 || memory <= 4)) {
    return 'medium';
  }
  
  // High tier: Desktop or high-end mobile
  return 'high';
}

/**
 * Check if device prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Get optimal animation settings based on device
 */
export function getAnimationSettings() {
  const tier = getDevicePerformanceTier();
  const reducedMotion = prefersReducedMotion();

  if (reducedMotion) {
    return {
      enableAnimations: false,
      enableParallax: false,
      enableParticles: false,
      enableTransitions: false,
      particleCount: 0,
    };
  }

  switch (tier) {
    case 'low':
      return {
        enableAnimations: false,
        enableParallax: false,
        enableParticles: false,
        enableTransitions: false,
        particleCount: 0,
      };
    case 'medium':
      return {
        enableAnimations: true,
        enableParallax: false,
        enableParticles: false,
        enableTransitions: true,
        particleCount: 2,
      };
    case 'high':
    default:
      return {
        enableAnimations: true,
        enableParallax: true,
        enableParticles: true,
        enableTransitions: true,
        particleCount: 8,
      };
  }
}

/**
 * Check if user is on slow connection
 */
export function isSlowConnection(): boolean {
  const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
  
  if (!connection) return false;
  
  // Check for slow connection types
  const slowTypes = ['slow-2g', '2g', '3g'];
  if (slowTypes.includes(connection.effectiveType)) {
    return true;
  }
  
  // Check for save-data preference
  if (connection.saveData) {
    return true;
  }
  
  return false;
}

/**
 * Intersection Observer with performance optimizations
 */
export function createOptimizedObserver(
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit
): IntersectionObserver {
  const defaultOptions: IntersectionObserverInit = {
    rootMargin: '50px',
    threshold: 0.1,
    ...options,
  };

  return new IntersectionObserver(callback, defaultOptions);
}
