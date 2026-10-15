import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { ArrowRight, X, MapPin, Tag, Eye, CheckCircle2 } from 'lucide-react';
import { PORTFOLIO_GALLERY } from '../data/siteData';
import useScrollReveal from '../hooks/useScrollReveal';

/**
 * Accessible, Responsive Lightbox Modal for Portfolio Projects
 * Rendered via createPortal directly into document.body to escape
 * any transformed containing blocks or scroll boundaries.
 */
function PortfolioModal({ item, onClose, onOpenBooking }) {
  const closeBtnRef = useRef(null);
  const previousFocusRef = useRef(null);

  // Manage body scroll lock and focus management safely
  useEffect(() => {
    previousFocusRef.current = document.activeElement;

    // Preserve original body inline styles
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;

    // Calculate scrollbar width to prevent desktop layout shifts
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    document.body.style.overflow = 'hidden';

    // Keyboard listener for Escape dismissal
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // Focus close button with preventScroll to ensure the viewport never jumps
    const focusTimer = setTimeout(() => {
      if (closeBtnRef.current) {
        closeBtnRef.current.focus({ preventScroll: true });
      }
    }, 40);

    return () => {
      clearTimeout(focusTimer);
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
      window.removeEventListener('keydown', handleKeyDown);

      // Restore focus to previously active element without scrolling
      if (previousFocusRef.current && typeof previousFocusRef.current.focus === 'function') {
        previousFocusRef.current.focus({ preventScroll: true });
      }
    };
  }, [onClose]);

  const handleBackdropClick = (e) => {
    // Only close if user clicked directly on the backdrop element itself
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleBookingAction = (e) => {
    onClose();
    if (onOpenBooking) {
      e.preventDefault();
      onOpenBooking('hdr-photography');
    }
  };

  return (
    <div
      className="portfolio-modal-backdrop"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="portfolio-modal-title"
      aria-describedby="portfolio-modal-desc"
    >
      <div
        className="portfolio-modal-dialog"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Floating Close Button */}
        <button
          ref={closeBtnRef}
          type="button"
          className="portfolio-modal-close"
          onClick={onClose}
          aria-label="Close project details"
        >
          <X size={20} aria-hidden="true" />
        </button>

        {/* Two-Column Desktop / Single-Column Mobile Case Study Layout */}
        <div className="portfolio-modal-layout">
          {/* Column 1: High-Definition Photography */}
          <div className="portfolio-modal-image-col">
            <div className="portfolio-modal-image-container">
              <img
                src={item.image}
                alt={item.title}
                className="portfolio-modal-img"
              />
            </div>
          </div>

          {/* Column 2: Project Details & Case Study Information */}
          <div className="portfolio-modal-details-col">
            <div className="portfolio-modal-details-scroll">
              {/* Category & Location Badges */}
              <div className="portfolio-modal-meta-row">
                <span className="portfolio-modal-category-badge">
                  <Tag size={12} aria-hidden="true" />
                  <span>{item.category}</span>
                </span>
                {item.location && (
                  <span className="portfolio-modal-location-badge">
                    <MapPin size={13} className="icon-gold" aria-hidden="true" />
                    <span>{item.location}</span>
                  </span>
                )}
              </div>

              {/* Project Title */}
              <h2 id="portfolio-modal-title" className="portfolio-modal-title">
                {item.title}
              </h2>

              {/* Property Overview */}
              <div className="portfolio-modal-body-section">
                <h3 className="portfolio-modal-section-label">Property Overview</h3>
                <p id="portfolio-modal-desc" className="portfolio-modal-desc">
                  {item.description}
                </p>
              </div>

              {/* Studio GTA Quality Guarantee Highlights */}
              <div className="portfolio-modal-highlights">
                <div className="portfolio-modal-highlight-item">
                  <CheckCircle2 size={15} className="icon-gold" aria-hidden="true" />
                  <span>Next-Day 24-48h MLS Media Delivery</span>
                </div>
                <div className="portfolio-modal-highlight-item">
                  <CheckCircle2 size={15} className="icon-gold" aria-hidden="true" />
                  <span>High-Resolution Print & TRREB Ready Files</span>
                </div>
                <div className="portfolio-modal-highlight-item">
                  <CheckCircle2 size={15} className="icon-gold" aria-hidden="true" />
                  <span>Studio GTA 100% Satisfaction Guarantee</span>
                </div>
              </div>

              {/* Action CTAs */}
              <div className="portfolio-modal-actions">
                <Link
                  to="/packages"
                  className="btn btn-gold portfolio-modal-book-cta"
                  onClick={handleBookingAction}
                >
                  <span>Book Shoot For This Property</span>
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
                <button
                  type="button"
                  onClick={onClose}
                  className="btn btn-secondary portfolio-modal-dismiss-btn"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Portfolio({ onOpenBooking }) {
  useScrollReveal();
  const [activeFilter, setActiveFilter] = useState('All');
  const [activeModalItem, setActiveModalItem] = useState(null);

  const categories = ['All', 'Residential', 'Architectural', 'Commercial'];

  const filteredItems = activeFilter === 'All'
    ? PORTFOLIO_GALLERY
    : PORTFOLIO_GALLERY.filter((item) => item.category === activeFilter);

  const handleHeroBookClick = (e) => {
    if (onOpenBooking) {
      e.preventDefault();
      onOpenBooking();
    }
  };

  const handleOpenProject = (item, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setActiveModalItem(item);
  };

  return (
    <div className="portfolio-page">
      {/* PAGE HERO: PANORAMIC PHOTOGRAPHY SHOWCASE */}
      <section className="page-hero-panoramic" aria-label="Portfolio Hero">
        <img
          src="/images/portfolio-skyline.jpg"
          alt="Luxury Living and Toronto Skyline Balcony by Studio GTA"
          className="page-hero-panoramic-bg"
          fetchPriority="high"
        />
        <div className="page-hero-panoramic-overlay" />
        <div className="container">
          <div className="page-hero-panoramic-content">
            <div className="eyebrow" style={{ color: 'var(--color-gold)' }}>
              <span className="eyebrow-dot" />
              <span>Curated Architectural Work</span>
            </div>
            <h1 className="page-hero-panoramic-title">Portfolio of Properties & Architecture</h1>
            <p className="page-hero-panoramic-desc">
              Explore our residential and commercial media across Toronto and the Greater Toronto Area. Every image is carefully exposed, framed, and color-graded to accentuate the property's finest attributes.
            </p>
            <div className="page-hero-cta-group">
              <a
                href="#portfolio-gallery"
                className="btn btn-gold"
              >
                <span>Explore Gallery</span>
                <ArrowRight size={16} aria-hidden="true" />
              </a>
              <Link
                to="/packages"
                onClick={handleHeroBookClick}
                className="btn btn-white"
              >
                Book a Shoot
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FILTER BUTTONS & GALLERY */}
      <section id="portfolio-gallery" style={{ padding: 'var(--section-spacing) 0', backgroundColor: 'var(--color-white)' }}>
        <div className="container">
          {/* Category Filter */}
          <div className="portfolio-filter-row reveal" role="tablist" aria-label="Filter portfolio projects">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={activeFilter === cat}
                onClick={() => setActiveFilter(cat)}
                className={`filter-btn ${activeFilter === cat ? 'active' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Responsive 3-Col / 2-Col / 1-Col Project Grid */}
          <div className="portfolio-gallery-grid reveal">
            {filteredItems.map((item) => (
              <article key={item.id} className="portfolio-card">
                <div
                  className="portfolio-card-media"
                  onClick={(e) => handleOpenProject(item, e)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleOpenProject(item, e);
                    }
                  }}
                  aria-label={`View photo of ${item.title}`}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    width="600"
                    height="400"
                  />
                  <span className="portfolio-card-badge">{item.category}</span>
                  <div className="portfolio-card-media-overlay" aria-hidden="true">
                    <span className="portfolio-card-quick-view">
                      <Eye size={15} />
                      <span>View Full Size</span>
                    </span>
                  </div>
                </div>

                <div className="portfolio-card-body">
                  {item.location && (
                    <div className="portfolio-card-location">
                      <MapPin size={13} className="icon-gold" aria-hidden="true" />
                      <span>{item.location}</span>
                    </div>
                  )}

                  <h2 className="portfolio-card-title">{item.title}</h2>

                  {item.description && (
                    <p className="portfolio-card-desc">{item.description}</p>
                  )}

                  <div className="portfolio-card-footer">
                    <button
                      type="button"
                      className="portfolio-explore-btn"
                      onClick={(e) => handleOpenProject(item, e)}
                      aria-label={`Explore project: ${item.title}`}
                    >
                      <span>Explore Project</span>
                      <ArrowRight size={15} aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PORTAL-RENDERED RESPONSIVE TWO-COLUMN MODAL */}
      {activeModalItem && typeof document !== 'undefined' && createPortal(
        <PortfolioModal
          item={activeModalItem}
          onClose={() => setActiveModalItem(null)}
          onOpenBooking={onOpenBooking}
        />,
        document.body
      )}

      {/* CLOSING CTA BANNER */}
      <section className="cta-banner-section">
        <div className="container">
          <div className="cta-banner-inner reveal">
            <h2>Impressed By The Quality?</h2>
            <p>
              Let Studio GTA capture your next property with the same care and attention to detail. Fast next-day turnaround guaranteed.
            </p>
            <div className="cta-banner-actions">
              <Link to="/packages" className="btn btn-gold">
                <span>View Pricing & Book Shoot</span>
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link to="/contact" className="btn btn-secondary" style={{ color: 'var(--color-white)', borderColor: 'rgba(255,255,255,0.25)' }}>
                Request Custom Quote
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
