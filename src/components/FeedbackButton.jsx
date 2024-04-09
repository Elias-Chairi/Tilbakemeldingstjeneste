import { useFirestore } from "../contexts/Firestore";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import FeedbackDialog from "./FeedbackDialog";
import { onMount } from "solid-js";

const FeedbackButton = (props) => {
  let dialogRef;

  onMount(async () => {
    const { db } = useFirestore();
    const querySnapshot = await getDocs(collection(db, "feeback"));
    console.log(querySnapshot.docs[0].data());
  });

  return (
    <>
      <button onClick={() => dialogRef.showModal()}>
        Gi en tilbakemelding
      </button>
      <FeedbackDialog ref={dialogRef} />
    </>
  );
};

export default FeedbackButton;
