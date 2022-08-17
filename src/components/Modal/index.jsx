import { motion } from "framer-motion";
import Backdrop from "../Backdrop";

import { useState, useEffect } from "react";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { editNote, deleteNote } from "../../redux/notes/notesSlice";

import {
  doc,
  updateDoc,
  deleteDoc,
  collection,
  getDocs,
} from "firebase/firestore";

import { db } from "../../firebase";

const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
    exit: {
      y: "100vh",
      opacity: 0,
    },
  },
};

const Modal = ({ handleClose, note, id }) => {
  const userUid = useSelector((state) => state.user.userUid);

  const [noteText, setNoteText] = useState(note.note);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      editNote({
        id: note.id,
        note: noteText,
        color: note.color,
        dates: note.dates,
      })
    );

    const docRef = doc(db, userUid, id);
    const data = {
      note: noteText,
    };

    updateDoc(docRef, data);

    handleClose();
  };

  const handleDelete = () => {
    dispatch(deleteNote(note.id));
    deleteDoc(doc(db, userUid, note.id));
    handleClose();
  };

  return (
    <Backdrop onClick={() => handleClose()}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="sm:w-96 sm:h-96 h-64 w-full bg-white  rounded-lg border border-gray-400 m-4 py-5 px-4"
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <form onSubmit={handleSubmit}>
          <div className="modal-header">
            <textarea
              type="text"
              onChange={(e) => setNoteText(e.target.value)}
              defaultValue={note.note}
              className="resize-none  border-gray-400 rounded-lg border w-full sm:h-72 h-44 p-4 first-line:font-bold whitespace-pre-line"
            />
          </div>
          <div className="flex flex-row items-center justify-between mt-4">
            <button className="font-bold" type="submit">
              Update
            </button>
            <button className="font-bold text-red-700" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </form>
      </motion.div>
    </Backdrop>
  );
};

export default Modal;
