import React from "react";
import { getAuth, signOut, GoogleAuthProvider } from "firebase/auth";

const provider = new GoogleAuthProvider();

function SignOut({ user }) {
  const auth = getAuth();
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <div>
      {user ? (
        <div>
          <p>{user.displayName}</p>
          <img src={user.photoURL} alt="" />
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      ) : null}
    </div>
  );
}

export default SignOut;
