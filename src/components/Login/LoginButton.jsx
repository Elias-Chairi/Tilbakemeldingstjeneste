import {
  isLoggedIn,
  authReady,
  isAdmin,
  auth,
  forceRefreshToken,
} from "../../stores/Auth";
import LoginDialog from "./LoginDialog";

const LoginButton = (props) => {
  let dialogRef;

  return (
    <>
      <Show when={!authReady() || !isLoggedIn()}>
        <LoginDialog ref={dialogRef} />
        <button onClick={() => dialogRef.showModal()}>Logg inn</button>
      </Show>

      <Show when={authReady() && isLoggedIn()}>
        <button onClick={() => auth.signOut()}>Logg ut</button>
      </Show>

      <Show when={authReady() && isLoggedIn() && !isAdmin()}>
        <button onClick={() => forceRefreshToken()}>Refresh token</button>
      </Show>
    </>
  );
};

export default LoginButton;
