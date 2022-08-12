// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

import { getFirestore, doc, setDoc } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD1DS9SUhS9d0eRe1p3rJEGY223lt4yF2Y",
  authDomain: "note-app-75de3.firebaseapp.com",
  projectId: "note-app-75de3",
  storageBucket: "note-app-75de3.appspot.com",
  messagingSenderId: "266104113721",
  appId: "1:266104113721:web:60c4ecbcccac71d7671be8",
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const db = getFirestore();

export const auth = getAuth();
