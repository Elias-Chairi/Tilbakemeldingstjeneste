import { Show, createSignal } from "solid-js";
import Dialog from "../Dialog/Dialog";
import { displayName, isLoggedIn, uid } from "../../stores/Auth";
import styles from "./styles.module.css";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../stores/Firestore";
import PriorityRadio from "./PriorityRadio";

const FeedbackDialog = (props) => {
  const [name, setName] = createSignal("");
  const [message, setMessage] = createSignal("");
  let dialogRef;

  return (
    <Dialog
      ref={(ref) => {
        dialogRef = ref;
        typeof props.ref === "function" ? props.ref(ref) : (props.ref = ref);
      }}
    >
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          const formData = new FormData(event.target);
          const name = formData.get("name");
          const message = formData.get("message");
          const priority = formData.get("priority");

          addDoc(collection(db, "feedback"), {
            message: message,
            date: serverTimestamp(),
            ...(isLoggedIn() ? { uid: uid() } : { name: name }),
            priorityId: priority,
          }).then(() => {
            dialogRef.close()
          });
        }}
      >
        <h1>Gi tilbakemelding!</h1>
        <div class={styles.label}>
          <Show
            when={isLoggedIn()}
            fallback={
              <label>
                Navn:
                <input name="name" onInput={(e) => setName(e.target.value)} />
              </label>
            }
          >
            <label>
              Navn fra bruker: <b>{displayName()}</b>
            </label>
          </Show>
          <textarea
            class={styles.textarea}
            name="message"
            onInput={(e) => setMessage(e.target.value)}
          />
          <PriorityRadio name="priority" />
        </div>
        <button
          type="submit"
          disabled={isLoggedIn() ? !message() : !name() || !message()}
        >
          Send inn
        </button>
      </form>
    </Dialog>
  );
};

export default FeedbackDialog;
