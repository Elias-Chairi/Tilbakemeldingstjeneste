import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { Index, Show, Suspense, createResource } from "solid-js";
import { db } from "../../stores/Firestore";
import styles from "./styles.module.css";

const fetchPriorities = () =>
  getDocs(query(collection(db, "priority"), orderBy("index")));

const PriorityRadio = (props) => {
  const [priorities] = createResource(fetchPriorities);

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Show when={!priorities.loading} fallback={<span>Loading ...</span>}>
        <div class={styles.radioButtons}>
          <Index each={priorities().docs}>
            {(doc, index) => (
              <label>
                {doc().data().name}:
                <input
                  type="radio"
                  name={props.name}
                  value={doc().id}
                  checked={parseInt(doc().data().index) == 1}
                />
              </label>
            )}
          </Index>
        </div>
      </Show>
    </Suspense>
  );
};

export default PriorityRadio;
