import React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "./Modal/index";

import "./css/Item.css";

function Item({ note }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [id, setId] = useState("");

  const close = () => {
    setModalOpen(false);
  };

  const open = () => {
    setModalOpen(true);
    setId(note.id);
    console.log(id);
  };

  return (
    <div>
      <motion.div
        className="itemContainer"
        style={{ backgroundColor: note.color }}
        onClick={() => {
          modalOpen ? close() && setId("") : open();
        }}
      >
        <div className="note">{note.note}</div>
        <div className="noteDate">{note.dates}</div>
      </motion.div>

      <AnimatePresence
        initial={false}
        exitBeforeEnter={true}
        onExitComplete={() => null}
      >
        {modalOpen && <Modal modalOpen={modalOpen} handleClose={close} />}
      </AnimatePresence>
    </div>
  );
}

export default Item;
