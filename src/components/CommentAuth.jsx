import { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signInAnonymously,
  updateProfile
} from 'firebase/auth';
import { auth } from '../firebase';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import toast from 'react-hot-toast';

const CommentAuth = ({ onClose }) => {
  const [mode, setMode] = useState('signin'); // 'signin', 'signup', 'anonymous'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === 'anonymous') {
        // Anonymous sign-in with name
        if (!formData.name.trim()) {
          toast.error('Please enter your name');
          setLoading(false);
          return;
        }
        
        const result = await signInAnonymously(auth);
        await updateProfile(result.user, {
          displayName: formData.name.trim()
        });
        
        toast.success(`Welcome, ${formData.name}! 👋`);
        onClose();
      } else if (mode === 'signup') {
        // Email signup
        const result = await createUserWithEmailAndPassword(
          auth, 
          formData.email, 
          formData.password
        );
        
        await updateProfile(result.user, {
          displayName: formData.name.trim()
        });
        
        toast.success('Account created successfully! 🎉');
        onClose();
      } else {
        // Email sign-in
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
        toast.success('Welcome back! 👋');
        onClose();
      }
    } catch (error) {
      console.error('Auth error:', error);
      
      let errorMessage = 'Authentication failed. Please try again.';
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'An account with this email already exists.';
      } else if (error.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email.';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Incorrect password.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password must be at least 6 characters.';
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
    <motion.div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-lg w-full max-w-md p-6"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-playball text-[var(--text-dark)] mb-4 text-center">
          Join the Conversation
        </h2>

        {/* Mode Tabs */}
        <div className="flex rounded-lg border border-[var(--accent)]/30 mb-6">
          <button
            onClick={() => setMode('anonymous')}
            className={`flex-1 py-2 px-3 text-sm font-semibold rounded-l-lg transition-colors duration-200 ${
              mode === 'anonymous' 
                ? 'bg-[var(--accent)] text-[var(--text-dark)]' 
                : 'text-[var(--text-dark)]/70 hover:bg-[var(--accent)]/10'
            }`}
          >
            Quick Start
          </button>
          <button
            onClick={() => setMode('signin')}
            className={`flex-1 py-2 px-3 text-sm font-semibold transition-colors duration-200 ${
              mode === 'signin' 
                ? 'bg-[var(--accent)] text-[var(--text-dark)]' 
                : 'text-[var(--text-dark)]/70 hover:bg-[var(--accent)]/10'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setMode('signup')}
            className={`flex-1 py-2 px-3 text-sm font-semibold rounded-r-lg transition-colors duration-200 ${
              mode === 'signup' 
                ? 'bg-[var(--accent)] text-[var(--text-dark)]' 
                : 'text-[var(--text-dark)]/70 hover:bg-[var(--accent)]/10'
            }`}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleAuth} className="space-y-4">
          {/* Name field for signup and anonymous */}
          {(mode === 'signup' || mode === 'anonymous') && (
            <div>
              <label className="block text-sm font-semibold text-[var(--text-dark)] mb-2">
                Name {mode === 'anonymous' ? '*' : ''}
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[var(--text-dark)]/40" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border-2 border-[var(--accent)]/30 rounded-lg font-sans transition-all duration-300 focus:border-[var(--accent)] focus:outline-none"
                  placeholder="Your name"
                  required={mode === 'anonymous'}
                  disabled={loading}
                />
              </div>
            </div>
          )}

          {/* Email field for signin and signup */}
          {mode !== 'anonymous' && (
            <div>
              <label className="block text-sm font-semibold text-[var(--text-dark)] mb-2">
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
                  placeholder="your@email.com"
                  required
                  disabled={loading}
                />
              </div>
            </div>
          )}

          {/* Password field for signin and signup */}
          {mode !== 'anonymous' && (
            <div>
              <label className="block text-sm font-semibold text-[var(--text-dark)] mb-2">
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
          )}

          <motion.button
            type="submit"
            disabled={loading}
            className="w-full bg-[var(--accent)] text-[var(--text-dark)] py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[var(--text-dark)] hover:text-[var(--accent)] transition-all duration-300"
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                {mode === 'anonymous' ? 'Starting...' : mode === 'signup' ? 'Creating...' : 'Signing in...'}
              </div>
            ) : (
              mode === 'anonymous' ? 'Start Commenting' : mode === 'signup' ? 'Create Account' : 'Sign In'
            )}
          </motion.button>
        </form>

        {mode === 'anonymous' && (
          <p className="text-xs text-[var(--text-dark)]/60 text-center mt-3">
            Your comments will be tied to this session. Create an account to keep your comments permanently.
          </p>
        )}

        <button
          onClick={onClose}
          className="w-full mt-4 text-[var(--text-dark)]/60 hover:text-[var(--text-dark)] transition-colors duration-300 font-sans"
        >
          Cancel
        </button>
      </motion.div>
    </motion.div>
  );
};

export default CommentAuth;