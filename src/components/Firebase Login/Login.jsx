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
} from "../../redux/userSlice";

function Login() {
  const provider = new GoogleAuthProvider();

  const dispatch = useDispatch();

  const userName = useSelector(selectUserName);
  const userEmail = useSelector(selectUserEmail);
  const userUid = useSelector(selectUserUid);

  const handleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        dispatch(
          setActiveUser({
            userName: user.displayName,
            userEmail: user.email,
            userUid: user.uid,
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        dispatch(setUserLogOutState());
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
          })
        );
      } else {
        dispatch(setUserLogOutState());
      }
    }).bind(this);
  }, [dispatch]);

  return (
    <div>
      {userName ? (
        <div>
          <h1>{userName}</h1>
          <h1>{userEmail}</h1>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <h1>Login</h1>
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
    </div>
  );
}

export default Login;
