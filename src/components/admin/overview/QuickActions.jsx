// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Plus, Upload, Users, BarChart3 } from 'lucide-react';

const QuickActions = ({ setActiveTab }) => {
  const actions = [
    { label: 'Create New Post', icon: Plus, color: 'bg-[var(--dark-btn)]', action: () => setActiveTab('posts') },
    // { label: 'Upload Images', icon: Upload, color: 'bg-green-600', action: () => setActiveTab('gallery') },
    // { label: 'Manage Reviews', icon: Users, color: 'bg-purple-600', action: () => setActiveTab('reviews') },
    // { label: 'View Analytics', icon: BarChart3, color: 'bg-orange-600', action: () => setActiveTab('analytics') }
  ];

  return (
    <div className="bg-white rounded-lg p-4 lg:p-6 shadow-lg border border-[var(--accent)]/20">
      <h3 className="text-lg lg:text-xl font-playball text-[var(--text-dark)] mb-4">
        Quick Actions
      </h3>
      <div className="space-y-3">
        {actions.map((action, index) => {
          const IconComponent = action.icon;
          return (
            <motion.button
              key={index}
              onClick={action.action}
              className={`w-full ${action.color} text-[var(--btn-text)] p-3 rounded-lg font-semibold font-sans flex items-center gap-3 hover:opacity-90 transition-opacity duration-200`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <IconComponent className="w-5 h-5" />
              <span className="text-sm lg:text-base">{action.label}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;