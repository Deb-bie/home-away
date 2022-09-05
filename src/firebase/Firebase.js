import { initializeApp } from 'firebase/app';
import { getAuth } from  "firebase/auth";
import {getFirestore} from 'firebase/firestore'
import { getStorage } from "firebase/storage";


const app = initializeApp({
    // apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    // authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    // projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    // storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    // messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    // appId: process.env.REACT_APP_FIREBASE_APP_ID

    apiKey: "AIzaSyApI427u_JL57QPyFDn3OBwUTQfJwdWC5A",
    authDomain: "home-away-f721b.firebaseapp.com",
    projectId: "home-away-f721b",
    storageBucket: "home-away-f721b.appspot.com",
    messagingSenderId: "526025791964",
    appId: "1:526025791964:web:a2ca44ed778b4db83e1719"
})


export const auth = getAuth(app)

export const db = getFirestore(app)

export const storage = getStorage(app);

export default app
