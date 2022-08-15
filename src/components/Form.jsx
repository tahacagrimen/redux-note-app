import React, { useState } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";
import { addNote } from "../redux/notes/notesSlice";
import moment from "moment";
import { motion } from "framer-motion";
import Login from "./Firebase Login/Login";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import "./css/Form.css";

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
    <div className="addNoteContainer">
      <Login />
      <form className="formContainer" onSubmit={handleSubmit}>
        <textarea
          className="noteArea"
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Note"
        />
        <div className="colorsAndAddBtn">
          <div className="colors">
            <div
              className="firstColor color"
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
              className="secondColor color"
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
              className="thirdColor color"
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
              className="fourthColor color"
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
              className="fifthColor color"
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
            className="addBtn"
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
