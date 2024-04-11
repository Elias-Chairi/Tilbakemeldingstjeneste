import { doc, getDoc } from "firebase/firestore";
import { db } from "../../stores/Firestore";
import { Show, createResource } from "solid-js";

const User = (props) => {
  const fetchUser = () => getDoc(doc(db, "users", props.uid));
  const [user] = createResource(fetchUser);
  return <Show when={!user.loading}>{user().data().name}</Show>;
};

export default User