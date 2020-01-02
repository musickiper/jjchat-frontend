import firebase from "firebase/app";
import "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_DOMAIN,
    databaseURL: process.env.FIREBASE_DB_URL,
    projectId: process.env.FIREBASE_PRJ_ID,
    storageBucket: process.env.FIREBASE_BUCKET,
    messagingSenderId: process.env.MSG_SEND_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASURE_ID
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase.storage();
