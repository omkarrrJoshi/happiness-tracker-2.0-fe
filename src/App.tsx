import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Spiritual from "./pages/spiritual";
import LoginSignup from "./components/internal/loginSignup";
import AuthListener from "./components/internal/AuthListener";
import { getUser } from "./redux/selectors/userSelector";
import './App.css';
import Loader from "./components/common/loader";

const App: React.FC = () => {
  const user = useSelector(getUser); // Get user from Redux
  console.log(user)
  return (
    <Router>
      <AuthListener /> {/* ✅ Ensures Redux is updated with authentication status */}
      {user === null || undefined ? ( 
        <Loader /> // ✅ Show Loader until user state is determined
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
