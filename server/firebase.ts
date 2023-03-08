// Import the functions you need from the SDKs you need
const {
  initializeApp,
  applicationDefault,
  cert,
} = require("firebase-admin/app");
const {
  getFirestore,
  Timestamp,
  FieldValue,
} = require("firebase-admin/firestore");

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB9w1Vnjou6GSXHQgnUFS_V7oVf0P1nZvU",
  authDomain: "sp23-newbie-backend.firebaseapp.com",
  projectId: "sp23-newbie-backend",
  storageBucket: "sp23-newbie-backend.appspot.com",
  messagingSenderId: "591536945143",
  appId: "1:591536945143:web:c7d5dfd348a418cf1920f2",
};

// Initialize Firebase
const serviceAccount = require("./service_account.json");

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

export { db };
