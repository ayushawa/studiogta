import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';
import { SERVICES, ADDON_SERVICES } from '../data/siteData';
import useScrollReveal from '../hooks/useScrollReveal';

export default function Services({ onOpenBooking: _onOpenBooking }) {
  useScrollReveal();

  return (
    <div className="services-page">
      {/* PAGE HERO */}
      <section className="page-hero" aria-label="Services Hero">
        <div className="container">
          <div className="page-hero-grid">
            <div className="page-hero-copy">
              <div className="eyebrow">
                <span className="eyebrow-dot" />
                <span>Real Estate & Architectural Media</span>
              </div>
              <h1 className="page-hero-title">Specialized Photography & Media Services</h1>
              <p className="page-hero-desc">
                Be it a house, commercial complex, or luxury condominium, you are on a journey to marketing and selling property. We are the storytellers who make your spaces shine.
              </p>

              <div className="page-hero-meta-strip">
                <div className="page-hero-meta-item">
                  <Sparkles size={15} style={{ color: 'var(--color-gold-deep)' }} />
                  <span>HDR Still Photography</span>
                </div>
                <div className="page-hero-meta-item">
                  <CheckCircle2 size={15} style={{ color: 'var(--color-gold-deep)' }} />
                  <span>4K Cinematic Video</span>
                </div>
                <div className="page-hero-meta-item">
                  <CheckCircle2 size={15} style={{ color: 'var(--color-gold-deep)' }} />
                  <span>3D Matterport Tours</span>
                </div>
              </div>

              <div className="page-hero-cta-group">
                <Link to="/packages" className="btn btn-primary">
                  View Packages
                  <ArrowRight size={16} />
                </Link>
                <Link to="/contact" className="btn btn-secondary">
                  Inquire About Services
                </Link>
              </div>
            </div>

            {/* Page Hero Media Card */}
            <div className="page-hero-media">
              <div className="page-hero-media-card">
                <img
                  src="/images/service-residential.jpg"
                  alt="Comprehensive Real Estate Photography & Video Media by Studio GTA"
                  width="600"
                  height="450"
                  fetchPriority="high"
                />
                <div className="page-hero-badge">
                  <span className="page-hero-badge-gold">✦</span>
                  <span>Comprehensive Media Solutions</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DETAILED SERVICES SECTIONS (ALTERNATING EDITORIAL LAYOUT) */}
      <section style={{ padding: 'var(--section-spacing) 0', backgroundColor: 'var(--color-white)' }}>
        <div className="container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(4rem, 8vw, 7rem)' }}>
            {SERVICES.map((service, index) => {
              const isEven = index % 2 === 1;

              return (
                <div
                  key={service.id}
                  id={service.id}
                  className="service-split-row reveal"
                >
                  {/* Image Column */}
                  <div
                    className="service-image-col"
                    style={{
                      order: isEven ? 2 : 1,
                      borderRadius: 'var(--radius-md)',
                      overflow: 'hidden',
                      boxShadow: 'var(--shadow-card)',
                      border: '1px solid var(--color-border)',
                      aspectRatio: '4/3'
                    }}
                  >
                    <img
                      src={service.image}
                      alt={service.title}
                      loading="lazy"
                      width="600"
                      height="450"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>

                  {/* Content Column */}
                  <div className="service-content-col" style={{ order: isEven ? 1 : 2 }}>
                    <div className="eyebrow">
                      <span className="eyebrow-dot" />
                      <span>{service.eyebrow}</span>
                    </div>

                    <h2>{service.title}</h2>

                    <p style={{ marginTop: '1rem', marginBottom: '1.5rem', fontSize: '1.05rem', lineHeight: 1.75 }}>
                      {service.description}
                    </p>

                    <div style={{ marginBottom: '2rem' }}>
                      <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 700, color: 'var(--color-dark)', marginBottom: '0.85rem' }}>
                        Key Inclusions & Highlights:
                      </div>
                      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {service.features.map((feat, fIdx) => (
                          <li key={fIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', fontSize: '0.94rem', color: '#3b3734' }}>
                            <CheckCircle2 size={16} className="pricing-check-icon" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                      <Link to="/packages" className="btn btn-primary">
                        View Packages & Pricing
                        <ArrowRight size={16} />
                      </Link>
                      <Link to="/contact" className="btn btn-secondary">
                        Inquire / Custom Quote
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SPECIALIZED ADD-ONS & SESSIONS */}
      <section style={{ padding: 'var(--section-spacing) 0', backgroundColor: 'var(--color-linen)', borderTop: '1px solid var(--color-border-light)' }}>
        <div className="container">
          <div className="section-header text-center reveal">
            <div className="eyebrow">
              <span className="eyebrow-dot" />
              <span>Tailored Solutions</span>
            </div>
            <h2>Additional Photography Sessions & Floor Plans</h2>
            <p className="section-subtitle">
              Expand your marketing reach with customized commercial shoots, executive headshots, and immersive floor plans.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }} className="reveal-stagger">
            {ADDON_SERVICES.map((addon, idx) => (
              <div
                key={idx}
                className="reveal"
                style={{
                  backgroundColor: 'var(--color-white)',
                  padding: '2.25rem 2rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border)',
                  boxShadow: 'var(--shadow-subtle)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', fontWeight: 600, color: 'var(--color-dark)', marginBottom: '0.5rem' }}>
                    {addon.name}
                  </div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-gold-deep)', marginBottom: '1rem' }}>
                    {addon.price}
                  </div>
                  <p style={{ fontSize: '0.94rem', color: 'var(--color-stone)', lineHeight: 1.65, marginBottom: '1.5rem' }}>
                    {addon.details}
                  </p>
                </div>
                <Link to="/contact" className="link-arrow">
                  Inquire About This Service <ChevronRight size={16} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLOSING CTA BANNER */}
      <section className="cta-banner-section">
        <div className="container">
          <div className="cta-banner-inner reveal">
            <h2>Ready To Book A Service?</h2>
            <p>Select an all-inclusive package or contact us for bespoke architectural media assignments.</p>
            <div className="cta-banner-actions">
              <Link to="/packages" className="btn btn-gold">
                See Package Pricing
                <ArrowRight size={16} />
              </Link>
              <Link to="/contact" className="btn btn-secondary" style={{ color: 'var(--color-white)', borderColor: 'rgba(255,255,255,0.25)' }}>
                Contact Studio GTA
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
