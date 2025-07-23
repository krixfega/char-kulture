import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Heart, Share2 } from 'lucide-react';

const MasonryGrid = ({ images, onImageClick }) => {
  const [columns, setColumns] = useState(3);
  const [hoveredId, setHoveredId] = useState(null);

  useEffect(() => {
    const updateColumns = () => {
      if (window.innerWidth < 640) setColumns(1);
      else if (window.innerWidth < 1024) setColumns(2);
      else setColumns(3);
    };

    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  // Distribute images across columns for masonry effect
  const distributeImages = () => {
    const cols = Array.from({ length: columns }, () => []);
    const colHeights = Array(columns).fill(0);

    images.forEach((image) => {
      const shortestCol = colHeights.indexOf(Math.min(...colHeights));
      cols[shortestCol].push(image);
      // Approximate height based on aspect ratio
      colHeights[shortestCol] += image.height || 300;
    });

    return cols;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.3 }
    }
  };

  const imageColumns = distributeImages();

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {imageColumns.map((column, colIndex) => (
        <div key={colIndex} className="space-y-6">
          <AnimatePresence mode="popLayout">
            {column.map((image, index) => (
              <motion.div
                key={image.id}
                variants={itemVariants}
                layout
                className="relative group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-2xl transition-shadow duration-300"
                onClick={() => onImageClick(image.id)}
                onMouseEnter={() => setHoveredId(image.id)}
                onMouseLeave={() => setHoveredId(null)}
                whileHover={{ y: -5 }}
              >
                {/* Image */}
                <motion.img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />

                {/* Overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={false}
                  animate={{ opacity: hoveredId === image.id ? 1 : 0 }}
                >
                  {/* Action buttons */}
                  <div className="absolute top-4 right-4 flex gap-2">
                    <motion.button
                      className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-all duration-200"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        // Handle like action
                      }}
                    >
                      <Heart className="w-4 h-4" />
                    </motion.button>
                    
                    <motion.button
                      className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-all duration-200"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        // Handle share action
                      }}
                    >
                      <Share2 className="w-4 h-4" />
                    </motion.button>
                  </div>

                  {/* View button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      className="bg-[var(--accent)] text-[var(--text-dark)] px-6 py-3 rounded-full font-semibold flex items-center gap-2 shadow-lg"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ 
                        scale: hoveredId === image.id ? 1 : 0,
                        opacity: hoveredId === image.id ? 1 : 0
                      }}
                      transition={{ duration: 0.2 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Eye className="w-5 h-5" />
                      View
                    </motion.div>
                  </div>

                  {/* Image info */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <motion.h3 
                      className="text-lg font-playball text-[var(--accent)] mb-1"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ 
                        y: hoveredId === image.id ? 0 : 20,
                        opacity: hoveredId === image.id ? 1 : 0
                      }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    >
                      {image.title}
                    </motion.h3>
                    
                    <motion.p 
                      className="text-sm text-white/80"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ 
                        y: hoveredId === image.id ? 0 : 20,
                        opacity: hoveredId === image.id ? 1 : 0
                      }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                    >
                      {image.description}
                    </motion.p>
                    
                    <motion.div 
                      className="flex items-center gap-2 mt-2"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ 
                        y: hoveredId === image.id ? 0 : 20,
                        opacity: hoveredId === image.id ? 1 : 0
                      }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                    >
                      <span className="text-xs bg-[var(--accent)] text-[var(--text-dark)] px-2 py-1 rounded-full">
                        {image.category}
                      </span>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ))}
    </motion.div>
  );
};

export default MasonryGrid;