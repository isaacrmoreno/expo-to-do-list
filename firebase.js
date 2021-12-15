import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBxZgdo00vR_aoPSK09cK-KKZXqGHDWIt8",
  authDomain: "expo-to-do-list.firebaseapp.com",
  projectId: "expo-to-do-list",
  storageBucket: "expo-to-do-list.appspot.com",
  messagingSenderId: "383655563055",
  appId: "1:383655563055:web:93228a361361b76b545bda"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Auth Services
export const auth = getAuth(app);

// Initialize Firestore Database
export const db = getFirestore(app);

