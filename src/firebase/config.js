import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'
// this file is for connecting frontend with firebase backend
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDgqJvjf4hhSzUO9C_girrG6nDfiM8G0Xk",
  authDomain: "projectmanagementmarvin.firebaseapp.com",
  projectId: "projectmanagementmarvin",
  storageBucket: "projectmanagementmarvin.appspot.com",
  messagingSenderId: "561566496586",
  appId: "1:561566496586:web:760fa96ec3c8f3c587f3b3",
  measurementId: "G-L0H2QGYCF1"
};

//initialize firebase
firebase.initializeApp(firebaseConfig)

//initialize services
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()
const projectStorage = firebase.storage()
//timestamp
const timestamp = firebase.firestore.Timestamp

export {projectFirestore, projectAuth, timestamp, projectStorage}