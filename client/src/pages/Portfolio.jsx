import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, X, MapPin, Tag, Eye } from 'lucide-react';
import { PORTFOLIO_GALLERY } from '../data/siteData';
import useScrollReveal from '../hooks/useScrollReveal';

export default function Portfolio({ onOpenBooking }) {
  useScrollReveal();
  const [activeFilter, setActiveFilter] = useState('All');
  const [activeModalItem, setActiveModalItem] = useState(null);

  const closeBtnRef = useRef(null);
  const previousFocusRef = useRef(null);

  const categories = ['All', 'Residential', 'Architectural', 'Commercial'];

  const filteredItems = activeFilter === 'All'
    ? PORTFOLIO_GALLERY
    : PORTFOLIO_GALLERY.filter((item) => item.category === activeFilter);

  // Body scroll lock, Escape key dismiss, and focus management for accessible modal
  useEffect(() => {
    if (activeModalItem) {
      previousFocusRef.current = document.activeElement;
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          setActiveModalItem(null);
        }
      };

      window.addEventListener('keydown', handleKeyDown);

      // Focus close button on open for accessibility
      const focusTimer = setTimeout(() => {
        if (closeBtnRef.current) {
          closeBtnRef.current.focus();
        }
      }, 50);

      return () => {
        clearTimeout(focusTimer);
        document.body.style.overflow = originalOverflow;
        window.removeEventListener('keydown', handleKeyDown);
        if (previousFocusRef.current && typeof previousFocusRef.current.focus === 'function') {
          previousFocusRef.current.focus();
        }
      };
    }
  }, [activeModalItem]);

  const handleHeroBookClick = (e) => {
    if (onOpenBooking) {
      e.preventDefault();
      onOpenBooking();
    }
  };

  const handleModalBookClick = (e) => {
    setActiveModalItem(null);
    if (onOpenBooking) {
      e.preventDefault();
      onOpenBooking('hdr-photography');
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      setActiveModalItem(null);
    }
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
                  onClick={() => setActiveModalItem(item)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveModalItem(item);
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
                      onClick={() => setActiveModalItem(item)}
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

      {/* RESPONSIVE ACCESSIBLE LIGHTBOX MODAL */}
      {activeModalItem && (
        <div
          className="portfolio-lightbox-backdrop"
          onClick={handleBackdropClick}
          role="dialog"
          aria-modal="true"
          aria-labelledby="portfolio-modal-title"
          aria-describedby="portfolio-modal-desc"
        >
          <div
            className="portfolio-lightbox-dialog"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              ref={closeBtnRef}
              type="button"
              className="portfolio-lightbox-close"
              onClick={() => setActiveModalItem(null)}
              aria-label="Close project preview"
            >
              <X size={20} />
            </button>

            <div className="portfolio-lightbox-image-wrap">
              <img
                src={activeModalItem.image}
                alt={activeModalItem.title}
                className="portfolio-lightbox-image"
              />
            </div>

            <div className="portfolio-lightbox-content">
              <div className="portfolio-lightbox-meta">
                <span className="portfolio-lightbox-badge">
                  <Tag size={12} aria-hidden="true" />
                  <span>{activeModalItem.category}</span>
                </span>
                {activeModalItem.location && (
                  <span className="portfolio-lightbox-location">
                    <MapPin size={14} className="icon-gold" aria-hidden="true" />
                    <span>{activeModalItem.location}</span>
                  </span>
                )}
              </div>

              <h2 id="portfolio-modal-title" className="portfolio-lightbox-title">
                {activeModalItem.title}
              </h2>

              <p id="portfolio-modal-desc" className="portfolio-lightbox-desc">
                {activeModalItem.description}
              </p>

              <div className="portfolio-lightbox-actions">
                <Link
                  to="/packages"
                  className="btn btn-gold portfolio-lightbox-book-btn"
                  onClick={handleModalBookClick}
                >
                  <span>Book Shoot For Your Listing</span>
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
                <button
                  type="button"
                  onClick={() => setActiveModalItem(null)}
                  className="btn btn-secondary portfolio-lightbox-cancel-btn"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
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
