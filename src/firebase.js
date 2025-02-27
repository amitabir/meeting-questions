// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDQ9GDzE_0AUbXxRm6XrcoMKyd-zLGMb5I",
  authDomain: "meeting-questions.firebaseapp.com",
  databaseURL: "https://meeting-questions-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "meeting-questions",
  storageBucket: "meeting-questions.firebasestorage.app",
  messagingSenderId: "615577150079",
  appId: "1:615577150079:web:2a0f822bd521bc54fb154a",
  measurementId: "G-K21ER5D671"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };