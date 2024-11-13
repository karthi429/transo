// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBPBuCPrS0eNY99KH6IzJq5oJ23a1jk9E4",
  authDomain: "transo-17359.firebaseapp.com",
  projectId: "transo-17359",
  storageBucket: "transo-17359.firebasestorage.app",
  messagingSenderId: "221422383849",
  appId: "1:221422383849:web:2bbf7da842fada9c807678",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
