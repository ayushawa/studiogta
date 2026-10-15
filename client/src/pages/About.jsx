import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Award, Camera, Video, Compass, Users } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';

export default function About() {
  useScrollReveal();

  return (
    <div className="about-page">
      {/* PAGE HERO */}
      <section className="page-hero" aria-label="About Page Hero">
        <div className="container">
          <div className="page-hero-grid">
            <div className="page-hero-copy">
              <div className="eyebrow">
                <span className="eyebrow-dot" />
                <span>Our Story & Philosophy</span>
              </div>
              <h1 className="page-hero-title">Crafting Visual Stories For Exceptional Properties</h1>
              <p className="page-hero-desc">
                Based in Toronto, Studio GTA Real Estate Media provides high-definition architectural photography, cinematic walkthrough video, and digital marketing assets that help homes sell faster and at higher values.
              </p>

              <div className="page-hero-meta-strip">
                <div className="page-hero-meta-item">
                  <Award size={15} style={{ color: 'var(--color-gold-deep)' }} />
                  <span>10+ Years Experience</span>
                </div>
                <div className="page-hero-meta-item">
                  <Users size={15} style={{ color: 'var(--color-gold-deep)' }} />
                  <span>200+ Top GTA Realtors</span>
                </div>
                <div className="page-hero-meta-item">
                  <CheckCircle2 size={15} style={{ color: 'var(--color-gold-deep)' }} />
                  <span>100% Satisfaction</span>
                </div>
              </div>

              <div className="page-hero-cta-group">
                <Link to="/portfolio" className="btn btn-primary">
                  View Portfolio
                  <ArrowRight size={16} />
                </Link>
                <Link to="/contact" className="btn btn-secondary">
                  Contact Us
                </Link>
              </div>
            </div>

            {/* Page Hero Photograph */}
            <div className="page-hero-media">
              <div className="page-hero-media-card">
                <img
                  src="/images/arch-hotel-x.jpg"
                  alt="Architectural Landmark Photography in Toronto by Studio GTA"
                  width="600"
                  height="450"
                  fetchPriority="high"
                />
                <div className="page-hero-badge">
                  <span className="page-hero-badge-gold">★</span>
                  <span>Toronto Architectural Landmark</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOUNDER & COMPANY STORY */}
      <section style={{ padding: 'var(--section-spacing) 0', backgroundColor: 'var(--color-white)' }}>
        <div className="container">
          <div className="editorial-split-grid">
            <div style={{ position: 'relative' }} className="reveal reveal-left">
              <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', boxShadow: 'var(--shadow-card)', border: '1px solid var(--color-border)', aspectRatio: '4/3' }}>
                <img
                  src="/images/portfolio-kitchen.jpg"
                  alt="Custom Crafted Kitchen Interior by Studio GTA"
                  width="600"
                  height="450"
                  fetchPriority="high"
                />
              </div>
              <div
                style={{
                  position: 'absolute',
                  bottom: '-1.5rem',
                  left: '1.5rem',
                  backgroundColor: 'var(--color-dark)',
                  color: 'var(--color-white)',
                  padding: '1.25rem 1.75rem',
                  borderRadius: 'var(--radius-sm)',
                  borderLeft: '4px solid var(--color-gold)',
                  boxShadow: 'var(--shadow-hover)'
                }}
              >
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', color: 'var(--color-gold)' }}>
                  Herman
                </div>
                <div style={{ fontSize: '0.8rem', color: '#c9c3bb', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  Founder & Principal Photographer
                </div>
              </div>
            </div>

            <div className="reveal reveal-right">
              <div className="eyebrow">
                <span className="eyebrow-dot" />
                <span>Get To Know Studio GTA</span>
              </div>
              <h2>"We Are The Storytellers For Your Properties"</h2>
              <p style={{ marginBottom: '1.25rem' }}>
                Serving the Greater Toronto Area, our focus is on producing captivating and awe-inspiring photographs that effectively convey the vision of architects, designers, and real estate professionals.
              </p>
              <p style={{ marginBottom: '1.25rem' }}>
                With a diverse client base encompassing interior designers, luxury real estate agents, commercial enterprises, and homeowners preparing to list, we bring an artistic, imaginative approach coupled with an acute attention to detail.
              </p>
              <p style={{ marginBottom: '2rem' }}>
                Drawing from over <strong>ten years of dedicated experience</strong> in real estate and architectural media, Herman has collaborated with over <strong>200 highly successful local realtors in Toronto</strong>. Our quality of service, speed of delivery, and professional on-site demeanor have earned us long-standing relationships, referrals, and repeat business.
              </p>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Link to="/packages" className="btn btn-primary">
                  View Packages & Rates
                  <ArrowRight size={16} />
                </Link>
                <Link to="/contact" className="btn btn-secondary">
                  Contact Herman Directly
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VERIFIED CREDIBILITY & STATS */}
      <section style={{ padding: 'var(--section-spacing-sm) 0', backgroundColor: 'var(--color-linen)', borderTop: '1px solid var(--color-border-light)', borderBottom: '1px solid var(--color-border-light)' }}>
        <div className="container">
          <div className="about-stats-grid reveal-stagger">
            <div className="reveal" style={{ padding: '1.5rem', backgroundColor: 'var(--color-white)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2.8rem', fontWeight: 600, color: 'var(--color-dark)', lineHeight: 1 }}>
                5/5
              </div>
              <div style={{ fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-gold-deep)', marginTop: '0.5rem' }}>
                Google Reviews
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-muted)', marginTop: '0.25rem' }}>
                Verified Realtor Ratings
              </div>
            </div>

            <div className="reveal" style={{ padding: '1.5rem', backgroundColor: 'var(--color-white)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2.8rem', fontWeight: 600, color: 'var(--color-dark)', lineHeight: 1 }}>
                27K+
              </div>
              <div style={{ fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-gold-deep)', marginTop: '0.5rem' }}>
                YouTube Subscribers
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-muted)', marginTop: '0.25rem' }}>
                Virtual Tour Channel
              </div>
            </div>

            <div className="reveal" style={{ padding: '1.5rem', backgroundColor: 'var(--color-white)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2.8rem', fontWeight: 600, color: 'var(--color-dark)', lineHeight: 1 }}>
                1.2M+
              </div>
              <div style={{ fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-gold-deep)', marginTop: '0.5rem' }}>
                Video Tour Views
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-muted)', marginTop: '0.25rem' }}>
                Showcasing GTA Properties
              </div>
            </div>

            <div className="reveal" style={{ padding: '1.5rem', backgroundColor: 'var(--color-white)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2.8rem', fontWeight: 600, color: 'var(--color-dark)', lineHeight: 1 }}>
                200+
              </div>
              <div style={{ fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-gold-deep)', marginTop: '0.5rem' }}>
                Realtor Partners
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-muted)', marginTop: '0.25rem' }}>
                Across Toronto & York Region
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PHOTOGRAPHY PHILOSOPHY */}
      <section style={{ padding: 'var(--section-spacing) 0', backgroundColor: 'var(--color-white)' }}>
        <div className="container">
          <div className="section-header text-center reveal">
            <div className="eyebrow">
              <span className="eyebrow-dot" />
              <span>Our Principles</span>
            </div>
            <h2>Precision, Natural Lighting & Lens Control</h2>
            <p className="section-subtitle">
              We reject artificial, over-processed filters in favor of true architectural color fidelity and dimensional depth.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }} className="reveal-stagger">
            <div className="reveal" style={{ padding: '2rem', backgroundColor: 'var(--color-linen)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}>
              <div style={{ width: '44px', height: '44px', backgroundColor: 'var(--color-dark)', color: 'var(--color-gold)', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <Camera size={22} />
              </div>
              <h3 style={{ fontSize: '1.35rem', marginBottom: '0.75rem' }}>True-to-Life Exposure</h3>
              <p style={{ fontSize: '0.96rem' }}>
                Multi-bracketed exposures capture the vibrant exterior views through windows without darkening the interior or creating harsh artificial shadows.
              </p>
            </div>

            <div className="reveal" style={{ padding: '2rem', backgroundColor: 'var(--color-linen)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}>
              <div style={{ width: '44px', height: '44px', backgroundColor: 'var(--color-dark)', color: 'var(--color-gold)', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <Compass size={22} />
              </div>
              <h3 style={{ fontSize: '1.35rem', marginBottom: '0.75rem' }}>Architectural Alignment</h3>
              <p style={{ fontSize: '0.96rem' }}>
                Every photo has strict vertical line alignment. Walls never look tilted and perspective distortion is corrected with specialized tilt-shift lenses.
              </p>
            </div>

            <div className="reveal" style={{ padding: '2rem', backgroundColor: 'var(--color-linen)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}>
              <div style={{ width: '44px', height: '44px', backgroundColor: 'var(--color-dark)', color: 'var(--color-gold)', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <Video size={22} />
              </div>
              <h3 style={{ fontSize: '1.35rem', marginBottom: '0.75rem' }}>Fluid Motion Videography</h3>
              <p style={{ fontSize: '0.96rem' }}>
                Walkthrough videos are filmed using motorized 3-axis gimbals, creating smooth, cinematic property tours that guide buyers through the layout naturally.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CURATED PROJECT SHOWCASE */}
      <section style={{ padding: 'var(--section-spacing) 0', backgroundColor: 'var(--color-linen)', borderTop: '1px solid var(--color-border-light)' }}>
        <div className="container">
          <div className="section-header text-center reveal">
            <div className="eyebrow">
              <span className="eyebrow-dot" />
              <span>Authentic Portfolio Excerpts</span>
            </div>
            <h2>Recent Architectural & Residential Shoots</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }} className="reveal-stagger">
            <div className="reveal" style={{ borderRadius: 'var(--radius-sm)', overflow: 'hidden', aspectRatio: '4/3' }}>
              <img src="/images/arch-hotel-x.jpg" alt="Hotel X Toronto Shoot" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'} />
            </div>
            <div className="reveal" style={{ borderRadius: 'var(--radius-sm)', overflow: 'hidden', aspectRatio: '4/3' }}>
              <img src="/images/portfolio-living.jpg" alt="Staged Living Room Shoot" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'} />
            </div>
            <div className="reveal" style={{ borderRadius: 'var(--radius-sm)', overflow: 'hidden', aspectRatio: '4/3' }}>
              <img src="/images/arch-king-portland.jpg" alt="King Portland Centre Shoot" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'} />
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '2.5rem' }} className="reveal">
            <Link to="/portfolio" className="btn btn-primary">
              Browse Complete Portfolio Gallery
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="cta-banner-section">
        <div className="container">
          <div className="cta-banner-inner reveal">
            <h2>Ready To Work With Herman & Studio GTA?</h2>
            <p>Experience the difference in photo quality, prompt delivery, and realtor-focused customer service.</p>
            <div className="cta-banner-actions">
              <Link to="/packages" className="btn btn-gold">
                View Pricing Packages
                <ArrowRight size={16} />
              </Link>
              <Link to="/contact" className="btn btn-secondary" style={{ color: 'var(--color-white)', borderColor: 'rgba(255,255,255,0.25)' }}>
                Schedule Shoot / Contact
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
