// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDurOeD0bULGoowPrUqFgWBauUVYu6pGYk",
  authDomain: "car-marketplace-7f8d9.firebaseapp.com",
  projectId: "car-marketplace-7f8d9",
  storageBucket: "car-marketplace-7f8d9.firebasestorage.app",
  messagingSenderId: "745572941316",
  appId: "1:745572941316:web:2388be8adca695aa827f51"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);