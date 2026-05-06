import { useEffect } from 'react';

/**
 * Performance monitoring component
 * Monitors page performance and logs warnings for performance issues
 */
export function PerformanceMonitor() {
  useEffect(() => {
    // Only run in development
    if (import.meta.env.PROD) return;

    let longTaskObserver: PerformanceObserver | null = null;
    let layoutShiftObserver: PerformanceObserver | null = null;

    // Monitor long tasks and layout shifts
    if ('PerformanceObserver' in window) {
      try {
        longTaskObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            // Only warn for tasks > 600ms (initial hydration on complex apps with animations can be 400-550ms)
            if (entry.duration > 600) {
              console.warn(`⚠️ Long task: ${entry.duration.toFixed(0)}ms - Consider code splitting`);
            }
          }
        });

        longTaskObserver.observe({ entryTypes: ['longtask'] });

        // Monitor layout shifts - only non-user-initiated shifts
        layoutShiftObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            const layoutShift = entry as any;
            // Only warn for significant shifts that weren't caused by user input
            // Threshold at 0.25 - below this is considered acceptable for most apps
            if (layoutShift.value > 0.25 && !layoutShift.hadRecentInput) {
              console.warn(`⚠️ Layout shift: ${layoutShift.value.toFixed(4)} - Stabilize dimensions`);
            }
          }
        });

        layoutShiftObserver.observe({ entryTypes: ['layout-shift'] });
      } catch (e) {
        // Performance Observer not supported or entry type not available
        console.log('Performance monitoring not available');
      }
    }

    // Monitor memory usage (Chrome only)
    const checkMemory = () => {
      // @ts-ignore - performance.memory is Chrome-only
      if (performance.memory) {
        // @ts-ignore
        const usedMemory = performance.memory.usedJSHeapSize / 1048576; // Convert to MB
        // @ts-ignore
        const totalMemory = performance.memory.jsHeapSizeLimit / 1048576;
        const percentage = (usedMemory / totalMemory) * 100;

        if (percentage > 90) {
          console.warn(`High memory usage: ${usedMemory.toFixed(2)}MB / ${totalMemory.toFixed(2)}MB (${percentage.toFixed(1)}%)`);
        }
      }
    };

    const memoryInterval = setInterval(checkMemory, 10000); // Check every 10 seconds

    return () => {
      if (longTaskObserver) longTaskObserver.disconnect();
      if (layoutShiftObserver) layoutShiftObserver.disconnect();
      clearInterval(memoryInterval);
    };
  }, []);

  return null; // This component doesn't render anything
}
