import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import "../App.css";
import loginBg from "../assets/login.JPG";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (error) {
      alert("Login failed: " + error.message);
    }
  };

  return (
    <div className="auth-container" style={{ backgroundImage: `url(${loginBg})` }}>
      <form className="auth-box" onSubmit={handleLogin}>
        <h2>Welcome Back 👋</h2>
        <input
          className="input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="btn full-width">Login</button>
        <p className="auth-switch">Don't have an account? <Link to="/signup">Sign Up</Link></p>
      </form>
    </div>
  );
}

export default Login;
