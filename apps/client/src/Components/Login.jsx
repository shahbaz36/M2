import React, { useState, useEffect } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebaseConfig";
import LoginButton from "./LoginButton/LoginButton";

const Login = () => {
  const [user, setUser] = useState(null);
  const [apiResponse, setApiResponse] = useState("");

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      // The onAuthStateChanged listener will handle setting the user
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  };

  const callProtectedApi = async () => {
    if (!user) {
      setApiResponse("You must be logged in to do this.");
      return;
    }

    const idToken = await user.getIdToken();

    try {
      const res = await fetch("/api/v1/user/test", {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });

      const data = await res.json();
      setApiResponse(JSON.stringify(data));
    } catch (error) {
      console.log(error.message);
      setApiResponse("Failed to fetch protected data.");
    }
  };

  return (
    <div>
      {console.log(user)}
      {user ? (
        <div>
          <p>Welcome, {user.displayName}</p>
          <button onClick={() => auth.signOut()}>Sign Out</button>
          <button onClick={callProtectedApi}>Call Protected API</button>
        </div>
      ) : (
        <LoginButton type = {0} onClick={handleGoogleLogin} />
      )}
      <pre>{apiResponse}</pre>
    </div>
  );
};

export default Login;
