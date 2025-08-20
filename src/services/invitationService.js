import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDocs, 
  getDoc,
  setDoc,
  query,
  where,
  orderBy,
  serverTimestamp 
} from 'firebase/firestore';
import { deleteUser } from 'firebase/auth';
import { db } from '../firebase';

export const invitationService = {
  // Send invitation
  async createInvitation(email, invitedBy) {
    try {
      // Check if invitation already exists
      const existingQuery = query(
        collection(db, 'invitations'),
        where('email', '==', email),
        where('status', '==', 'pending')
      );
      const existingInvitations = await getDocs(existingQuery);
      
      if (!existingInvitations.empty) {
        throw new Error('Invitation already sent to this email');
      }

      // Generate invitation code
      const invitationCode = Math.random().toString(36).substr(2, 12).toUpperCase();
      
      const docRef = await addDoc(collection(db, 'invitations'), {
        email,
        code: invitationCode,
        invitedBy,
        status: 'pending',
        createdAt: serverTimestamp(),
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
      });

      return { id: docRef.id, code: invitationCode };
    } catch (error) {
      console.error('Error creating invitation:', error);
      throw error;
    }
  },

  // Validate invitation code
  async validateInvitation(code, email) {
    try {
      const q = query(
        collection(db, 'invitations'),
        where('code', '==', code),
        where('email', '==', email),
        where('status', '==', 'pending')
      );
      
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        return { valid: false, message: 'Invalid or expired invitation' };
      }

      const invitation = querySnapshot.docs[0];
      const data = invitation.data();
      
      // Check if expired
      const now = new Date();
      const expiresAt = data.expiresAt.toDate();
      
      if (now > expiresAt) {
        return { valid: false, message: 'Invitation has expired' };
      }

      return { valid: true, invitationId: invitation.id };
    } catch (error) {
      console.error('Error validating invitation:', error);
      return { valid: false, message: 'Error validating invitation' };
    }
  },

  // Mark invitation as used
  async useInvitation(invitationId) {
    try {
      const invitationRef = doc(db, 'invitations', invitationId);
      await updateDoc(invitationRef, {
        status: 'used',
        usedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error marking invitation as used:', error);
      throw error;
    }
  },

  // Get pending invitations (for admin dashboard)
  async getPendingInvitations() {
    try {
      const q = query(
        collection(db, 'invitations'),
        where('status', '==', 'pending')
      );
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error getting invitations:', error);
      throw error;
    }
  },

  // Get all admin users
  async getAdminUsers() {
    try {
      const q = query(
        collection(db, 'admins'),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error getting admin users:', error);
      throw error;
    }
  },

  // Remove admin user
  async removeAdmin(adminId, currentUserId) {
    try {
      // Prevent self-deletion
      if (adminId === currentUserId) {
        throw new Error('You cannot remove yourself from the admin team');
      }

      // Check if this is the last admin
      const admins = await this.getAdminUsers();
      if (admins.length <= 1) {
        throw new Error('Cannot remove the last admin user');
      }

      // Remove from admins collection
      await deleteDoc(doc(db, 'admins', adminId));
      
      // Note: We can't delete the Firebase Auth user from client side
      // That would need to be done server-side or the user would need to delete their own account
      
      return true;
    } catch (error) {
      console.error('Error removing admin:', error);
      throw error;
    }
  },

  // Add user to admins collection (called after successful signup)
  async addAdminUser(userId, userData) {
    try {
      await setDoc(doc(db, 'admins', userId), {
        ...userData,
        role: 'admin',
        createdAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error adding admin user:', error);
      throw error;
    }
  },
};