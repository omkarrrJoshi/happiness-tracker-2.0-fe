import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Spiritual from "./pages/spiritual";
import LoginSignup from "./components/internal/loginSignup";
import AuthListener from "./components/internal/AuthListener";
import { getUser } from "./redux/selectors/userSelector";
import './App.css'
const App: React.FC = () => {
  const user = useSelector(getUser); // Get user from Redux

  return (
    <Router>
      <AuthListener /> {/* ✅ Ensures Redux is updated with authentication status */}
      <Routes>
        <Route path="/" element={user === undefined ? <p>Loading...</p> : user ? <Navigate to="/spiritual" /> : <LoginSignup />} />
        <Route path="/spiritual" element={user ? <Spiritual /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
