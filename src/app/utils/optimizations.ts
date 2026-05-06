/**
 * Performance optimization utilities
 */

/**
 * Debounce function to limit how often a function can fire
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: number | undefined;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = window.setTimeout(later, wait);
  };
}

/**
 * Throttle function to ensure a function is called at most once in a specified time period
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;

  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Request idle callback with fallback for unsupported browsers
 */
export function requestIdleCallback(callback: () => void, options?: { timeout?: number }) {
  if ('requestIdleCallback' in window) {
    return window.requestIdleCallback(callback, options);
  } else {
    // Fallback for browsers that don't support requestIdleCallback
    return window.setTimeout(callback, 1);
  }
}

/**
 * Cancel idle callback with fallback
 */
export function cancelIdleCallback(id: number) {
  if ('cancelIdleCallback' in window) {
    return window.cancelIdleCallback(id);
  } else {
    return window.clearTimeout(id);
  }
}

/**
 * Preload images for better performance
 */
export function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
}

/**
 * Preload multiple images
 */
export async function preloadImages(srcs: string[]): Promise<void> {
  await Promise.all(srcs.map(src => preloadImage(src)));
}

/**
 * Check if reduced motion is preferred by user
 */
export function prefersReducedMotion(): boolean {
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  return mediaQuery.matches;
}

/**
 * Get connection speed estimate
 */
export function getConnectionSpeed(): 'slow' | 'medium' | 'fast' {
  // @ts-ignore - navigator.connection is not in TypeScript types yet
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

  if (!connection) return 'fast';

  const effectiveType = connection.effectiveType;

  if (effectiveType === 'slow-2g' || effectiveType === '2g') {
    return 'slow';
  } else if (effectiveType === '3g') {
    return 'medium';
  } else {
    return 'fast';
  }
}

/**
 * Check if device is low-end based on hardware concurrency
 */
export function isLowEndDevice(): boolean {
  // Check hardware concurrency (number of CPU cores)
  const cores = navigator.hardwareConcurrency || 4;

  // Check device memory if available
  // @ts-ignore - navigator.deviceMemory is not in TypeScript types yet
  const memory = navigator.deviceMemory || 4;

  // Consider device low-end if it has 2 or fewer cores and 2GB or less RAM
  return cores <= 2 || memory <= 2;
}

/**
 * Optimize scroll event listener
 */
export function addOptimizedScrollListener(
  element: HTMLElement | Window,
  handler: () => void,
  options?: { passive?: boolean; throttleMs?: number }
) {
  const throttledHandler = throttle(handler, options?.throttleMs || 16); // ~60fps

  element.addEventListener('scroll', throttledHandler, {
    passive: options?.passive !== false,
  });

  return () => {
    element.removeEventListener('scroll', throttledHandler);
  };
}

/**
 * Memory-efficient array chunk for large datasets
 */
export function* chunkArray<T>(array: T[], chunkSize: number): Generator<T[]> {
  for (let i = 0; i < array.length; i += chunkSize) {
    yield array.slice(i, i + chunkSize);
  }
}
