import { motion } from "framer-motion";
import Backdrop from "../Backdrop";

import { useState } from "react";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  notesSelectors,
  editNote,
  deleteNote,
} from "../../redux/notes/notesSlice";

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

const Modal = ({ handleClose, id }) => {
  const note = useSelector((state) => notesSelectors.selectById(state, id));

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

    handleClose();
  };

  const handleDelete = () => {
    dispatch(deleteNote(note.id));
    handleClose();
  };

  return (
    <Backdrop onClick={() => handleClose()}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="modal orange-gradient"
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
            />
          </div>
          <button type="submit">Update</button>
          <button onClick={handleDelete}>Delete</button>
        </form>
      </motion.div>
    </Backdrop>
  );
};

export default Modal;