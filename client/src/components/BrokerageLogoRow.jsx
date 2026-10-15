import React from 'react';
import { BROKERAGES } from '../data/siteData';

export default function BrokerageLogoRow() {
  return (
    <section className="brokerage-section" aria-label="Trusted by Top Real Estate Brokerages">
      <div className="container">
        <h2 className="brokerage-heading reveal">
          Trusted By Real Estate Professionals Across Leading Brokerages
        </h2>

        <div className="brokerage-grid reveal">
          {BROKERAGES.map((broker, idx) => (
            <div
              key={idx}
              className="brokerage-item"
              title={broker.name}
              style={{
                '--w': `${broker.width}px`,
                '--h': `${broker.height}px`,
                '--img-size': `${broker.imgSize}px`
              }}
            >
              <img
                src={broker.logo}
                alt={`${broker.name} Logo`}
                loading="lazy"
                width={broker.width}
                height={broker.height}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
