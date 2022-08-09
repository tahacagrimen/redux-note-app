import "./App.css";
import Form from "./components/Form";
import Notes from "./components/Notes";

import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Form />
      <Notes />
    </div>
  );
}

export default App;
