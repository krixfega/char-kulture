// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Edit3, Eye, Trash2, Heart, User } from 'lucide-react';

const PostsTable = ({ posts, loading, onEdit, onDelete }) => {
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-lg border border-[var(--accent)]/20 p-8 text-center">
        <div className="w-8 h-8 border-2 border-[var(--dark-btn)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-[var(--text-dark)]/70 font-sans">Loading posts...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-[var(--accent)]/20">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[var(--primary-bg)] border-b border-[var(--accent)]/20">
            <tr>
              <th className="text-left p-3 lg:p-4 font-semibold text-[var(--text-dark)] font-sans">Title</th>
              <th className="text-left p-3 lg:p-4 font-semibold text-[var(--text-dark)] hidden sm:table-cell font-sans">Author</th>
              <th className="text-left p-3 lg:p-4 font-semibold text-[var(--text-dark)] hidden md:table-cell font-sans">Category</th>
              <th className="text-left p-3 lg:p-4 font-semibold text-[var(--text-dark)] font-sans">Status</th>
              <th className="text-left p-3 lg:p-4 font-semibold text-[var(--text-dark)] hidden lg:table-cell font-sans">Stats</th>
              <th className="text-left p-3 lg:p-4 font-semibold text-[var(--text-dark)] font-sans">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post, index) => (
              <motion.tr
                key={post.id}
                className="border-b border-[var(--accent)]/10 hover:bg-[var(--primary-bg)]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
              >
                <td className="p-3 lg:p-4">
                  <div>
                    <h3 className="font-semibold text-[var(--text-dark)] text-sm lg:text-base font-sans">{post.title}</h3>
                    <p className="text-xs lg:text-sm text-[var(--text-dark)]/70 truncate max-w-xs font-sans">{post.excerpt}</p>
                  </div>
                </td>
                <td className="p-3 lg:p-4 hidden sm:table-cell">
                  <span className="text-[var(--text-dark)]/70 text-sm font-sans">
                    {post.author || 'Unknown'}
                  </span>
                </td>
                <td className="p-3 lg:p-4 hidden sm:table-cell">
                  <span className="bg-[var(--accent)]/30 text-[var(--text-dark)] px-2 py-1 rounded-full text-xs font-semibold font-sans">
                    {post.category}
                  </span>
                </td>
                <td className="p-3 lg:p-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold font-sans ${
                    post.published 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-[var(--accent)]/50 text-[var(--text-dark)]'
                  }`}>
                    {post.published ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="p-3 lg:p-4 hidden lg:table-cell">
                  <div className="flex items-center gap-4 text-sm text-[var(--text-dark)]/70">
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {post.views}
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      {post.likes}
                    </span>
                  </div>
                </td>
                <td className="p-3 lg:p-4">
                  <div className="flex items-center gap-2">
                    <motion.button
                      onClick={() => onEdit(post)}
                      className="text-[var(--dark-btn)] hover:text-[var(--dark-btn)]/70 transition-colors duration-200 p-1"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Edit3 className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      onClick={() => window.open(`/blog/${post.id}`, '_blank')}
                      className="text-green-600 hover:text-green-800 transition-colors duration-200 p-1"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Eye className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      onClick={() => onDelete(post.id)}
                      className="text-red-600 hover:text-red-800 transition-colors duration-200 p-1"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </motion.button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PostsTable;