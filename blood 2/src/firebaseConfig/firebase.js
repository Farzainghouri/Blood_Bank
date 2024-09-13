import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC-3KBqa-z8LNkgHxkIuxXP0009xAOA69k",
  authDomain: "chat-app-78c52.firebaseapp.com",
  projectId: "chat-app-78c52",
  storageBucket: "chat-app-78c52.appspot.com",
  messagingSenderId: "725065597338",
  appId: "1:725065597338:web:985ea23b0c975bc383fa23",
  measurementId: "G-YV0CD3WN1P"
  };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);