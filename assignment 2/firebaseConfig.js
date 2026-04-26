import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyC4wn-tS_kEzgcKJr3opSG2--b2KfPJYJY",
  authDomain: "fir-app-new-c2375.firebaseapp.com",
  databaseURL: "https://fir-app-new-c2375-default-rtdb.asia-southeast1.firebasedatabase.app", // ✅ FIXED
  projectId: "fir-app-new-c2375",
  storageBucket: "fir-app-new-c2375.firebasestorage.app",
  messagingSenderId: "66421688059",
  appId: "1:66421688059:web:c9e34eaec391870201525e"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const database = getDatabase(app);