// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAuYcmYZHa2t6J22GSANvc5gMB_idWNXEU",
  authDomain: "travel-planner-eda1a.firebaseapp.com",
  projectId: "travel-planner-eda1a",
  storageBucket: "travel-planner-eda1a.appspot.com",
  messagingSenderId: "293605277504",
  appId: "1:293605277504:web:ab0b52ef5e9c1b649504a5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const storage = getStorage(app)