// Imports
const { initializeFirebaseApp, restore } = require('firestore-export-import');
const firebaseConfig = require('./config.js');
const serviceAccount = require('./serviceAccount.json');

if (process.argv.length != 3) {
  console.log("Usage: node import.js path/to/uploadable/file.json");
  process.exit(1);
}

const fileToUpload = process.argv[2];

console.log(`Attempting to upload file at ${fileToUpload}`)

// JSON To Firestore
const jsonToFirestore = async () => {
  try {
    console.log('Initialzing Firebase');
    await initializeFirebaseApp(serviceAccount, firebaseConfig.databaseURL);
    console.log('Firebase Initialized');

    await restore(fileToUpload);
    console.log('Upload Success');
  }
  catch (error) {
    console.log(error);
  }
};

jsonToFirestore();