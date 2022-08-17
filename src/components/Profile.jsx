import React from "react";

import { signOut } from "firebase/auth";

import { auth } from "../firebase";

import { useSelector, useDispatch } from "react-redux";

import { setUserLogOutState } from "../redux/userSlice";

function Profile() {
  const userName = useSelector((state) => state.user.userName);
  const userPhotoURL = useSelector((state) => state.user.userPhotoURL);

  const dispatch = useDispatch();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        dispatch(setUserLogOutState());
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="mb-4">
      <div className="flex items-center justify-center sm:flex-col flex-row">
        <h2 className="sm:text-2xl text-xl mb-4 mr-4">{userName}</h2>
        <img
          className="sm:w-20 sm:h-20 w-10 h-10 rounded-full border-solid border-2 border-sky-500"
          src={userPhotoURL}
          alt=""
        />
        <div className="ml-4">
          <button onClick={handleLogout}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 md:mt-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
