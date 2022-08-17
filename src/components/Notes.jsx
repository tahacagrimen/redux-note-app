import React from "react";
import Item from "./Item";

import "./css/Notes.css";
import { useSelector } from "react-redux";

import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../firebase";
import { useState } from "react";
import { useEffect } from "react";

function Notes() {
  const [notes, setNotes] = useState([]);
  const userUid = useSelector((state) => state.user.userUid);

  useEffect(() => {
    const colRef = collection(db, userUid);
    const q = query(colRef, orderBy("timestamp", "desc"));
    onSnapshot(q, (snapshot) => {
      console.log(snapshot.docs.map((doc) => doc.data()));
      setNotes(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  return (
    <div className="notesContainer h-auto md:w-4/5 w-full flex items-start justify-start content-start sm:flex-wrap sm:flex-row flex-col gap-4 p-4">
      {notes.map((note) => (
        <Item key={note.id} note={note} />
      ))}
    </div>
  );
}

export default Notes;
