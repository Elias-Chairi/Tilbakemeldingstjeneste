import { initializeApp } from "firebase/app";

// Firebase public configuration
const firebaseConfig = {
  apiKey: "AIzaSyBKjjhAEIEuejmp3AbG2mnm0Ri4oosqHaw",
  authDomain: "tilbakemeldingstjeneste.firebaseapp.com",
  projectId: "tilbakemeldingstjeneste",
  storageBucket: "tilbakemeldingstjeneste.appspot.com",
  messagingSenderId: "769705650052",
  appId: "1:769705650052:web:af877f1a9c9d2766b69fd1",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
