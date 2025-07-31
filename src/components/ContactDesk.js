import React, { useState, useEffect } from "react";
import "../App.css";

function ContactDesk() {
  const [view, setView] = useState("options");
  const [messages, setMessages] = useState([
    { from: "officer", text: "Hello! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [callTime, setCallTime] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [audioObj] = useState(() =>
  new Audio("https://actions.google.com/sounds/v1/alarms/phone_alerts_and_rings.ogg")
);


  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { from: "user", text: input }]);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { from: "officer", text: "Thanks for sharing. We’ll get back shortly." },
      ]);
    }, 1000);
  };

  const handleSimulateCall = () => {
    if (audioObj) {
      audioObj.loop = true;
      audioObj.play().catch((err) => console.warn("Play blocked:", err));
    }

    const id = setInterval(() => {
      setCallTime((prev) => prev + 1);
    }, 1000);
    setIntervalId(id);

    setCallTime(0);
    setView("call");
  };

  const handleEndCall = () => {
    if (audioObj && !audioObj.paused) {
      audioObj.pause();
      audioObj.currentTime = 0;
    }
    clearInterval(intervalId);
    setCallTime(0);
    setView("options");
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  return (
    <div className="card">
      <h3>👮‍♀️ Female Officer Support Desk</h3>

      {view === "options" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <button className="btn" onClick={() => setView("chat")}>💬 Chat with Officer</button>
          <button className="btn" onClick={handleSimulateCall}>📞 Simulate Call</button>
        </div>
      )}

      {view === "chat" && (
        <div className="chat-box">
          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`chat-message ${msg.from === "user" ? "user-msg" : "officer-msg"}`}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input
              className="input"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
            />
            <button className="btn" onClick={handleSend}>Send</button>
          </div>
          <button className="btn-secondary" onClick={() => setView("options")}>🔙 Back</button>
        </div>
      )}

      {view === "call" && (
        <div className="call-box">
          <p>📞 Calling Female Officer...</p>
          <img
            src="https://cdn-icons-png.flaticon.com/512/4825/4825066.png"
            alt="female officer"
            style={{ width: "100px", margin: "1rem auto" }}
          />
          <p>Connected. Please speak. (Simulated)</p>
          <p>🕒 Call Duration: {formatTime(callTime)}</p>
          <button className="btn-secondary" onClick={handleEndCall}>🔚 End Call</button>
        </div>
      )}
    </div>
  );
}

export default ContactDesk;