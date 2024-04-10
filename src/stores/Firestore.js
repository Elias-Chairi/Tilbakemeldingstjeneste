import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { createSignal } from "solid-js";

// Firebase public configuration
const firebaseConfig = {
  apiKey: "AIzaSyBKjjhAEIEuejmp3AbG2mnm0Ri4oosqHaw",
  authDomain: "tilbakemeldingstjeneste.firebaseapp.com",
  projectId: "tilbakemeldingstjeneste",
  storageBucket: "tilbakemeldingstjeneste.appspot.com",
  messagingSenderId: "769705650052",
  appId: "1:769705650052:web:af877f1a9c9d2766b69fd1",
};

// const querySnapshot = await getDocs(collection(db, "feeback"));
// const Feedback = querySnapshot.docs[0].data();
// const User = await getDoc(Feedback.User).then((document) => document.data());
// const data = { Feedback, User };
// console.log(data);

const [firestore, setFirestore] = createSignal({});

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

console.log("Set Cloud Firestore")
setFirestore({ db });


export default firestore
