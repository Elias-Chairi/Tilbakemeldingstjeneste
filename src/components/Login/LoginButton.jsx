import { isLoggedIn, authReady } from "../../stores/Auth";
import LoginDialog from "./LoginDialog";

const LoginButton = (props) => {
  let dialogRef;

  return (
    <Show when={!authReady() || !isLoggedIn()}>
      <LoginDialog ref={dialogRef} />
      <button onClick={() => dialogRef.showModal()}>{props.children}</button>
    </Show>
  );
};

export default LoginButton;
