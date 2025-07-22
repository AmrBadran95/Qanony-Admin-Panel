import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCX-b1BIicqzs7OPSVN73ptMB_PeUXk_6E",
  authDomain: "qanony-app.firebaseapp.com",
  projectId: "qanony-app",
  storageBucket: "qanony-app.firebasestorage.app",
  messagingSenderId: "55495130843",
  appId: "1:55495130843:web:ff326c4f26a840805196fe",
  measurementId: "G-6CSR9S8NME",
};

const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
