import React, { useEffect } from "react";

import { auth } from "../../firebase";

import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import { useDispatch, useSelector } from "react-redux";
import {
  setActiveUser,
  setUserLogOutState,
  selectUserName,
  selectUserEmail,
  selectUserUid,
  selectUserPhotoURL,
} from "../../redux/userSlice";

function Login() {
  const provider = new GoogleAuthProvider();

  const dispatch = useDispatch();

  const userName = useSelector(selectUserName);
  const userEmail = useSelector(selectUserEmail);
  const userUid = useSelector(selectUserUid);
  const userPhotoURL = useSelector(selectUserPhotoURL);

  const handleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log(user);
        dispatch(
          setActiveUser({
            userName: user.displayName,
            userEmail: user.email,
            userUid: user.uid,
            userPhotoURL: user.photoURL,
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          setActiveUser({
            userName: user.displayName,
            userEmail: user.email,
            userUid: user.uid,
            userPhotoURL: user.photoURL,
          })
        );
      } else {
        dispatch(setUserLogOutState());
      }
    }).bind(this);
  }, [dispatch]);

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="flex items-center justify-center flex-col">
        <h1 className="first-letter:font-semibold mb-4 text-6xl">Take Notes</h1>
        <button
          onClick={handleLogin}
          type="button"
          className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
        >
          <svg
            className="mr-2 -ml-1 w-4 h-4"
            aria-hidden="true"
            focusable="false"
            data-prefix="fab"
            data-icon="google"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 488 512"
          >
            <path
              fill="currentColor"
              d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
            ></path>
          </svg>
          Sign in with Google
        </button>
        <p>
          Coded by{" "}
          <a className="font-bold" href="https://github.com/tahacagrimen">
            Taha Çağrı Men
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
