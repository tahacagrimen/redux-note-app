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
  };

  return (
    <motion.div className="itemContainer sm:w-64 h-64 w-full items-center flex justify-center">
      <div class="sm:w-64 h-64 w-full flex flex-col justify-between bg-white  rounded-lg border border-gray-400 mb-4 py-5 px-4 ">
        <div>
          <h3
            tabindex="0"
            class="focus:outline-none text-gray-800  first-line:font-bold mb-3 break-all whitespace-pre-line"
          >
            {note.note}
          </h3>
        </div>
        <div>
          <div class="flex items-center justify-between text-gray-800">
            <p tabindex="0" class="focus:outline-none text-sm ">
              {note.dates}
            </p>
            <div
              style={{ backgroundColor: note.color }}
              class="w-8 h-8 rounded-full text-white flex items-center justify-center cursor-pointer"
              onClick={() => {
                modalOpen ? close() && setId("") : open();
              }}
            >
              <img
                src="https://tuk-cdn.s3.amazonaws.com/can-uploader/single_card_with_title_and_description-svg1.svg"
                alt="icon"
              />
            </div>
          </div>
        </div>
      </div>
      <AnimatePresence
        initial={false}
        exitBeforeEnter={true}
        onExitComplete={() => null}
      >
        {modalOpen && (
          <Modal
            id={id}
            note={note}
            modalOpen={modalOpen}
            handleClose={close}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default Item;
