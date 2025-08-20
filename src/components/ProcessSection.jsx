// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const ProcessSection = ({ title, subtitle, steps }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const stepVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: { duration: 1, ease: "easeInOut", delay: 0.5 }
    }
  };

  return (
    <motion.section 
      className="py-20 bg-[var(--accent)]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto px-4">
        <motion.div variants={stepVariants} className="text-center mb-16">
          <span className="inline-block bg-[var(--text-dark)] text-[var(--accent)] px-6 py-2 rounded-full font-playball text-xl mb-4">
            How It Works
          </span>
          <h2 className="text-5xl font-playball text-[var(--text-dark)] mb-6">
            {title}
          </h2>
          <p className="text-xl font-sans text-[var(--text-dark)] max-w-3xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection line */}
          <motion.div 
            className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-[var(--text-dark)] origin-left"
            variants={lineVariants}
            style={{ transform: 'translateY(-50%)' }}
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <motion.div
                  key={index}
                  variants={stepVariants}
                  whileHover={{ y: -10, scale: 1.05 }}
                  className="text-center group"
                >
                  {/* Step number and icon */}
                  <div className="relative mx-auto mb-6 w-24 h-24">
                    <div className="w-24 h-24 bg-[var(--text-dark)] rounded-full flex items-center justify-center group-hover:bg-white transition-all duration-300 shadow-lg">
                      <IconComponent className="w-10 h-10 text-[var(--accent)] group-hover:text-[var(--text-dark)] transition-colors duration-300" />
                    </div>
                    
                    {/* Step number */}
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-[var(--accent)] rounded-full flex items-center justify-center border-4 border-white group-hover:bg-[var(--text-dark)] group-hover:text-[var(--accent)] transition-all duration-300">
                      <span className="text-sm font-bold">{index + 1}</span>
                    </div>
                  </div>

                  <h3 className="text-2xl font-playball text-[var(--text-dark)] mb-4 group-hover:text-white transition-colors duration-300">
                    {step.title}
                  </h3>
                  
                  <p className="font-sans text-[var(--text-dark)]/80 leading-relaxed group-hover:text-white transition-colors duration-300">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default ProcessSection;