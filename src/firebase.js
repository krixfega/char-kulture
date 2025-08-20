import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyASXNQvtolMfxTshV9avo8cnBafRWE-lTA",
  authDomain: "char-kulture.firebaseapp.com",
  projectId: "char-kulture",
  storageBucket: "char-kulture.firebasestorage.app",
  messagingSenderId: "174666318595",
  appId: "1:174666318595:web:2d68920906da0f4aa01f36",
  measurementId: "G-Q03GXHFQPG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);

export default app;