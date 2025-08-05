import { useState } from 'react';
import { Calendar, MessageSquare, ChefHat, Truck, Utensils, Users, Clock, Award } from 'lucide-react';
import HeroSection from '../components/Hero';
import ServicesGrid from '../components/ServicesGrid';
import ServiceDetailCard from '../components/ServiceDetailCard';
import ProcessSection from '../components/ProcessSection';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';

// Import actual images
import privateChefImg from '../assets/services/private-chef.jpg';
import eventCateringImg from '../assets/services/event-catering.jpg';
import trayDeliveryImg from '../assets/services/tray-delivery.jpg';
import farmToTableImg from '../assets/services/farm-to-table.jpg';
import servicesHeroImg from '../assets/services/services-hero.jpg';
import chefCookingImg from '../assets/services/chef-cooking.jpg';
import eventSetupImg from '../assets/services/event-setup.jpg';
import freshIngredientsImg from '../assets/services/fresh-ingredients.jpg';
import deliveryImg from '../assets/services/delivery.jpg';

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);

  // Services data
  const services = [
    {
      id: 'private-chef',
      title: 'Private Chef',
      category: 'Personal',
      shortDescription: 'Intimate dining experiences crafted in your home with personalized menus.',
      description: 'Transform your dining room into a world-class restaurant with our private chef service. Our experienced chefs create bespoke menus tailored to your preferences, dietary requirements, and special occasions.',
      image: privateChefImg,
      pricing: '$200/person',
      duration: '3-4 hours',
      badge: 'Most Popular',
      features: [
        'Personalized menu consultation',
        'Fresh ingredients sourced daily',
        'Professional chef and sous chef',
        'Complete setup and cleanup',
        'Wine pairing recommendations',
        'Dietary accommodation available'
      ]
    },
    {
      id: 'event-catering',
      title: 'Event Catering',
      category: 'Events',
      shortDescription: 'Full-service catering for weddings, corporate events, and celebrations.',
      description: 'Make your special event unforgettable with our comprehensive catering services. From intimate gatherings to grand celebrations, we handle everything from menu planning to full-service execution.',
      image: eventCateringImg,
      pricing: '$85/person',
      duration: 'Full day',
      badge: 'Full Service',
      features: [
        'Custom menu design',
        'Professional service staff',
        'Complete event coordination',
        'Elegant presentation and setup',
        'Bar service available',
        'Flexible venue options'
      ]
    },
    {
      id: 'tray-delivery',
      title: 'Tray Deliveries',
      category: 'Delivery',
      shortDescription: 'Ready-to-eat gourmet meals delivered fresh to your doorstep.',
      description: 'Enjoy restaurant-quality meals in the comfort of your home with our convenient tray delivery service. Perfect for busy families, office meetings, or when you want exceptional food without the fuss.',
      image: trayDeliveryImg,
      pricing: '$45/tray',
      duration: 'Same day',
      badge: 'Convenient',
      features: [
        'Weekly menu selection',
        'Fresh daily preparation',
        'Eco-friendly packaging',
        'Contactless delivery',
        'Subscription discounts',
        'Corporate bulk orders'
      ]
    },
    {
      id: 'farm-to-table',
      title: 'Farm-to-Table',
      category: 'Specialty',
      shortDescription: 'Seasonal menus featuring the freshest local ingredients.',
      description: 'Experience the pure flavors of locally-sourced, seasonal ingredients with our farm-to-table service. We partner directly with local farms to bring you the freshest, most sustainable dining experience.',
      image: farmToTableImg,
      pricing: '$120/person',
      duration: '2-3 hours',
      badge: 'Sustainable',
      features: [
        'Direct farm partnerships',
        'Seasonal menu rotation',
        'Sustainable practices',
        'Educational farm stories',
        'Zero-waste commitment',
        'Local producer support'
      ]
    }
  ];

  // Process steps
  const processSteps = [
    {
      icon: MessageSquare,
      title: 'Consultation',
      description: 'We discuss your needs, preferences, and vision for the perfect dining experience.'
    },
    {
      icon: ChefHat,
      title: 'Menu Design',
      description: 'Our chefs craft a personalized menu using the finest seasonal ingredients.'
    },
    {
      icon: Calendar,
      title: 'Preparation',
      description: 'We handle all the prep work, sourcing, and coordination for your event.'
    },
    {
      icon: Utensils,
      title: 'Experience',
      description: 'Sit back and enjoy an unforgettable culinary experience with your guests.'
    }
  ];

  // Detailed services for the cards section
  const detailedServices = [
    {
      category: 'Signature Experience',
      title: 'Private Chef Service',
      description: 'Indulge in an exclusive culinary journey where our master chefs transform your home into a fine dining destination. Each dish is carefully crafted with seasonal ingredients and presented with artistic flair.',
      image: chefCookingImg,
      pricing: '$200/person',
      duration: 'Full evening',
      badge: 'Premium',
      features: [
        'Personal chef consultation',
        'Market-fresh ingredients',
        'Multi-course tasting menu',
        'Professional plating and service',
        'Wine pairing expertise',
        'Complete kitchen cleanup'
      ]
    },
    {
      category: 'Celebration Catering',
      title: 'Event & Wedding Catering',
      description: 'Create magical moments with our comprehensive event catering service. From intimate anniversaries to grand weddings, we orchestrate every detail to perfection.',
      image: eventSetupImg,
      pricing: '$85/person',
      duration: 'Full event',
      badge: 'Full Service',
      features: [
        'Event planning consultation',
        'Custom menu creation',
        'Professional service team',
        'Elegant table settings',
        'Coordinated timing',
        'Post-event cleanup'
      ]
    },
    {
      category: 'Farm Fresh',
      title: 'Seasonal Farm-to-Table',
      description: 'Experience the purest flavors of each season with ingredients sourced directly from our partner farms. Every meal tells the story of our local agricultural community.',
      image: freshIngredientsImg,
      pricing: '$120/person',
      duration: 'Seasonal menu',
      badge: 'Sustainable',
      features: [
        'Local farm partnerships',
        'Seasonal ingredient focus',
        'Sustainable sourcing',
        'Educational component',
        'Zero-waste approach',
        'Community support'
      ]
    },
    {
      category: 'Convenient Delivery',
      title: 'Gourmet Tray Service',
      description: 'Bring restaurant-quality cuisine to your busy lifestyle with our convenient delivery service. Each tray is prepared fresh daily and delivered with care.',
      image: deliveryImg,
      pricing: '$45/tray',
      duration: 'Same day delivery',
      badge: 'Quick & Fresh',
      features: [
        'Daily fresh preparation',
        'Diverse menu options',
        'Reliable delivery',
        'Eco-friendly packaging',
        'Subscription options',
        'Corporate solutions'
      ]
    }
  ];

  const handleServiceClick = (service) => {
    setSelectedService(service);
    document.getElementById('service-details').scrollIntoView({ behavior: 'smooth' });
  };

  const handleBookService = (service) => {
    // Navigate to booking page with service pre-selected
    window.location.href = `/book?service=${service.id}`;
  };

  const handleBookExperience = () => {
    window.location.href = '/book';
  };

  const handleContactUs = () => {
    window.location.href = '/contact';
  };

  return (
    <div className="min-h-screen bg-[var(--primary-bg)]">
      {/* Hero Section */}
      <HeroSection
        pretitle="Our Services"
        title="Culinary Excellence Delivered"
        subtitle="From intimate private dinners to grand celebrations, we bring exceptional culinary experiences directly to your table with passion, creativity, and uncompromising quality."
        buttonText="Explore Our Services"
        onButtonClick={() => document.getElementById('services-grid').scrollIntoView({ behavior: 'smooth' })}
        backgroundImage={servicesHeroImg}
        showScrollIndicator={true}
      />

      {/* Services Grid */}
      <div id="services-grid">
        <ServicesGrid
          services={services}
          onServiceClick={handleServiceClick}
        />
      </div>

      {/* Process Section */}
      <ProcessSection
        title="Our Seamless Process"
        subtitle="From initial consultation to the final bite, we ensure every step of your culinary journey is perfectly orchestrated"
        steps={processSteps}
      />

      {/* Detailed Service Cards */}
      <div id="service-details" className="py-20 px-4">
        <div className="lg:max-w-[1200px] 2xl:max-w-[1500px] mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block bg-[var(--text-dark)] text-[var(--accent)] px-6 py-2 rounded-full font-playball text-xl mb-4">
              Service Details
            </span>
            <h2 className="text-5xl font-playball text-[var(--text-dark)] mb-6">
              Exceptional Experiences Await
            </h2>
          </div>

          {detailedServices.map((service, index) => (
            <ServiceDetailCard
              key={service.title}
              service={service}
              index={index}
              onLearnMore={handleBookService}
            />
          ))}
        </div>
      </div>

      {/* Call to Action */}
      {/* <CTASection
        icon={Award}
        title="Ready to Create Something Extraordinary?"
        subtitle="Let our culinary artisans craft an unforgettable experience that will delight your senses and create lasting memories for you and your guests."
        primaryButton={{
          text: "Book Your Experience",
          onClick: handleBookExperience
        }}
        secondaryButton={{
          text: "Contact Us",
          onClick: handleContactUs
        }}
        backgroundColor="var(--text-dark)"
      />
 */}
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Services;