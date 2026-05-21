import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDmaZ2-6hoV_3cd7AytxRZLKbpITZje720",
  authDomain: "shopping-cart-app-22455.firebaseapp.com",
  projectId: "shopping-cart-app-22455",
  storageBucket: "shopping-cart-app-22455.firebasestorage.app",
  messagingSenderId: "953363372366",
  appId: "1:953363372366:web:5586580df1bff5a213661f"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);