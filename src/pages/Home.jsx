import { NavLink } from 'react-router-dom';
import './Home.css';
import ServiceCard from '../components/ServiceCard';
import Menu from '../components/Menu';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import heroImg  from '../assets/img/hero.png';
import aboutImg from '../assets/img/about.jpg';
import privateChef   from '../assets/services/private-chef.jpg';
import eventCatering from '../assets/services/event-catering.jpg';
import trayDelivery  from '../assets/services/tray-delivery.jpg';
import farmToTable   from '../assets/services/farm-to-table.jpg';

import gal1 from '../assets/gallery/event-1.jpg';
import gal2 from '../assets/gallery/menu-01.jpg';
import gal3 from '../assets/gallery/menu-02.jpg';
import gal4 from '../assets/gallery/menu-03.jpg';

export default function Home() {
  const services = [
    { 
      title: 'Private Dining', 
      img: privateChef, 
      desc: 'Private dining experience extends far beyond food preparation - it is art; curated for your pleasure.', 
      slug: 'private-chef' 
    },
    { 
      title: 'Social & Corporate Events Catering', 
      img: eventCatering, 
      desc: 'We create an experience. More than just food; it\'s tableware, decoration, and presentation.', 
      slug: 'event-catering' 
    },
    { 
      title: 'Food Tray Deliveries', 
      img: trayDelivery, 
      desc: 'Complete culinary experiences expertly curated for birthdays, thank-you gestures, or just to say "I\'m thinking of you".', 
      slug: 'tray-deliveries' 
    },
    { 
      title: 'Breakfast Tray Delivery', 
      img: farmToTable, // Consider using a breakfast-specific image
      desc: 'Start your day with something beautiful and you\'ll go ahead with a smile. Prepared with intricacies & skill.', 
      slug: 'breakfast-delivery' 
    },
  ];

  const galleryThumbs = [gal1, gal2, gal3, gal4];
  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-pretitle">Welcome to Char Kulture</div>
          <h1 className="hero-title">Where Culinary Art Meets Culture</h1>
          <p className="hero-subtitle">
            Experience bespoke private chef services, unforgettable event catering,
            tray deliveries, and farm-to-table freshness delivered right to you.
          </p>
          <NavLink to="/book" className="btn-cta hero-btn">
            Book Your Experience
          </NavLink>
        </div>
        <div className="hero-image">
          <img src={heroImg} alt="Chef plating a dish" />
        </div>
      </section>

      {/* About / Features */}
      <section className="about">
        <div className="about-image">
          <img src={aboutImg} alt="Our kitchen in action" />
        </div>
        <div className="about-content">
          <h2>Why Choose Char Kulture?</h2>
          <p>
            At Char Kulture, we blend creativity with culture—handcrafting menus that tell a story,
            sourcing only the freshest local ingredients, and delivering a dining experience
            that delights every sense.
          </p>
          <ul className="about-stats">
            <li><strong>10+</strong> Years of Experience</li>
            <li><strong>500+</strong> Events Catered</li>
            <li><strong>100%</strong> Farm-to-Table Sourcing</li>
          </ul>
          <NavLink to="/about" className="btn-cta about-btn">
            Learn More
          </NavLink>
        </div>
      </section>
      <section className="services">
        <div className="services-pretitle mb-6">Our Services</div>
        <h2 className="services-title">Our Specialty</h2>

        {/* 1️⃣ Swiper Carousel */}
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={30}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            0:   { slidesPerView: 1 },  // mobile
            769: { slidesPerView: 3 },  // desktop and up
          }}
        >
          {services.map((s) => (
            <SwiperSlide key={s.slug}>
            <NavLink to={`/services/${s.slug}`} className="service-card-link"></NavLink>
              <ServiceCard {...s} />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
      {/* Gallery Preview */}
      {/* <section className="gallery-preview">
        <div className="gallery-pretitle">Our Gallery</div>
        <h2 className="gallery-title">A Taste of Our Craft</h2>

        <div className="gallery-grid">
          {galleryThumbs.map((src, idx) => (
            <NavLink to="/gallery" key={idx} className="gallery-item">
              <img src={src} alt={`Gallery ${idx + 1}`} />
              <div className="overlay">
                <span className="overlay-icon">🔍</span>
              </div>
            </NavLink>
          ))}
        </div>
      </section> */}

      {/* Menu Component */}
      <Menu />

      {/* Testimonials Component */}
      <Testimonials />

      {/* Footer Component */}
      <Footer />

    </>
  );
}