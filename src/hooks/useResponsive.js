import { useState, useEffect } from 'react';

// Breakpoints matching Tailwind CSS defaults
const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

export const useResponsive = () => {
  const [screenSize, setScreenSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  const [breakpoint, setBreakpoint] = useState('xs');

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setScreenSize({ width, height });

      // Determine current breakpoint
      if (width >= breakpoints['2xl']) {
        setBreakpoint('2xl');
      } else if (width >= breakpoints.xl) {
        setBreakpoint('xl');
      } else if (width >= breakpoints.lg) {
        setBreakpoint('lg');
      } else if (width >= breakpoints.md) {
        setBreakpoint('md');
      } else if (width >= breakpoints.sm) {
        setBreakpoint('sm');
      } else {
        setBreakpoint('xs');
      }
    };

    // Set initial values
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Helper functions
  const isMobile = breakpoint === 'xs' || breakpoint === 'sm';
  const isTablet = breakpoint === 'md';
  const isDesktop = breakpoint === 'lg' || breakpoint === 'xl' || breakpoint === '2xl';
  const isSmallScreen = breakpoint === 'xs';
  const isLargeScreen = breakpoint === 'xl' || breakpoint === '2xl';

  // Responsive value selector
  const getResponsiveValue = (values) => {
    if (typeof values === 'object' && values !== null) {
      return values[breakpoint] || values.default || values.xs;
    }
    return values;
  };

  return {
    screenSize,
    breakpoint,
    isMobile,
    isTablet,
    isDesktop,
    isSmallScreen,
    isLargeScreen,
    getResponsiveValue,
    // Specific breakpoint checks
    isXs: breakpoint === 'xs',
    isSm: breakpoint === 'sm',
    isMd: breakpoint === 'md',
    isLg: breakpoint === 'lg',
    isXl: breakpoint === 'xl',
    is2Xl: breakpoint === '2xl',
    // Min-width checks (useful for progressive enhancement)
    isSmUp: ['sm', 'md', 'lg', 'xl', '2xl'].includes(breakpoint),
    isMdUp: ['md', 'lg', 'xl', '2xl'].includes(breakpoint),
    isLgUp: ['lg', 'xl', '2xl'].includes(breakpoint),
    isXlUp: ['xl', '2xl'].includes(breakpoint),
  };
};

// Hook for detecting device orientation
export const useOrientation = () => {
  const [orientation, setOrientation] = useState(
    typeof window !== 'undefined' && window.innerHeight > window.innerWidth 
      ? 'portrait' 
      : 'landscape'
  );

  useEffect(() => {
    const handleOrientationChange = () => {
      setOrientation(window.innerHeight > window.innerWidth ? 'portrait' : 'landscape');
    };

    window.addEventListener('resize', handleOrientationChange);
    window.addEventListener('orientationchange', handleOrientationChange);

    return () => {
      window.removeEventListener('resize', handleOrientationChange);
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, []);

  return {
    orientation,
    isPortrait: orientation === 'portrait',
    isLandscape: orientation === 'landscape',
  };
};

// Hook for detecting if device supports touch
export const useTouch = () => {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const checkTouch = () => {
      setIsTouch(
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        navigator.msMaxTouchPoints > 0
      );
    };

    checkTouch();
  }, []);

  return isTouch;
};

// Combined responsive hook with all features
export const useResponsiveDetection = () => {
  const responsive = useResponsive();
  const orientation = useOrientation();
  const isTouch = useTouch();

  return {
    ...responsive,
    ...orientation,
    isTouch,
    // Device type detection
    deviceType: responsive.isMobile ? 'mobile' : responsive.isTablet ? 'tablet' : 'desktop',
  };
};

export default useResponsive;