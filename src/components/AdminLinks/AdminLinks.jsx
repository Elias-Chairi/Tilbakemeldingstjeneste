import { Show } from "solid-js";
import { isAdmin, isLoggedIn } from "../../stores/Auth";
import styles from "./styles.module.css";

const AdminLinks = (params) => {
  return (
    <Show when={isLoggedIn() && isAdmin()}>
      <div class={styles.LinkContainer}>
        <Show when={params.path != "/"}>
          <a href="/">Hjem</a>
        </Show>
        <Show when={params.path != "/tilbakemeldinger"}>
          <a href="/tilbakemeldinger">Tilbakemeldinger</a>
        </Show>
        <Show when={params.path != "/oppdrag"}>
          <a href="/oppdrag">Oppdrag</a>
        </Show>
      </div>
    </Show>
  );
};

export default AdminLinks;
