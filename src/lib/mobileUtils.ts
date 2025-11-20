/**
 * Mobile detection and responsive utilities
 */

// Check if device is mobile based on user agent
export const isMobileDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const userAgent = window.navigator.userAgent;
  const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  
  return mobileRegex.test(userAgent);
};

// Check if device is tablet
export const isTabletDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const userAgent = window.navigator.userAgent;
  const tabletRegex = /iPad|Android(?!.*Mobile)/i;
  
  return tabletRegex.test(userAgent);
};

// Check if device supports touch
export const isTouchDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

// Get viewport dimensions
export const getViewportDimensions = () => {
  if (typeof window === 'undefined') return { width: 0, height: 0 };
  
  return {
    width: window.innerWidth,
    height: window.innerHeight
  };
};

// Check if viewport is mobile size
export const isMobileViewport = (): boolean => {
  const { width } = getViewportDimensions();
  return width < 768;
};

// Check if viewport is tablet size
export const isTabletViewport = (): boolean => {
  const { width } = getViewportDimensions();
  return width >= 768 && width < 1024;
};

// Check if viewport is desktop size
export const isDesktopViewport = (): boolean => {
  const { width } = getViewportDimensions();
  return width >= 1024;
};

// Get current breakpoint
export const getCurrentBreakpoint = (): 'mobile' | 'tablet' | 'desktop' => {
  const { width } = getViewportDimensions();
  
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
};

// Check if device is iOS
export const isIOS = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  return /iPad|iPhone|iPod/.test(window.navigator.userAgent);
};

// Check if device is Android
export const isAndroid = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  return /Android/.test(window.navigator.userAgent);
};

// Prevent body scroll (useful for modals on mobile)
export const preventBodyScroll = () => {
  if (typeof document === 'undefined') return;
  
  document.body.style.overflow = 'hidden';
  
  // Prevent scroll on iOS
  if (isIOS()) {
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
  }
};

// Restore body scroll
export const restoreBodyScroll = () => {
  if (typeof document === 'undefined') return;
  
  document.body.style.overflow = '';
  
  if (isIOS()) {
    document.body.style.position = '';
    document.body.style.width = '';
  }
};

// Get safe area insets for iOS devices
export const getSafeAreaInsets = () => {
  if (typeof window === 'undefined' || !isIOS()) {
    return { top: 0, right: 0, bottom: 0, left: 0 };
  }
  
  const computedStyle = getComputedStyle(document.documentElement);
  
  return {
    top: parseInt(computedStyle.getPropertyValue('--sat') || '0', 10),
    right: parseInt(computedStyle.getPropertyValue('--sar') || '0', 10),
    bottom: parseInt(computedStyle.getPropertyValue('--sab') || '0', 10),
    left: parseInt(computedStyle.getPropertyValue('--sal') || '0', 10),
  };
};

// Check if device prefers reduced motion
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Check if device is in landscape mode
export const isLandscape = (): boolean => {
  const { width, height } = getViewportDimensions();
  return width > height;
};

// Check if device is in portrait mode
export const isPortrait = (): boolean => {
  return !isLandscape();
};

// Debounce function for resize events
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(null, args), wait);
  };
};

// Hook for responsive breakpoints
export const useResponsive = () => {
  if (typeof window === 'undefined') {
    return {
      isMobile: false,
      isTablet: false,
      isDesktop: true,
      breakpoint: 'desktop' as const
    };
  }

  const [dimensions, setDimensions] = React.useState(getViewportDimensions);
  
  React.useEffect(() => {
    const handleResize = debounce(() => {
      setDimensions(getViewportDimensions());
    }, 150);
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const isMobile = dimensions.width < 768;
  const isTablet = dimensions.width >= 768 && dimensions.width < 1024;
  const isDesktop = dimensions.width >= 1024;
  
  return {
    isMobile,
    isTablet,
    isDesktop,
    breakpoint: getCurrentBreakpoint(),
    dimensions
  };
};

// Mobile-specific CSS classes
export const mobileClasses = {
  touchTarget: 'min-h-[44px] min-w-[44px]', // Minimum touch target size
  mobileButton: 'py-3 px-4 text-base rounded-lg', // Mobile-friendly button
  mobileInput: 'py-3 px-4 text-base rounded-lg', // Mobile-friendly input
  mobileCard: 'p-4 rounded-xl shadow-sm', // Mobile-friendly card
  mobileSpacing: 'p-4 space-y-4', // Mobile spacing
  mobileText: 'text-base leading-relaxed', // Mobile-friendly text
  mobileTitle: 'text-xl font-semibold', // Mobile title
  mobileSubtitle: 'text-base text-gray-600', // Mobile subtitle
  hiddenMobile: 'hidden md:block', // Hide on mobile
  showMobile: 'block md:hidden', // Show only on mobile
} as const;

import React from 'react';