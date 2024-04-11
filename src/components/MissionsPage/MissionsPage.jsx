import { For, Show, createSignal, onCleanup } from "solid-js";
import styles from "./styles.module.css";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import User from "../Fetchers/User";
import { db } from "../../stores/Firestore";
import { isAdmin, isLoggedIn } from "../../stores/Auth";
import Proiority from "../Fetchers/Proiority";
import Comments from "./Comments";

const closeMission = (missionDoc) => {
  updateDoc(missionDoc.ref, {
    closed: true,
  });
};

const MissionsPage = () => {
  const [missions, setMissions] = createSignal([]);

  const unsub = onSnapshot(
    query(collection(db, "missions"), orderBy("date", "desc")),
    (doc) => setMissions(doc.docs)
  );
  onCleanup(() => unsub());

  return (
    <Show
      when={isLoggedIn() && isAdmin()}
      fallback={<h1>Du er ikke en admin :(</h1>}
    >
      <h1>Oppdrag</h1>
      <For each={missions()}>
        {(doc, index) => (
          <Show when={!doc.data().closed}>
            <div class={styles.mission}>
              <div class={styles.feedbackHeader}>
                <h2>Tilbakemelding</h2>
                <button onClick={() => closeMission(doc)}>Lukk oppdrag</button>
              </div>
              <div class={styles.feedback}>
                <p>
                  <b>Innsender: </b>
                  <Show
                    when={doc.data().feedback.uid}
                    fallback={doc.data().feedback?.name}
                  >
                    <User uid={doc.data().feedback.uid} />
                  </Show>
                </p>
                <p>
                  <b>Dato: </b>
                  {doc.data().feedback.date.toDate().toLocaleString()}
                </p>
                <p>
                  <b>Melding: </b> {doc.data().feedback.message}
                </p>
                <p>
                  <b>Prioritet: </b>
                  <Proiority id={doc.data().feedback.priorityId} />
                </p>
              </div>
              <Comments missionId={doc.id} />
            </div>
          </Show>
        )}
      </For>
    </Show>
  );
};

export default MissionsPage;
