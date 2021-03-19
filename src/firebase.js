import firebase from "firebase";
// import initializeApp from ''

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDQ4xU6_U-lPHXomPbz_iB0BGWwDBW742U",
  authDomain: "kbtu-b3c4f.firebaseapp.com",
  projectId: "kbtu-b3c4f",
  storageBucket: "kbtu-b3c4f.appspot.com",
  messagingSenderId: "339632761026",
  appId: "1:339632761026:web:bd9d97b5c4a72af493b35b",
  measurementId: "G-ZR17B8GYY4"
});

const firestore = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { firestore, auth, storage };
