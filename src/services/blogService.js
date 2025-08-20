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
  limit, 
  increment,
  serverTimestamp,
  onSnapshot
} from 'firebase/firestore';
// import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { uploadToCloudinary, deleteFromCloudinary } from '../cloudinary';
import { db } from '../firebase';

// Blog Posts
export const blogService = {
  // Create new post
  async createPost(postData) {
    try {
      const docRef = await addDoc(collection(db, 'posts'), {
        ...postData,
        featuredImage: postData.featuredImage || '',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        views: 0,
        likes: 0,
        commentsCount: 0,
        published: postData.published || false,
      });
      return { id: docRef.id, ...postData };
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    }
  },

  // Get all posts
  async getPosts(options = {}) {
  try {
    let q = collection(db, 'posts');
    
    const conditions = [];
    
    if (options.category) {
      conditions.push(where('category', '==', options.category));
    }
    
    if (options.published !== undefined) {
      conditions.push(where('published', '==', options.published));
    }
    
    // Add all conditions to query
    if (conditions.length > 0) {
      q = query(q, ...conditions);
    }
    
    // Add ordering
    q = query(q, orderBy('createdAt', 'desc'));
    
    // Add limit if specified
    if (options.limit) {
      q = query(q, limit(options.limit));
    }

    console.log('🔍 Executing Firestore query...');
    const querySnapshot = await getDocs(q);
    console.log('✅ Query completed, found:', querySnapshot.docs.length, 'posts');
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting posts:', error);
    throw error;
  }
},

  // Get single post
  async getPost(postId) {
    try {
      const docRef = doc(db, 'posts', postId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const postData = { id: docSnap.id, ...docSnap.data() };

        return postData;
      } else {
        throw new Error('Post not found');
      }
    } catch (error) {
      console.error('Error getting post:', error);
      throw error;
    }
  },

  // Update post
  async updatePost(postId, updates) {
    try {
      const docRef = doc(db, 'posts', postId);
      await updateDoc(docRef, {
        ...updates,
        updatedAt: serverTimestamp()
      });
      return { id: postId, ...updates };
    } catch (error) {
      console.error('Error updating post:', error);
      throw error;
    }
  },

  // Delete post
  async deletePost(postId) {
    try {
      await deleteDoc(doc(db, 'posts', postId));
      
      // Delete associated comments
      const commentsQuery = query(
        collection(db, 'comments'),
        where('postId', '==', postId)
      );
      const commentsSnapshot = await getDocs(commentsQuery);
      const deletePromises = commentsSnapshot.docs.map(doc => 
        deleteDoc(doc.ref)
      );
      await Promise.all(deletePromises);
      
      return true;
    } catch (error) {
      console.error('Error deleting post:', error);
      throw error;
    }
  },

  // Upload image
  async uploadImage(file, folder = 'blog-images') {
    try {
      const result = await uploadToCloudinary(file, folder);
      return result;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  },

  // Delete image
  async deleteImage(publicId) {
    try {
      await deleteFromCloudinary(publicId);
      return true;
    } catch (error) {
      console.error('Error deleting image:', error);
      throw error;
    }
  }
};

// Comments
export const commentService = {
  // Add comment
  async addComment(commentData) {
    try {
      const docRef = await addDoc(collection(db, 'comments'), {
        ...commentData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      
      // Increment post comment count
      const postRef = doc(db, 'posts', commentData.postId);
      await updateDoc(postRef, {
        commentsCount: increment(1)
      });
      
      return { id: docRef.id, ...commentData };
    } catch (error) {
      console.error('Error adding comment:', error);
      throw error;
    }
  },

  // Get comments for post
  async getComments(postId) {
    try {
      const q = query(
        collection(db, 'comments'),
        where('postId', '==', postId),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error getting comments:', error);
      throw error;
    }
  },

  // Delete comment
  async deleteComment(commentId, postId) {
    try {
      await deleteDoc(doc(db, 'comments', commentId));
      
      // Decrement post comment count
      const postRef = doc(db, 'posts', postId);
      await updateDoc(postRef, {
        commentsCount: increment(-1)
      });
      
      return true;
    } catch (error) {
      console.error('Error deleting comment:', error);
      throw error;
    }
  }
};

// Likes
export const likeService = {
  // Toggle like
  async toggleLike(postId, userId) {
    if (!userId) {
      throw new Error('User must be signed in to like posts');
    }

    try {
      // Create a consistent like document ID
      const likeId = `${postId}_${userId}`;
      const likeRef = doc(db, 'likes', likeId);
      const likeSnap = await getDoc(likeRef);
      
      const postRef = doc(db, 'posts', postId);
      
      if (likeSnap.exists()) {
        // Unlike: Remove the like document
        await deleteDoc(likeRef);
        await updateDoc(postRef, {
          likes: increment(-1)
        });
        console.log('💔 Post unliked');
        return { liked: false };
      } else {
        // Like: Create the like document
        await setDoc(likeRef, {
          postId,
          userId,
          createdAt: serverTimestamp()
        });
        await updateDoc(postRef, {
          likes: increment(1)
        });
        console.log('❤️ Post liked');
        return { liked: true };
      }
    } catch (error) {
      console.error('Error toggling like:', error);
      throw error;
    }
  },

  // Check if user liked post
  async checkLike(postId, userId) {
    if (!userId) return false;
    
    try {
      const likeId = `${postId}_${userId}`;
      const likeRef = doc(db, 'likes', likeId);
      const likeSnap = await getDoc(likeRef);
      return likeSnap.exists();
    } catch (error) {
      console.error('Error checking like:', error);
      return false;
    }
  }
};

// Analytics
export const analyticsService = {
  // Track unique post views
  async trackView(postId, userId = null) {
    try {
      // Create a unique identifier for this view
      const sessionId = sessionStorage.getItem('sessionId') || Date.now().toString();
      sessionStorage.setItem('sessionId', sessionId);
      
      const viewId = userId ? `${postId}_${userId}` : `${postId}_${sessionId}`;
      
      // Check if this view already exists today
      const today = new Date().toISOString().split('T')[0];
      const existingViewQuery = query(
        collection(db, 'views'),
        where('viewId', '==', viewId),
        where('date', '==', today)
      );
      
      const existingViews = await getDocs(existingViewQuery);
      
      if (existingViews.empty) {
        // This is a new unique view for today
        await addDoc(collection(db, 'views'), {
          postId,
          userId,
          viewId,
          sessionId,
          date: today,
          timestamp: serverTimestamp()
        });
        
        // Increment the post view count
        const postRef = doc(db, 'posts', postId);
        await updateDoc(postRef, {
          views: increment(1)
        });
        
        console.log('📊 New unique view tracked for post:', postId);
        return true;
      } else {
        console.log('👁️ View already tracked for today');
        return false;
      }
    } catch (error) {
      console.error('Error tracking view:', error);
      return false;
    }
  },

  async trackEngagement(postId, action, userId = null) {
    try {
      await addDoc(collection(db, 'analytics'), {
        postId,
        action, // 'like', 'unlike', 'comment', 'share'
        userId,
        timestamp: serverTimestamp(),
        date: new Date().toISOString().split('T')[0]
      });
      console.log(`📈 ${action} tracked for post:`, postId);
    } catch (error) {
      console.error('Error tracking engagement:', error);
    }
  }
}