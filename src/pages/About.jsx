import { Award, Users, Clock, Utensils, Heart, Star, ChefHat, Leaf } from 'lucide-react';
import HeroSection from '../components/Hero';
import StatsSection from '../components/Stats';
import TimelineSection from '../components/Timeline';
import ValuesSection from '../components/ValueSection';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';

// Image paths
import chefPortrait from '../assets/img/Chef.jpg';
import kitchenAction from '../assets/img/Kitchen-action.jpg';
import farmVisit from '../assets/img/farm.jpg';
import teamPhoto from '../assets/img/Team.jpg';

const About = () => {
  // Data for components
  const stats = [
    { number: "10+", label: "Years of Excellence", icon: Clock },
    { number: "500+", label: "Events Catered", icon: Utensils },
    { number: "1000+", label: "Happy Families", icon: Users },
    { number: "15+", label: "Local Farm Partners", icon: Leaf }
  ];

  const stories = [
    {
      title: "The Beginning",
      year: "2014",
      content: "Started in a small kitchen with a dream to bring authentic, locally-sourced cuisine to families across the city.",
      image: chefPortrait
    },
    {
      title: "Farm Partnerships",
      year: "2017", 
      content: "Established direct relationships with local farms, ensuring the freshest ingredients and supporting our community.",
      image: farmVisit
    },
    {
      title: "Growing Family",
      year: "2020",
      content: "Expanded our team to include passionate chefs and event specialists who share our vision for culinary excellence.",
      image: teamPhoto
    },
    {
      title: "Today",
      year: "2025",
      content: "Serving hundreds of families with private chef services, catering memorable events, and delivering farm-fresh meals.",
      image: kitchenAction
    }
  ];

  const values = [
    {
      icon: Leaf,
      title: "Sustainability",
      description: "We source locally and seasonally, supporting our community while reducing our environmental impact."
    },
    {
      icon: Heart,
      title: "Passion",
      description: "Every dish is crafted with love and attention to detail, bringing joy to your dining experience."
    },
    {
      icon: Users,
      title: "Community", 
      description: "Building connections through food, from our local farmers to your family table."
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Committed to the highest standards in ingredients, preparation, and presentation."
    }
  ];

  // Event handlers
  const handleDiscoverJourney = () => {
    document.getElementById('timeline').scrollIntoView({ behavior: 'smooth' });
  };

  const handleBookExperience = () => {
    // Navigate to booking page
    window.location.href = '/book';
  };

  const handleViewServices = () => {
    // Navigate to services page
    window.location.href = '/services';
  };

  return (
    <div className="min-h-screen bg-[var(--primary-bg)]">
      {/* Hero Section */}
      <HeroSection
        pretitle="Our Story"
        title="Where Culture Meets Cuisine"
        subtitle="A journey of flavors, traditions, and community that started in 2014 with a simple belief: great food brings people together."
        buttonText="Discover Our Journey"
        onButtonClick={handleDiscoverJourney}
        backgroundImage={chefPortrait}
        showScrollIndicator={true}
      />

      {/* Stats Section */}
      <StatsSection 
        stats={stats}
        backgroundColor="var(--text-dark)"
      />

      {/* Timeline Section */}
      <div id="timeline">
        <TimelineSection
          pretitle="Our Journey"
          title="A Story Worth Sharing"
          stories={stories}
        />
      </div>

      {/* Values Section */}
      <ValuesSection
        pretitle="Our Values"
        title="What Drives Us"
        subtitle="Every decision we make is guided by these core principles that shape our culinary philosophy"
        values={values}
        backgroundColor="var(--accent)"
      />

      {/* Call to Action Section */}
      <CTASection
        icon={ChefHat}
        title="Ready to Experience Char Kulture?"
        subtitle="Let us bring our passion for exceptional cuisine directly to your table. Whether it's an intimate dinner or a grand celebration, we're here to make it unforgettable."
        primaryButton={{
          text: "Book Your Experience",
          onClick: handleBookExperience
        }}
        secondaryButton={{
          text: "View Our Services",
          onClick: handleViewServices
        }}
        backgroundColor="var(--text-dark)"
      />

        {/* Footer Section */}
        <Footer />
    </div>
  );
};

export default About;