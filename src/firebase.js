import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Votre configuration Firebase
const firebaseConfig = {
  projectId: "site-web-7e09d",
  apiKey: "AIzaSyBXQQtDGIH09dksb4DYRd3_gEwve3CVqiU",
  storageBucket: "gs://site-web-7e09d.firebasestorage.app",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Fonction pour récupérer des documents depuis Firestore
async function getData(collectionName) {
  let data = [];
  const querySnapshot = await getDocs(collection(db, collectionName));
  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });
  return data;
}

export { getData };
