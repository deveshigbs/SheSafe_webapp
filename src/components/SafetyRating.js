import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

function SafetyRating() {
  const [location, setLocation] = useState("");
  const [rating, setRating] = useState(1);
  const [ratings, setRatings] = useState([]);

  const handleSubmit = async () => {
    try {
      await addDoc(collection(db, "safetyRatings"), {
        location,
        rating,
        timestamp: new Date(),
      });
      alert("Thanks for your rating!");
      setLocation("");
      setRating(1);
      fetchRatings();
    } catch (error) {
      console.error("Error adding rating:", error);
    }
  };

  const fetchRatings = async () => {
    const snap = await getDocs(collection(db, "safetyRatings"));
    const list = snap.docs.map((doc) => doc.data());
    setRatings(list);
  };

  useEffect(() => {
    fetchRatings();
  }, []);

  const groupedRatings = Object.values(
    ratings.reduce((acc, curr) => {
      if (!acc[curr.location]) {
        acc[curr.location] = { location: curr.location, total: 0, count: 0 };
      }
      acc[curr.location].total += curr.rating;
      acc[curr.location].count += 1;
      return acc;
    }, {})
  ).map((item) => ({
    location: item.location,
    avg: (item.total / item.count).toFixed(2),
  }));

  const renderStars = (avg) => {
    const stars = [];
    const fullStars = Math.floor(avg);
    const halfStar = avg - fullStars >= 0.5;
    for (let i = 0; i < fullStars; i++) stars.push("★");
    if (halfStar) stars.push("☆");
    while (stars.length < 5) stars.push("☆");
    return stars.join("");
  };

  return (
    <div className="card">
      <input
        className="input"
        placeholder="Enter Area Name"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <input
        className="input"
         id="safetyAreaInput"
        type="number"
        min="1"
        max="5"
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
      />
      <button className="btn" onClick={handleSubmit}>
        Submit Rating
      </button>

      <h3 style={{ marginTop: "2rem" }}>📊 Area-Wise Average Rating</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={groupedRatings}>
          <XAxis dataKey="location" />
          <YAxis domain={[1, 5]} allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="avg" fill="#f05454" />
        </BarChart>
      </ResponsiveContainer>

      <div className="grid">
        {groupedRatings.map((item, idx) => (
          <div key={idx} className="rating-box">
            <strong>{item.location}</strong>
            <div style={{ fontSize: "1.2rem", color: "#f39c12" }}>{renderStars(item.avg)}</div>
            <div style={{ fontSize: "0.9rem", color: "#555" }}>({item.avg} / 5)</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SafetyRating;
