import { getFirestore } from "firebase/firestore";
import { app } from "./Firebase";

// const querySnapshot = await getDocs(collection(db, "feeback"));
// const Feedback = querySnapshot.docs[0].data();
// const User = await getDoc(Feedback.User).then((document) => document.data());
// const data = { Feedback, User };
// console.log(data);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { db };
