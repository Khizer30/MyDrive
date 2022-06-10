import { FirebaseApp, initializeApp } from "firebase/app" ;
import { getStorage, FirebaseStorage } from "firebase/storage" ;

const firebaseConfig: object = 
{
  apiKey: "AIzaSyBzC5X4Wno8eRiw7sJXsTnwvUhd2A9oBjA",
  authDomain: "mydrive-0786.firebaseapp.com",
  projectId: "mydrive-0786",
  storageBucket: "mydrive-0786.appspot.com",
  messagingSenderId: "643926601290",
  appId: "1:643926601290:web:fbf2c72979f74c7dde80b3",
  measurementId: "G-J58DCKLRK9"
} ;

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig) ;
const storage: FirebaseStorage = getStorage(app) ;

// Exports
export { storage } ;