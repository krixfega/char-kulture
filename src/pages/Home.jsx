import { NavLink } from 'react-router-dom';
import './Home.css';
import ServiceCard from '../components/ServiceCard';
import Menu from '../components/Menu';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import heroImg  from '../assets/img/hero.png';
import aboutImg from '../assets/Food-tray-delivery.jpg';
import privateChef   from '../assets/Private-dining.jpg';
import eventCatering from '../assets/Event-catering.jpg';
import trayDelivery  from '../assets/Food-tray-delivery.jpg';
import farmToTable   from '../assets/Breakfast-tray.jpg';

export default function Home() {
  const services = [
    { 
      title: 'Private Dining', 
      img: privateChef, 
      desc: 'At Char, the private dining experience extends far beyond food preparation - it is art; curated for your pleasure. From menu planning to the complexities of guest interaction, we study the finer details of premium hospitality. We excel at adapting to diverse palettes, whether guests have allergies, dietary restrictions, or specific preferences, all without compromising on flavor and presentation. Our expertise in timing ensures each course is served at optimal temperature while creating the perfect ambiance through lighting, music, and decor that transforms spaces into intimate, enchanting experiences.', 
      slug: 'private-chef',
      id: 'private-chef' 
    },
    { 
      title: 'Social & Corporate Events Catering', 
      img: eventCatering, 
      desc: 'For social and corporate events, we create an experience that goes far beyond food - it\'s the tableware, decoration, and presentation that makes it memorable. Whether it\'s a canapé-style cocktail hour, buffet spread, or plated fine dining for stylish weddings, product launches, baby showers, team retreats, or executive luncheons, we optimize every detail. Our ability to scale from intimate private dining for 10 to breakfast for 100 sets us apart, all without ever compromising on quality. Food feeds the soul of a gathering, and we take pride in our role achieving this excellence.', 
      slug: 'event-catering',
      id: 'event-catering' 
    },
    { 
      title: 'Food Tray Deliveries', 
      img: trayDelivery, 
      desc: 'We\'ve set up exceptional customer service and efficient operations to ensure our food tray deliveries bring you all the comfort that comes with complete culinary experiences. Each tray is expertly curated and customized to your request and need, perfect for birthdays, picnic hangouts, thank-you gestures, or just to say "I\'m thinking of you". The variety of flavors combine beautifully to tell a story, with options available for individuals, couples, families, or picnic packages that transform any occasion into something special.', 
      slug: 'tray-deliveries',
      id: 'tray-delivery' 
    },
    { 
      title: 'Breakfast Tray Delivery', 
      img: farmToTable,
      desc: 'Breakfast is the most important meal of the day, and starting your day with something beautiful means you\'ll go ahead with a smile. Our breakfast trays at Char Kulture are prepared with the intricacies and skill this important ritual deserves, filled with freshness, flavor, and positive energy. Whether it\'s tea or coffee, omelette or scrambled eggs, or shakshuka paired with naan bread, every detail matters. Perfect for breakfast in bed for a loved one or as a thoughtful gift to a colleague, each tray can be customized to fit dietary preferences, themes, or include a special handwritten message delivered with love and warmth.', 
      slug: 'breakfast-delivery',
      id: 'breakfast-delivery' 
    },
  ];

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

      {/* Services Section */}
      <section className="services">
        <div className="services-pretitle mb-6">Our Services</div>
        <h2 className="services-title">Our Specialty</h2>

        {/* Desktop Carousel */}
        <div className="services-carousel desktop-only">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={3}
            navigation={{
              nextEl: '.swiper-button-next-custom',
              prevEl: '.swiper-button-prev-custom',
            }}
            pagination={{ 
              clickable: true,
              el: '.swiper-pagination-custom'
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            loop={true}
            breakpoints={{
              1024: { slidesPerView: 3, spaceBetween: 30 },
              768: { slidesPerView: 2, spaceBetween: 20 },
            }}
            className="services-swiper"
          >
            {services.map((service) => (
              <SwiperSlide key={service.slug}>
                <NavLink 
                  to={`/services#${service.id}`} 
                  className="service-carousel-link"
                >
                  <ServiceCard {...service} isCarousel={true} />
                </NavLink>
              </SwiperSlide>
            ))}
          </Swiper>
          
          {/* Custom Navigation */}
          <div className="swiper-button-prev-custom">‹</div>
          <div className="swiper-button-next-custom">›</div>
          <div className="swiper-pagination-custom"></div>
        </div>

        {/* Mobile Stack */}
        <div className="services-stack mobile-only">
          {services.map((service, index) => (
            <NavLink 
              key={service.slug} 
              to={`/services#${service.id}`}
              className="service-stack-link"
            >
              <ServiceCard {...service} isMobile={true} />
            </NavLink>
          ))}
        </div>
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