import { createSignal } from "solid-js";
import { app } from "./Firebase";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";

const auth = getAuth(app);
const [isLoggedIn, setIsLoggedIn] = createSignal(false);
const [displayName, setDisplayName] = createSignal("");
const [isAdmin, setIsAdmin] = createSignal(null);
const [authReady, setAuthReady] = createSignal(false);
auth.authStateReady().then(setAuthReady(true));

const updateDisplayName = (displayName) => {
  updateProfile(auth.currentUser, { displayName })
    .then(() => {
      setDisplayName(displayName);
    })
    .catch(() => {
      console.log(error);
    });
};

const forceRefreshToken = () => {
  auth.currentUser
    .getIdTokenResult(true)
    .then((idTokenResult) => setIsAdmin(idTokenResult.claims.admin === true))
    .catch((error) => {
      console.log(error);
    });
};

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    setIsLoggedIn(true);
    setDisplayName(user.displayName);
    user
      .getIdTokenResult()
      .then((idTokenResult) => setIsAdmin(idTokenResult.claims.admin === true))
      .catch((error) => {
        console.log(error);
      });

    console.log("user logged in");
  } else {
    setIsLoggedIn(false);
    setDisplayName("");
    setIsAdmin(false);
    console.log("no user");
  }
});

export {
  auth,
  isLoggedIn,
  authReady,
  displayName,
  isAdmin,
  updateDisplayName,
  forceRefreshToken,
};
