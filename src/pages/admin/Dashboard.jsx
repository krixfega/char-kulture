import { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, Bell, BarChart3, Edit3, Users, Image, TrendingUp, Plus, Mail, Send 
} from 'lucide-react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { blogService } from '../../services/blogService';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { invitationService } from '../../services/invitationService';

// Import all admin components
import {
  StatsGrid,
  RecentPosts,
  QuickActions,
  PostsFilter,
  PostsTable,
  PostEditor,
  MobileMenu,
  PlaceholderTab
} from '../../components/admin';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [posts, setPosts] = useState([]);
  // const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(false);
  // const [uploading, setUploading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user] = useAuthState(auth);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success('Logged out successfully! 👋');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Error logging out');
    }
  };


  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    if (activeTab === 'posts') {
      fetchPosts();
    }
  }, [activeTab]);

  const tabs = [
    { id: 'overview', name: 'Overview', icon: BarChart3 },
    { id: 'posts', name: 'Blog Posts', icon: Edit3 },
    { id: 'team', name: 'Team', icon: Users },
    // { id: 'reviews', name: 'Reviews', icon: Users },
    // { id: 'gallery', name: 'Gallery', icon: Image },
    // { id: 'analytics', name: 'Analytics', icon: TrendingUp }
  ];

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const fetchedPosts = await blogService.getPosts();
      setPosts(fetchedPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (file) => {
    if (!file) return null;
    
    try {
      console.log('📤 Uploading to Cloudinary...');
      
      // Use real Cloudinary upload
      const { uploadToCloudinary } = await import('../../cloudinary');
      const result = await uploadToCloudinary(file, 'blog-images');
      console.log('✅ Cloudinary upload successful:', result.url);
      
      return result.url;
    } catch (error) {
      console.error('❌ Cloudinary upload failed, using fallback:', error);
      
      // Fallback: return a valid external URL instead of blob
      const fallbackImages = [
        'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1556908114-4f0c62c4c8b7?w=800&h=600&fit=crop'
      ];
      
      return fallbackImages[Math.floor(Math.random() * fallbackImages.length)];
    }
  };

  const OverviewTab = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <StatsGrid />
      <div className="grid lg:grid-cols-2 gap-6">
        <RecentPosts posts={posts} />
        <QuickActions setActiveTab={setActiveTab} />
      </div>
    </motion.div>
  );

  const PostsTab = () => {
    const [showEditor, setShowEditor] = useState(false);
    const [editingPost, setEditingPost] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('all');
    const [user] = useAuthState(auth);

    useEffect(() => {
    console.log('🏗️ DASHBOARD - showEditor changed:', showEditor);
  }, [showEditor]);

  useEffect(() => {
    console.log('🏗️ DASHBOARD - editingPost changed:', editingPost);
  }, [editingPost]);

    const categories = [
      { id: 'all', name: 'All Categories' },
      { id: 'recipes', name: 'Recipes' },
      { id: 'events', name: 'Events' },
      { id: 'behind-scenes', name: 'Behind the Scenes' },
      { id: 'tips', name: 'Cooking Tips' },
      { id: 'ingredients', name: 'Ingredients' }
    ];

    const filteredPosts = posts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === 'all' || post.category === filterCategory;
      return matchesSearch && matchesCategory;
  });

  const handleSavePost = async (formData, editingPost) => {
    console.log('🏗️ DASHBOARD - handleSavePost called with:', formData);
    try {
      const postData = {
        ...formData,
        tags: Array.isArray(formData.tags) ? formData.tags : formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        author: user?.displayName || user?.email?.split('@')[0] || 'Admin',
        authorId: user?.uid,
        authorEmail: user?.email
      };

      if (editingPost) {
        console.log('📝 Updating existing post:', editingPost.id);
        await blogService.updatePost(editingPost.id, postData);
      } else {
        console.log('✨ Creating new post');
        await blogService.createPost(postData);
      }

      console.log('✅ Post operation completed, fetching posts...');
      fetchPosts(); // Refresh the posts list
    } catch (error) {
      console.error('Error saving post:', error);
      throw error;
    }
  };

  const handleDeletePost = async (postId) => {
    if (!confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      return;
    }

    try {
      console.log('🗑️ Deleting post:', postId);
      await blogService.deletePost(postId); // Actually call Firebase delete
      console.log('✅ Post deleted from Firebase');
      fetchPosts(); // Refresh the posts list from Firebase
    } catch (error) {
      console.error('Error deleting post:', error);
      toast.error('Error deleting post. Please try again.');
    }
  };

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-xl lg:text-2xl font-playball text-[var(--text-dark)]">Blog Posts</h2>
          <motion.button
            onClick={() => setShowEditor(true)}
            className="bg-[var(--dark-btn)] text-[var(--btn-text)] px-4 py-2 lg:px-6 lg:py-3 rounded-lg font-semibold hover:opacity-90 transition-all duration-200 flex items-center gap-2 font-sans"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Plus className="w-4 h-4 lg:w-5 lg:h-5" />
            <span className="hidden sm:inline">New Post</span>
          </motion.button>
        </div>

        <PostsFilter 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterCategory={filterCategory}
          setFilterCategory={setFilterCategory}
          categories={categories}
        />

        <PostsTable 
          posts={filteredPosts}
          loading={loading}
          onEdit={(post) => {
            setEditingPost(post);
            setShowEditor(true);
          }}
          onDelete={handleDeletePost}
        />

        <PostEditor 
          showEditor={showEditor}
          setShowEditor={setShowEditor}
          editingPost={editingPost}
          setEditingPost={setEditingPost}
          onSave={handleSavePost}
          onImageUpload={handleImageUpload}
        />
      </motion.div>
    );
  };

  const TeamTab = () => {
    const [invitations, setInvitations] = useState([]);
    const [admins, setAdmins] = useState([]);
    const [showInviteForm, setShowInviteForm] = useState(false);
    const [email, setEmail] = useState('');
    const [inviteLoading, setInviteLoading] = useState(false);
    const [fetchingInvitations, setFetchingInvitations] = useState(true);
    const [fetchingAdmins, setFetchingAdmins] = useState(true);
    const [user] = useAuthState(auth);

    useEffect(() => {
      fetchInvitations();
      fetchAdmins();
    }, []);

    const fetchInvitations = async () => {
      try {
        setFetchingInvitations(true);
        const pending = await invitationService.getPendingInvitations();
        setInvitations(pending);
      } catch (error) {
        console.error('Error fetching invitations:', error);
      } finally {
        setFetchingInvitations(false);
      }
    };

    const fetchAdmins = async () => {
      try {
        setFetchingAdmins(true);
        const adminUsers = await invitationService.getAdminUsers();
        setAdmins(adminUsers);
      } catch (error) {
        console.error('Error fetching admins:', error);
      } finally {
        setFetchingAdmins(false);
      }
    };

    const handleSendInvitation = async (e) => {
      e.preventDefault();
      setLoading(true);

      try {
        await invitationService.createInvitation(email, user?.email || 'Admin');
        toast.success('Invitation sent successfully! 📧');
        setEmail('');
        setShowInviteForm(false);
        fetchInvitations(); // Refresh the list
      } catch (error) {
        console.error('Error sending invitation:', error);
        toast.error(error.message || 'Failed to send invitation');
      } finally {
        setLoading(false);
      }
    };

    const handleRemoveAdmin = async (adminToRemove) => {
      toast.custom((t) => (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-red-200 max-w-md">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
              <Users className="w-4 h-4 text-red-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Remove Admin</h3>
              <p className="text-sm text-gray-600">
                Remove <strong>{adminToRemove.name}</strong> from the admin team?
              </p>
            </div>
          </div>
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={async () => {
                toast.dismiss(t.id);
                try {
                  await invitationService.removeAdmin(adminToRemove.id, user?.uid);
                  fetchAdmins();
                  toast.success(`${adminToRemove.name} removed from admin team`);
                } catch (error) {
                  console.error('Error removing admin:', error);
                  toast.error(error.message || 'Failed to remove admin');
                }
              }}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
            >
              Remove
            </button>
          </div>
        </div>
      ), {
        duration: Infinity,
        position: 'top-center',
      });
    };

    const formatDate = (timestamp) => {
      if (!timestamp) return 'N/A';
      const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    };

  return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl lg:text-2xl font-playball text-[var(--text-dark)]">Team Management</h2>
            <p className="text-[var(--text-dark)]/70 font-sans">
              Manage admin team members and send invitations
            </p>
          </div>
          
          <motion.button
            onClick={() => setShowInviteForm(!showInviteForm)}
            className="bg-[var(--dark-btn)] text-[var(--btn-text)] px-4 py-2 lg:px-6 lg:py-3 rounded-lg font-semibold hover:opacity-90 transition-all duration-200 flex items-center gap-2 font-sans"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Plus className="w-4 h-4 lg:w-5 lg:h-5" />
            <span className="hidden sm:inline">Invite Admin</span>
          </motion.button>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg shadow-lg p-6 border border-[var(--accent)]/20">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[var(--text-dark)]">{admins.length}</p>
                <p className="text-sm text-[var(--text-dark)]/70 font-sans">Active Admins</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 border border-[var(--accent)]/20">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Mail className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[var(--text-dark)]">{invitations.length}</p>
                <p className="text-sm text-[var(--text-dark)]/70 font-sans">Pending Invites</p>
              </div>
            </div>
          </div>
        </div>

        {/* Invite Form */}
        {showInviteForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white rounded-lg shadow-lg p-6 border border-[var(--accent)]/20"
          >
            <h3 className="text-lg font-semibold text-[var(--text-dark)] mb-4 font-sans">
              Send Admin Invitation
            </h3>
            
            <form onSubmit={handleSendInvitation} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-[var(--text-dark)] mb-2 font-sans">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[var(--text-dark)]/40" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border-2 border-[var(--accent)]/30 rounded-lg font-sans transition-all duration-300 focus:border-[var(--accent)] focus:outline-none"
                    placeholder="newadmin@charkulture.com"
                    required
                    disabled={inviteLoading}
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <motion.button
                  type="submit"
                  disabled={inviteLoading || !email}
                  className="bg-[var(--accent)] text-[var(--text-dark)] px-6 py-2 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[var(--text-dark)] hover:text-[var(--accent)] transition-all duration-300 flex items-center gap-2 font-sans"
                  whileHover={{ scale: inviteLoading ? 1 : 1.02 }}
                  whileTap={{ scale: inviteLoading ? 1 : 0.98 }}
                >
                  {inviteLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Invitation
                    </>
                  )}
                </motion.button>
                
                <button
                  type="button"
                  onClick={() => {
                    setShowInviteForm(false);
                    setEmail('');
                  }}
                  className="px-6 py-2 border border-[var(--accent)] rounded-lg text-[var(--text-dark)] hover:bg-[var(--accent)]/10 transition-colors duration-200 font-sans"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Current Admin Team */}
        <div className="bg-white rounded-lg shadow-lg border border-[var(--accent)]/20">
          <div className="p-4 lg:p-6 border-b border-[var(--accent)]/20">
            <h3 className="text-lg font-semibold text-[var(--text-dark)] font-sans">
              Admin Team Members
            </h3>
          </div>

          <div className="overflow-x-auto">
            {fetchingAdmins ? (
              <div className="p-8 text-center">
                <div className="w-8 h-8 border-2 border-[var(--dark-btn)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-[var(--text-dark)]/70 font-sans">Loading team members...</p>
              </div>
            ) : admins.length > 0 ? (
              <table className="w-full">
                <thead className="bg-[var(--primary-bg)] border-b border-[var(--accent)]/20">
                  <tr>
                    <th className="text-left p-3 lg:p-4 font-semibold text-[var(--text-dark)] font-sans">Name</th>
                    <th className="text-left p-3 lg:p-4 font-semibold text-[var(--text-dark)] font-sans">Email</th>
                    <th className="text-left p-3 lg:p-4 font-semibold text-[var(--text-dark)] font-sans">Role</th>
                    <th className="text-left p-3 lg:p-4 font-semibold text-[var(--text-dark)] font-sans">Joined</th>
                    <th className="text-left p-3 lg:p-4 font-semibold text-[var(--text-dark)] font-sans">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {admins.map((admin, index) => (
                    <motion.tr
                      key={admin.id}
                      className="border-b border-[var(--accent)]/10 hover:bg-[var(--primary-bg)]"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                    >
                      <td className="p-3 lg:p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-[var(--accent)] rounded-full flex items-center justify-center">
                            <span className="text-[var(--text-dark)] font-bold text-sm">
                              {admin.name?.charAt(0)?.toUpperCase() || admin.email?.charAt(0)?.toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <span className="font-semibold text-[var(--text-dark)] font-sans">
                              {admin.name || 'Unknown'}
                            </span>
                            {admin.id === user?.uid && (
                              <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                You
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="p-3 lg:p-4">
                        <span className="text-[var(--text-dark)]/70 font-sans">
                          {admin.email}
                        </span>
                      </td>
                      <td className="p-3 lg:p-4">
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">
                          Admin
                        </span>
                      </td>
                      <td className="p-3 lg:p-4">
                        <span className="text-[var(--text-dark)]/70 font-sans">
                          {formatDate(admin.createdAt)}
                        </span>
                      </td>
                      <td className="p-3 lg:p-4">
                        {admin.id !== user?.uid && (
                          <motion.button
                            onClick={() => handleRemoveAdmin(admin)}
                            className="text-red-600 hover:text-red-800 transition-colors duration-200 text-sm font-sans"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Remove
                          </motion.button>
                        )}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="p-8 text-center">
                <Users className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500 font-sans">No admin users found</p>
              </div>
            )}
          </div>
        </div>

        {/* Pending Invitations */}
        <div className="bg-white rounded-lg shadow-lg border border-[var(--accent)]/20">
          <div className="p-4 lg:p-6 border-b border-[var(--accent)]/20">
            <h3 className="text-lg font-semibold text-[var(--text-dark)] font-sans">
              Pending Invitations
            </h3>
          </div>

          <div className="overflow-x-auto">
            {fetchingInvitations ? (
              <div className="p-8 text-center">
                <div className="w-8 h-8 border-2 border-[var(--dark-btn)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-[var(--text-dark)]/70 font-sans">Loading invitations...</p>
              </div>
            ) : invitations.length > 0 ? (
              <table className="w-full">
                <thead className="bg-[var(--primary-bg)] border-b border-[var(--accent)]/20">
                  <tr>
                    <th className="text-left p-3 lg:p-4 font-semibold text-[var(--text-dark)] font-sans">Email</th>
                    <th className="text-left p-3 lg:p-4 font-semibold text-[var(--text-dark)] font-sans">Code</th>
                    <th className="text-left p-3 lg:p-4 font-semibold text-[var(--text-dark)] font-sans">Invited By</th>
                    <th className="text-left p-3 lg:p-4 font-semibold text-[var(--text-dark)] font-sans">Date</th>
                    <th className="text-left p-3 lg:p-4 font-semibold text-[var(--text-dark)] font-sans">Expires</th>
                  </tr>
                </thead>
                <tbody>
                  {invitations.map((invitation, index) => (
                    <motion.tr
                      key={invitation.id}
                      className="border-b border-[var(--accent)]/10 hover:bg-[var(--primary-bg)]"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                    >
                      <td className="p-3 lg:p-4">
                        <span className="font-semibold text-[var(--text-dark)] font-sans">
                          {invitation.email}
                        </span>
                      </td>
                      <td className="p-3 lg:p-4">
                        <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">
                          {invitation.code}
                        </code>
                      </td>
                      <td className="p-3 lg:p-4">
                        <span className="text-[var(--text-dark)]/70 font-sans">
                          {invitation.invitedBy}
                        </span>
                      </td>
                      <td className="p-3 lg:p-4">
                        <span className="text-[var(--text-dark)]/70 font-sans">
                          {formatDate(invitation.createdAt)}
                        </span>
                      </td>
                      <td className="p-3 lg:p-4">
                        <span className="text-[var(--text-dark)]/70 font-sans">
                          {formatDate(invitation.expiresAt)}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="p-8 text-center">
                <Mail className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500 font-sans">No pending invitations</p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    );
  };


  return (
    <div className="min-h-screen bg-[var(--primary-bg)]">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-[var(--accent)]/20">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-[var(--text-dark)]/70 hover:text-[var(--text-dark)]"
              >
                <Menu className="w-6 h-6" />
              </button>
              <h1 className="text-2xl lg:text-3xl font-playball text-[var(--text-dark)]">
                Admin Dashboard
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-[var(--text-dark)]/70 hidden sm:block font-sans">
                Welcome back, {user?.displayName || user?.email?.split('@')[0] || 'Chef'}!
              </span>
              <div className="relative group">
                <div className="w-8 h-8 lg:w-10 lg:h-10 bg-[var(--dark-btn)] rounded-full flex items-center justify-center cursor-pointer">
                  <span className="text-[var(--btn-text)] font-bold text-sm lg:text-base">
                    {user?.displayName?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || 'U'}
                  </span>
                </div>
                
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-[var(--accent)]/20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-semibold text-[var(--text-dark)]">
                      {user?.displayName || 'Admin User'}
                    </p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 text-sm font-sans text-[var(--text-dark)] hover:bg-[var(--accent)]/10 transition-colors duration-200 rounded-b-lg"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </div>          
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Navigation Tabs - Desktop */}
      <div className="bg-white border-b border-[var(--accent)]/20 hidden lg:block">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex space-x-8">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 font-sans ${
                    activeTab === tab.id
                      ? 'border-[var(--dark-btn)] text-[var(--dark-btn)]'
                      : 'border-transparent text-[var(--text-dark)]/70 hover:text-[var(--text-dark)] hover:border-[var(--accent)]'
                  }`}
                  whileHover={{ y: -1 }}
                  whileTap={{ y: 0 }}
                >
                  <IconComponent className="w-4 h-4" />
                  {tab.name}
                </motion.button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6 lg:py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'overview' && <OverviewTab />}
            {activeTab === 'posts' && <PostsTab />}
            {activeTab === 'team' && <TeamTab />}
            {activeTab === 'reviews' && (
              <PlaceholderTab 
                title="Reviews Management" 
                description="Reviews management interface coming soon..." 
              />
            )}
            {activeTab === 'gallery' && (
              <PlaceholderTab 
                title="Gallery Management" 
                description="Gallery management interface coming soon..." 
              />
            )}
            {activeTab === 'analytics' && (
              <PlaceholderTab 
                title="Analytics Dashboard" 
                description="Analytics dashboard coming soon..." 
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdminDashboard;