import { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { Eye, EyeOff, Lock, Mail, User } from 'lucide-react';
import toast from 'react-hot-toast';
import { invitationService } from '../../services/invitationService';

const AdminSignup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [invitationCode, setInvitationCode] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate invitation first
    const validation = await invitationService.validateInvitation(
        invitationCode, 
        formData.email
    );

    if (!validation.valid) {
        toast.error(validation.message);
        setLoading(false);
        return;
    }

    // Validate password match
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      setLoading(false);
      return;
    }

    // Validate password strength
    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      // Create user account
      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        formData.email, 
        formData.password
      );

      await updateProfile(userCredential.user, {
        displayName: formData.name
      });

      // Add to admins collection
      await invitationService.addAdminUser(userCredential.user.uid, {
        email: formData.email,
        name: formData.name,
        invitedBy: 'System' // or track who invited them
      });

      // Mark invitation as used
      await invitationService.useInvitation(validation.invitationId);

      toast.success('Admin account created successfully! 🎉');
      navigate('/admin');
    } catch (error) {
      console.error('Signup error:', error);
      
      let errorMessage = 'Signup failed. Please try again.';
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'An account with this email already exists.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password is too weak.';
      }
      
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-[var(--primary-bg)] flex items-center justify-center p-4">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-playball text-[var(--text-dark)] mb-2">
            Char Kulture
          </h1>
          <p className="text-[var(--text-dark)]/70 font-sans">
            Create Admin Account
          </p>
        </div>

        {/* Signup Form */}
        <motion.div
          className="bg-white rounded-lg shadow-lg p-8 border border-[var(--accent)]/20"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <form onSubmit={handleSignup} className="space-y-6">
            {/* Invitation Code */}
            <div>
            <label className="block text-sm font-semibold text-[var(--text-dark)] mb-2 font-sans">
                Invitation Code *
            </label>
            <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[var(--text-dark)]/40" />
                <input
                type="text"
                value={invitationCode}
                onChange={(e) => setInvitationCode(e.target.value.toUpperCase())}
                className="w-full pl-10 pr-4 py-3 border-2 border-[var(--accent)]/30 rounded-lg font-sans transition-all duration-300 focus:border-[var(--accent)] focus:outline-none"
                placeholder="Enter invitation code"
                required
                disabled={loading}
                />
            </div>
            </div>

            {/* Name Field */}
            <div>
              <label className="block text-sm font-semibold text-[var(--text-dark)] mb-2 font-sans">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[var(--text-dark)]/40" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border-2 border-[var(--accent)]/30 rounded-lg font-sans transition-all duration-300 focus:border-[var(--accent)] focus:outline-none"
                  placeholder="Your full name"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-semibold text-[var(--text-dark)] mb-2 font-sans">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[var(--text-dark)]/40" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border-2 border-[var(--accent)]/30 rounded-lg font-sans transition-all duration-300 focus:border-[var(--accent)] focus:outline-none"
                  placeholder="admin@charkulture.com"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-semibold text-[var(--text-dark)] mb-2 font-sans">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[var(--text-dark)]/40" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-12 py-3 border-2 border-[var(--accent)]/30 rounded-lg font-sans transition-all duration-300 focus:border-[var(--accent)] focus:outline-none"
                  placeholder="••••••••"
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[var(--text-dark)]/40 hover:text-[var(--text-dark)] transition-colors duration-200"
                  disabled={loading}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block text-sm font-semibold text-[var(--text-dark)] mb-2 font-sans">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[var(--text-dark)]/40" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full pl-10 pr-12 py-3 border-2 border-[var(--accent)]/30 rounded-lg font-sans transition-all duration-300 focus:border-[var(--accent)] focus:outline-none"
                  placeholder="••••••••"
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[var(--text-dark)]/40 hover:text-[var(--text-dark)] transition-colors duration-200"
                  disabled={loading}
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Signup Button */}
            <motion.button
              type="submit"
              disabled={loading || !formData.email || !formData.password || !invitationCode}
              className="w-full bg-[var(--dark-btn)] text-[var(--btn-text)] py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-all duration-300 font-sans"
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Creating account...
                </div>
              ) : (
                'Create Admin Account'
              )}
            </motion.button>
          </form>

          {/* Additional Links */}
          <div className="mt-6 text-center space-y-2">
            <button
              onClick={() => navigate('/admin/login')}
              className="text-[var(--accent)] hover:text-[var(--text-dark)] transition-colors duration-300 font-sans block w-full"
            >
              Already have an account? Sign In
            </button>
            <button
              onClick={() => navigate('/')}
              className="text-[var(--text-dark)]/60 hover:text-[var(--text-dark)] transition-colors duration-300 font-sans"
            >
              ← Back to Website
            </button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AdminSignup;