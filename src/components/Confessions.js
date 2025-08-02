import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

import { useTranslation } from "react-i18next";

function Confessions() {
  const [text, setText] = useState("");
  const [confessions, setConfessions] = useState([]);
  const [filter, setFilter] = useState("");

  const submit = async () => {
    try {
      await addDoc(collection(db, "confessions"), {
        text,
        area: filter || "General",
        timestamp: new Date(),
      });
      setText("");
      fetchConfessions();
    } catch (error) {
      console.error("Error posting confession:", error);
    }
  };

  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const fetchConfessions = async () => {
    const snap = await getDocs(collection(db, "confessions"));
    const list = snap.docs.map((doc) => doc.data());
    setConfessions(list);
  };

  useEffect(() => {
    fetchConfessions();
  }, []);

  const filtered = filter
    ? confessions.filter((c) => c.area?.toLowerCase() === filter.toLowerCase())
    : confessions;

  return (
    <div className="card">
      <input
        className="input"
        placeholder={t("fltr_area")}
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <textarea
        className="input"
        rows="4"
        placeholder={t("shr_exp")}
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <button className="btn" onClick={submit}>
        {t("post_confess")}
      </button>
      <div className="grid">
        {filtered.map((c, i) => (
          <div key={i} className="confession-item">
            <div style={{ fontWeight: "bold" }}>{c.area || "General"}</div>
            <div>{c.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Confessions;