import { motion } from 'framer-motion';

const CTASection = ({ 
  icon: IconComponent, 
  title, 
  subtitle, 
  primaryButton, 
  secondaryButton,
  backgroundColor = 'var(--text-dark)' 
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
      className="py-20 px-4 text-white"
      style={{ backgroundColor }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      variants={containerVariants}
    >
      <div className="max-w-4xl mx-auto text-center">
        {IconComponent && (
          <motion.div variants={itemVariants}>
            <IconComponent className="w-16 h-16 mx-auto mb-6 text-[var(--accent)]" />
          </motion.div>
        )}
        
        <motion.h2 
          variants={itemVariants}
          className="text-5xl font-playball text-[var(--accent)] mb-6"
        >
          {title}
        </motion.h2>
        
        <motion.p 
          variants={itemVariants}
          className="text-xl font-sans mb-8 leading-relaxed"
        >
          {subtitle}
        </motion.p>
        
        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          {primaryButton && (
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(0,0,0,0.2)" }}
              whileTap={{ scale: 0.95 }}
              onClick={primaryButton.onClick}
              className="bg-[var(--accent)] text-[var(--text-dark)] px-8 py-4 rounded-full font-semibold text-lg hover:bg-white transition-all duration-300"
            >
              {primaryButton.text}
            </motion.button>
          )}
          
          {secondaryButton && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={secondaryButton.onClick}
              className="border-2 border-[var(--accent)] text-[var(--accent)] px-8 py-4 rounded-full font-semibold text-lg hover:bg-[var(--accent)] hover:text-[var(--text-dark)] transition-all duration-300"
            >
              {secondaryButton.text}
            </motion.button>
          )}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default CTASection;