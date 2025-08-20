// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const ValuesSection = ({ pretitle, title, subtitle, values, backgroundColor = 'var(--accent)' }) => {
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
      className="py-20"
      style={{ backgroundColor }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto px-4">
        <motion.div variants={itemVariants} className="text-center mb-16">
          <span className="inline-block bg-[var(--text-dark)] text-[var(--accent)] px-6 py-2 rounded-full font-playball text-xl mb-4">
            {pretitle}
          </span>
          <h2 className="text-5xl font-playball text-[var(--text-dark)] mb-6">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xl font-sans text-[var(--text-dark)] max-w-3xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          )}
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => {
            const IconComponent = value.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.05 }}
                className="bg-white p-8 rounded-lg text-center group hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <div className="w-16 h-16 mx-auto mb-6 bg-[var(--text-dark)] rounded-full flex items-center justify-center group-hover:bg-[var(--accent)] transition-all duration-300">
                  <IconComponent className="w-8 h-8 text-[var(--accent)] group-hover:text-[var(--text-dark)] transition-colors duration-300" />
                </div>
                <h3 className="text-2xl font-playball text-[var(--text-dark)] mb-4 group-hover:text-[var(--accent)] transition-colors duration-300">
                  {value.title}
                </h3>
                <p className="font-sans text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
};

export default ValuesSection;