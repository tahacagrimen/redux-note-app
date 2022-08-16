import React from "react";
import Item from "./Item";

import "./css/Notes.css";
import { useSelector } from "react-redux";
import { notesSelectors } from "../redux/notes/notesSlice";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useState } from "react";
import { useEffect } from "react";

function Notes() {
  const [notes, setNotes] = useState([]);

  const userUid = useSelector((state) => state.user.userUid);

  useEffect(() => {
    const getNotes = async () => {
      const notesRef = collection(db, userUid);
      const snapshots = await getDocs(notesRef);
      const docs = snapshots.docs.map((doc) => doc.data());
      setNotes(docs);
    };
    getNotes();
  }, [userUid, notes]);

  if (!userUid) {
    return <div>Please login to see your notes</div>;
  }

  return (
    <div className="notesContainer bg-red-400 h-auto md:w-3/4 w-full">
      {notes.map((note) => (
        <Item key={note.id} note={note} />
      ))}
    </div>
  );
}

export default Notes;
