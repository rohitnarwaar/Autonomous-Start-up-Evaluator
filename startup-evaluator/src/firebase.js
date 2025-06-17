import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyANaNS8uu437IwckrXVjjr2WVjKhbcJw1s",
  authDomain: "pitchpilot-bca6a.firebaseapp.com",
  projectId: "pitchpilot-bca6a",
  storageBucket: "pitchpilot-bca6a.firebasestorage.app",
  messagingSenderId: "329901312634",
  appId: "1:329901312634:web:e2eeff13194217e4e189c3",
  measurementId: "G-L89NEV2L29"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
