import React, { useState } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db, auth } from "../firebase";
import SignOut from "./SignOut";

const provider = new GoogleAuthProvider();

function SignIn() {
  const [user, setUser] = useState(null);
  const auth = getAuth();
  console.log(user);

  const handleSignIn = async () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        setUser(result.user);
        console.log(user);
        console.log(user.uid);
        console.log(user.displayName);
        console.log(user.email);
        console.log(user.photoURL);
      })
      .catch((error) => {
        console.log(error);
      });
    const setDocument = await setDoc(doc(db, "users", `${user.uid}`), {
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      uid: user.uid,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  };

  return (
    <div>
      <button onClick={handleSignIn}>Login</button>
      <SignOut user={user} />
    </div>
  );
}

export default SignIn;
