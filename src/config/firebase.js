import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getDatabase,
  set,
  get,
  push,
  remove,
  ref,
  onValue,
  onChildAdded,
  child,
} from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyCDdmrYEd2Yf8d6zW253CEfpTnPmUXV_BA",
  authDomain: "iotbase-5879d.firebaseapp.com",
  databaseURL: "https://iotbase-5879d-default-rtdb.firebaseio.com",
  projectId: "iotbase-5879d",
  storageBucket: "iotbase-5879d.appspot.com",
  messagingSenderId: "608402415938",
  appId: "1:608402415938:web:f9d90de99e82097004e8db",
  measurementId: "G-0J2PGM4E5K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getDatabase(app);

export {
  auth,
  db,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  set,
  push,
  remove,
  ref,
  onValue,
  onChildAdded,
  child,
  get,
};