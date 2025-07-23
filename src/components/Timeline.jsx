import { useState } from 'react';
import { motion } from 'framer-motion';

const TimelineSection = ({ pretitle, title, stories }) => {
  const [activeStory, setActiveStory] = useState(0);

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

  return (
    <motion.section 
      className="py-20 px-4"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div variants={itemVariants} className="text-center mb-16">
          <span className="inline-block bg-[var(--text-dark)] text-[var(--accent)] px-6 py-2 rounded-full font-playball text-xl mb-4">
            {pretitle}
          </span>
          <h2 className="text-5xl font-playball text-[var(--text-dark)] mb-6">
            {title}
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Timeline Navigation */}
          <motion.div variants={slideInLeft} className="space-y-6">
            {stories.map((story, index) => (
              <motion.div
                key={index}
                className={`p-6 rounded-lg cursor-pointer transition-all duration-300 ${
                  activeStory === index 
                    ? 'bg-[var(--accent)] text-[var(--text-dark)] shadow-lg' 
                    : 'bg-white hover:bg-gray-50'
                }`}
                onClick={() => setActiveStory(index)}
                whileHover={{ x: 10, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center font-bold text-lg ${
                    activeStory === index 
                      ? 'bg-[var(--text-dark)] text-[var(--accent)]' 
                      : 'bg-[var(--accent)] text-[var(--text-dark)]'
                  }`}>
                    {story.year}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-playball mb-2">{story.title}</h3>
                    <p className="font-sans leading-relaxed">{story.content}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Story Image */}
          <motion.div 
            variants={slideInRight}
            className="relative h-96 lg:h-[600px] rounded-lg overflow-hidden shadow-2xl"
          >
            <motion.img
              key={activeStory}
              src={stories[activeStory].image}
              alt={stories[activeStory].title}
              className="w-full h-full object-cover"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default TimelineSection;