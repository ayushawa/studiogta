import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Menu, X, Calendar, ArrowRight } from 'lucide-react';
import { COMPANY } from '../data/siteData';
import useScrollNavbar from '../hooks/useScrollNavbar';

export default function Header({ onOpenBooking }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Intelligent scroll navbar: never hides when mobileMenuOpen is true
  const { isVisible, isScrolled } = useScrollNavbar(mobileMenuOpen);

  const closeMenu = () => setMobileMenuOpen(false);

  const handleCheckAvailability = (e) => {
    e.preventDefault();
    closeMenu();
    if (onOpenBooking) {
      onOpenBooking();
    } else {
      navigate('/contact');
    }
  };

  return (
    <>
      <header
        className={`site-header ${isScrolled ? 'scrolled' : ''} ${isVisible ? 'header-visible' : 'header-hidden'}`}
        role="banner"
      >
        <div className="container navbar">
          {/* Logo */}
          <Link to="/" className="brand-link" onClick={closeMenu} aria-label="Studio GTA Home">
            <img
              src="/images/logo.png"
              alt="Studio GTA Real Estate Media"
              className="brand-logo-img"
              width="140"
              height="48"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav aria-label="Main Navigation">
            <ul className="nav-links">
              <li className="nav-link-item">
                <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
                  Home
                </NavLink>
              </li>
              <li className="nav-link-item">
                <NavLink to="/about" className={({ isActive }) => (isActive ? 'active' : '')}>
                  About
                </NavLink>
              </li>
              <li className="nav-link-item">
                <NavLink to="/portfolio" className={({ isActive }) => (isActive ? 'active' : '')}>
                  Portfolio
                </NavLink>
              </li>
              <li className="nav-link-item">
                <NavLink to="/services" className={({ isActive }) => (isActive ? 'active' : '')}>
                  Services
                </NavLink>
              </li>
              <li className="nav-link-item">
                <NavLink to="/packages" className={({ isActive }) => (isActive ? 'active' : '')}>
                  Packages
                </NavLink>
              </li>
              <li className="nav-link-item">
                <NavLink to="/contact" className={({ isActive }) => (isActive ? 'active' : '')}>
                  Contact
                </NavLink>
              </li>
            </ul>
          </nav>

          {/* Desktop CTAs */}
          <div className="nav-actions">
            <button
              type="button"
              onClick={handleCheckAvailability}
              className="nav-cta-text"
              aria-label="Check shoot availability"
            >
              <Calendar size={16} />
              <span>Check Availability</span>
            </button>
            <Link to="/packages" className="btn btn-primary nav-cta-btn">
              Book Now
            </Link>
          </div>

          {/* Mobile Menu Hamburger Toggle */}
          <button
            type="button"
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <div
        className={`mobile-drawer-overlay ${mobileMenuOpen ? 'open' : ''}`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* Mobile Navigation Drawer */}
      <aside className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`} aria-label="Mobile Navigation">
        <div>
          <div className="mobile-drawer-header">
            <img
              src="/images/logo.png"
              alt="Studio GTA"
              className="brand-logo-img"
              style={{ height: '36px' }}
            />
            <button
              type="button"
              className="modal-close-btn"
              onClick={closeMenu}
              aria-label="Close menu"
            >
              <X size={22} />
            </button>
          </div>

          <ul className="mobile-nav-list">
            <li>
              <NavLink to="/" end onClick={closeMenu} className={({ isActive }) => (isActive ? 'active' : '')}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" onClick={closeMenu} className={({ isActive }) => (isActive ? 'active' : '')}>
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/portfolio" onClick={closeMenu} className={({ isActive }) => (isActive ? 'active' : '')}>
                Portfolio
              </NavLink>
            </li>
            <li>
              <NavLink to="/services" onClick={closeMenu} className={({ isActive }) => (isActive ? 'active' : '')}>
                Services
              </NavLink>
            </li>
            <li>
              <NavLink to="/packages" onClick={closeMenu} className={({ isActive }) => (isActive ? 'active' : '')}>
                Packages
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" onClick={closeMenu} className={({ isActive }) => (isActive ? 'active' : '')}>
                Contact
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="mobile-drawer-actions">
          <button
            type="button"
            onClick={handleCheckAvailability}
            className="btn btn-secondary"
            style={{ width: '100%' }}
          >
            <Calendar size={16} />
            Check Availability
          </button>
          <Link
            to="/packages"
            onClick={closeMenu}
            className="btn btn-primary"
            style={{ width: '100%' }}
          >
            Book Now
            <ArrowRight size={16} />
          </Link>
          <div style={{ textAlign: 'center', marginTop: '0.75rem', fontSize: '0.85rem' }}>
            <a href={`tel:${COMPANY.phoneClean}`} style={{ color: 'var(--color-gold-deep)', fontWeight: 600 }}>
              {COMPANY.phone}
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}
