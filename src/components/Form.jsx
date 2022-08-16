import React, { useState } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";
import { addNote } from "../redux/notes/notesSlice";
import moment from "moment";
import { motion } from "framer-motion";

import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import "./css/Form.css";

import Profile from "./Profile";

// IMPORT END

function Form() {
  const [note, setNote] = useState("");
  const [color, setColor] = useState("");
  const [dates, setDates] = useState("");

  const userUid = useSelector((state) => state.user.userUid);

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let date = moment().format("MMM Do YY");
    setDates(date);

    let randomId = nanoid();

    dispatch(
      addNote({
        id: randomId,
        note,
        color,
        dates: date,
      })
    );

    setDoc(doc(db, userUid, randomId), {
      id: randomId,
      note,
      color,
      dates: date,
    });

    setNote("");
    setColor("");
    setDates("");
  };

  return (
    <div className="addNoteContainer flex items-center justify-between flex-col bg-slate-300 p-8 md:h-screen max-h-full md:w-1/4 w-full ">
      <Profile />
      <form className="formContainer w-full" onSubmit={handleSubmit}>
        <textarea
          className="noteArea md:w-full w-full md:h-96 h-48 shadow-xl border-solid border-2 border-sky-500 rounded-lg resize-none box-border p-4 first-line:font-bold first-line:text-xl "
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Note"
        />
        <div className="colorsAndAddBtn flex items-center justify-center flex-col p-2">
          <div className="colors flex justify-between items-center mt-4">
            <div
              className="firstColor color w-8 h-8 rounded-full flex items-center justify-center m-1 hover:animate-bounce"
              onClick={() => setColor("rgba(191, 90, 117, 0.4)")}
            >
              <span
                style={{
                  visibility:
                    color === false
                      ? "hidden"
                      : color === "rgba(191, 90, 117, 0.4)"
                      ? "visible"
                      : "hidden",
                }}
              >
                ✓
              </span>
            </div>
            <div
              className="secondColor color w-8 h-8 rounded-full flex items-center justify-center m-1 hover:animate-bounce"
              onClick={() => setColor("rgba(74, 91, 140, 0.4)")}
            >
              <span
                style={{
                  visibility:
                    color === false
                      ? "hidden"
                      : color === "rgba(74, 91, 140, 0.4)"
                      ? "visible"
                      : "hidden",
                }}
              >
                ✓
              </span>
            </div>
            <div
              className="thirdColor color w-8 h-8 rounded-full flex items-center justify-center m-1 hover:animate-bounce"
              onClick={() => setColor("rgba(7, 38, 24, 0.4)")}
            >
              <span
                style={{
                  visibility:
                    color === false
                      ? "hidden"
                      : color === "rgba(7, 38, 24, 0.4)"
                      ? "visible"
                      : "hidden",
                }}
              >
                ✓
              </span>
            </div>
            <div
              className="fourthColor color w-8 h-8 rounded-full flex items-center justify-center m-1 hover:animate-bounce"
              onClick={() => setColor("rgba(85, 115, 56, 0.4)")}
            >
              <span
                style={{
                  visibility:
                    color === false
                      ? "hidden"
                      : color === "rgba(85, 115, 56, 0.4)"
                      ? "visible"
                      : "hidden",
                }}
              >
                ✓
              </span>
            </div>
            <div
              className="fifthColor color w-8 h-8 rounded-full flex items-center justify-center m-1 hover:animate-bounce"
              onClick={() => setColor("rgba(242, 106, 75, 0.4)")}
            >
              <span
                style={{
                  visibility:
                    color === false
                      ? "hidden"
                      : color === "rgba(242, 106, 75, 0.4)"
                      ? "visible"
                      : "hidden",
                }}
              >
                ✓
              </span>
            </div>
          </div>
          <motion.button
            className="addBtn w-3/4 mt-4 h-10 bg-sky-500 text-white rounded-lg shadow-xl hover:scale-125 active:bg-sky-600"
            type="submit"
            whileHover={{ scale: 1.1 }}
          >
            Add Note
          </motion.button>
        </div>
      </form>
    </div>
  );
}

export default Form;
