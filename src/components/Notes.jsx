import React from "react";
import { useSelector } from "react-redux";
import { notesSelectors } from "../redux/notes/notesSlice";
import { motion } from "framer-motion";
import Item from "./Item";

import "./css/Notes.css";

function Notes() {
  const notes = useSelector(notesSelectors.selectAll);

  return (
    <div className="notesContainer">
      {notes.map((note) => (
        <Item key={note.id} note={note} />
      ))}
    </div>
  );
}

export default Notes;
