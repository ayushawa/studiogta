import React, { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { PACKAGES, FAQS, COMPANY } from '../data/siteData';
import useScrollReveal from '../hooks/useScrollReveal';

export default function Packages({ onOpenBookingWithPackage }) {
  useScrollReveal();
  const [searchParams] = useSearchParams();

  // If URL has ?package=... or ?book=..., automatically open the booking modal with that package
  useEffect(() => {
    const pkgFromQuery = searchParams.get('package') || searchParams.get('book');
    if (pkgFromQuery && onOpenBookingWithPackage) {
      onOpenBookingWithPackage(pkgFromQuery);
    }
  }, [searchParams, onOpenBookingWithPackage]);

  const handleBookClick = (pkgId) => {
    if (onOpenBookingWithPackage) {
      onOpenBookingWithPackage(pkgId);
    }
  };

  return (
    <div className="packages-page">
      {/* PAGE HERO */}
      <section className="page-hero" aria-label="Packages & Pricing Hero">
        <div className="container">
          <div className="page-hero-grid">
            <div className="page-hero-copy">
              <div className="eyebrow">
                <span className="eyebrow-dot" />
                <span>Transparent Real Estate Pricing</span>
              </div>
              <h1 className="page-hero-title">Real Estate Photography Packages</h1>
              <p className="page-hero-desc">
                Partnering with realtors to sell homes faster and at higher selling prices. According to Redfin, listings shot by professional real estate photographers receive 61% more online views.
              </p>

              <div className="page-hero-meta-strip">
                <div className="page-hero-meta-item">
                  <CheckCircle2 size={15} style={{ color: 'var(--color-gold-deep)' }} />
                  <span>24-Hour Turnaround</span>
                </div>
                <div className="page-hero-meta-item">
                  <CheckCircle2 size={15} style={{ color: 'var(--color-gold-deep)' }} />
                  <span>MLS Web & Print Formats</span>
                </div>
                <div className="page-hero-meta-item">
                  <CheckCircle2 size={15} style={{ color: 'var(--color-gold-deep)' }} />
                  <span>Virtual Tour Link Included</span>
                </div>
              </div>

              <div className="page-hero-cta-group">
                <a href="#pricing-grid-section" className="btn btn-primary">
                  View All Packages
                  <ArrowRight size={16} />
                </a>
                <Link to="/contact" className="btn btn-secondary">
                  Custom Inquiries
                </Link>
              </div>
            </div>

            {/* Page Hero Media Card */}
            <div className="page-hero-media">
              <div className="page-hero-media-card">
                <img
                  src="/images/portfolio-living.jpg"
                  alt="Modern Luxury Living Room Staging Photography by Studio GTA"
                  width="600"
                  height="450"
                  fetchPriority="high"
                />
                <div className="page-hero-badge">
                  <span className="page-hero-badge-gold">✓</span>
                  <span>All-Inclusive MLS Bundles</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING CARDS SECTION */}
      <section id="pricing-grid-section" className="packages-section" aria-label="Pricing Packages">
        <div className="container">
          <div className="section-header text-center reveal">
            <div className="eyebrow">
              <span className="eyebrow-dot" />
              <span>All-Inclusive MLS Bundles</span>
            </div>
            <h2>Standard Packages (Properties &lt; 3,000 Sq Ft)</h2>
            <p className="section-subtitle">
              Every package includes high-resolution print files, MLS-ready compressed images, client portal delivery, and our guaranteed next-day turnaround.
            </p>
          </div>

          <div className="pricing-grid reveal-stagger">
            {PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                className={`pricing-card ${pkg.recommended ? 'featured' : ''} reveal`}
              >
                {pkg.recommended && (
                  <div className="pricing-badge">{pkg.badge}</div>
                )}

                <div className="pricing-header">
                  <h3 className="pricing-name">{pkg.name}</h3>
                  <div className="pricing-price-wrap">
                    <span className="pricing-amount">{pkg.price}</span>
                    <span className="pricing-currency">{pkg.currency}</span>
                  </div>
                  <div className="pricing-size-limit">{pkg.sizeLimit}</div>
                </div>

                <p className="pricing-desc">{pkg.description}</p>

                <div className="pricing-inclusions-title">Package Inclusions:</div>
                <ul className="pricing-features-list">
                  {pkg.inclusions.map((inc, i) => (
                    <li key={i} className="pricing-feature-item">
                      <CheckCircle2 size={16} className="pricing-check-icon" />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() => handleBookClick(pkg.id)}
                  className={`btn ${pkg.recommended ? 'btn-gold' : 'btn-primary'} pricing-cta`}
                  aria-label={`Book ${pkg.name}`}
                >
                  {pkg.ctaText}
                  <ArrowRight size={16} />
                </button>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '2.5rem', fontSize: '0.9rem', color: 'var(--color-muted)' }}>
            * For custom properties over 3,000 sq ft or multi-unit developments, please <Link to="/contact" style={{ color: 'var(--color-dark)', textDecoration: 'underline' }}>contact us for a custom quote</Link>.
          </div>
        </div>
      </section>

      {/* 3 SIMPLE STEPS TO BOOK */}
      <section style={{ padding: 'var(--section-spacing) 0', backgroundColor: 'var(--color-linen)', borderTop: '1px solid var(--color-border-light)', borderBottom: '1px solid var(--color-border-light)' }}>
        <div className="container">
          <div className="section-header text-center reveal">
            <div className="eyebrow">
              <span className="eyebrow-dot" />
              <span>How It Works</span>
            </div>
            <h2>Booking Is Easy In 3 Simple Steps</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }} className="reveal-stagger">
            <div className="reveal" style={{ padding: '2rem', backgroundColor: 'var(--color-white)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', transition: 'transform 0.35s ease, box-shadow 0.35s ease' }}>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-gold-deep)', marginBottom: '0.75rem' }}>
                STEP 01
              </div>
              <h3 style={{ fontSize: '1.35rem', marginBottom: '0.75rem' }}>Scheduling & Confirmation</h3>
              <p style={{ fontSize: '0.95rem' }}>
                Schedule your appointment online via our booking form, email directly to <a href={`mailto:${COMPANY.bookingEmail}`} style={{ color: 'var(--color-gold-deep)', fontWeight: 600 }}>{COMPANY.bookingEmail}</a>, or call Herman at <a href={`tel:${COMPANY.phoneClean}`} style={{ color: 'var(--color-dark)', fontWeight: 600 }}>{COMPANY.phone}</a>.
              </p>
            </div>

            <div className="reveal" style={{ padding: '2rem', backgroundColor: 'var(--color-white)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', transition: 'transform 0.35s ease, box-shadow 0.35s ease' }}>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-gold-deep)', marginBottom: '0.75rem' }}>
                STEP 02
              </div>
              <h3 style={{ fontSize: '1.35rem', marginBottom: '0.75rem' }}>See You At The Property</h3>
              <p style={{ fontSize: '0.95rem' }}>
                Once your appointment time is confirmed, our professional photographer arrives punctually on-site with full camera, lighting, and gimbal equipment.
              </p>
            </div>

            <div className="reveal" style={{ padding: '2rem', backgroundColor: 'var(--color-white)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', transition: 'transform 0.35s ease, box-shadow 0.35s ease' }}>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-gold-deep)', marginBottom: '0.75rem' }}>
                STEP 03
              </div>
              <h3 style={{ fontSize: '1.35rem', marginBottom: '0.75rem' }}>Receiving MLS-Ready Files</h3>
              <p style={{ fontSize: '0.95rem' }}>
                Your photos and video are professionally edited and delivered within 24 to 48 hours to your dedicated client portal, ready for immediate MLS listing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FREQUENTLY ASKED QUESTIONS */}
      <section style={{ padding: 'var(--section-spacing) 0', backgroundColor: 'var(--color-white)' }}>
        <div className="container container-narrow">
          <div className="section-header text-center reveal">
            <div className="eyebrow">
              <span className="eyebrow-dot" />
              <span>Common Inquiries</span>
            </div>
            <h2>Frequently Asked Questions</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} className="reveal-stagger">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="reveal"
                style={{
                  padding: '1.75rem 2rem',
                  backgroundColor: 'var(--color-linen)',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--color-border)',
                  transition: 'transform 0.3s ease, border-color 0.3s ease'
                }}
              >
                <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.1rem', fontWeight: 600, color: 'var(--color-dark)', marginBottom: '0.65rem' }}>
                  {faq.q}
                </h4>
                <p style={{ fontSize: '0.98rem', color: 'var(--color-stone)', lineHeight: 1.7, margin: 0 }}>
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="cta-banner-section">
        <div className="container">
          <div className="cta-banner-inner reveal">
            <h2>Ready To Book Your Package?</h2>
            <p>Select your package above or reach out directly with your preferred shoot date.</p>
            <div className="cta-banner-actions">
              <button
                type="button"
                onClick={() => handleBookClick('video-photo')}
                className="btn btn-gold"
              >
                Schedule A Shoot
                <ArrowRight size={16} />
              </button>
              <Link to="/contact" className="btn btn-secondary" style={{ color: 'var(--color-white)', borderColor: 'rgba(255,255,255,0.25)' }}>
                Have Custom Questions? Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
