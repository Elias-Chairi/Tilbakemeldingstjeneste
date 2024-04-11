import { For, Show, createResource, createSignal, onCleanup } from "solid-js";
import { isAdmin, isLoggedIn } from "../../stores/Auth";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../../stores/Firestore";
import styles from "./styles.module.css";

const User = (props) => {
  const fetchUser = () => getDoc(doc(db, "users", props.uid));
  const [user] = createResource(fetchUser);
  return <Show when={!user.loading}>{user().data().name}</Show>;
};

const Proiority = (props) => {
  const fetchUser = () => getDoc(doc(db, "priority", props.id));
  const [priority] = createResource(fetchUser);
  return <Show when={!priority.loading}>{priority().data().name}</Show>;
};

const FeedbackPage = () => {
  const [feedback, setFeedback] = createSignal([]);

  const unsub = onSnapshot(
    query(collection(db, "feedback"), orderBy("date", "desc")),
    (doc) => setFeedback(doc.docs)
  );
  onCleanup(() => unsub());

  return (
    <Show
      when={isLoggedIn() && isAdmin()}
      fallback={<h1>Du er ikke en admin :(</h1>}
    >
      <h1>Tilbakemeldinger</h1>
      <table class={styles.table}>
        <tbody class={styles.tbody}>
          <tr>
            <th>Innsender</th>
            <th>Melding</th>
            <th>Prioritet</th>
            <th>Dato</th>
            <th>Handlinger</th>
          </tr>
          <For each={feedback()}>
            {(doc, index) => (
              <tr>
                <td>
                  <User uid={doc.data().uid} />
                </td>
                <td>{doc.data().message}</td>
                <td>
                  <Proiority id={doc.data().priorityId} />
                </td>
                <td>{doc.data().date.toDate().toLocaleString()}</td>
                <td>
                  <button onClick={() => deleteDoc(doc.ref)}>Slett</button>
                </td>
              </tr>
            )}
          </For>
        </tbody>
      </table>
    </Show>
  );
};

export default FeedbackPage;
