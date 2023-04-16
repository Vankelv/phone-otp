// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-aSV7Qk2HGFZk99kyPcZWcVuIxW5RASE",
  authDomain: "otp-project-9188e.firebaseapp.com",
  projectId: "otp-project-9188e",
  storageBucket: "otp-project-9188e.appspot.com",
  messagingSenderId: "662611239853",
  appId: "1:662611239853:web:9ec69c16091a83e5aff724"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)