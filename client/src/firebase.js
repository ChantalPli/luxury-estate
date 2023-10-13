// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'luxury-estate-9fc91.firebaseapp.com',
  projectId: 'luxury-estate-9fc91',
  storageBucket: 'luxury-estate-9fc91.appspot.com',
  messagingSenderId: '216145730656',
  appId: '1:216145730656:web:aea12e93d842d8b576f705'
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
