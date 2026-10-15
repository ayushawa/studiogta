import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, X, Maximize2, MapPin, Tag } from 'lucide-react';
import { PORTFOLIO_GALLERY } from '../data/siteData';
import useScrollReveal from '../hooks/useScrollReveal';

export default function Portfolio({ onOpenBooking }) {
  useScrollReveal();
  const [activeFilter, setActiveFilter] = useState('All');
  const [activeModalItem, setActiveModalItem] = useState(null);

  const categories = ['All', 'Residential', 'Architectural', 'Commercial'];

  const filteredItems = activeFilter === 'All'
    ? PORTFOLIO_GALLERY
    : PORTFOLIO_GALLERY.filter((item) => item.category === activeFilter);

  const handleBookClick = (e) => {
    if (onOpenBooking) {
      e.preventDefault();
      onOpenBooking();
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
                Explore Gallery
                <ArrowRight size={16} />
              </a>
              <Link
                to="/packages"
                onClick={handleBookClick}
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
          <div className="portfolio-filter-row reveal" role="tablist" aria-label="Filter portfolio items">
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

          {/* Masonry / Responsive Grid */}
          <div className="portfolio-masonry-grid reveal">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="portfolio-item-card"
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
                  width="400"
                  height="300"
                />
                <div className="portfolio-item-overlay">
                  <div className="portfolio-overlay-cat">{item.category} • {item.location}</div>
                  <div className="portfolio-overlay-title">{item.title}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '0.5rem', fontSize: '0.8rem', color: 'var(--color-gold)' }}>
                    <Maximize2 size={14} /> Click to expand
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LIGHTBOX MODAL */}
      {activeModalItem && (
        <div
          className="modal-backdrop"
          onClick={() => setActiveModalItem(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Image Lightbox Preview"
        >
          <div
            className="modal-dialog"
            style={{
              backgroundColor: 'var(--color-dark)',
              color: 'var(--color-white)',
              borderRadius: 'var(--radius-md)',
              maxWidth: '920px',
              width: '100%',
              overflow: 'hidden',
              boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveModalItem(null)}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'rgba(0,0,0,0.6)',
                border: 'none',
                color: '#ffffff',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 10
              }}
              aria-label="Close lightbox"
            >
              <X size={20} />
            </button>

            <div style={{ maxHeight: '65vh', overflow: 'hidden', backgroundColor: '#000000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img
                src={activeModalItem.image}
                alt={activeModalItem.title}
                style={{ width: '100%', maxHeight: '65vh', objectFit: 'contain' }}
              />
            </div>

            <div style={{ padding: '1.75rem 2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                <span className="modal-selected-pill" style={{ margin: 0 }}>
                  <Tag size={12} /> {activeModalItem.category}
                </span>
                <span style={{ fontSize: '0.85rem', color: '#a8a29e', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <MapPin size={14} className="icon-gold" /> {activeModalItem.location}
                </span>
              </div>
              <h3 style={{ color: '#ffffff', fontSize: '1.5rem', marginBottom: '0.5rem' }}>
                {activeModalItem.title}
              </h3>
              <p style={{ color: '#c9c3bb', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                {activeModalItem.description}
              </p>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <Link to="/packages" className="btn btn-gold" onClick={() => setActiveModalItem(null)}>
                  Book Shoot For Your Listing
                  <ArrowRight size={16} />
                </Link>
                <button
                  type="button"
                  onClick={() => setActiveModalItem(null)}
                  className="btn btn-secondary"
                  style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.2)' }}
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
                View Pricing & Book Shoot
                <ArrowRight size={16} />
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
