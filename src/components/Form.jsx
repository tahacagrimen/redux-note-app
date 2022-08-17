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

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

    if (note === "") {
      toast.error("Please enter a note", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return null;
    } else if (color === "") {
      toast.error("Please select a color", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return null;
    }

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
      timestamp: Date.now(),
    });

    setNote("");
    setColor("");
    setDates("");
  };

  return (
    <div className="addNoteContainer flex items-center justify-between flex-col bg-slate-300 md:p-8 p-4 md:h-screen max-h-full md:w-1/5 w-full md:sticky top-0 left-0">
      <Profile />
      <form className="formContainer w-full" onSubmit={handleSubmit}>
        <textarea
          className="noteArea md:w-full w-full md:h-96 h-32 shadow-xl border-solid border-2 border-sky-500 rounded-lg resize-none box-border md:p-4 p-2 first-line:font-bold first-line:text-xl whitespace-pre-line"
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Note"
        />
        <div className="colorsAndAddBtn flex items-center justify-center flex-col p-2">
          <div className="colors flex justify-between items-center mb:mt-4 mt-2">
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
            className="addBtn w-3/4 mt-4 md:h-10 h-6 bg-sky-500 text-white rounded-lg shadow-xl hover:scale-125 active:bg-sky-600"
            type="submit"
            whileHover={{ scale: 1.1 }}
          >
            Add Note
          </motion.button>
          <ToastContainer
            position="top-right"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          {/* Same as */}
          <ToastContainer />
        </div>
      </form>
    </div>
  );
}

export default Form;
