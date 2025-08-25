import { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Search, Calendar, User, Eye, Heart, MessageCircle, Filter, Image as ImageIcon } from 'lucide-react';
import { blogService } from '../services/blogService';
import HeroSection from '../components/Hero';
import Footer from '../components/Footer';

// Import actual images
import blogHero from '../assets/img/blog-hero.jpg';

const BlogListing = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);

  const categories = [
    { id: 'all', name: 'All Posts', count: 0 },
    { id: 'recipes', name: 'Recipes', count: 0 },
    { id: 'events', name: 'Events', count: 0 },
    { id: 'behind-scenes', name: 'Behind the Scenes', count: 0 },
    { id: 'tips', name: 'Cooking Tips', count: 0 },
    { id: 'ingredients', name: 'Ingredients', count: 0 }
  ];

  // Fallback images for posts without featured images
  const fallbackImages = {
    recipes: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
    events: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=300&fit=crop',
    'behind-scenes': 'https://images.unsplash.com/photo-1556908114-4d5e3ffe-3424?w=400&h=300&fit=crop',
    tips: 'https://images.unsplash.com/photo-1556909114-4f0c62c4c8b7?w=400&h=300&fit=crop',
    ingredients: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
    default: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop'
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    filterPosts();
  }, [posts, searchTerm, selectedCategory]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      console.log('🔍 Fetching published posts...');
      
      const allPosts = await blogService.getPosts();
      console.log('📝 All posts fetched:', allPosts.length);
      
      // Filter for published posts only
      const publishedPosts = allPosts.filter(post => post.published === true);
      console.log('✅ Published posts:', publishedPosts.length);
      
      setPosts(publishedPosts);
    } catch (error) {
      console.error('❌ Error fetching posts:', error);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const filterPosts = () => {
    if (!posts || posts.length === 0) {
      console.log('❌ No posts to filter');
      setFilteredPosts([]);
      return;
    }

    let filtered = [...posts]; // Create a copy
    console.log('🔍 Starting filter with', filtered.length, 'posts');

    // Filter by category first
    if (selectedCategory && selectedCategory !== 'all') {
      filtered = filtered.filter(post => {
        const postCategory = post.category?.toLowerCase().trim();
        const filterCategory = selectedCategory.toLowerCase().trim();
        return postCategory === filterCategory;
      });
      console.log('📂 Category filter applied:', filtered.length, 'posts remain');
    }

    // Filter by search term
    if (searchTerm && searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(post => {
        const titleMatch = post.title?.toLowerCase().includes(searchLower);
        const excerptMatch = post.excerpt?.toLowerCase().includes(searchLower);
        const contentMatch = post.content?.toLowerCase().includes(searchLower);
        
        // Handle tags properly
        let tagMatch = false;
        if (post.tags) {
          if (Array.isArray(post.tags)) {
            tagMatch = post.tags.some(tag => tag?.toLowerCase().includes(searchLower));
          } else if (typeof post.tags === 'string') {
            tagMatch = post.tags.toLowerCase().includes(searchLower);
          }
        }
        
        return titleMatch || excerptMatch || contentMatch || tagMatch;
      });
      console.log('🔍 Search filter applied:', filtered.length, 'posts remain');
    }

    console.log('✅ Final filtered posts:', filtered.length);
    setFilteredPosts(filtered);
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Scroll to top of blog content
    document.getElementById('blog-content').scrollIntoView({ behavior: 'smooth' });
  };

  const Pagination = () => {
    if (totalPages <= 1) return null;

    const getPageNumbers = () => {
      const pages = [];
      const maxVisiblePages = 5;
      
      if (totalPages <= maxVisiblePages) {
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        let startPage = Math.max(1, currentPage - 2);
        let endPage = Math.min(totalPages, currentPage + 2);
        
        if (currentPage <= 3) {
          endPage = 5;
        }
        if (currentPage >= totalPages - 2) {
          startPage = totalPages - 4;
        }
        
        for (let i = startPage; i <= endPage; i++) {
          pages.push(i);
        }
      }
      
      return pages;
    };

    return (
      <motion.div
        className="flex justify-center items-center gap-2 mt-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        {/* Previous Button */}
        <motion.button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 rounded-lg border border-[var(--accent)]/30 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[var(--accent)]/10 transition-colors duration-300 font-sans"
          whileHover={{ scale: currentPage !== 1 ? 1.05 : 1 }}
          whileTap={{ scale: currentPage !== 1 ? 0.95 : 1 }}
        >
          Previous
        </motion.button>

        {/* Page Numbers */}
        {getPageNumbers().map((page) => (
          <motion.button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 font-sans ${
              currentPage === page
                ? 'bg-[var(--accent)] text-[var(--text-dark)]'
                : 'border border-[var(--accent)]/30 hover:bg-[var(--accent)]/10'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {page}
          </motion.button>
        ))}

        {/* Next Button */}
        <motion.button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 rounded-lg border border-[var(--accent)]/30 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[var(--accent)]/10 transition-colors duration-300 font-sans"
          whileHover={{ scale: currentPage !== totalPages ? 1.05 : 1 }}
          whileTap={{ scale: currentPage !== totalPages ? 0.95 : 1 }}
        >
          Next
        </motion.button>
      </motion.div>
    );
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'Recently';
    
    try {
      const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Recently';
    }
  };

  const getPostImage = (post) => {
    if (post.featuredImage) {
      return post.featuredImage;
    }
    return fallbackImages[post.category] || fallbackImages.default;
  };

  const handleExploreBlog = () => {
    document.getElementById('blog-content').scrollIntoView({ behavior: 'smooth' });
  };

    const calculateReadingTime = (content) => {
    if (!content) return 3;
    const wordsPerMinute = 200;
    // Strip HTML tags for word count
    const textContent = content.replace(/<[^>]*>/g, '');
    const wordCount = textContent.split(/\s+/).filter(word => word.length > 0).length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return Math.max(readingTime, 1);
  };


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
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const BlogCard = ({ post, index }) => {
    const [imageError, setImageError] = useState(false);
    const [imageSrc, setImageSrc] = useState(getPostImage(post));

    useEffect(() => {
      // Reset image error state when post changes
      setImageError(false);
      setImageSrc(getPostImage(post));
    }, [post]);

    const handleImageError = () => {
      console.log('Image failed to load, using fallback for:', post.title);
      setImageError(true);
      setImageSrc(fallbackImages[post.category] || fallbackImages.default);
    };
    return (
      <motion.article
        variants={itemVariants}
        whileHover={{ y: -10, scale: 1.02 }}
        className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group border border-[var(--accent)]/10"
      >
        {/* Featured Image */}
        <div className="relative h-48 overflow-hidden bg-[var(--primary-bg)]">
          {!imageError && imageSrc ? (
            <motion.img
              src={imageSrc}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              onError={handleImageError}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[var(--accent)]/20 to-[var(--accent)]/40">
              <div className="text-center">
                <ImageIcon className="w-12 h-12 text-[var(--text-dark)]/50 mx-auto mb-2" />
                <p className="text-sm text-[var(--text-dark)]/70 font-sans">
                  {post.category || 'Blog Post'}
                </p>
              </div>
            </div>
          )}
          
          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className="bg-[var(--accent)] text-[var(--text-dark)] px-3 py-1 rounded-full text-sm font-semibold font-sans capitalize">
              {post.category?.replace('-', ' ') || 'Blog'}
            </span>
          </div>

          {/* Reading Time */}
          <div className="absolute top-4 right-4">
            <span className="bg-black/50 text-white px-2 py-1 rounded text-xs font-sans">
              {calculateReadingTime(post.content)} min read
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Meta Info */}
          <div className="flex items-center justify-between text-sm text-[var(--text-dark)]/70 mb-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {formatDate(post.createdAt)}
              </div>
            </div>
            
            {/* Author with Avatar */}
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-[var(--accent)] rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-[var(--text-dark)]">
                  {(post.author || 'CK').charAt(0).toUpperCase()}
                </span>
              </div>
              <span className="font-medium">
                {post.author || 'Char Kulture'}
              </span>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-xl font-playball text-[var(--text-dark)] mb-3 group-hover:text-[var(--accent)] transition-colors duration-300 line-clamp-2">
            {post.title || 'Untitled Post'}
          </h2>

          {/* Excerpt */}
          <p className="text-[var(--text-dark)]/80 font-sans leading-relaxed mb-4 line-clamp-3">
            {post.excerpt || 'No excerpt available...'}
          </p>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {(Array.isArray(post.tags) ? post.tags : [post.tags]).slice(0, 3).map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="text-xs bg-[var(--accent)]/20 text-[var(--text-dark)] px-2 py-1 rounded font-sans"
                >
                  #{tag}
                </span>
              ))}
              {post.tags.length > 3 && (
                <span className="text-xs text-[var(--text-dark)]/50 px-2 py-1 font-sans">
                  +{post.tags.length - 3} more
                </span>
              )}
            </div>
          )}

          {/* Stats */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-[var(--text-dark)]/70">
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                {post.views || 0}
              </div>
              <div className="flex items-center gap-1">
                <Heart className="w-4 h-4" />
                {post.likes || 0}
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle className="w-4 h-4" />
                {post.commentsCount || 0}
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-[var(--accent)] font-semibold hover:text-[var(--text-dark)] transition-colors duration-300 font-sans"
              onClick={() => window.location.href = `/blog/${post.id}`}
            >
              Read More →
            </motion.button>
          </div>
        </div>
      </motion.article>
    );
  };

  const EmptyState = () => (
    <motion.div
      className="text-center py-16"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className="w-24 h-24 mx-auto mb-6 bg-[var(--accent)]/20 rounded-full flex items-center justify-center">
        <Search className="w-12 h-12 text-[var(--text-dark)]/50" />
      </div>
      <h3 className="text-2xl font-playball text-[var(--text-dark)] mb-4">
        {posts.length === 0 ? 'No posts yet' : 'No posts found'}
      </h3>
      <p className="text-[var(--text-dark)]/70 font-sans mb-6">
        {posts.length === 0 
          ? 'Be the first to create amazing content!' 
          : 'Try adjusting your search terms or selected category'
        }
      </p>
      {posts.length === 0 ? (
        <motion.button
          onClick={() => window.location.href = '/admin'}
          className="bg-[var(--accent)] text-[var(--text-dark)] px-6 py-3 rounded-full font-semibold hover:bg-[var(--text-dark)] hover:text-[var(--accent)] transition-all duration-300 font-sans"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Create First Post
        </motion.button>
      ) : (
        <motion.button
          onClick={() => {
            setSearchTerm('');
            setSelectedCategory('all');
          }}
          className="bg-[var(--accent)] text-[var(--text-dark)] px-6 py-3 rounded-full font-semibold hover:bg-[var(--text-dark)] hover:text-[var(--accent)] transition-all duration-300 font-sans"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Clear Filters
        </motion.button>
      )}
    </motion.div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--primary-bg)] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[var(--accent)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[var(--text-dark)] font-sans">Loading amazing content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--primary-bg)]">
      {/* Hero Section */}
      <HeroSection
        pretitle="Our Blog"
        title="Stories from the Kitchen"
        subtitle="Discover the passion behind our dishes, learn cooking secrets, and get inspired by the stories that make each meal special."
        buttonText="Explore Blog"
        onButtonClick={handleExploreBlog}
        backgroundImage={blogHero}
        showScrollIndicator={true}
      />

      {/* Blog Content */}
      <section id="blog-content" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Search and Filter Bar */}
          <motion.div
            className="bg-white rounded-lg shadow-lg p-6 mb-12 border border-[var(--accent)]/20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[var(--text-dark)]/40" />
                <input
                  type="text"
                  placeholder="Search posts, recipes, tips..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-[var(--accent)]/30 rounded-lg font-sans transition-all duration-300 focus:border-[var(--accent)] focus:outline-none"
                />
              </div>

              {/* Category Filter */}
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-[var(--text-dark)]/40" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-3 border-2 border-[var(--accent)]/30 rounded-lg font-sans transition-all duration-300 focus:border-[var(--accent)] focus:outline-none bg-white"
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Results Count */}
            <div className="mt-4 text-sm text-[var(--text-dark)]/70 font-sans">
              Showing {indexOfFirstPost + 1}-{Math.min(indexOfLastPost, filteredPosts.length)} of {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'}
              {searchTerm && ` for "${searchTerm}"`}
              {selectedCategory !== 'all' && ` in ${categories.find(c => c.id === selectedCategory)?.name}`}
              {totalPages > 1 && ` (Page ${currentPage} of ${totalPages})`}
            </div>
          </motion.div>

          {/* Posts Grid or Empty State */}
          {currentPosts.length > 0 ? (
            <>
              <motion.div
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                {currentPosts.map((post, index) => (
                  <BlogCard key={post.id} post={post} index={index} />
                ))}
              </motion.div>
              <Pagination />
            </>
          ) : (
            <EmptyState />
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      {/* <motion.section
        className="py-16 bg-[var(--text-dark)] text-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-playball text-[var(--accent)] mb-4">
              Never Miss a Recipe
            </h2>
            <p className="text-xl font-sans mb-8 text-white/90">
              Subscribe to our newsletter for the latest recipes, cooking tips, and behind-the-scenes stories
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-full text-[var(--text-dark)] font-sans focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              />
              <motion.button
                className="bg-[var(--accent)] text-[var(--text-dark)] px-8 py-3 rounded-full font-semibold hover:bg-white transition-all duration-300 font-sans"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.section> */}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default BlogListing;