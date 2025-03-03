import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "happinesstracker2-dev.firebaseapp.com",
  projectId: "happinesstracker2-dev",
  storageBucket: "happinesstracker2-dev.firebasestorage.app",
  messagingSenderId: "333171216088",
  appId: "1:333171216088:web:700b2533eef8b5721991ad",
  measurementId: "G-9ZZFDCR5Y2"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export default app;
