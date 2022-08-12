import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

export const notesAdapter = createEntityAdapter();

export const notesSelectors = notesAdapter.getSelectors((state) => state.notes);

const notesSlice = createSlice({
  name: "notes",
  initialState: notesAdapter.getInitialState(),
  reducers: {
    addNote: notesAdapter.addOne,
    deleteNote: notesAdapter.removeOne,
    editNote: notesAdapter.upsertOne,
  },
});

export const { addNote, deleteNote, editNote } = notesSlice.actions;

export default notesSlice.reducer;
