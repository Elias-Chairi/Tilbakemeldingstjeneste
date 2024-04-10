import { getFirestore } from "firebase/firestore";
import { createSignal } from "solid-js";
import { app } from "./Firebase";


// const querySnapshot = await getDocs(collection(db, "feeback"));
// const Feedback = querySnapshot.docs[0].data();
// const User = await getDoc(Feedback.User).then((document) => document.data());
// const data = { Feedback, User };
// console.log(data);

const [firestore, setFirestore] = createSignal({});

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

setFirestore({ db });

export { firestore };