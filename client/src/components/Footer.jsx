import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { COMPANY } from '../data/siteData';

function InstagramIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  );
}

function YoutubeIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/>
      <polygon points="10 15 15 12 10 9 10 15" fill="currentColor"/>
    </svg>
  );
}

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {
  const currentYear = CURRENT_YEAR;

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Col 1: Brand */}
          <div className="footer-brand-col">
            <Link to="/" aria-label="Studio GTA Home">
              <img
                src="/images/logo.png"
                alt="Studio GTA"
                width="140"
                height="48"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
            </Link>
            <p>
              Professional real estate photography, HDR imaging, 4K walkthrough video, and architectural media for leading realtors across the Greater Toronto Area.
            </p>
            <div className="footer-social-links">
              <a
                href={COMPANY.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn"
                aria-label="Studio GTA on Instagram"
              >
                <InstagramIcon size={18} />
              </a>
              <a
                href={COMPANY.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn"
                aria-label="Studio GTA on YouTube"
              >
                <YoutubeIcon size={18} />
              </a>
            </div>
          </div>

          {/* Col 2: Explore */}
          <div>
            <h4 className="footer-heading">Explore</h4>
            <ul className="footer-links-list">
              <li><Link to="/portfolio">Featured Portfolio</Link></li>
              <li><Link to="/services">Media Services</Link></li>
              <li><Link to="/packages">Pricing & Packages</Link></li>
              <li><Link to="/contact">Check Availability</Link></li>
            </ul>
          </div>

          {/* Col 3: Company */}
          <div>
            <h4 className="footer-heading">Company</h4>
            <ul className="footer-links-list">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Studio GTA</Link></li>
              <li><Link to="/contact">Get In Touch</Link></li>
              <li><a href={`tel:${COMPANY.phoneClean}`}>Direct Call: {COMPANY.phone}</a></li>
            </ul>
          </div>

          {/* Col 4: Contact & Operations */}
          <div>
            <h4 className="footer-heading">Contact & Studio</h4>
            <ul className="footer-contact-list">
              <li className="footer-contact-item">
                <Phone size={16} className="icon" />
                <a href={`tel:${COMPANY.phoneClean}`}>{COMPANY.phone}</a>
              </li>
              <li className="footer-contact-item">
                <Mail size={16} className="icon" />
                <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
              </li>
              <li className="footer-contact-item">
                <MapPin size={16} className="icon" />
                <span>{COMPANY.address}</span>
              </li>
              <li className="footer-contact-item">
                <Clock size={16} className="icon" />
                <span>{COMPANY.hours}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <div>
            © {currentYear} {COMPANY.name} REAL ESTATE MEDIA. ALL RIGHTS RESERVED.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <span>{COMPANY.serviceArea}</span>
            <span>•</span>
            <Link to="/packages" style={{ color: 'var(--color-gold)' }}>View Packages</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
