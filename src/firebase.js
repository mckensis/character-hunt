import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_eneNv4M5DpHs15kuE7YEJZgjGwGdG8Y",
  authDomain: "character-hunt.firebaseapp.com",
  projectId: "character-hunt",
  storageBucket: "character-hunt.appspot.com",
  messagingSenderId: "628505653429",
  appId: "1:628505653429:web:e4af4a001a2145b4138efc",
  measurementId: "G-XXYZ0LVD4F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);