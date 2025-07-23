import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const ServicesGrid = ({ services, onServiceClick }) => {
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

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <motion.section 
      className="py-20 px-4"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div className="text-center mb-16" variants={cardVariants}>
          <span className="inline-block bg-[var(--text-dark)] text-[var(--accent)] px-6 py-2 rounded-full font-playball text-xl mb-4">
            Our Services
          </span>
          <h2 className="text-5xl font-playball text-[var(--text-dark)] mb-6">
            Culinary Excellence at Your Service
          </h2>
          <p className="text-xl font-sans text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From intimate private dinners to grand celebrations, we bring exceptional culinary experiences directly to you
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              variants={cardVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group cursor-pointer"
              onClick={() => onServiceClick && onServiceClick(service)}
            >
              <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Category badge */}
                  <div className="absolute top-4 left-4 bg-[var(--accent)] text-[var(--text-dark)] px-3 py-1 rounded-full text-sm font-semibold">
                    {service.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-playball text-[var(--text-dark)] mb-3 group-hover:text-[var(--accent)] transition-colors duration-300">
                    {service.title}
                  </h3>
                  
                  <p className="font-sans text-gray-600 mb-4 leading-relaxed">
                    {service.shortDescription}
                  </p>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm text-gray-500">Starting from</span>
                      <div className="text-xl font-playball text-[var(--text-dark)]">
                        {service.pricing}
                      </div>
                    </div>
                    
                    <motion.div
                      whileHover={{ x: 5 }}
                      className="text-[var(--accent)] group-hover:text-[var(--text-dark)] transition-colors duration-300"
                    >
                      <ArrowRight className="w-6 h-6" />
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default ServicesGrid;