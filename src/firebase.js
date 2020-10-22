import firebase from 'firebase';

const firebaseApp =firebase.initializeApp({
    apiKey: "AIzaSyA94stk3zSrjniiHf3QkNmqE3C8m0iz6ME",
    authDomain: "scorecard-test-92e55.firebaseapp.com",
    databaseURL: "https://scorecard-test-92e55.firebaseio.com",
    projectId: "scorecard-test-92e55",
    storageBucket: "scorecard-test-92e55.appspot.com",
    messagingSenderId: "906743494733",
    appId: "1:906743494733:web:3d6643cce47b48f8e20404",
    measurementId: "G-RRJ5YG3YML"
  });
  // Initialize Firebase
  const db = firebaseApp.firestore();
  const auth = firebase.auth();

  export { db, auth };