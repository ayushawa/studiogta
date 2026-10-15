import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Star, Clock, ChevronRight, CheckCircle2 } from 'lucide-react';
import { TRUST_STATS, SERVICES, TESTIMONIALS, PACKAGES } from '../data/siteData';
import BrokerageLogoRow from '../components/BrokerageLogoRow';
import useScrollReveal from '../hooks/useScrollReveal';

export default function Home({ onOpenBooking }) {
  useScrollReveal();
  const navigate = useNavigate();

  const handleScheduleShoot = (e) => {
    e.preventDefault();
    if (onOpenBooking) {
      onOpenBooking();
    } else {
      navigate('/contact');
    }
  };

  const handleBookPackage = (pkgId) => {
    if (onOpenBooking) {
      onOpenBooking(pkgId);
    } else {
      navigate(`/packages?package=${pkgId}`);
    }
  };

  return (
    <div className="home-page">
      {/* 1. HERO SECTION */}
      <section className="hero-section" aria-label="Hero Section">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-copy">
              <div className="eyebrow">
                <span className="eyebrow-dot" />
                <span>REAL ESTATE & ARCHITECTURAL MEDIA</span>
              </div>

              <h1 className="hero-headline">
                Professional Real Estate Photography That Sells Properties <span className="highlight-gold">Faster</span>.
              </h1>

              <p className="hero-subtitle">
                Showcase residential and commercial listings across the Greater Toronto Area with balanced HDR photography, 4K walkthrough video, and guaranteed next-day MLS delivery.
              </p>

              {/* Quick Hero Highlights */}
              <div className="hero-stats-strip">
                <div className="hero-stat-item">
                  <Clock size={16} className="star-gold" />
                  <span>24-Hour Delivery</span>
                </div>
                <div className="hero-stat-item">
                  <Star size={16} className="star-gold" fill="#B59A65" color="#B59A65" />
                  <span>5.0 / 5 Star Google Reviews</span>
                </div>
              </div>

              <div className="hero-cta-group">
                <button
                  type="button"
                  onClick={handleScheduleShoot}
                  className="btn btn-primary"
                  aria-label="Schedule Your Shoot"
                >
                  Schedule Your Shoot
                  <ArrowRight size={16} />
                </button>
                <Link to="/packages" className="btn btn-secondary">
                  View Packages
                </Link>
              </div>
            </div>

            {/* Featured Hero Media Card */}
            <div className="hero-card-wrapper">
              <div className="hero-card">
                <div className="hero-card-image-wrap">
                  <img
                    src="/images/hero-estate.jpg"
                    alt="Luxury Estate Living Interior Shoot by Studio GTA"
                    width="600"
                    height="450"
                    fetchPriority="high"
                  />
                  <div className="hero-card-overlay">
                    <div className="hero-card-top">
                      <span className="hero-badge">Featured Shoot</span>
                      <button
                        type="button"
                        onClick={handleScheduleShoot}
                        className="btn btn-white"
                        style={{ padding: '0.45rem 1rem', fontSize: '0.82rem' }}
                      >
                        Book Now
                      </button>
                    </div>
                    <div className="hero-card-bottom">
                      <div className="hero-card-location">Greater Toronto Area, Ontario</div>
                      <div className="hero-card-title">Luxury Residential & Commercial Media</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. COMPACT TRUST INDICATORS */}
      <section className="stats-section" aria-label="Trust Statistics">
        <div className="container">
          <div className="stats-grid reveal-stagger">
            {TRUST_STATS.map((stat, idx) => (
              <div key={idx} className="stat-card reveal">
                <div className="stat-number-wrap">
                  <span>{stat.number}</span>
                  <span className="stat-suffix">{stat.suffix}</span>
                </div>
                <div className="stat-label">{stat.label}</div>
                <div className="stat-subtext">{stat.subtext}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FEATURED PORTFOLIO PHOTOGRAPHY */}
      <section className="featured-section" aria-label="Featured Portfolio Showcase">
        <div className="container">
          <div className="section-header reveal">
            <div className="eyebrow">
              <span className="eyebrow-dot" />
              <span>Standout Portfolio</span>
            </div>
            <h2>Editorial Real Estate & Architectural Imagery</h2>
            <p className="section-subtitle">
              Every shoot is composed with an artistic eye for natural sightlines, balanced daylight exposure, and accurate architectural volume.
            </p>
          </div>

          <div className="featured-editorial-card reveal reveal-scale">
            <div className="featured-image-box">
              <img
                src="/images/portfolio-skyline.jpg"
                alt="Toronto Skyline Balcony Luxury Condo Shoot"
                loading="lazy"
                width="700"
                height="500"
              />
            </div>
            <div className="featured-content-box">
              <div className="eyebrow" style={{ color: 'var(--color-gold-deep)' }}>
                Featured Property Showcase
              </div>
              <h3>Downtown Toronto Skyline Terrace Residence</h3>
              <p>
                Over 1,100 sq ft of luxury interior design illuminated by floor-to-ceiling glass, opening onto a panoramic 400 sq ft wrap-around balcony overlooking the city. Captured with multi-exposure HDR to maintain crisp outdoor views while preserving warm, inviting interior ambience.
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
                <Link to="/portfolio" className="btn btn-primary">
                  View Full Portfolio
                  <ArrowRight size={16} />
                </Link>
                <button
                  type="button"
                  onClick={() => handleBookPackage('hdr-photography')}
                  className="btn btn-secondary"
                >
                  Book This Style
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CORE SERVICES OVERVIEW */}
      <section className="services-preview-section" aria-label="Services Preview">
        <div className="container">
          <div className="section-header text-center reveal">
            <div className="eyebrow">
              <span className="eyebrow-dot" />
              <span>Full-Service Visual Marketing</span>
            </div>
            <h2>Specialized Photography & Media Services</h2>
            <p className="section-subtitle">
              High-definition real estate media and cinematic walkthroughs elevate your listing above competing properties and attract qualified buyers.
            </p>
          </div>

          <div className="services-cards-grid reveal-stagger">
            {SERVICES.map((service) => (
              <div key={service.id} className="service-preview-card reveal">
                <div className="service-card-media">
                  <img
                    src={service.image}
                    alt={service.title}
                    loading="lazy"
                    width="400"
                    height="250"
                  />
                </div>
                <div className="service-card-body">
                  <div className="service-card-eyebrow">{service.eyebrow}</div>
                  <h3 className="service-card-title">{service.title}</h3>
                  <p className="service-card-desc">{service.description}</p>
                  <Link to="/services" className="link-arrow">
                    Learn Details & Inclusions <ChevronRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. TRANSPARENT PACKAGES & PRICING INTRO */}
      <section style={{ padding: 'var(--section-spacing) 0', backgroundColor: 'var(--color-linen)', borderTop: '1px solid var(--color-border-light)', borderBottom: '1px solid var(--color-border-light)' }}>
        <div className="container">
          <div className="section-header text-center reveal">
            <div className="eyebrow">
              <span className="eyebrow-dot" />
              <span>Transparent Pricing</span>
            </div>
            <h2>All-Inclusive MLS Bundles</h2>
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
                  {pkg.inclusions.slice(0, 5).map((inc, i) => (
                    <li key={i} className="pricing-feature-item">
                      <CheckCircle2 size={16} className="pricing-check-icon" />
                      <span>{inc}</span>
                    </li>
                  ))}
                  {pkg.inclusions.length > 5 && (
                    <li className="pricing-feature-item" style={{ color: 'var(--color-muted)', fontSize: '0.85rem' }}>
                      + {pkg.inclusions.length - 5} more inclusions...
                    </li>
                  )}
                </ul>

                <button
                  type="button"
                  onClick={() => handleBookPackage(pkg.id)}
                  className={`btn ${pkg.recommended ? 'btn-gold' : 'btn-primary'} pricing-cta`}
                  aria-label={`Book ${pkg.name}`}
                >
                  {pkg.ctaText}
                  <ArrowRight size={16} />
                </button>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '2.5rem' }} className="reveal">
            <Link to="/packages" className="btn btn-secondary">
              Compare Full Inclusions & Details
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. VERIFIED BROKERAGE RELATIONSHIPS */}
      <BrokerageLogoRow />

      {/* 7. WHY CHOOSE STUDIO GTA */}
      <section className="benefits-section" aria-label="Why Choose Studio GTA">
        <div className="container">
          <div className="benefits-grid">
            <div className="benefits-image-stack reveal reveal-left">
              <div className="benefits-main-image">
                <img
                  src="/images/arch-woodwards.jpg"
                  alt="Architectural Landmark Photography"
                  loading="lazy"
                  width="600"
                  height="450"
                />
              </div>
              <div className="benefits-floating-badge">
                <div className="badge-title">10+ Years</div>
                <div className="badge-sub">Collaborating with 200+ Realtors</div>
              </div>
            </div>

            <div className="benefits-copy reveal reveal-right">
              <div className="eyebrow">
                <span className="eyebrow-dot" />
                <span>Why Studio GTA</span>
              </div>
              <h2>Built For Realtors Who Demand Exceptional Results</h2>
              <p>
                Founded by Herman, Studio GTA delivers high-end photography, 4K walkthrough video, and immersive media tailored specifically to the competitive Greater Toronto Area market. We make property marketing effortless so your listings command attention and sell faster.
              </p>

              <ul className="benefits-list">
                <li className="benefit-item">
                  <div className="benefit-check">✓</div>
                  <div className="benefit-text">
                    <h4>Professional Interior & Exterior Photography</h4>
                    <p>True HDR exposure blending ensures balanced natural window views and crystal-clear ambient illumination.</p>
                  </div>
                </li>

                <li className="benefit-item">
                  <div className="benefit-check">✓</div>
                  <div className="benefit-text">
                    <h4>All-in-One Real Estate Media Suite</h4>
                    <p>Photography, 4K cinematic video walkthroughs, and 3D Matterport floor plans under one dependable roof.</p>
                  </div>
                </li>

                <li className="benefit-item">
                  <div className="benefit-check">✓</div>
                  <div className="benefit-text">
                    <h4>Guaranteed 24-Hour Next-Day Turnaround</h4>
                    <p>MLS-ready compressed images and high-resolution print files delivered directly to your client portal without delay.</p>
                  </div>
                </li>

                <li className="benefit-item">
                  <div className="benefit-check">✓</div>
                  <div className="benefit-text">
                    <h4>Experienced Realtor Support & On-Site Staging Eyes</h4>
                    <p>We work collaboratively with realtors on-site, offering guidance on furniture placement and visual angles that maximize perceived square footage.</p>
                  </div>
                </li>
              </ul>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Link to="/about" className="btn btn-primary">
                  Our Story & Background
                  <ArrowRight size={16} />
                </Link>
                <Link to="/portfolio" className="btn btn-secondary">
                  View Full Portfolio
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. REALTOR FEEDBACK / TESTIMONIALS */}
      <section style={{ padding: 'var(--section-spacing) 0', backgroundColor: 'var(--color-white)' }}>
        <div className="container">
          <div className="section-header text-center reveal">
            <div className="eyebrow">
              <span className="eyebrow-dot" />
              <span>Verified Client Feedback</span>
            </div>
            <h2>What Leading GTA Realtors Say</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }} className="reveal-stagger">
            {TESTIMONIALS.map((t, idx) => (
              <div
                key={idx}
                className="reveal"
                style={{
                  backgroundColor: 'var(--color-linen)',
                  padding: '2rem 1.75rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--shadow-card)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <div>
                  <div style={{ display: 'flex', gap: '0.2rem', color: 'var(--color-gold)', marginBottom: '1.25rem' }}>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} fill="var(--color-gold)" color="var(--color-gold)" />
                    ))}
                  </div>
                  <p style={{ fontStyle: 'italic', color: 'var(--color-dark)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                    "{t.quote}"
                  </p>
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--color-dark)', fontSize: '0.98rem' }}>
                    {t.author}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--color-gold-deep)', fontWeight: 600 }}>
                    {t.role} • {t.brokerage}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FINAL BOOKING CTA BANNER */}
      <section className="cta-banner-section" aria-label="Book A Shoot Call To Action">
        <div className="container">
          <div className="cta-banner-inner reveal">
            <div className="eyebrow" style={{ color: 'var(--color-gold)' }}>
              <span className="eyebrow-dot" style={{ backgroundColor: 'var(--color-gold)' }} />
              <span>Partner With Studio GTA</span>
            </div>
            <h2>Ready To Make Your Next Listing Stand Out?</h2>
            <p>
              Tell us about your property and the photography services you need. Next-day delivery, flawless exposure, and dedicated service across the Greater Toronto Area.
            </p>
            <div className="cta-banner-actions">
              <button
                type="button"
                onClick={handleScheduleShoot}
                className="btn btn-gold"
              >
                Schedule Shoot Now
                <ArrowRight size={16} />
              </button>
              <Link to="/contact" className="btn btn-secondary" style={{ color: 'var(--color-white)', borderColor: 'rgba(255,255,255,0.25)' }}>
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
