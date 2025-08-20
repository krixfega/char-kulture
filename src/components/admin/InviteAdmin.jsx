import { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Mail, Send, X } from 'lucide-react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';
import { invitationService } from '../../services/invitationService';
import toast from 'react-hot-toast';

const InviteAdmin = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [invitationSent, setInvitationSent] = useState(null);
  const [user] = useAuthState(auth);

  const handleInvite = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await invitationService.createInvitation(
        email, 
        user?.email || 'Admin'
      );
      
      setInvitationSent({
        email,
        code: result.code
      });
      
      toast.success('Invitation sent successfully! 📧');
    } catch (error) {
      console.error('Error sending invitation:', error);
      toast.error(error.message || 'Failed to send invitation');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="bg-white rounded-lg w-full max-w-md p-6"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-playball text-[var(--text-dark)]">
            Invite New Admin
          </h2>
          <button
            onClick={onClose}
            className="text-[var(--text-dark)]/70 hover:text-[var(--text-dark)] p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!invitationSent ? (
          <form onSubmit={handleInvite} className="space-y-4">
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
                  disabled={loading}
                />
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={loading || !email}
              className="w-full bg-[var(--dark-btn)] text-[var(--btn-text)] py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-all duration-300 flex items-center justify-center gap-2 font-sans"
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Send Invitation
                </>
              )}
            </motion.button>
          </form>
        ) : (
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-green-600" />
            </div>
            
            <h3 className="text-lg font-semibold text-[var(--text-dark)] mb-2 font-sans">
              Invitation Sent!
            </h3>
            
            <p className="text-[var(--text-dark)]/70 font-sans mb-4">
              An invitation has been sent to <strong>{invitationSent.email}</strong>
            </p>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <p className="text-sm font-semibold text-[var(--text-dark)] mb-1 font-sans">
                Invitation Code:
              </p>
              <p className="text-lg font-mono bg-white px-3 py-2 rounded border">
                {invitationSent.code}
              </p>
              <p className="text-xs text-gray-600 mt-2 font-sans">
                Share this code with the invited admin. It expires in 7 days.
              </p>
            </div>

            <motion.button
              onClick={onClose}
              className="w-full bg-[var(--accent)] text-[var(--text-dark)] py-2 rounded-lg font-semibold hover:bg-[var(--text-dark)] hover:text-[var(--accent)] transition-all duration-300 font-sans"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Done
            </motion.button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default InviteAdmin;