import React from "react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "./Modal/index";

import "./css/Item.css";

function Item({ note }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [id, setId] = useState("");

  console.log(note);

  const close = () => {
    setModalOpen(false);
  };

  const open = () => {
    setModalOpen(true);
    setId(note.id);
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
      </motion.div>

      <AnimatePresence
        initial={false}
        exitBeforeEnter={true}
        onExitComplete={() => null}
      >
        {modalOpen && (
          <Modal id={id} modalOpen={modalOpen} handleClose={close} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default Item;
