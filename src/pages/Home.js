import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import { useTranslation } from "react-i18next";

function Home() {

  const { t, i18n } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="container center">
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

      <h1 className="title">{t("welcome")} 👩‍💼</h1>
      <p className="subtitle">{t("empower_tech")}</p>
      <Link to="/dashboard">
        <button className="btn">{t("dashboard")}</button>
      </Link>
    </div>
  );
}

export default Home;