// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDEaZSs2_4fwtJbcrRd7vrlZ3NUYCxX9D4",
  authDomain: "tamkeen-acf6d.firebaseapp.com",
  projectId: "tamkeen-acf6d",
  storageBucket: "tamkeen-acf6d.appspot.com",
  messagingSenderId: "427832090847",
  appId: "1:427832090847:web:2aeb4c41dcd407e446c96a",
  measurementId: "G-2R3DG1KSGM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
