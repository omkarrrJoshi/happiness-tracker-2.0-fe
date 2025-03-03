import React, { useState } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebaseConfig";
import "./loginSignup.css";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/authSlice";

const LoginSignup: React.FC = () => {
  const dispatch = useDispatch();

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  
  // const auth = getAuth();

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setError(null);
  };


const login = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    console.log("Logged in user:", user);
    
    dispatch(setUser(user)); // ✅ Store user in Redux
  } catch (error) {
    console.error("Login failed:");
  }
};

  const signup = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      console.log("New user created:", user);
  
      dispatch(setUser(user)); // ✅ Store new user in Redux
    } catch (error) {
      console.error("Signup failed:");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("All fields are required.");
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await signup(email, password);
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  const DEFAULT_CLASS = "login-signup";

  return (
    <div className={`${DEFAULT_CLASS}_container`}>
      <h2>{isLogin ? "Login" : "Sign Up"}</h2>

      {error && <p className={`${DEFAULT_CLASS}_error-message`}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className={`${DEFAULT_CLASS}_input-group`}>
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>

        <div className={`${DEFAULT_CLASS}_input-group`}>
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>

        {!isLogin && (
          <div className={`${DEFAULT_CLASS}_input-group`}>
            <label>Confirm Password</label>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          </div>
        )}

        <button type="submit" className={`${DEFAULT_CLASS}_button`}>
          {isLogin ? "Login" : "Sign Up"}
        </button>
      </form>

      <p className={`${DEFAULT_CLASS}_toggle-text`}>
        {isLogin ? "Don't have an account?" : "Already have an account?"}
        <span onClick={toggleMode}>{isLogin ? " Sign Up" : " Login"}</span>
      </p>
    </div>
  );

};

export default LoginSignup;
