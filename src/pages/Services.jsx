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
      title: 'Private Dining',
      category: 'Personal',
      shortDescription: 'At Char, the private dining experience extends far beyond the preparation of food. It is art; curated for your pleasure.',
      description: 'From our menu planning to the complexities of guest interaction, we are here studying the finer details. To help refine your understanding of cuisine, yes, but also very importantly to learn invaluable lessons about human nature, business relationships, and premium hospitality. As hosts, these experiences have transformed our understanding of cuisine and life itself.',
      image: privateChefImg,
      pricing: '$200/person',
      duration: '3-4 hours',
      badge: 'Most Popular',
      features: [
        'Adapting to Diverse Palates - catering to allergies, vegans, no-carb diets without compromising flavor',
        'Time Management - optimal temperatures, perfect timing, comfortable guest engagement',
        'The Importance of Ambiance - lighting, music, decor that transport guests to intimate spaces',
        'Building Relationships - plotting interactions that lead to deeper connections between guests',
        'Premium hospitality experience',
        'Complete kitchen cleanup'
      ]
    },
    {
      id: 'event-catering',
      title: 'Social & Corporate Events Catering',
      category: 'Events',
      shortDescription: 'For social & corporate events, we create an experience. This is more than just food; it\'s the tableware, the decoration, and presentation.',
      description: 'Whether it\'s a canapé-style cocktail hour, a buffet spread, or plated fine dining, we strive to optimize it into something memorable. Our catering services complement your occasion. Be it stylish weddings, or product launches, baby showers, team retreats, executive luncheons, etc. We can scale from a private dining session of 10 to breakfast for 100, based on your needs, all without ever compromising on quality.',
      image: eventCateringImg,
      pricing: '$85/person',
      duration: 'Full day',
      badge: 'Full Service',
      features: [
        'Stylish weddings and product launches',
        'Baby showers and team retreats',
        'Executive luncheons and corporate events',
        'Scale from 10 to 100+ guests without compromising quality',
        'Canapé-style cocktail hours, buffet spreads, plated fine dining',
        'Premium tableware, decoration, and presentation'
      ]
    },
    {
      id: 'tray-delivery',
      title: 'Food Tray Deliveries',
      category: 'Delivery',
      shortDescription: 'Each tray is a complete culinary experience; it is expertly curated and customized to your request & need.',
      description: 'Our food trays are perfect for birthdays, picnic hangouts, thank-you gestures, or just to say "I\'m thinking of you". And the variety of flavors too! It\'s so beautiful to see how they combine together to tell a story. Our food trays are available for individuals, couples, families, or picnic packages.',
      image: trayDeliveryImg,
      pricing: '$45/tray',
      duration: 'Same day',
      badge: 'Convenient',
      features: [
        'Perfect for birthdays, picnic hangouts, thank-you gestures',
        'Just to say "I\'m thinking of you" moments',
        'Beautiful variety of flavors that tell a story',
        'Individual, couples, families, or picnic packages',
        'Exceptional customer service',
        'Efficient operations and delivery'
      ]
    },
    {
      id: 'breakfast-delivery',
      title: 'Breakfast Tray Delivery',
      category: 'Delivery',
      shortDescription: 'Start your day with something beautiful and you\'ll go on ahead with a smile.',
      description: 'Our breakfast tray at Char Kulture is prepared with the intricacies & skill of this important ritual. We have filled them with freshness, flavor, and positive energy in mind. Whether it\'s breakfast in bed for a loved one or a gift to a colleague, there\'s a lot of thoughtfulness that our tray brings to the table.',
      image: farmToTableImg,
      pricing: '$35/tray',
      duration: 'Morning delivery',
      badge: 'Morning Special',
      features: [
        'Tea. Or is it coffee with you? What does sunshine feel like to you?',
        'Omelette or scrambled? Shakshuka paired with naan bread?',
        'Breakfast in bed for a loved one or gift to a colleague',
        'Customizable to fit dietary preferences, themes, or special messages',
        'All handwritten with love and warmth from Char Kulture',
        'Wake someone up to something unforgettable'
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
      title: 'Private Dining',
      description: 'At Char, the private dining experience extends far beyond the preparation of food. It is art; curated for your pleasure. From our menu planning to the complexities of guest interaction, we are here studying the finer details. These experiences have transformed our understanding of cuisine and life itself.',
      image: chefCookingImg,
      pricing: '$200/person',
      duration: 'Full evening',
      badge: 'Premium',
      features: [
        'Adapting to Diverse Palates - allergies, vegan, no-carb without compromising flavor',
        'Time Management - optimal temperatures and perfect timing',
        'The Importance of Ambiance - lighting, music, decor',
        'Building Relationships - deeper connections between guests',
        'Lessons about human nature and business relationships',
        'Premium hospitality experience'
      ]
    },
    {
      category: 'Event Excellence',
      title: 'Social & Corporate Events Catering',
      description: 'For social & corporate events, we create an experience. This is more than just food; it\'s the tableware, the decoration, and presentation. From canapé-style cocktail hours to plated fine dining, we complement your occasion perfectly.',
      image: eventSetupImg,
      pricing: '$85/person',
      duration: 'Full event',
      badge: 'Full Service',
      features: [
        'Stylish weddings and product launches',
        'Baby showers and team retreats',
        'Executive luncheons and corporate events',
        'Scale from 10 to 100+ without compromising quality',
        'Food feeds the soul of a gathering',
        'Complete tableware and decoration'
      ]
    },
    {
      category: 'Thoughtful Delivery',
      title: 'Food Tray Deliveries',
      description: 'Each tray is a complete culinary experience; it is expertly curated and customized to your request & need. Our food trays are perfect for birthdays, picnic hangouts, thank-you gestures, or just to say "I\'m thinking of you".',
      image: deliveryImg,
      pricing: '$45/tray',
      duration: 'Same day delivery',
      badge: 'Quick & Fresh',
      features: [
        'Perfect for birthdays and picnic hangouts',
        'Thank-you gestures and "thinking of you" moments',
        'Beautiful variety of flavors that tell a story',
        'Individual, couples, families, or picnic packages',
        'Exceptional customer service',
        'Efficient operations'
      ]
    },
    {
      category: 'Morning Ritual',
      title: 'Breakfast Tray Delivery',
      description: 'You\'ve heard it so many times only because it\'s true: "breakfast is the most important meal of the day". Start your day with something beautiful and you\'ll go on ahead with a smile. Our breakfast tray at Char Kulture is prepared with the intricacies & skill of this important ritual.',
      image: freshIngredientsImg,
      pricing: '$35/tray',
      duration: 'Morning delivery',
      badge: 'Morning Special',
      features: [
        'Tea. Or is it coffee with you? What does sunshine feel like?',
        'Omelette or scrambled? Shakshuka paired with naan bread?',
        'Breakfast in bed for a loved one or gift to a colleague',
        'Customizable to dietary preferences, themes, special messages',
        'All handwritten with love and warmth from Char Kulture',
        'Wake someone up to something unforgettable'
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
      {/* <div id="services-grid">
        <ServicesGrid
          services={services}
          onServiceClick={handleServiceClick}
        />
      </div> */}

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