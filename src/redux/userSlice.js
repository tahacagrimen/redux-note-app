import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: null,
  userEmail: null,
  userUid: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setActiveUser: (state, action) => {
      state.userName = action.payload.userName;
      state.userEmail = action.payload.userEmail;
      state.userUid = action.payload.userUid;
      state.userPhotoURL = action.payload.userPhotoURL;
    },
    setUserLogOutState: (state) => {
      state.userName = null;
      state.userEmail = null;
      state.userUid = null;
      state.userPhotoURL = null;
    },
  },
});

export const { setActiveUser, setUserLogOutState } = userSlice.actions;

export const selectUserName = (state) => state.user.userName;
export const selectUserEmail = (state) => state.user.userEmail;
export const selectUserUid = (state) => state.user.userUid;
export const selectUserPhotoURL = (state) => state.user.userPhotoURL;

export default userSlice.reducer;
