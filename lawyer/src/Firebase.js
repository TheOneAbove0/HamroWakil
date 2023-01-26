import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";



const firebaseConfig = {
  apiKey: "AIzaSyCYgRw1A3pUNODzkhVaQ9lyfUAgUZtvyrk",
  authDomain: "final-737ad.firebaseapp.com",
  databaseURL: "https://final-737ad-default-rtdb.firebaseio.com",
  projectId: "final-737ad",
  storageBucket: "final-737ad.appspot.com",
  messagingSenderId: "186787033416",
  appId: "1:186787033416:web:680c8c058d1c68bd07c37d",
  measurementId: "G-46B52ZPRKZ"
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage = firebase.storage();

export default firebase;



