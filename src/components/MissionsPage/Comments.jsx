import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../stores/Firestore";
import styles from "./styles.module.css";
import { createSignal, onCleanup } from "solid-js";
import { uid } from "../../stores/Auth";
import User from "../Fetchers/User";

const Comments = (props) => {
  const [comments, setComments] = createSignal([]);
  const [message, setMessage] = createSignal("");

  const unsub = onSnapshot(
    query(
      collection(db, "missions", props.missionId, "comments"),
      orderBy("date", "asc")
    ),
    (doc) => setComments(doc.docs)
  );
  onCleanup(() => unsub());

  return (
    <div class={styles.commentsSection}>
      <h3>Kommentarer</h3>
      <div class={styles.comments}>
        <For each={comments()}>
          {(doc, index) => (
            <div class={styles.comment}>
              <div class={styles.commentHeader}>
                <span>
                  <b>
                    <User uid={doc.data().uid} />
                  </b>
                </span>
                <span>{doc.data().date?.toDate().toLocaleString()}</span>
              </div>
              <p class={styles.commentBody}>{doc.data().message}</p>
            </div>
          )}
        </For>
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          const formData = new FormData(event.target);
          const message = formData.get("message");

          addDoc(collection(db, "missions", props.missionId, "comments"), {
            date: serverTimestamp(),
            message,
            uid: uid(),
          });
        }}
      >
        <div class={styles.textareaWrapper}>
          <textarea
            name="message"
            onInput={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>
        <div class={styles.textareaActions}>
          <button type="submit" disabled={!message}>
            Send kommentar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Comments;
