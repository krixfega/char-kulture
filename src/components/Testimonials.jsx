import { useState, useEffect, useRef } from 'react';
import './Testimonials.css'; 
import { WOW } from 'wowjs';

// Import Swiper and modules
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function Testimonials() {
  // Testimonial data
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      profession: "Corporate Event Planner",
      image: "/img/testimonial-1.jpg", // Replace with your actual image paths
      text: "Char Kulture transformed our annual conference with their amazing farm-to-table catering. The presentation was stunning and every guest raved about the quality."
    },
    {
      id: 2,
      name: "Michael Chen",
      profession: "Wedding Client",
      image: "/img/testimonial-2.jpg", 
      text: "Having Chef Andre cook for our wedding reception was the highlight of our special day. The personal touches and attention to detail made all the difference."
    },
    {
      id: 3,
      name: "Priya Patel",
      profession: "Weekly Meal Delivery Customer",
      image: "/img/testimonial-3.jpg",
      text: "The weekly tray deliveries have been a lifesaver for our busy family. Fresh, delicious meals with unique flavors that we'd never cook ourselves."
    },
    {
      id: 4,
      name: "Robert Williams",
      profession: "Private Dinner Host",
      image: "/img/testimonial-4.jpg",
      text: "My in-home private chef experience was exceptional. Chef Lisa created a 5-course meal that impressed all my guests and made me look like the perfect host."
    }
  ];

  // Animation classes for WOW.js integration

useEffect(() => {
  const wow = new WOW({ boxClass: 'wow', animateClass: 'animated', offset: 0, mobile: true, live: true });
  wow.init();
}, []);


  return (
    <div className="container-fluid py-6">
      <div className="container">
        <div className="text-center wow bounceInUp" data-wow-delay="0.1s">
          <small className="d-inline-block fw-bold text-dark text-uppercase bg-light border border-primary rounded-pill px-4 py-1 mb-3">Testimonial</small>
          <h1 className="display-5 mb-5">What Our Customers Say!</h1>
        </div>

        {/* First carousel row */}
        <Swiper
          modules={[Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            // When window width is >= 576px
            576: {
              slidesPerView: 2,
              spaceBetween: 20
            },
            // When window width is >= 992px
            992: {
              slidesPerView: 3,
              spaceBetween: 30
            }
          }}
          loop={true}
          freeMode={true}
          autoplay={{
            delay: 700, // Adjusted for a slower speed
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
          }}
          speed={3000}
          allowTouchMove={false} // optional
          className="testimonial-carousel mb-4"
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <div className="testimonial-item rounded bg-light">
                <div className="d-flex mb-3">
                  <img 
                    src={testimonial.image} 
                    className="img-fluid rounded-circle flex-shrink-0" 
                    alt={testimonial.name}
                  />
                  <div className="position-absolute" style={{ top: '15px', right: '20px' }}>
                    <i className="fa fa-quote-right fa-2x"></i>
                  </div>
                  <div className="ps-3 my-auto">
                    <h4 className="mb-0">{testimonial.name}</h4>
                    <p className="m-0">{testimonial.profession}</p>
                  </div>
                </div>
                <div className="testimonial-content">
                  <div className="d-flex">
                    <i className="fas fa-star text-primary"></i>
                    <i className="fas fa-star text-primary"></i>
                    <i className="fas fa-star text-primary"></i>
                    <i className="fas fa-star text-primary"></i>
                    <i className="fas fa-star text-primary"></i>
                  </div>
                  <p className="fs-5 m-0 pt-3">{testimonial.text}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Second carousel row */}
        <Swiper
          modules={[Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            // When window width is >= 576px
            576: {
              slidesPerView: 2,
              spaceBetween: 20
            },
            // When window width is >= 992px
            992: {
              slidesPerView: 3,
              spaceBetween: 30
            }
          }}
          loop={true}
          freeMode={true}
          autoplay={{
            delay: 700, // Adjusted for a slower speed
            reverseDirection: true,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
          }}
          speed={3000}
          allowTouchMove={false} // optional
          className="testimonial-carousel mb-4"
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={`second-${testimonial.id}`}>
              <div className="testimonial-item rounded bg-light">
                <div className="d-flex mb-3">
                  <img 
                    src={testimonial.image} 
                    className="img-fluid rounded-circle flex-shrink-0" 
                    alt={testimonial.name}
                  />
                  <div className="position-absolute" style={{ top: '15px', right: '20px' }}>
                    <i className="fa fa-quote-right fa-2x"></i>
                  </div>
                  <div className="ps-3 my-auto">
                    <h4 className="mb-0">{testimonial.name}</h4>
                    <p className="m-0">{testimonial.profession}</p>
                  </div>
                </div>
                <div className="testimonial-content">
                  <div className="d-flex">
                    <i className="fas fa-star text-primary"></i>
                    <i className="fas fa-star text-primary"></i>
                    <i className="fas fa-star text-primary"></i>
                    <i className="fas fa-star text-primary"></i>
                    <i className="fas fa-star text-primary"></i>
                  </div>
                  <p className="fs-5 m-0 pt-3">{testimonial.text}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}