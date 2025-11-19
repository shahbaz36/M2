import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "./firebaseConfig";

import Landing from "./Pages/Landing";
import Dashboard from "./Pages/Dashboard";
import Interview from "./Pages/Interview";

function App() {
  const [user, setUser] = useState(null);
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


  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <Router>
      <Routes>

        <Route
          path="/"
          element={!user ? <Landing onLogin={handleGoogleLogin} /> : <Navigate to="/dashboard" />}
        />

        <Route
          path="/dashboard"
          element={user ? <Dashboard user={user} onLogout={handleLogout} /> : <Navigate to="/" />}
        />

        <Route
          path="/interview"
          element={user ? <Interview /> : <Navigate to="/" />}
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
