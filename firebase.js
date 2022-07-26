// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDWf7HVvpy9uCrq3h7BtqPpYRFIOstbasg",
  authDomain: "labora-quiz.firebaseapp.com",
  projectId: "labora-quiz",
  storageBucket: "labora-quiz.appspot.com",
  messagingSenderId: "130402757093",
  appId: "1:130402757093:web:2fc4c6274416b6943c270c",
  measurementId: "G-HN953CME7V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);