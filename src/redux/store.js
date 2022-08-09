import { configureStore } from "@reduxjs/toolkit";
import notesSlice from "./notes/notesSlice";

export const store = configureStore({
  reducer: {
    notes: notesSlice,
  },
});
