import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { X, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { PACKAGES } from '../data/siteData';

export default function BookingModal({ isOpen, onClose, initialPackageId = '' }) {
  const resolvePackage = (pkgId) => {
    if (pkgId) {
      const match = PACKAGES.find((p) => p.id === pkgId);
      return match ? `${match.name} (${match.price} CAD)` : pkgId;
    }
    return PACKAGES.length > 1 ? `${PACKAGES[1].name} (${PACKAGES[1].price} CAD)` : '';
  };

  const [formData, setFormData] = useState(() => ({
    name: '',
    email: '',
    phone: '',
    package: resolvePackage(initialPackageId),
    propertyAddress: '',
    preferredDate: '',
    preferredTime: 'Morning (9 AM - 12 PM)',
    propertySize: '',
    notes: '',
    honeypot: ''
  }));

  const [prevPackageId, setPrevPackageId] = useState(initialPackageId);
  if (prevPackageId !== initialPackageId) {
    setPrevPackageId(initialPackageId);
    setFormData((prev) => ({ ...prev, package: resolvePackage(initialPackageId) }));
  }

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const successTimerRef = useRef(null);
  const previousFocusRef = useRef(null);

  // Manage body scroll lock and focus restoration safely
  useEffect(() => {
    if (!isOpen) return;

    previousFocusRef.current = document.activeElement;
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
      if (previousFocusRef.current && typeof previousFocusRef.current.focus === 'function') {
        previousFocusRef.current.focus({ preventScroll: true });
      }
    };
  }, [isOpen]);

  // Clear timer when component unmounts
  useEffect(() => {
    return () => {
      if (successTimerRef.current) {
        clearTimeout(successTimerRef.current);
      }
    };
  }, []);

  const handleClose = useCallback(() => {
    if (successTimerRef.current) {
      clearTimeout(successTimerRef.current);
    }
    setSuccessMsg('');
    setErrorMsg('');
    onClose();
  }, [onClose]);

  // Trap escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleClose]);

  if (!isOpen) return null;
  if (typeof document === 'undefined') return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    // Clear any existing dismissal timer before starting new submission
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

    if (!formData.phone.trim() || formData.phone.trim().length < 7) {
      setErrorMsg('Please enter a valid contact phone number.');
      return;
    }

    if (!formData.propertyAddress.trim()) {
      setErrorMsg('Please provide the property address or city.');
      return;
    }

    setLoading(true);

    try {
      const API_BASE = import.meta.env.VITE_API_URL || '';
      const res = await fetch(`${API_BASE}/api/book-package`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSuccessMsg(data.message || 'Your shoot booking request has been submitted!');
        setFormData({
          name: '',
          email: '',
          phone: '',
          package: '',
          propertyAddress: '',
          preferredDate: '',
          preferredTime: 'Morning (9 AM - 12 PM)',
          propertySize: '',
          notes: '',
          honeypot: ''
        });

        // Automatically dismiss success message after approximately 1.5 seconds and close modal
        successTimerRef.current = setTimeout(() => {
          setSuccessMsg('');
          onClose();
        }, 1500);
      } else {
        setErrorMsg(data.error || 'Failed to submit booking. Please call 647-300-0315.');
      }
    } catch (err) {
      console.error('Booking submission error:', err);
      setErrorMsg('Network error. Please call us at 647-300-0315 or email tour@studiogta.ca.');
    } finally {
      setLoading(false);
    }
  };

  return createPortal(
    <div className="modal-backdrop" onClick={handleClose} role="dialog" aria-modal="true" aria-labelledby="booking-modal-title">
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="modal-close-btn"
          onClick={handleClose}
          aria-label="Close booking modal"
        >
          <X size={20} />
        </button>

        <div className="modal-header">
          <div className="eyebrow">
            <span className="eyebrow-dot" />
            <span>Schedule A Shoot</span>
          </div>
          <h3 id="booking-modal-title">Book A Photography Session</h3>
          <p style={{ fontSize: '0.95rem', marginTop: '0.25rem' }}>
            Submit your listing details below. Our coordinator will contact you promptly to confirm availability and lock in your appointment.
          </p>
        </div>

        {successMsg && (
          <div className="form-feedback success">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, marginBottom: '0.25rem' }}>
              <CheckCircle size={18} /> Booking Request Received
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

        {!successMsg && (
          <form onSubmit={handleSubmit}>
            {/* Honeypot field */}
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
              {/* Package Selection */}
              <div className="form-group full-width">
                <label className="form-label" htmlFor="package-select">
                  Selected Package <span className="required-star">*</span>
                </label>
                <select
                  id="package-select"
                  name="package"
                  value={formData.package}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  <option value="">Select a Photography Package...</option>
                  {PACKAGES.map((pkg) => (
                    <option key={pkg.id} value={`${pkg.name} (${pkg.price} CAD)`}>
                      {pkg.name} — {pkg.price} CAD ({pkg.sizeLimit})
                    </option>
                  ))}
                  <option value="Commercial & Hotels Shoot (Custom Quote)">
                    Commercial & Hotels Shoot (Custom Quote)
                  </option>
                  <option value="Professional Headshot Session ($250 CAD)">
                    Professional Headshot Session ($250 CAD)
                  </option>
                  <option value="Custom Photography / Video Package">
                    Custom Photography / Video Package
                  </option>
                </select>
              </div>

              {/* Full Name */}
              <div className="form-group">
                <label className="form-label" htmlFor="client-name">
                  Your Full Name <span className="required-star">*</span>
                </label>
                <input
                  id="client-name"
                  type="text"
                  name="name"
                  placeholder="e.g. Sarah Jenkins"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>

              {/* Email Address */}
              <div className="form-group">
                <label className="form-label" htmlFor="client-email">
                  Email Address <span className="required-star">*</span>
                </label>
                <input
                  id="client-email"
                  type="email"
                  name="email"
                  placeholder="realtor@brokerage.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>

              {/* Phone Number */}
              <div className="form-group">
                <label className="form-label" htmlFor="client-phone">
                  Phone Number <span className="required-star">*</span>
                </label>
                <input
                  id="client-phone"
                  type="tel"
                  name="phone"
                  placeholder="(647) 000-0000"
                  value={formData.phone}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>

              {/* Property Address */}
              <div className="form-group">
                <label className="form-label" htmlFor="property-address">
                  Property Address / City <span className="required-star">*</span>
                </label>
                <input
                  id="property-address"
                  type="text"
                  name="propertyAddress"
                  placeholder="e.g. 120 Bay Street, Toronto"
                  value={formData.propertyAddress}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>

              {/* Preferred Shoot Date */}
              <div className="form-group">
                <label className="form-label" htmlFor="shoot-date">
                  Preferred Shoot Date
                </label>
                <input
                  id="shoot-date"
                  type="date"
                  name="preferredDate"
                  value={formData.preferredDate}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              {/* Preferred Time Window */}
              <div className="form-group">
                <label className="form-label" htmlFor="shoot-time">
                  Preferred Time Window
                </label>
                <select
                  id="shoot-time"
                  name="preferredTime"
                  value={formData.preferredTime}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="Morning (9 AM - 12 PM)">Morning (9:00 AM – 12:00 PM)</option>
                  <option value="Afternoon (12 PM - 3 PM)">Afternoon (12:00 PM – 3:00 PM)</option>
                  <option value="Late Afternoon (3 PM - 6 PM)">Late Afternoon (3:00 PM – 6:00 PM)</option>
                  <option value="Twilight / Sunset Session">Twilight / Sunset Session</option>
                  <option value="Flexible / Next Available">Flexible / Next Available</option>
                </select>
              </div>

              {/* Property Size */}
              <div className="form-group full-width">
                <label className="form-label" htmlFor="property-size">
                  Estimated Property Size (Sq Ft)
                </label>
                <input
                  id="property-size"
                  type="text"
                  name="propertySize"
                  placeholder="e.g. Under 2,500 sq ft, 3,200 sq ft, etc."
                  value={formData.propertySize}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              {/* Notes */}
              <div className="form-group full-width">
                <label className="form-label" htmlFor="shoot-notes">
                  Lockbox / Access Details or Special Instructions
                </label>
                <textarea
                  id="shoot-notes"
                  name="notes"
                  placeholder="Lockbox code, tenant notice, specific architectural features to highlight..."
                  value={formData.notes}
                  onChange={handleChange}
                  className="form-textarea"
                />
              </div>
            </div>

            <div style={{ marginTop: '1.75rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary"
                style={{ flexGrow: 1 }}
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Submitting Request...
                  </>
                ) : (
                  'Request Booking'
                )}
              </button>
              <button
                type="button"
                onClick={handleClose}
                className="btn btn-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {successMsg && (
          <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <button type="button" onClick={handleClose} className="btn btn-primary">
              Done
            </button>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
