import { motion } from 'framer-motion';

const HeroSection = ({ 
  pretitle, 
  title, 
  subtitle, 
  buttonText, 
  onButtonClick, 
  backgroundImage,
  showScrollIndicator = true 
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <motion.section 
      className="relative h-screen flex items-center justify-center bg-gradient-to-r from-[var(--text-dark)] to-[var(--text-dark)]/80 text-white overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="absolute inset-0 bg-black/40 z-10"></div>
      {backgroundImage && (
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        ></div>
      )}
      
      <motion.div 
        className="relative z-20 text-center px-4 max-w-4xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {pretitle && (
          <motion.div 
            variants={itemVariants}
            className="inline-block bg-[var(--accent)] text-[var(--text-dark)] px-6 py-2 rounded-full font-playball text-lg mb-6"
          >
            {pretitle}
          </motion.div>
        )}
        
        <motion.h1 
          variants={itemVariants}
          className="text-6xl md:text-8xl font-playball mb-6 leading-tight"
        >
          {title}
        </motion.h1>
        
        <motion.p 
          variants={itemVariants}
          className="text-xl md:text-2xl font-sans leading-relaxed mb-8 text-[var(--accent)]"
        >
          {subtitle}
        </motion.p>
        
        {buttonText && onButtonClick && (
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <button 
              onClick={onButtonClick}
              className="bg-[var(--accent)] text-[var(--text-dark)] px-8 py-4 rounded-full font-semibold text-lg hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              {buttonText}
            </button>
          </motion.div>
        )}
      </motion.div>

      {showScrollIndicator && (
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-[var(--accent)] rounded-full flex justify-center">
            <div className="w-1 h-3 bg-[var(--accent)] rounded-full mt-2 animate-pulse"></div>
          </div>
        </motion.div>
      )}
    </motion.section>
  );
};

export default HeroSection;