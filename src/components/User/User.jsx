import { displayName, isLoggedIn, isAdmin } from "../../stores/Auth";
import styles from "./styles.module.css";

const User = () => {
  return (
    <Show when={isLoggedIn() && displayName()}>
      <p>
        {!isAdmin()
          ? `Hei ${displayName()}! Det ser ut som du ikke er en administator for tjenesten. Kontakt utvikler for mer informasjon.`
          : `Hei fantastiske administrator ${displayName()}!`}
      </p>
    </Show>
  );
};

export default User;
