import React from 'react';
import { Phone, Mail, Clock, CheckCircle } from 'lucide-react';
import { COMPANY } from '../data/siteData';

export default function TopBar() {
  return (
    <div className="top-bar">
      <div className="container top-bar-inner">
        {/* Direct Contact Links */}
        <div className="top-bar-contact">
          <div className="top-bar-item">
            <Phone size={13} className="icon-gold" aria-hidden="true" />
            <a href={`tel:${COMPANY.phoneClean}`} aria-label={`Call Studio GTA at ${COMPANY.phone}`}>
              {COMPANY.phone}
            </a>
          </div>

          <span className="top-bar-separator" aria-hidden="true">•</span>

          <div className="top-bar-item">
            <Mail size={13} className="icon-gold" aria-hidden="true" />
            <a href={`mailto:${COMPANY.email}`} aria-label={`Email Studio GTA at ${COMPANY.email}`}>
              {COMPANY.email}
            </a>
          </div>
        </div>

        {/* Genuine Business Trust Points - Always visible on all screens */}
        <div className="top-bar-trust">
          <div className="top-bar-badge" title="Studio GTA 100% Satisfaction Guarantee">
            <CheckCircle size={13} className="icon-gold" aria-hidden="true" />
            <span className="trust-text">{COMPANY.guarantee}</span>
          </div>

          <span className="top-bar-separator" aria-hidden="true">•</span>

          <div className="top-bar-badge" title="Fast MLS Media Delivery">
            <Clock size={13} className="icon-gold" aria-hidden="true" />
            <span className="trust-text">{COMPANY.turnaround}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
