import React from 'react';
import './ServiceCard.css';

export default function ServiceCard({ title, img, desc }) {
  return (
    <div className="service-card">
      <div className="service-card-img-wrapper">
        <img src={img} alt={title} className="service-card-img" />
      </div>
      <h3 className="service-card-title">{title}</h3>
      <p className="service-card-desc">{desc}</p>
    </div>
  );
}