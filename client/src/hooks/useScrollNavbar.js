import { useState, useEffect, useRef } from 'react';

/**
 * Intelligent Scroll-Responsive Navbar Hook
 * - Tracks scroll direction with previous scroll position
 * - Hides header on downward scroll past threshold (scrollY > 80px, delta > 8px)
 * - Immediately reveals header on upward scroll (delta < -8px)
 * - Always visible at top of page (scrollY <= 80px)
 * - Safe against flickering via delta threshold
 * - Uses passive listener and proper cleanup
 * - Can be forced visible (e.g. when mobile menu drawer is open)
 */
export default function useScrollNavbar(forceVisible = false) {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const prevScrollY = useRef(0);
  const isTicking = useRef(false);

  useEffect(() => {
    // Initial sync
    prevScrollY.current = typeof window !== 'undefined' ? window.scrollY : 0;
    setIsScrolled(prevScrollY.current > 20);

    const handleScroll = () => {
      if (isTicking.current) return;

      isTicking.current = true;
      window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const delta = currentScrollY - prevScrollY.current;

        // Scrolled styling trigger (box shadow / background blur)
        setIsScrolled(currentScrollY > 20);

        // If forceVisible is true (e.g. mobile drawer open), keep visible
        if (forceVisible) {
          setIsVisible(true);
          prevScrollY.current = currentScrollY;
          isTicking.current = false;
          return;
        }

        // Always show near the very top of page
        if (currentScrollY <= 80) {
          setIsVisible(true);
        } else if (Math.abs(delta) > 8) {
          // Significant scroll movement
          if (delta > 0) {
            // Scrolling down -> hide navbar
            setIsVisible(false);
          } else {
            // Scrolling up -> show navbar
            setIsVisible(true);
          }
        }

        prevScrollY.current = currentScrollY <= 0 ? 0 : currentScrollY;
        isTicking.current = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [forceVisible]);

  return { isVisible: forceVisible ? true : isVisible, isScrolled };
}
