import "./App.css";
import Form from "./components/Form";
import Notes from "./components/Notes";

import { useState } from "react";
import ReactDOM from "react-dom/client";

function App() {
  return (
    <div className="App">
      <Form />
      <Notes />
    </div>
  );
}

export default App;
