import "./App.css";
import Form from "./components/Form";
import Notes from "./components/Notes";
import Login from "./components/Firebase Login/Login";

import { useSelector } from "react-redux";

function App() {
  const userUid = useSelector((state) => state.user.userUid);

  if (userUid) {
    return (
      <div className="App flex sm:flex-row flex-col justify-start">
        <Form />
        <Notes />
      </div>
    );
  }
  return <Login />;
}

export default App;
