import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import SafetyRating from "../components/SafetyRating";
import Confessions from "../components/Confessions";
import LiveLocationTracker from "../components/LiveLocationTracker";
import ComplaintForm from "../components/ComplaintForm";
import ContactDesk from "../components/ContactDesk";
import VoiceCall from "../components/VoiceCall";


import "../App.css";

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => navigate("/login"))
      .catch((err) => alert("Logout error: " + err.message));
  };

  return (
    <div className="container">
      <div className="logout-container">
        <h2 className="section-title">📍 Rate Safety of Your Area</h2>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
      <LiveLocationTracker />
      <SafetyRating />
      <h2 className="section-title">📝 Anonymous Confessions & Ratings by Area</h2>
      <Confessions />
      <h2 className="section-title">📩 Submit Complaints</h2>
      <ComplaintForm />
      <h2 className="section-title">📞 Contact Female Officer</h2>
      <ContactDesk />
      {/* <VoiceCall /> */}

    </div>
  );
}

export default Dashboard;