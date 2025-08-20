// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Edit3, Eye, Heart, MessageCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { blogService } from '../../../services/blogService'; 

const StatsGrid = () => {
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalViews: 0,
    totalLikes: 0,
    totalComments: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      
      // Fetch all posts to calculate stats
      const posts = await blogService.getPosts();
      
      const totalPosts = posts.length;
      const totalViews = posts.reduce((sum, post) => sum + (post.views || 0), 0);
      const totalLikes = posts.reduce((sum, post) => sum + (post.likes || 0), 0);
      const totalComments = posts.reduce((sum, post) => sum + (post.commentsCount || 0), 0);
      
      setStats({
        totalPosts,
        totalViews,
        totalLikes,
        totalComments
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const statsData = [
    { 
      label: 'Total Posts', 
      value: loading ? '...' : stats.totalPosts.toString(), 
      icon: Edit3, 
      color: 'bg-[var(--dark-btn)]' 
    },
    { 
      label: 'Total Views', 
      value: loading ? '...' : formatNumber(stats.totalViews), 
      icon: Eye, 
      color: 'bg-green-600' 
    },
    { 
      label: 'Total Likes', 
      value: loading ? '...' : formatNumber(stats.totalLikes), 
      icon: Heart, 
      color: 'bg-red-500' 
    },
    { 
      label: 'Comments', 
      value: loading ? '...' : stats.totalComments.toString(), 
      icon: MessageCircle, 
      color: 'bg-purple-600' 
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {statsData.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <motion.div
              key={index}
              className="bg-white rounded-lg p-4 lg:p-6 shadow-lg border border-[var(--accent)]/20"
              whileHover={{ scale: 1.02, y: -2 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[var(--text-dark)]/70 font-semibold font-sans">{stat.label}</p>
                  <p className="text-2xl lg:text-3xl font-playball text-[var(--text-dark)] mt-1">
                    {stat.value}
                  </p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <IconComponent className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default StatsGrid;