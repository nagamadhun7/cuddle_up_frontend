// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyAg_D54VWsB63gMzmYyuxpAf3RK7GF98G0",
  authDomain: "cuddleup-21617.firebaseapp.com",
  projectId: "cuddleup-21617",
  storageBucket: "cuddleup-21617.firebasestorage.app",
  messagingSenderId: "780591821119",
  appId: "1:780591821119:web:381d5f22d57e38ce67e38a",
  measurementId: "G-9DYTQ3R6EL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
