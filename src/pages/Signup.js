import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import "../App.css";
import signupBg from "../assets/signup.JPG";

import { useTranslation } from "react-i18next";

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

  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="auth-container" style={{ backgroundImage: `url(${signupBg})` }}>
      <form className="auth-box" onSubmit={handleSignup}>

        {/* Language Selector */}
        <div style={{ textAlign: "right", margin: "10px" }}>
          <select
            onChange={(e) => changeLanguage(e.target.value)}
            defaultValue={i18n.language}
            style={{
              padding: "6px 12px",
              borderRadius: "6px",
              fontSize: "14px",
              background: "#f3f3f3",
            }}
          >
            <option value="en">🌐 English</option>
            <option value="hi">🇮🇳 हिंदी</option>
            <option value="bn">🇧🇩 বাংলা</option>
            <option value="mr">🇮🇳 मराठी</option>
            <option value="as">🇮🇳 Assamese</option>
            <option value="ks">🇮🇳 Kashmiri</option>
            <option value="kn">🇮🇳 Kannada</option>
            <option value="pa">🇮🇳 Punjabi</option>
            <option value="hr">🇮🇳 Haryanvi</option>
            <option value="or">🇮🇳 Odia</option>
            <option value="mni">🇮🇳 Manipuri</option>
            <option value="ta">🇮🇳 Tamil</option>
            <option value="ml">🇮🇳 Malayalam</option>
          </select>
        </div>

        <h2>{t("acc")} 👩‍💻</h2>
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
        <button className="btn full-width">{t("signup")}</button>
        <p className="auth-switch">{t("alredy_acc")} <Link to="/login">{t("login")}</Link></p>
      </form>
    </div>
  );
}

export default Signup;
