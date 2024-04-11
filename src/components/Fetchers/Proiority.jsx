import { doc, getDoc } from "firebase/firestore";
import { db } from "../../stores/Firestore";
import { Show, createResource } from "solid-js";

const Proiority = (props) => {
  const fetchUser = () => getDoc(doc(db, "priority", props.id));
  const [priority] = createResource(fetchUser);
  return <Show when={!priority.loading}>{priority().data().name}</Show>;
};

export default Proiority