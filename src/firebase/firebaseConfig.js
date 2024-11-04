import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyD-IYHN1uDUrqa0cq0so50yYHKRSNoTNh4",
  authDomain: "gutenberg-project-aff0a.firebaseapp.com",
  databaseURL: "https://gutenberg-project-aff0a-default-rtdb.firebaseio.com",
  projectId: "gutenberg-project-aff0a",
  storageBucket: "gutenberg-project-aff0a.appspot.com",
  messagingSenderId: "156971128084",
  appId: "1:156971128084:web:09f0ca1b8d8e40e7f35e01",
  measurementId: "G-1M61YVBQDH"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getDatabase(app);