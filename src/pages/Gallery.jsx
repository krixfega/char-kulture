import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Camera, Filter, Grid3x3 } from 'lucide-react';
import HeroSection from '../components/Hero';
import GalleryFilter from '../components/GalleryFilter';
import MasonryGrid from '../components/MasonryGrid';
import Lightbox from '../components/Lightbox';
import Footer from '../components/Footer';

// Import actual images
import galleryHero from '../assets/gallery./gallery-hero.jpg';
import privateEvent1 from '../assets/gallery./private-event-1.jpg';
import privateEvent2 from '../assets/gallery./private-event-2.jpg';
import privateEvent3 from '../assets/gallery./private-event-3.jpg';
import wedding1 from '../assets/gallery./wedding-1.jpg';
import wedding2 from '../assets/gallery./wedding-2.jpg';
import wedding3 from '../assets/gallery./wedding-3.jpg';
import corporate1 from '../assets/gallery./corporate-1.jpg';
import corporate2 from '../assets/gallery./corporate-2.jpg';
import dish1 from '../assets/gallery./dish-1.jpg';
import dish2 from '../assets/gallery./dish-2.jpg';
import dish3 from '../assets/gallery./dish-3.jpg';
import dish4 from '../assets/gallery./dish-4.jpg';
import dish5 from '../assets/gallery./dish-5.jpg';
import dish6 from '../assets/gallery./dish-6.jpg';
import behindScenes1 from '../assets/gallery./behind-the-scenes-1.jpg';
import behindScenes2 from '../assets/gallery./behind-the-scenes-2.jpg';
import behindScenes3 from '../assets/gallery./behind-the-scenes-3.jpg';
import farmVisit1 from '../assets/gallery./farm-visit-1.jpg';
import farmVisit2 from '../assets/gallery./farm-visit-2.jpg';

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  // Gallery images data
  const allImages = [
    {
      id: 1,
      src: dish1,
      alt: 'Artisan plated appetizer',
      title: 'Seasonal Appetizer',
      description: 'Fresh local ingredients artfully presented',
      category: 'food',
      height: 400
    },
    {
      id: 2,
      src: privateEvent1,
      alt: 'Intimate dinner party setup',
      title: 'Private Dinner Party',
      description: 'Elegant table setting for 8 guests',
      category: 'private-events',
      height: 600
    },
    {
      id: 3,
      src: wedding1,
      alt: 'Wedding reception catering',
      title: 'Garden Wedding Reception',
      description: 'Outdoor catering with floral arrangements',
      category: 'weddings',
      height: 500
    },
    {
      id: 4,
      src: dish2,
      alt: 'Gourmet main course',
      title: 'Farm-to-Table Entree',
      description: 'Locally sourced beef with seasonal vegetables',
      category: 'food',
      height: 350
    },
    {
      id: 5,
      src: corporate1,
      alt: 'Corporate event buffet',
      title: 'Executive Lunch',
      description: 'Professional catering for 50 attendees',
      category: 'corporate',
      height: 450
    },
    {
      id: 6,
      src: behindScenes1,
      alt: 'Chef preparing dishes',
      title: 'Kitchen in Action',
      description: 'Our team preparing for a large event',
      category: 'behind-scenes',
      height: 550
    },
    {
      id: 7,
      src: dish3,
      alt: 'Decadent dessert',
      title: 'Artisan Dessert',
      description: 'House-made chocolate tart with berry compote',
      category: 'food',
      height: 380
    },
    {
      id: 8,
      src: wedding2,
      alt: 'Wedding cake cutting ceremony',
      title: 'Wedding Celebration',
      description: 'Custom three-tier cake with fresh flowers',
      category: 'weddings',
      height: 650
    },
    {
      id: 9,
      src: farmVisit1,
      alt: 'Visiting local farm',
      title: 'Farm Partnership',
      description: 'Selecting fresh ingredients with our farmers',
      category: 'behind-scenes',
      height: 420
    },
    {
      id: 10,
      src: dish4,
      alt: 'Colorful salad presentation',
      title: 'Garden Fresh Salad',
      description: 'Mixed greens with edible flowers',
      category: 'food',
      height: 320
    },
    {
      id: 11,
      src: privateEvent2,
      alt: 'Cocktail hour setup',
      title: 'Cocktail Reception',
      description: 'Passed hors d\'oeuvres and signature cocktails',
      category: 'private-events',
      height: 480
    },
    {
      id: 12,
      src: corporate2,
      alt: 'Corporate retreat catering',
      title: 'Corporate Retreat',
      description: 'All-day catering for team building event',
      category: 'corporate',
      height: 400
    },
    {
      id: 13,
      src: dish5,
      alt: 'Pasta course presentation',
      title: 'Handmade Pasta',
      description: 'Fresh linguine with truffle oil and herbs',
      category: 'food',
      height: 360
    },
    {
      id: 14,
      src: behindScenes2,
      alt: 'Team plating dishes',
      title: 'Plating Perfection',
      description: 'Our chefs ensuring every detail is perfect',
      category: 'behind-scenes',
      height: 520
    },
    {
      id: 15,
      src: wedding3,
      alt: 'Wedding dinner service',
      title: 'Wedding Dinner Service',
      description: 'Elegant plated dinner for 120 guests',
      category: 'weddings',
      height: 580
    },
    {
      id: 16,
      src: dish6,
      alt: 'Specialty cocktail',
      title: 'Signature Cocktail',
      description: 'House-crafted cocktail with fresh garnish',
      category: 'food',
      height: 440
    },
    {
      id: 17,
      src: farmVisit2,
      alt: 'Harvesting fresh herbs',
      title: 'Herb Garden Visit',
      description: 'Picking fresh herbs for evening service',
      category: 'behind-scenes',
      height: 390
    },
    {
      id: 18,
      src: privateEvent3,
      alt: 'Anniversary celebration',
      title: 'Anniversary Dinner',
      description: 'Romantic private dining experience',
      category: 'private-events',
      height: 460
    }
  ];

  // Categories for filtering
  const categories = [
    { id: 'all', name: 'All', count: allImages.length },
    { id: 'food', name: 'Our Dishes', count: allImages.filter(img => img.category === 'food').length },
    { id: 'weddings', name: 'Weddings', count: allImages.filter(img => img.category === 'weddings').length },
    { id: 'private-events', name: 'Private Events', count: allImages.filter(img => img.category === 'private-events').length },
    { id: 'corporate', name: 'Corporate', count: allImages.filter(img => img.category === 'corporate').length },
    { id: 'behind-scenes', name: 'Behind Scenes', count: allImages.filter(img => img.category === 'behind-scenes').length }
  ];

  // Filter images based on active category
  const filteredImages = useMemo(() => {
    if (activeCategory === 'all') return allImages;
    return allImages.filter(image => image.category === activeCategory);
  }, [activeCategory]);

  // Lightbox navigation
  const handleImageClick = (imageId) => {
    const index = filteredImages.findIndex(img => img.id === imageId);
    setLightboxIndex(index);
  };

  const handleLightboxClose = () => {
    setLightboxIndex(null);
  };

  const handleLightboxNavigate = (direction) => {
    if (direction === 'next') {
      setLightboxIndex((prev) => 
        prev === filteredImages.length - 1 ? 0 : prev + 1
      );
    } else {
      setLightboxIndex((prev) => 
        prev === 0 ? filteredImages.length - 1 : prev - 1
      );
    }
  };

  const handleExploreGallery = () => {
    document.getElementById('gallery-content').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[var(--primary-bg)]">
      {/* Hero Section */}
      <HeroSection
        pretitle="Our Gallery"
        title="A Visual Feast"
        subtitle="Explore our culinary artistry through stunning imagery of our dishes, events, and behind-the-scenes moments that showcase our passion for exceptional food experiences."
        buttonText="Explore Gallery"
        onButtonClick={handleExploreGallery}
        backgroundImage={galleryHero}
        showScrollIndicator={true}
      />

      {/* Gallery Stats */}
      <motion.section 
        className="py-16 bg-[var(--text-dark)] text-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="lg:!max-w-[1200px] 2xl:!max-w-[1500px] mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="group"
            >
              <Camera className="w-12 h-12 mx-auto mb-4 text-[var(--accent)] group-hover:text-white transition-colors duration-300" />
              <h3 className="text-3xl font-playball text-[var(--accent)] mb-2">500+</h3>
              <p className="font-sans">Photos Captured</p>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="group"
            >
              <Grid3x3 className="w-12 h-12 mx-auto mb-4 text-[var(--accent)] group-hover:text-white transition-colors duration-300" />
              <h3 className="text-3xl font-playball text-[var(--accent)] mb-2">50+</h3>
              <p className="font-sans">Events Documented</p>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="group"
            >
              <Filter className="w-12 h-12 mx-auto mb-4 text-[var(--accent)] group-hover:text-white transition-colors duration-300" />
              <h3 className="text-3xl font-playball text-[var(--accent)] mb-2">6</h3>
              <p className="font-sans">Categories</p>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="group"
            >
              <div className="w-12 h-12 mx-auto mb-4 bg-[var(--accent)] rounded-full flex items-center justify-center group-hover:bg-white transition-colors duration-300">
                <span className="text-[var(--text-dark)] font-bold text-lg group-hover:text-[var(--accent)]">♥</span>
              </div>
              <h3 className="text-3xl font-playball text-[var(--accent)] mb-2">1K+</h3>
              <p className="font-sans">Memories Created</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Gallery Content */}
      <section id="gallery-content" className="py-20 px-4">
        <div className="lg:!max-w-[1200px] 2xl:!max-w-[1500px] mx-auto">
          {/* Gallery Header */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block bg-[var(--text-dark)] text-[var(--accent)] px-6 py-2 rounded-full font-playball text-xl mb-4">
              Browse Collection
            </span>
            <h2 className="text-5xl font-playball text-[var(--text-dark)] mb-6">
              Moments Worth Savoring
            </h2>
            <p className="text-xl font-sans text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Each image tells a story of culinary excellence, from intimate gatherings to grand celebrations
            </p>
          </motion.div>

          {/* Filter Buttons */}
          <GalleryFilter
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />

          {/* Masonry Grid */}
          <MasonryGrid
            images={filteredImages}
            onImageClick={handleImageClick}
          />

          {/* Load More Button */}
          <motion.div 
            className="text-center mt-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.button
              className="bg-[var(--text-dark)] text-[var(--accent)] px-8 py-4 rounded-full font-semibold text-lg hover:bg-[var(--accent)] hover:text-[var(--text-dark)] transition-all duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Load More Images
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Instagram Feed Section */}
      <motion.section 
        className="py-20 bg-[var(--accent)]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="lg:!max-w-[1200px] 2xl:!max-w-[1500px] mx-auto px-4 text-center">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block bg-[var(--text-dark)] text-[var(--accent)] px-6 py-2 rounded-full font-playball text-xl mb-4">
              Follow Us
            </span>
            <h2 className="text-5xl font-playball text-[var(--text-dark)] mb-6">
              @CharKulture
            </h2>
            <p className="text-xl font-sans text-[var(--text-dark)] mb-8 max-w-3xl mx-auto leading-relaxed">
              Stay updated with our latest culinary creations and behind-the-scenes moments on Instagram
            </p>
            
            <motion.button
              className="bg-[var(--text-dark)] text-[var(--accent)] px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-[var(--text-dark)] transition-all duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Follow on Instagram
            </motion.button>
          </motion.div>

          {/* Instagram Preview Grid */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {allImages.slice(0, 6).map((image, index) => (
              <motion.div
                key={`instagram-${image.id}`}
                className="aspect-square rounded-lg overflow-hidden group cursor-pointer"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="w-8 h-8 mx-auto mb-2">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Lightbox */}
      <Lightbox
        images={filteredImages}
        currentIndex={lightboxIndex}
        onClose={handleLightboxClose}
        onNavigate={handleLightboxNavigate}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Gallery;