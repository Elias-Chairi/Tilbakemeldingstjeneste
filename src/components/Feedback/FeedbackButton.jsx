import firestore from "../../stores/Firestore";
import { collection, getDocs, doc, getDoc, onSnapshot } from "firebase/firestore";
import FeedbackDialog from "../Feedback/FeedbackDialog";
import { createEffect, createSignal } from "solid-js";

const FeedbackButton = (props) => {
  let dialogRef;
  const [firestoreFeedback, setFirestoreFeedback] = createSignal();


  getDocs(collection(firestore().db, "feeback"))
    .then((querySnapshot) => querySnapshot.docs[0].data())
    .then((d) => setFirestoreFeedback(d));

  createEffect(() => {
    console.log({ firestoreFeedback: firestoreFeedback() });
  });

  return (
    <>
      <button onClick={() => dialogRef.showModal()}>
        {props.children}
      </button>
      <FeedbackDialog ref={dialogRef} />
    </>
  );
};

export default FeedbackButton;
