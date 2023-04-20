// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC0uEh0nUQUGOphWS6sFQm0KTKgZeg_zJs",
    authDomain: "prepup-41491.firebaseapp.com",
    databaseURL: "https://prepup-41491-default-rtdb.firebaseio.com",
    projectId: "prepup-41491",
    storageBucket: "prepup-41491.appspot.com",
    messagingSenderId: "464294809667",
    appId: "1:464294809667:web:047911052bb9d3e24244f6",
    measurementId: "G-BXX4C3TZ9P"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // get the auth instance
const db = getDatabase();

export { auth, db};