import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

function Home() {
  return (
    <div className="container center">
      <h1 className="title">Welcome to SheSafe 👩‍💼</h1>
      <p className="subtitle">Empowering safety through technology.</p>
      <Link to="/dashboard">
        <button className="btn">Go to Dashboard</button>
      </Link>
    </div>
  );
}

export default Home;