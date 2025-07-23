import { motion } from 'framer-motion';

const GalleryFilter = ({ categories, activeCategory, onCategoryChange }) => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div 
      className="flex flex-wrap justify-center gap-4 mb-12"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {categories.map((category) => (
        <motion.button
          key={category.id}
          variants={itemVariants}
          onClick={() => onCategoryChange(category.id)}
          className={`px-6 py-3 rounded-full font-semibold text-lg transition-all duration-300 ${
            activeCategory === category.id
              ? 'bg-[var(--text-dark)] text-[var(--accent)] shadow-lg'
              : 'bg-white text-[var(--text-dark)] hover:bg-[var(--accent)] hover:text-[var(--text-dark)] border-2 border-[var(--text-dark)]'
          }`}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          {category.name}
          <span className="ml-2 text-sm opacity-70">
            ({category.count})
          </span>
        </motion.button>
      ))}
    </motion.div>
  );
};

export default GalleryFilter;