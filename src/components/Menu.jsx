import { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import './Menu.css'; 
import image1 from '../assets/img/menu-01.jpg';
import image2 from '../assets/img/menu-02.jpg';
import image3 from '../assets/img/menu-03.jpg';
import image4 from '../assets/img/menu-04.jpg';
// import image5 from '../assets/img/menu-05.jpg';
import image6 from '../assets/img/menu-06.jpg';
import image7 from '../assets/img/menu-07.jpg';
// import image8 from '../assets/img/menu-08.jpg';
import image9 from '../assets/img/menu-09.jpg';
// import image10 from '../assets/img/menu-10.jpg';

const Menu = () => {
  const [activeTab, setActiveTab] = useState('tab-6');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation when component mounts
    setIsVisible(true);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  // Menu categories
  const categories = [
    { id: 'tab-6', name: 'Starter' },
    { id: 'tab-7', name: 'Main Course' },
    { id: 'tab-8', name: 'Drinks' },
    { id: 'tab-9', name: 'Offers' },
    { id: 'tab-10', name: 'Our Special' },
  ];

  // Sample menu items (you can replace these with your actual data)
  const menuItems = {
    'tab-6': [
      { name: 'Paneer', price: '$90', image: image1, desc: 'Consectetur adipiscing elit sed dwso eiusmod tempor incididunt ut labore.' },
      { name: 'Sweet Potato', price: '$90', image: image2, desc: 'Consectetur adipiscing elit sed dwso eiusmod tempor incididunt ut labore.' },
      { name: 'Sabudana Tikki', price: '$90', image: image3, desc: 'Consectetur adipiscing elit sed dwso eiusmod tempor incididunt ut labore.' },
      { name: 'Pizza', price: '$90', image: image4, desc: 'Consectetur adipiscing elit sed dwso eiusmod tempor incididunt ut labore.' },
    ],
    'tab-7': [
      { name: 'Argentinian', price: '$90', image: image1, desc: 'Consectetur adipiscing elit sed dwso eiusmod tempor incididunt ut labore.' },
      { name: 'Crispy', price: '$90', image: image2, desc: 'Consectetur adipiscing elit sed dwso eiusmod tempor incididunt ut labore.' },
      { name: 'Sabudana Tikki', price: '$90', image: image3, desc: 'Consectetur adipiscing elit sed dwso eiusmod tempor incididunt ut labore.' },
      { name: 'Blooming', price: '$90', image: image4, desc: 'Consectetur adipiscing elit sed dwso eiusmod tempor incididunt ut labore.' },
    ],
    'tab-8': [
      { name: 'Crispy water', price: '$90', image: image1, desc: 'Consectetur adipiscing elit sed dwso eiusmod tempor incididunt ut labore.' },
      { name: 'Juice', price: '$90', image: image2, desc: 'Consectetur adipiscing elit sed dwso eiusmod tempor incididunt ut labore.' },
      { name: 'Orange', price: '$90', image: image3, desc: 'Consectetur adipiscing elit sed dwso eiusmod tempor incididunt ut labore.' },
      { name: 'Apple Juice', price: '$90', image: image4, desc: 'Consectetur adipiscing elit sed dwso eiusmod tempor incididunt ut labore.' },
    ],
    'tab-9': [
      { name: 'Sabudana Tikki', price: '$90', image: image6, desc: 'Consectetur adipiscing elit sed dwso eiusmod tempor incididunt ut labore.' },
      { name: 'Crispy', price: '$90', image: image7, desc: 'Consectetur adipiscing elit sed dwso eiusmod tempor incididunt ut labore.' },
      { name: 'Pizza', price: '$90', image: image9, desc: 'Consectetur adipiscing elit sed dwso eiusmod tempor incididunt ut labore.' },
      { name: 'Bacon', price: '$90', image: image2, desc: 'Consectetur adipiscing elit sed dwso eiusmod tempor incididunt ut labore.' },
    ],
    'tab-10': [
      { name: 'Sabudana Tikki', price: '$90', image: image6, desc: 'Consectetur adipiscing elit sed dwso eiusmod tempor incididunt ut labore.' },
      { name: 'Crispy', price: '$90', image: image7, desc: 'Consectetur adipiscing elit sed dwso eiusmod tempor incididunt ut labore.' },
      { name: 'Pizza', price: '$90', image: image9, desc: 'Consectetur adipiscing elit sed dwso eiusmod tempor incididunt ut labore.' },
      { name: 'Bacon', price: '$90', image: image2, desc: 'Consectetur adipiscing elit sed dwso eiusmod tempor incididunt ut labore.' },
    ],
  };

  return (
    <div className="bg-[var(--primary-bg)] py-16">
      <div className="container mx-auto px-4 lg:!max-w-[1200px] 2xl:!max-w-[1500px]">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block font-bold font-playball text-gray-800 text-xl bg-[var(--primary-bg)] border-2 border-[var(--accent)] rounded-full px-4 py-2 mb-3">
            Our Menu
          </span>
          <h2 className="text-4xl font-bold mb-8">Some of Our Expertly Curated Dishes</h2>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center mb-10 menu-tabs">
          {categories.map((category) => (
            <motion.div 
              key={category.id}
              className="p-2 relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button
                onClick={() => setActiveTab(category.id)}
                className={`flex py-2 px-6 border menu-tab-button ${
                  activeTab === category.id 
                    ? 'border-[var(--accent)] bg-[var(--accent)] text-white' 
                    : 'border-[var(--accent)] bg-white text-gray-800'
                } rounded-full transition-all duration-300 hover:shadow-md`}
              >
                <span className="w-full text-center">{category.name}</span>
              </button>
            </motion.div>
          ))}
        </div>

        {/* Menu Items */}
        <motion.div 
          className="tab-content"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          {Object.keys(menuItems).map((tabId) => (
            <div
              key={tabId}
              className={`${activeTab === tabId ? 'block' : 'hidden'}`}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {menuItems[tabId].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center overflow-hidden menu-item-card hover:shadow-lg hover:rounded-lg transition-shadow duration-300"
                    variants={itemVariants}
                  >
                    <div className="h-24 w-24 flex-shrink-0 menu-item-image">
                      <img 
                        className="h-full w-full object-cover rounded-full m-2" 
                        src={item.image} 
                        alt={item.name}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/api/placeholder/100/100";
                        }}
                      />
                    </div>
                    <div className="w-full flex flex-col text-left p-4">
                      <div className="flex justify-between border-b border-dashed border-[var(--accent)] pb-2 mb-2">
                        <h4 className="font-bold text-lg">{item.name}</h4>
                        <h4 className="font-bold text-[var(--accent)] text-xl">{item.price}</h4>
                      </div>
                      <p className="text-gray-600 text-sm">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Menu;