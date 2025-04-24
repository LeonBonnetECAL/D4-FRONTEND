import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Votre configuration Firebase
const firebaseConfig = {
  projectId: "d4studio-84b9d",
  apiKey: "AIzaSyAxRjt8OUhAMmikv9WeWCY9hW2-DPoCFgc",
  storageBucket: "gs://d4studio-84b9d.firebasestorage.app",
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
