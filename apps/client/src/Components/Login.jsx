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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setIsLoading(true);
      try {
        // Listen for auth state changes
        if (currentUser) {
          console.log("User logged in");
          setUser(currentUser);
          console.log(currentUser);

          //Sync user with the server : if doesn't exit add to db
          const idToken = await currentUser.getIdToken();
          console.log(idToken)
          const res = await fetch("/api/v1/user/sync", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          });

          if (!res.ok) throw new Error("Something went wrong while fetching ");

          const data = await res.json();
          console.log(data);
        } else {
          setUser(null);
          console.log("Logging out or no user");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    });

    //cleanup
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
      const res = await fetch("/api/v1/user/me", {
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
      {user ? (
        <div>
          <p>Welcome, {user.displayName}</p>
          <button onClick={() => auth.signOut()}>Sign Out</button>
          <button onClick={callProtectedApi}>Call Protected API</button>
        </div>
      ) : (
        <LoginButton type={0} onClick={handleGoogleLogin} />
      )}
      <pre>{apiResponse}</pre>
    </div>
  );
};

export default Login;
