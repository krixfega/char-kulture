// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const StatsSection = ({ stats, backgroundColor = 'var(--text-dark)' }) => {
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

  const scaleIn = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <motion.section 
      className="py-20 text-white"
      style={{ backgroundColor }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <motion.div 
                key={index}
                variants={scaleIn}
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center group cursor-pointer"
              >
                <div className="w-20 h-20 mx-auto mb-4 bg-[var(--accent)] rounded-full flex items-center justify-center group-hover:bg-white transition-all duration-300">
                  <IconComponent className="w-10 h-10 text-[var(--text-dark)] group-hover:text-[var(--accent)] transition-colors duration-300" />
                </div>
                <motion.h3 
                  className="text-4xl font-playball text-[var(--accent)] mb-2"
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                >
                  {stat.number}
                </motion.h3>
                <p className="font-sans text-lg">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
};

export default StatsSection;