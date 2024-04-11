import { For, Show, createResource, createSignal, onCleanup } from "solid-js";
import { isAdmin, isLoggedIn } from "../../stores/Auth";
import {
  addDoc,
  collection,
  deleteDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../stores/Firestore";
import styles from "./styles.module.css";
import User from "../Fetchers/User";
import Proiority from "../Fetchers/Proiority";

const transformToMission = (feedbackDocument) => {
  const feedback = feedbackDocument.data();
  addDoc(collection(db, "missions"), {
    feedback,
    date: serverTimestamp(),
    missionStateId: "default",
    closed: false,
    priorityId: feedback.priorityId,
  }).then(() => {
    window.location.href = "/oppdrag";
  });
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
                  <Show when={doc.data().uid} fallback={doc.data()?.name}>
                    <User uid={doc.data().uid} />
                  </Show>
                </td>
                <td>{doc.data().message}</td>
                <td>
                  <Proiority id={doc.data().priorityId} />
                </td>
                <td>{doc.data().date.toDate().toLocaleString()}</td>
                <td>
                  <button onClick={() => deleteDoc(doc.ref)}>Slett</button>
                  <button onClick={() => transformToMission(doc)}>
                    Omgjør til oppdrag
                  </button>
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
