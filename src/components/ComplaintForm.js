import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { getAuth } from "firebase/auth";
import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  getDocs
} from "firebase/firestore";
import "../App.css";

import { useTranslation } from "react-i18next";

function ComplaintForm() {
  const [area, setArea] = useState("");
  const [complaint, setComplaint] = useState("");
  const [message, setMessage] = useState("");
  const [submittedComplaints, setSubmittedComplaints] = useState([]);

  const auth = getAuth();
  const user = auth.currentUser;

  const fetchComplaints = async () => {
    if (!user) return;
    const q = query(
      collection(db, "complaints"),
      where("uid", "==", user.uid),
      orderBy("timestamp", "desc")
    );
    const querySnapshot = await getDocs(q);
    const results = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setSubmittedComplaints(results);
  };

  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!area || !complaint) {
      alert(t("all_flds"));
      return;
    }

    try {
      await addDoc(collection(db, "complaints"), {
        uid: user?.uid || "anonymous",
        area,
        complaint,
        timestamp: new Date(),
      });
      setMessage(t("cmpln_sccss"));
      setArea("");
      setComplaint("");
      fetchComplaints(); // refresh list
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setMessage(t("cmpn_fl") + err.message);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, [user]);

  return (
    <div className="card">
      <h3>🧾 {t("complaints")}</h3>
      <form onSubmit={handleSubmit}>
        <input
          className="input"
          type="text"
          placeholder={t("area_placeholder")}
          value={area}
          onChange={(e) => setArea(e.target.value)}
          id="complaintAreaInput"
        />
        <textarea
          className="input"
          rows="4"
          placeholder={t("incdn_cncrn")}
          value={complaint}
          onChange={(e) => setComplaint(e.target.value)}
        ></textarea>
        <button className="btn">{t("submit_complain")}</button>
        {message && <p className="success">{message}</p>}
      </form>

      {submittedComplaints.length > 0 && (
        <div style={{ marginTop: "2rem" }}>
          <h4>📂 {t("your_complain")}</h4>
          <ul className="complaint-list">
            {submittedComplaints.map((comp) => (
              <li key={comp.id} style={{ marginBottom: "1rem" }}>
                <strong>📍 {comp.area}</strong>
                <p>{comp.complaint}</p>
                <small>
                  Submitted on {new Date(comp.timestamp.toDate()).toLocaleString()}
                </small>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ComplaintForm;
