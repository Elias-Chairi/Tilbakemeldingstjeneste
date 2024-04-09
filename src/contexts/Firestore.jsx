import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { createContext, useContext } from "solid-js";

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

const FirestoreContext = createContext();

export default function FirestoreProvider(props) {

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  const firestore = {
    db,
  };

  return (
    <FirestoreContext.Provider value={firestore}>
      {props.children}
    </FirestoreContext.Provider>
  );
}

export function useFirestore() {
  return useContext(FirestoreContext);
}
