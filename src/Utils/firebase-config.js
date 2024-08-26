// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCoeyEF3jJs7hbO5dQQePTemaXke9ie6J4",
  authDomain: "vehicle-app-mono.firebaseapp.com",
  databaseURL:
    "https://vehicle-app-mono-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "vehicle-app-mono",
  storageBucket: "vehicle-app-mono.appspot.com",
  messagingSenderId: "901169818707",
  appId: "1:901169818707:web:10bfebc65ccd14ef5e2aa6",
  measurementId: "G-77PP3J3W36",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
//const analytics = getAnalytics(app);
