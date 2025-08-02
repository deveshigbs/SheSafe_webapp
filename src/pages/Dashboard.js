import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import SafetyRating from "../components/SafetyRating";
import Confessions from "../components/Confessions";
import LiveLocationTracker from "../components/LiveLocationTracker";
import ComplaintForm from "../components/ComplaintForm";
import ContactDesk from "../components/ContactDesk";
import VoiceCall from "../components/VoiceCall";

import { useTranslation } from "react-i18next";


import "../App.css";

function Dashboard() {
  const navigate = useNavigate();

  const { t, i18n } = useTranslation();

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => navigate("/login"))
      .catch((err) => alert("Logout error: " + err.message));
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  //   return (
  //     <div className="container">
  //       <div className="logout-container">
  //         <h2 className="section-title">📍 Rate Safety of Your Area</h2>
  //         <button className="logout-btn" onClick={handleLogout}>Logout</button>
  //       </div>
  //       <LiveLocationTracker />
  //       <SafetyRating />
  //       <h2 className="section-title">📝 Anonymous Confessions & Ratings by Area</h2>
  //       <Confessions />
  //       <h2 className="section-title">📩 Submit Complaints</h2>
  //       <ComplaintForm />
  //       <h2 className="section-title">📞 Contact Female Officer</h2>
  //       <ContactDesk />
  //       {/* <VoiceCall /> */}

  //     </div>
  //   );
  // }

  // export default Dashboard;

  return (
    <div className="container">
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
          <option value="mni">🇮🇳 Tamil</option>
          <option value="mni">🇮🇳 Malayalam</option>
        </select>
      </div>

      <div className="logout-container">
        <h2 className="section-title">📍 {t("safety_area")}</h2>
        <button className="logout-btn" onClick={handleLogout}>
          {t("logout")}
        </button>
      </div>

      <LiveLocationTracker />
      <SafetyRating />

      <h2 className="section-title">📝 {t("confessions")}</h2>
      <Confessions />

      <h2 className="section-title">📩 {t("submit_complain")}</h2>
      <ComplaintForm />

      <h2 className="section-title">📞 {t("officer_contact")}</h2>
      <ContactDesk />
      {/* <VoiceCall /> */}
    </div>
  );
}

export default Dashboard;



