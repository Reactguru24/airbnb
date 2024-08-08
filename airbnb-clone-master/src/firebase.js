// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDZ2xirIqb3CpHdNumIs1zvnMtqug9EtRA",
  authDomain: "airbnb-clone-3c18f.firebaseapp.com",
  projectId: "airbnb-clone-3c18f",
  storageBucket: "airbnb-clone-3c18f.appspot.com",
  messagingSenderId: "868427375896",
  appId: "1:868427375896:web:b6bdeddcdab6e996b3ea6d"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(firebaseApp);

export { auth };
