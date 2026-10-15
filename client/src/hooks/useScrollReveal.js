import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Custom hook to activate smooth, subtle scroll reveal animations
 * on elements with the `.reveal` class using the Intersection Observer API.
 * Animates each element only once without layout shifts or delay.
 */
export default function useScrollReveal() {
  const { pathname } = useLocation();

  useEffect(() => {
    // If the browser does not support IntersectionObserver or reduced motion is preferred, reveal immediately
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-revealed'));
      return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-revealed'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            obs.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.1
      }
    );

    // Give DOM a microtask to settle on route change before attaching observers
    const timer = setTimeout(() => {
      const elements = document.querySelectorAll('.reveal:not(.is-revealed)');
      elements.forEach((el) => observer.observe(el));
    }, 40);

    // Safety fallback: ensure all elements become visible if observer does not trigger
    const safetyTimer = setTimeout(() => {
      document.querySelectorAll('.reveal:not(.is-revealed)').forEach((el) => {
        el.classList.add('is-revealed');
      });
    }, 3500);

    return () => {
      clearTimeout(timer);
      clearTimeout(safetyTimer);
      observer.disconnect();
    };
  }, [pathname]);
}
