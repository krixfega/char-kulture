// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Eye, Heart, User } from 'lucide-react';

// Update the RecentPosts component to show author info
const RecentPosts = ({ posts }) => {
  const recentPosts = posts.slice(0, 3);

  return (
    <div className="bg-white rounded-lg p-4 lg:p-6 shadow-lg border border-[var(--accent)]/20">
      <h3 className="text-lg lg:text-xl font-playball text-[var(--text-dark)] mb-4">
        Recent Posts
      </h3>
        
      <div className="space-y-4">
        {recentPosts.map((post, index) => (
          <motion.div
            key={index}
            className="flex items-center justify-between p-3 bg-[var(--primary-bg)] rounded-lg"
            whileHover={{ backgroundColor: 'var(--accent)', opacity: 1 }}
          >
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-[var(--text-dark)] truncate font-sans">
                {post.title}
              </h4>
              <div className="flex items-center gap-4 text-sm text-[var(--text-dark)]/70 mt-1">
                <span className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  {post.views}
                </span>
                <span className="flex items-center gap-1">
                  <Heart className="w-4 h-4" />
                  {post.likes}
                </span>
                <span className="flex items-center gap-1">
                  <User className="w-3 h-3" />
                  {post.author || 'Unknown'}
                </span>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className={`px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap font-sans ${
                post.published 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-[var(--accent)]/30 text-[var(--text-dark)]'
              }`}>
                {post.published ? 'Published' : 'Draft'}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RecentPosts;