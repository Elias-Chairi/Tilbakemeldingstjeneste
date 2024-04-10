import { createSignal } from "solid-js";
import { auth, updateDisplayName } from "../../stores/Auth";
import Dialog from "../Dialog/Dialog";
import { signInAnonymously } from "firebase/auth";
import styles from "./styles.module.css";

const LoginDialog = (props) => {
  const [name, setName] = createSignal("");

  return (
    <Dialog ref={props.ref}>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          const formData = new FormData(event.target);
          const name = formData.get("name");

          signInAnonymously(auth)
            .then(() => {
              updateDisplayName(name)
            })
            .catch((error) => {
              console.log({ error });
            });
        }}
      >
        <h1>Logg på</h1>
        <div class={styles.label}>
          <label>
            Navn:
            <input name="name" onInput={(e) => setName(e.target.value)} />
          </label>
        </div>
        <button type="submit" disabled={!name()}>
          Logg på
        </button>
      </form>
    </Dialog>
  );
};

export default LoginDialog;
