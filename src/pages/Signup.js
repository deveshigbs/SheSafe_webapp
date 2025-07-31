import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import "../App.css";
import signupBg from "../assets/signup.JPG";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (error) {
      alert("Signup failed: " + error.message);
    }
  };

  return (
    <div className="auth-container" style={{ backgroundImage: `url(${signupBg})` }}>
      <form className="auth-box" onSubmit={handleSignup}>
        <h2>Create Account 👩‍💻</h2>
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
        <button className="btn full-width">Sign Up</button>
        <p className="auth-switch">Already have an account? <Link to="/login">Login</Link></p>
      </form>
    </div>
  );
}

export default Signup;
