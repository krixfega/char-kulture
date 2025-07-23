import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';

const ServiceDetailCard = ({ service, index, onLearnMore }) => {
  const isEven = index % 2 === 0;

  const slideInLeft = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const slideInRight = {
    hidden: { x: 50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const scaleIn = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <motion.div
      className={`grid lg:grid-cols-2 gap-12 items-center py-20 ${
        isEven ? '' : 'lg:grid-flow-dense'
      }`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Content */}
      <motion.div
        variants={isEven ? slideInLeft : slideInRight}
        className={`${isEven ? 'lg:order-1' : 'lg:order-2'}`}
      >
        <div className="inline-block bg-[var(--accent)] text-[var(--text-dark)] px-4 py-2 rounded-full font-playball text-lg mb-4">
          {service.category}
        </div>
        
        <h3 className="text-4xl lg:text-5xl font-playball text-[var(--text-dark)] mb-6">
          {service.title}
        </h3>
        
        <p className="text-xl font-sans text-gray-600 mb-8 leading-relaxed">
          {service.description}
        </p>

        {/* Features */}
        <div className="space-y-4 mb-8">
          {service.features.map((feature, idx) => (
            <motion.div
              key={idx}
              className="flex items-start gap-3"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="w-6 h-6 bg-[var(--accent)] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="w-4 h-4 text-[var(--text-dark)]" />
              </div>
              <span className="font-sans text-gray-700">{feature}</span>
            </motion.div>
          ))}
        </div>

        {/* Pricing */}
        <div className="bg-[var(--accent)]/10 p-6 rounded-lg mb-8">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm font-sans text-gray-600">Starting from</span>
              <div className="text-3xl font-playball text-[var(--text-dark)]">
                {service.pricing}
              </div>
            </div>
            <div className="text-right">
              <span className="text-sm font-sans text-gray-600">{service.duration}</span>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex justify-start">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onLearnMore && onLearnMore(service)}
            className="bg-[var(--text-dark)] text-[var(--accent)] px-8 py-4 rounded-full font-semibold text-lg hover:bg-[var(--accent)] hover:text-[var(--text-dark)] transition-all duration-300 flex items-center justify-center gap-2"
          >
            Book Now
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </div>
      </motion.div>

      {/* Image - Hidden on mobile */}
      <motion.div
        variants={isEven ? slideInRight : slideInLeft}
        className={`hidden lg:block relative ${isEven ? 'lg:order-2' : 'lg:order-1'}`}
      >
        <motion.div 
          className="relative h-96 lg:h-[500px] rounded-lg overflow-hidden shadow-2xl"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          
          {/* Floating badge */}
          <motion.div
            className="absolute top-6 left-6 bg-[var(--accent)] text-[var(--text-dark)] px-4 py-2 rounded-full font-semibold"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            {service.badge}
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ServiceDetailCard;