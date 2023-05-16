
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getAuth,GoogleAuthProvider,FacebookAuthProvider} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCN0NoG4DO6bGlOiJ-b4-SGrTLmqhrV54U",
  authDomain: "blog-b19a3.firebaseapp.com",
  projectId: "blog-b19a3",
  storageBucket: "blog-b19a3.appspot.com",
  messagingSenderId: "602176424627",
  appId: "1:602176424627:web:312e8ab3ad18f904443ec6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth= getAuth(app);
export const provider = new GoogleAuthProvider();  
export const fbProvider = new FacebookAuthProvider();  