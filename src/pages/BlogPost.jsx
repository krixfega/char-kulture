import { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { 
  Calendar, User, Eye, Heart, MessageCircle, Share2, 
  ThumbsUp, Reply, Trash2, Edit3, Send 
} from 'lucide-react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { blogService, commentService, likeService, analyticsService } from '../services/blogService';
import Footer from '../components/Footer';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import CommentAuth from '../components/CommentAuth';

const BlogPost = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState(null);
  const [user] = useAuthState(auth);
  const [showCommentAuth, setShowCommentAuth] = useState(false);

  useEffect(() => {
    if (postId) {
      fetchPost();
      fetchComments();
      
      // Track view after a delay to ensure it's a real view
      setTimeout(() => {
        if (postId) {
          analyticsService.trackView(postId, user?.uid);
        }
      }, 3000); // Track after 3 seconds
    }
  }, [postId, user]);

  useEffect(() => {
    if (user && post) {
      checkLikeStatus();
    }
  }, [user, post]);

  const fetchPost = async () => {
    try {
      const fetchedPost = await blogService.getPost(postId);
      setPost(fetchedPost);
      
      // Track view
      await analyticsService.trackEngagement(postId, 'view', user?.uid);
    } catch (error) {
      console.error('Error fetching post:', error);
    } finally {
      setLoading(false);
    }
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

  const fetchComments = async () => {
    try {
      const fetchedComments = await commentService.getComments(postId);
      setComments(fetchedComments);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const checkLikeStatus = async () => {
    try {
      const isLiked = await likeService.checkLike(postId, user?.uid);
      setLiked(isLiked);
    } catch (error) {
      console.error('Error checking like status:', error);
    }
  };

  // In BlogPost.jsx, update the like functionality:

const handleLike = async () => {
  if (!user) {
    toast.error('Please sign in to like this post');
    return;
  }

  try {
    console.log('❤️ Toggling like for post:', postId);
    const result = await likeService.toggleLike(postId, user.uid);
    setLiked(result.liked);
    
    // Update post likes count locally
    setPost(prev => ({
      ...prev,
      likes: result.liked ? (prev.likes + 1) : Math.max(0, prev.likes - 1)
    }));

    // Track engagement
    await analyticsService.trackEngagement(postId, result.liked ? 'like' : 'unlike', user.uid);
    
    toast.success(
      result.liked ? '❤️ Post liked!' : '💔 Post unliked!'
    );
  } catch (error) {
    console.error('Error toggling like:', error);
    toast.error('Error updating like. Please try again.');
  }
};

// Update the share functionality:
const handleShare = async () => {
  const shareData = {
    title: post.title,
    text: post.excerpt,
    url: window.location.href
  };

  try {
    // Try native sharing first (mobile devices)
    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      await navigator.share(shareData);
      console.log('📤 Shared via native share');
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(window.location.href);
      toast.success('📋 Link copied to clipboard!');
      console.log('📋 Link copied to clipboard');
    }
    
    // Track engagement
    await analyticsService.trackEngagement(postId, 'share', user?.uid);
  } catch (error) {
    console.error('Error sharing:', error);
    // Final fallback: manual copy
    const textArea = document.createElement('textarea');
    textArea.value = window.location.href;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    toast.success('📋 Link copied to clipboard!');
  }
};

  const handleSubmitComment = async () => {
    if (!user) {
      toast.error('Please sign in to comment');
      return;
    }

    if (!newComment.trim()) return;

    try {
      const commentData = {
        postId,
        content: newComment,
        userId: user.uid,
        userName: user.displayName || user.email,
        userAvatar: user.photoURL || null,
        parentId: replyTo?.id || null,
        isReply: !!replyTo
      };

      await commentService.addComment(commentData);
      
      // Refresh comments
      await fetchComments();
      
      // Update post comment count
      setPost(prev => ({
        ...prev,
        commentsCount: prev.commentsCount + 1
      }));

      // Clear form
      setNewComment('');
      setReplyTo(null);

      toast.success('💬 Comment submitted successfully!');
      // Track engagement
      await analyticsService.trackEngagement(postId, 'comment', user.uid);
    } catch (error) {
      console.error('Error submitting comment:', error);
      toast.error('Error submitting comment. Please try again.');
    }
  };

  const handleDeleteComment = async (commentId) => {
    const confirmDelete = () => {
      toast.custom((t) => (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-red-200 max-w-md">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
              <Trash2 className="w-4 h-4 text-red-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Delete Comment</h3>
              <p className="text-sm text-gray-600">This action cannot be undone.</p>
            </div>
          </div>
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => {
                toast.dismiss(t.id);
              }}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={async () => {
                toast.dismiss(t.id);
                try {
                  await commentService.deleteComment(commentId, postId);
                  await fetchComments();
                  
                  // Update post comment count
                  setPost(prev => ({
                    ...prev,
                    commentsCount: prev.commentsCount - 1
                  }));
                  
                  toast.success('Comment deleted successfully');
                } catch (error) {
                  console.error('Error deleting comment:', error);
                  toast.error('Failed to delete comment');
                }
              }}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      ), {
        duration: Infinity, // Keep it open until user decides
        position: 'top-center',
      });
    };

    confirmDelete();
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatContent = (content) => {
    // Simple HTML rendering - in production, use a proper rich text renderer
    return { __html: content };
  };

  const CommentItem = ({ comment, isReply = false }) => {
    const canDelete = user && (user.uid === comment.userId || user.isAdmin);

    return (
      <motion.div
        className={`bg-white rounded-lg p-4 shadow-sm border border-gray-100 ${isReply ? 'ml-8 mt-2' : 'mb-4'}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-start gap-3">
          {/* Avatar */}
          <div className="w-10 h-10 bg-[var(--accent)] rounded-full flex items-center justify-center flex-shrink-0">
            {comment.userAvatar ? (
              <img
                src={comment.userAvatar}
                alt={comment.userName}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <User className="w-5 h-5 text-[var(--text-dark)]" />
            )}
          </div>

          <div className="flex-1">
            {/* Header */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-[var(--text-dark)] font-sans">
                  {comment.userName}
                </span>
                {comment.isAnonymous && (
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full font-sans">
                    Guest
                  </span>
                )}
                <span className="text-sm text-gray-500 font-sans">
                  {formatDate(comment.createdAt)}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {!isReply && user && (
                  <motion.button
                    onClick={() => setReplyTo(comment)}
                    className="text-gray-400 hover:text-[var(--accent)] transition-colors duration-200 text-sm font-sans"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    Reply
                  </motion.button>
                )}
                
                {canDelete && (
                  <motion.button
                    onClick={() => handleDeleteComment(comment.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </motion.button>
                )}
              </div>
            </div>

            {/* Content */}
            <p className="text-gray-700 font-sans leading-relaxed mb-2">
              {comment.content}
            </p>

            {/* Replies */}
            {!isReply && comments
              .filter(c => c.parentId === comment.id)
              .map(reply => (
                <CommentItem key={reply.id} comment={reply} isReply={true} />
              ))
            }
          </div>
        </div>
      </motion.div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--primary-bg)] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[var(--accent)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[var(--text-dark)] font-sans">Loading post...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-[var(--primary-bg)] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-playball text-[var(--text-dark)] mb-4">Post Not Found</h1>
          <p className="text-gray-600 font-sans mb-6">The post you're looking for doesn't exist.</p>
          <motion.button
            onClick={() => window.location.href = '/blog'}
            className="bg-[var(--accent)] text-[var(--text-dark)] px-6 py-3 rounded-full font-semibold hover:bg-[var(--text-dark)] hover:text-[var(--accent)] transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Back to Blog
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--primary-bg)]">
      {/* Hero Image */}
      <motion.div
        className="relative h-96 bg-cover bg-center"
        style={{ backgroundImage: `url(${post.featuredImage || 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200'})` }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="text-center text-white max-w-4xl px-4"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <span className="inline-block bg-[var(--accent)] text-[var(--text-dark)] px-4 py-2 rounded-full font-semibold mb-4">
              {post.category}
            </span>
            <h1 className="text-5xl md:text-6xl font-playball mb-4">
              {post.title}
            </h1>
            <p className="text-xl font-sans text-white/90">
              {post.excerpt}
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 py-12">
        {/* Article Meta */}
        <motion.div
          className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-gray-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-gray-200">
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {formatDate(post.createdAt)}
              </div>
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                {post.views} views
              </div>
              <span>{calculateReadingTime(post.content)} min read</span>
            </div>

            {/* Author Card */}
            <div className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-lg">
              <div className="w-10 h-10 bg-[var(--accent)] rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-[var(--text-dark)]">
                  {(post.author || 'CK').charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="font-semibold text-[var(--text-dark)] text-sm">
                  {post.author || 'Char Kulture'}
                </p>
                <p className="text-xs text-gray-500">
                  Author
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            <motion.button
              onClick={handleLike}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                liked 
                  ? 'bg-red-100 text-red-600' 
                  : 'bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-600'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
              {post.likes}
            </motion.button>

            <motion.button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 text-gray-600 hover:bg-[var(--accent)] hover:text-[var(--text-dark)] transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Share2 className="w-5 h-5" />
              Share
            </motion.button>
          </div>
        </motion.div>

        {/* Article Body */}
        <motion.div
          className="prose prose-lg max-w-none font-sans leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          dangerouslySetInnerHTML={formatContent(post.content)}
        />

        {/* Tags */}
        {post.tags && (
          <motion.div
            className="mt-8 pt-6 border-t border-gray-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <h3 className="text-lg font-playball text-[var(--text-dark)] mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-[var(--accent)]/20 text-[var(--text-dark)] px-3 py-1 rounded-full text-sm font-semibold"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </article>

      {/* Comments Section */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-playball text-[var(--text-dark)] mb-8 flex items-center gap-2">
            <MessageCircle className="w-8 h-8" />
            Comments ({post.commentsCount})
          </h2>

          {/* Comment Form */}
          {user ? (
            // Existing signed-in user form (keep your current form)
            <div className="bg-white rounded-lg p-6 shadow-lg mb-8">
              {replyTo && (
                <div className="mb-4 p-3 bg-gray-100 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      Replying to <strong>{replyTo.userName}</strong>
                    </span>
                    <button
                      onClick={() => setReplyTo(null)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      ×
                    </button>
                  </div>
                </div>
              )}
              
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-[var(--accent)] rounded-full flex items-center justify-center flex-shrink-0">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <User className="w-6 h-6 text-[var(--text-dark)]" />
                  )}
                </div>
                
                <div className="flex-1">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder={replyTo ? `Reply to ${replyTo.userName}...` : "Share your thoughts..."}
                    rows={4}
                    className="w-full p-4 border-2 border-gray-200 rounded-lg resize-none focus:border-[var(--accent)] focus:outline-none font-sans"
                  />
                  
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-sm text-gray-500">
                      {newComment.length}/500 characters
                    </span>
                    
                    <motion.button
                      onClick={handleSubmitComment}
                      disabled={!newComment.trim()}
                      className="bg-[var(--accent)] text-[var(--text-dark)] px-6 py-2 rounded-full font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[var(--text-dark)] hover:text-[var(--accent)] transition-all duration-300 flex items-center gap-2"
                      whileHover={{ scale: newComment.trim() ? 1.05 : 1 }}
                      whileTap={{ scale: newComment.trim() ? 0.95 : 1 }}
                    >
                      <Send className="w-4 h-4" />
                      {replyTo ? 'Reply' : 'Comment'}
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Auth prompt for non-signed-in users
            <div className="bg-white rounded-lg p-6 shadow-lg mb-8 text-center">
              <div className="w-16 h-16 bg-[var(--accent)]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-[var(--accent)]" />
              </div>
              <h3 className="text-lg font-semibold text-[var(--text-dark)] mb-2 font-sans">
                Join the Conversation
              </h3>
              <p className="text-[var(--text-dark)]/70 font-sans mb-6">
                Sign in or create an account to share your thoughts and engage with other food lovers!
              </p>
              <motion.button
                onClick={() => setShowCommentAuth(true)}
                className="bg-[var(--accent)] text-[var(--text-dark)] px-6 py-3 rounded-full font-semibold hover:bg-[var(--text-dark)] hover:text-[var(--accent)] transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
              </motion.button>
            </div>
          )}

          {/* Comments List */}
          <div className="space-y-4">
            {comments
              .filter(comment => !comment.parentId)
              .map(comment => (
                <CommentItem key={comment.id} comment={comment} />
              ))
            }
            
            {comments.length === 0 && (
              <div className="text-center py-12">
                <MessageCircle className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500 font-sans">
                  No comments yet. Be the first to share your thoughts!
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </section>

      {/* Auth Modal */}
      {showCommentAuth && (
        <CommentAuth onClose={() => setShowCommentAuth(false)} />
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default BlogPost;
        