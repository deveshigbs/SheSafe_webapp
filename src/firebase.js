// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAVPil0xWtCmONFVqbEdJHHalJ3TgEcRgI",
  authDomain: "safetyapp-37db2.firebaseapp.com",
  projectId: "safetyapp-37db2",
  storageBucket: "safetyapp-37db2.firebasestorage.app",
  messagingSenderId: "970334670323",
  appId: "1:970334670323:web:aea9c2db339d6c044e5686",
  measurementId: "G-5JXTTKWJ93"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Proper named exports
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };

