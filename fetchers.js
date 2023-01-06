// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getFirestore, collection, query, getDocs } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore-lite.js";

import { firebaseConfig } from './config.js';

// Initialize Firebase; note we can capture the output of this if we ever need to
// swap firebase instances around, but this sets a global default we'll just use
initializeApp(firebaseConfig);

const db = getFirestore();
const collectionRef = collection(db, 'routines');

const q = query(collectionRef);

const docs = await getDocs(q);

export const allRoutines = {};
docs.forEach(doc => {
  allRoutines[doc.id] = doc.data();
});

console.log("Loaded data from firebase!");
