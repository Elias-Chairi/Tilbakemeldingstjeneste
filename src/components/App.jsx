import FirestoreProvider from "../contexts/Firestore";
import FeedbackButton from "./FeedbackButton";

const App = (props) => {
  return (
    <FirestoreProvider client:only="solid-js">
      <main>
        <FeedbackButton client:only="solid-js" />
      </main>
    </FirestoreProvider>
  );
};

export default App;
