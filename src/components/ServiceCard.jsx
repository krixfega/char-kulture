import React from 'react';
import './ServiceCard.css';

export default function ServiceCard({ title, img, desc, isCarousel = false, isMobile = false }) {
  return (
    <div className={`service-card ${isCarousel ? 'service-card-carousel' : ''} ${isMobile ? 'service-card-mobile' : ''}`}>
      {/* ENSURE IMAGE IS ALWAYS RENDERED */}
      <div className="service-card-img-wrapper">
        <img 
          src={img} 
          alt={title} 
          className="service-card-img"
          loading="lazy"
        />
        {isCarousel && <div className="service-card-overlay"></div>}
      </div>
      
      <div className="service-card-content">
        <h3 className="service-card-title">{title}</h3>
        <p className="service-card-desc">{desc}</p>
        {!isMobile && (
          <div className="service-card-cta">
            <span className="learn-more">Learn More →</span>
          </div>
        )}
      </div>
    </div>
  );
}