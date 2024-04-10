import { createEffect, createSignal } from "solid-js";
import { app } from "./Firebase";
import {
  getAuth,
  onAuthStateChanged,
  updateProfile,
  updateCurrentUser,
} from "firebase/auth";

const auth = getAuth(app);
const [isLoggedIn, setIsLoggedIn] = createSignal(false);
const [displayName, setDisplayName] = createSignal("");
const [isAdmin, setIsAdmin] = createSignal(null);
const [authReady, setAuthReady] = createSignal(false);
auth.authStateReady().then(setAuthReady(true));

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    setIsLoggedIn(true);
    setDisplayName(user.displayName);
    user
      .getIdTokenResult()
      .then((idTokenResult) => setIsAdmin(!!idTokenResult.claims.admin))
      .catch((error) => {
        console.log(error);
      });
    // ...
  } else {
    console.log("no user");
  }
});

export { auth, isLoggedIn, authReady, displayName, isAdmin };
