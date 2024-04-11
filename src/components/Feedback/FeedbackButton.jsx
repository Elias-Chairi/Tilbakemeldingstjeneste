import { collection, getDocs } from "firebase/firestore";
import FeedbackDialog from "../Feedback/FeedbackDialog";
import { createEffect, createSignal } from "solid-js";
import { db } from "../../stores/Firestore";

const FeedbackButton = (props) => {
  let dialogRef;
  const [firestoreFeedback, setFirestoreFeedback] = createSignal();

  getDocs(collection(db, "feeback"))
    .then((querySnapshot) => querySnapshot.docs[0].data())
    .then((d) => setFirestoreFeedback(d));

  createEffect(() => {
    console.log({ firestoreFeedback: firestoreFeedback() });
  });

  return (
    <>
      <button onClick={() => dialogRef.showModal()}>{props.children}</button>
      <FeedbackDialog ref={dialogRef} />
    </>
  );
};

export default FeedbackButton;
