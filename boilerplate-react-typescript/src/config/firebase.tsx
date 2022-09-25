

import firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore"
import "firebase/storage"
const firebaseConfig = {
  apiKey: "AIzaSyDE1IjeTmeDeogPySCUJvlfwLUt_DIP7yg",
  authDomain: "test-4cd2c.firebaseapp.com",
  databaseURL:
    "https://test-4cd2c-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "test-4cd2c",
  storageBucket: "test-4cd2c.appspot.com",
  messagingSenderId: "224462133271",
  appId: "1:224462133271:web:f6a7412ea02c4f047ba452",
  measurementId: "G-B72ZWW5HW0",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


export const auth = firebase.auth();
export const storage = firebase.storage();
export const db = firebase.firestore();
