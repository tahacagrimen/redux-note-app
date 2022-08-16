import React from "react";
import Item from "./Item";

import "./css/Notes.css";
import { useSelector } from "react-redux";

import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { useState } from "react";
import { useEffect } from "react";

function Notes() {
  const [notes, setNotes] = useState([]);
  const userUid = useSelector((state) => state.user.userUid);

  useEffect(() => {
    onSnapshot(collection(db, userUid), (snapshot) => {
      console.log(snapshot.docs.map((doc) => doc.data()));
      setNotes(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  return (
    <div className="notesContainer bg-red-400 h-auto md:w-3/4 w-full">
      {notes.map((note) => (
        <Item key={note.id} note={note} />
      ))}
    </div>
  );
}

export default Notes;
