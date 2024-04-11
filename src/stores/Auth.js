import { createSignal } from "solid-js";
import { app } from "./Firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "./Firestore";
import { doc, getDoc, setDoc } from "firebase/firestore";

const auth = getAuth(app);
const [isLoggedIn, setIsLoggedIn] = createSignal(false);
const [displayName, setDisplayName] = createSignal("");
const [uid, setUid] = createSignal("");
const [isAdmin, setIsAdmin] = createSignal(null);
const [authReady, setAuthReady] = createSignal(false);
auth.authStateReady().then(setAuthReady(true));

const updateDisplayName = (displayName) => {
  setDoc(doc(db, "users", uid()), { name: displayName })
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
    setIsLoggedIn(true);
    setUid(user.uid);
    getDoc(doc(db, "users", user.uid)).then((userDoc) => {
      if (userDoc.exists()) {
        setDisplayName(userDoc.data().name);
      }
    });
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
