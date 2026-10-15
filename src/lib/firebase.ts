import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, Timestamp } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyAeqD2QMFquK_lBPUpWybhGTwU7Pns4gII",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "ruhani-souq.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "ruhani-souq",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "ruhani-souq.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "374950640145",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:374950640145:web:19066f2a8d1e02d0380fb0",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-MPLCPYGTTW"
};

// Initialize Firebase App safely
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app);

export interface FirebaseReviewItem {
  id?: string | number;
  name: string;
  date: string;
  rating: number;
  text: string;
  images?: string[];
  productKey: string;
  createdAt?: any;
}

// Add a new customer review to Firebase Firestore Cloud Database safely without undefined fields
export const addReviewToFirebase = async (review: FirebaseReviewItem): Promise<boolean> => {
  try {
    const reviewsRef = collection(db, 'reviews');

    // Build payload explicitly without undefined values (Firestore rejects undefined fields)
    const payload: Record<string, any> = {
      name: review.name || 'Verified Buyer',
      date: review.date || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      rating: Number(review.rating) || 5,
      text: String(review.text || '').trim(),
      productKey: review.productKey || 'general',
      createdAt: Timestamp.now(),
    };

    if (review.images && Array.isArray(review.images) && review.images.length > 0) {
      const validImages = review.images.filter(img => typeof img === 'string' && img.trim().length > 0);
      if (validImages.length > 0) {
        payload.images = validImages;
      }
    }

    await addDoc(reviewsRef, payload);
    return true;
  } catch (error) {
    console.error('Error adding review to Firebase:', error);
    return false;
  }
};

// Fetch customer reviews from Firebase Firestore Cloud Database for all users worldwide
export const getReviewsFromFirebase = async (productKey: string): Promise<FirebaseReviewItem[]> => {
  try {
    const reviewsRef = collection(db, 'reviews');
    const snapshot = await getDocs(reviewsRef);

    const reviews: FirebaseReviewItem[] = [];
    snapshot.forEach((docSnap) => {
      const data = docSnap.data() as FirebaseReviewItem;
      if (data && data.productKey === productKey) {
        reviews.push({
          id: docSnap.id,
          name: data.name || 'Verified Buyer',
          date: data.date || 'Recent',
          rating: data.rating || 5,
          text: data.text || '',
          images: data.images,
          productKey: data.productKey,
        });
      }
    });

    return reviews.reverse(); // Latest submitted reviews first
  } catch (error) {
    console.error('Error fetching reviews from Firebase:', error);
    return [];
  }
};
