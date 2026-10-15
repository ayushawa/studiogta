import React, { useState, useRef, useEffect } from 'react';
import { Phone, Mail, MapPin, Clock, CheckCircle, AlertCircle, Loader2, ArrowRight } from 'lucide-react';
import { COMPANY } from '../data/siteData';
import useScrollReveal from '../hooks/useScrollReveal';

export default function Contact() {
  useScrollReveal();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Residential Real Estate Photography',
    location: '',
    preferredDate: '',
    message: '',
    honeypot: ''
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const successTimerRef = useRef(null);

  // Clear timer when component unmounts
  useEffect(() => {
    return () => {
      if (successTimerRef.current) {
        clearTimeout(successTimerRef.current);
      }
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    // Clear any pending dismissal timer before starting new submission
    if (successTimerRef.current) {
      clearTimeout(successTimerRef.current);
    }
    setErrorMsg('');
    setSuccessMsg('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      setErrorMsg('Please enter your full name (at least 2 characters).');
      return;
    }

    if (!emailRegex.test(formData.email.trim())) {
      setErrorMsg('Please enter a valid email address (e.g. name@domain.com).');
      return;
    }

    if (!formData.message.trim() || formData.message.trim().length < 5) {
      setErrorMsg('Please provide details or a question about your shoot (at least 5 characters).');
      return;
    }

    setLoading(true);

    try {
      const API_BASE = import.meta.env.VITE_API_URL || '';
      const res = await fetch(`${API_BASE}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSuccessMsg(data.message || 'Thank you! Your message has been sent to Studio GTA.');
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: 'Residential Real Estate Photography',
          location: '',
          preferredDate: '',
          message: '',
          honeypot: ''
        });

        // Automatically dismiss the success message after approximately 1.5 seconds
        successTimerRef.current = setTimeout(() => {
          setSuccessMsg('');
        }, 1500);
      } else {
        setErrorMsg(data.error || 'Failed to submit message. Please call 647-300-0315 directly.');
      }
    } catch (err) {
      console.error('Contact form submission error:', err);
      setErrorMsg('Network error. Please call us at 647-300-0315 or email info@studiogta.ca directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      {/* PAGE HERO */}
      <section className="page-hero" aria-label="Contact Page Hero">
        <div className="container">
          <div className="page-hero-grid">
            <div className="page-hero-copy">
              <div className="eyebrow">
                <span className="eyebrow-dot" />
                <span>Connect With Studio GTA</span>
              </div>
              <h1 className="page-hero-title">We Can't Wait To Work With You</h1>
              <p className="page-hero-desc">
                Get in touch below to book a photoshoot, inquire about custom commercial architecture packages, or check our current schedule availability.
              </p>

              <div className="page-hero-meta-strip">
                <div className="page-hero-meta-item">
                  <Phone size={15} style={{ color: 'var(--color-gold-deep)' }} />
                  <span>{COMPANY.phone}</span>
                </div>
                <div className="page-hero-meta-item">
                  <Mail size={15} style={{ color: 'var(--color-gold-deep)' }} />
                  <span>{COMPANY.email}</span>
                </div>
                <div className="page-hero-meta-item">
                  <MapPin size={15} style={{ color: 'var(--color-gold-deep)' }} />
                  <span>Greater Toronto Area</span>
                </div>
              </div>

              <div className="page-hero-cta-group">
                <a href="#contact-form-section" className="btn btn-primary">
                  Start Your Inquiry
                  <ArrowRight size={16} />
                </a>
                <a href={`tel:${COMPANY.phoneClean}`} className="btn btn-secondary">
                  Call {COMPANY.phone}
                </a>
              </div>
            </div>

            {/* Page Hero Media Card */}
            <div className="page-hero-media">
              <div className="page-hero-media-card">
                <img
                  src="/images/portfolio-foyer.jpg"
                  alt="Welcoming Grand Foyer Interior by Studio GTA"
                  width="600"
                  height="450"
                  fetchPriority="high"
                />
                <div className="page-hero-badge">
                  <span className="page-hero-badge-gold">✦</span>
                  <span>Welcoming GTA Inquiries</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT DETAILS & INQUIRY FORM */}
      <section id="contact-form-section" style={{ padding: 'var(--section-spacing) 0', backgroundColor: 'var(--color-white)' }}>
        <div className="container">
          <div className="contact-split-grid">
            {/* Left Column: Direct Contact Info & 3 Steps */}
            <div className="reveal reveal-left">
              <div className="eyebrow">
                <span className="eyebrow-dot" />
                <span>Direct Inquiries</span>
              </div>
              <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', marginBottom: '1.25rem' }}>
                Studio GTA Real Estate Media
              </h2>
              <p style={{ marginBottom: '2rem' }}>
                Serving the entire Greater Toronto Area. Whether you have an urgent listing going live tomorrow or a custom architectural project, we respond within hours.
              </p>

              {/* Contact Card */}
              <div
                style={{
                  backgroundColor: 'var(--color-linen)',
                  padding: '2rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border)',
                  marginBottom: '2.5rem'
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                    <Phone size={18} className="icon-gold" style={{ marginTop: '0.2rem' }} />
                    <div>
                      <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-muted)', fontWeight: 700 }}>
                        Call / Text Herman
                      </div>
                      <a href={`tel:${COMPANY.phoneClean}`} style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-dark)' }}>
                        {COMPANY.phone}
                      </a>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                    <Mail size={18} className="icon-gold" style={{ marginTop: '0.2rem' }} />
                    <div>
                      <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-muted)', fontWeight: 700 }}>
                        General & Business Inquiries
                      </div>
                      <a href={`mailto:${COMPANY.email}`} style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-dark)' }}>
                        {COMPANY.email}
                      </a>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                    <Mail size={18} className="icon-gold" style={{ marginTop: '0.2rem' }} />
                    <div>
                      <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-muted)', fontWeight: 700 }}>
                        Booking & Tour Inquiries
                      </div>
                      <a href={`mailto:${COMPANY.bookingEmail}`} style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-dark)' }}>
                        {COMPANY.bookingEmail}
                      </a>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                    <MapPin size={18} className="icon-gold" style={{ marginTop: '0.2rem' }} />
                    <div>
                      <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-muted)', fontWeight: 700 }}>
                        Studio Office Address
                      </div>
                      <span style={{ fontSize: '0.95rem', color: 'var(--color-stone)' }}>
                        {COMPANY.address}
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                    <Clock size={18} className="icon-gold" style={{ marginTop: '0.2rem' }} />
                    <div>
                      <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-muted)', fontWeight: 700 }}>
                        Working Hours
                      </div>
                      <span style={{ fontSize: '0.95rem', color: 'var(--color-stone)' }}>
                        {COMPANY.hours}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Prominent Inquiry Form */}
            <div
              className="reveal reveal-right"
              style={{
                backgroundColor: 'var(--color-white)',
                padding: 'clamp(2rem, 4vw, 3rem)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-card)'
              }}
            >
              <h3 style={{ fontSize: '1.75rem', marginBottom: '0.5rem', color: 'var(--color-dark)' }}>
                Send An Inquiry / Request Shoot
              </h3>
              <p style={{ fontSize: '0.95rem', marginBottom: '1.75rem' }}>
                Fill out the form below. We will check our photographer schedule and get back to you within 24 hours.
              </p>

              {successMsg && (
                <div className="form-feedback success">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                    <CheckCircle size={18} /> Message Successfully Delivered
                  </div>
                  {successMsg}
                </div>
              )}

              {errorMsg && (
                <div className="form-feedback error">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                    <AlertCircle size={18} /> Submission Error
                  </div>
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={handleChange}
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-name">
                      Full Name <span className="required-star">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      placeholder="e.g. David Miller"
                      value={formData.name}
                      onChange={handleChange}
                      className="form-input"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-email">
                      Email Address <span className="required-star">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      placeholder="david@realty.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="form-input"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-phone">
                      Phone Number
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      name="phone"
                      placeholder="(647) 000-0000"
                      value={formData.phone}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-service">
                      Inquiry Type / Service
                    </label>
                    <select
                      id="contact-service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option value="Residential Real Estate Photography">Residential Real Estate Photography</option>
                      <option value="Video & Photo Package ($280 CAD)">Video & Photo Package ($280 CAD)</option>
                      <option value="Premium Walkthrough Video Package ($420 CAD)">Premium Walkthrough Video Package ($420 CAD)</option>
                      <option value="Commercial & Architectural Shoot">Commercial & Architectural Shoot</option>
                      <option value="3D Matterport & Floor Plans">3D Matterport & Floor Plans</option>
                      <option value="Professional Realtor Headshots ($250 CAD)">Professional Realtor Headshots ($250 CAD)</option>
                      <option value="General Question / Custom Consultation">General Question / Custom Consultation</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-location">
                      Property Location / City
                    </label>
                    <input
                      id="contact-location"
                      type="text"
                      name="location"
                      placeholder="e.g. Markham, Richmond Hill, Toronto"
                      value={formData.location}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-date">
                      Target Shoot Date
                    </label>
                    <input
                      id="contact-date"
                      type="date"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group full-width">
                    <label className="form-label" htmlFor="contact-message">
                      Your Message / Shoot Details <span className="required-star">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      placeholder="Tell us about the property, square footage, staging status, or specific architectural features you would like emphasized..."
                      value={formData.message}
                      onChange={handleChange}
                      className="form-textarea"
                      required
                    />
                  </div>
                </div>

                <div style={{ marginTop: '1.75rem' }}>
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary"
                    style={{ width: '100%' }}
                  >
                    {loading ? (
                      <>
                        <Loader2 size={16} className="animate-spin" /> Sending Inquiry...
                      </>
                    ) : (
                      'Send Inquiry by Email'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
