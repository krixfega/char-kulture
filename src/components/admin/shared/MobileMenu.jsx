// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';

const MobileMenu = ({ isOpen, onClose, tabs, activeTab, setActiveTab }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 z-50 lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white w-64 h-full shadow-lg"
            initial={{ x: -256 }}
            animate={{ x: 0 }}
            exit={{ x: -256 }}
            onClick={e => e.stopPropagation()}
          >
            <div className="p-4 border-b border-[var(--accent)]/20">
              <h2 className="font-playball text-[var(--text-dark)]">Navigation</h2>
            </div>
            <nav className="p-4">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      onClose();
                    }}
                    className={`w-full flex items-center gap-3 py-3 px-4 rounded-lg font-medium text-sm transition-colors duration-200 font-sans ${
                      activeTab === tab.id
                        ? 'bg-[var(--accent)]/30 text-[var(--text-dark)]'
                        : 'text-[var(--text-dark)]/70 hover:text-[var(--text-dark)] hover:bg-[var(--accent)]/10'
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                    {tab.name}
                  </button>
                );
              })}
            </nav>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;