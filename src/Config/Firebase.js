// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getDatabase} from "firebase/database";
import {getAuth} from "firebase/auth";
//import firebase from './firebase';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_gpNMNlQa9qRAZYBk_zDDw9jd4nGK31w",
  authDomain: "mail-box-client-22a46.firebaseapp.com",
  projectId: "mail-box-client-22a46",
  storageBucket: "mail-box-client-22a46.appspot.com",
  messagingSenderId: "583965740187",
  appId: "1:583965740187:web:8a7bc6891fe140ed77ca3e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase();
export const auth = getAuth();
