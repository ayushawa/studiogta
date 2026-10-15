import React, { useState, useEffect } from 'react';

/**
 * Studio GTA Premium Branded Loading Experience
 * - Authentic Studio GTA Logo & Curated Property Photograph
 * - Editorial Headline: "Every Property Deserves to Stand Out."
 * - Supporting Statement: "Professional real estate photography, thoughtfully captured and beautifully presented."
 * - Subtle gold loading indicator
 * - Appears strictly on initial application startup; never replays on route changes
 * - Safety timeout ensures visitors are never trapped
 * - Respects prefers-reduced-motion
 */
export default function LoadingScreen({ onReady }) {
  const [visible, setVisible] = useState(() => {
    // Only show on initial session launch
    if (typeof window !== 'undefined') {
      const alreadyLoaded = sessionStorage.getItem('studiogta_initial_loaded');
      return !alreadyLoaded;
    }
    return false;
  });

  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    if (!visible) {
      if (onReady) onReady();
      return;
    }

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const minDisplayDuration = prefersReducedMotion ? 250 : 850;
    const maxSafetyTimeout = prefersReducedMotion ? 400 : 1600;

    let fadeTimer;

    const completeLoading = () => {
      setFadingOut(true);
      fadeTimer = setTimeout(() => {
        setVisible(false);
        sessionStorage.setItem('studiogta_initial_loaded', 'true');
        if (onReady) onReady();
      }, 400);
    };

    // Trigger completion after minimum pleasant presentation, safety capped
    const displayTimer = setTimeout(completeLoading, minDisplayDuration);
    const safetyTimer = setTimeout(completeLoading, maxSafetyTimeout);

    return () => {
      clearTimeout(displayTimer);
      clearTimeout(safetyTimer);
      clearTimeout(fadeTimer);
    };
  }, [visible, onReady]);

  if (!visible) return null;

  return (
    <div
      className={`branded-loading-overlay ${fadingOut ? 'fade-out' : ''}`}
      role="status"
      aria-live="polite"
      aria-label="Studio GTA is loading"
    >
      <div className="branded-loading-content">
        {/* Studio GTA Authentic Logo */}
        <div className="branded-loading-logo-wrap">
          <img
            src="/images/logo.png"
            alt="Studio GTA Real Estate Media"
            className="branded-loading-logo"
            width="170"
            height="58"
          />
        </div>

        {/* Curated Authentic Property Photograph */}
        <div className="branded-loading-photo-card">
          <img
            src="/images/portfolio-condo.jpg"
            alt="Studio GTA Luxury Interior Showcase"
            className="branded-loading-photo"
            width="520"
            height="330"
          />
          <div className="branded-loading-photo-scrim" />
        </div>

        {/* Editorial Brand Messaging */}
        <div className="branded-loading-copy">
          <h2 className="branded-loading-headline">
            Every Property Deserves to Stand Out.
          </h2>
          <p className="branded-loading-subtext">
            Professional real estate photography, thoughtfully captured and beautifully presented.
          </p>
        </div>

        {/* Subtle Architectural Loading Indicator */}
        <div className="branded-loading-indicator" aria-hidden="true">
          <div className="branded-loading-progress-track">
            <div className="branded-loading-progress-bar" />
          </div>
        </div>
      </div>
    </div>
  );
}
