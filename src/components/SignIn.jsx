import React, { useState } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db, auth } from "../firebase";
import SignOut from "./SignOut";
import Notes from "./Notes";
import { nanoid } from "@reduxjs/toolkit";

import notesSlice from "../redux/notes/notesSlice";

const provider = new GoogleAuthProvider();

function SignIn() {
  return <div></div>;
}

export default SignIn;
