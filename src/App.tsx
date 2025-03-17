import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Spiritual from "./pages/spiritual";
import LoginSignup from "./components/internal/loginSignup";
import AuthListener from "./components/internal/AuthListener";
import { getUser } from "./redux/selectors/userSelector";
import { auth } from "./config/firebaseConfig"; // Import Firebase auth
import "./App.css";
import Loader from "./components/common/loader";
import { onAuthStateChanged } from "firebase/auth";

const App: React.FC = () => {
  const [authLoading, setAuthLoading] = useState(true); // ✅ Track loading state
  const user = useSelector(getUser); // Get user from Redux

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setAuthLoading(false); // ✅ Stop loading when Firebase finishes checking auth
    });

    return () => unsubscribe(); // Cleanup listener
  }, []);

  return (
    <Router>
      <AuthListener /> {/* ✅ Ensures Redux is updated with authentication status */}
      
      {authLoading ? ( 
        <Loader /> // ✅ Show Loader until Firebase checks authentication
      ) : (
        <Routes>
          <Route path="/" element={user ? <Navigate to="/spiritual" /> : <LoginSignup />} />
          <Route path="/spiritual" element={user ? <Spiritual /> : <Navigate to="/" />} />
        </Routes>
      )}
    </Router>
  );
};

export default App;
