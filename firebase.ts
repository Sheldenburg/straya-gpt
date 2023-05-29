import { getApp, getApps, initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDjK1GQwtvJu-LtST3iA7Un8vyNc5O0MsU",
  authDomain: "straya-gpt.firebaseapp.com",
  projectId: "straya-gpt",
  storageBucket: "straya-gpt.appspot.com",
  messagingSenderId: "793109390381",
  appId: "1:793109390381:web:20d6840b3284b28fc0c4a4",
  measurementId: "G-M50ZSBC4XS"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig)
const db = getFirestore(app)

export { db }