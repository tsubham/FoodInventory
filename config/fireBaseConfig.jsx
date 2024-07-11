// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBYtwULH55a2eKzpkTvSveKsOEz_EnkRXA",
  authDomain: "business-directory-e191a.firebaseapp.com",
  projectId: "business-directory-e191a",
  storageBucket: "business-directory-e191a.appspot.com",
  messagingSenderId: "758654374540",
  appId: "1:758654374540:web:aacb7e8d5d01d639cfa1a9",
  measurementId: "G-44P9BSXKXW"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const storage = getStorage(app) ;
//const analytics = getAnalytics(app);