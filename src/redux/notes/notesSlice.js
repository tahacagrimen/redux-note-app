import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

export const notesAdapter = createEntityAdapter();

const initialState = notesAdapter.getInitialState();

export const notesSelectors = notesAdapter.getSelectors((state) => state.notes);

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNote: notesAdapter.addOne,
    deleteNote: notesAdapter.removeOne,
    updateNote: notesAdapter.updateOne,
  },
  isClicked: false,
});

export const { addNote, deleteNote, updateNote, isClicked } =
  notesSlice.actions;

export default notesSlice.reducer;
