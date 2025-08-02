import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const ContactDesk = () => {
  const { t } = useTranslation();

  const [view, setView] = useState("options");
  const [messages, setMessages] = useState([
    { sender: "officer", text: t("officer_hello") },
  ]);
  const [input, setInput] = useState("");

  const handleSimulateCall = () => {
    window.location.href = "tel:1091";
  };

  const handleChatClick = () => {
    setView("chat");
  };

  const handleBack = () => {
    setView("options");
    setInput("");
    setMessages([
      { sender: "officer", text: t("officer_hello") },
    ]);
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const updatedMessages = [...messages, { sender: "user", text: input }];
    updatedMessages.push({
      sender: "officer",
      text: t("officer_reply"),
    });

    setMessages(updatedMessages);
    setInput("");
  };

  return (
    <div style={{
      fontFamily: "Arial, sans-serif",
      padding: "20px",
      margin: "auto",
      border: "1px solid #ccc",
      borderRadius: "10px",
      backgroundColor: "#f9f9f9"
    }}>
      {view === "options" && (
        <div>
          <p style={{ marginBottom: "20px" }}>
            {t("choose_connect")}
          </p>
          <button
            style={{
              display: "block",
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer"
            }}
            onClick={handleSimulateCall}
          >
            {t("simulate_call")}
          </button>
          <button
            style={{
              display: "block",
              width: "100%",
              padding: "10px",
              backgroundColor: "#2196F3",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer"
            }}
            onClick={handleChatClick}
          >
            {t("chat")}
          </button>
        </div>
      )}

      {view === "chat" && (
        <div>
          <div style={{
            height: "250px",
            overflowY: "auto",
            marginBottom: "10px",
            padding: "10px",
            backgroundColor: "white",
            border: "1px solid #ddd",
            borderRadius: "5px"
          }}>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  textAlign: msg.sender === "user" ? "right" : "left",
                  marginBottom: "8px"
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    padding: "8px 12px",
                    borderRadius: "20px",
                    backgroundColor: msg.sender === "user" ? "#DCF8C6" : "#E6E6E6",
                    maxWidth: "80%",
                    wordWrap: "break-word"
                  }}
                >
                  {msg.text}
                </span>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: "5px" }}>
            <input
              type="text"
              placeholder={t("chat_placeholder")}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              style={{
                flex: 1,
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc"
              }}
            />
            <button
              onClick={handleSend}
              style={{
                padding: "10px 15px",
                backgroundColor: "#4CAF50",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer"
              }}
            >
              {t("send")}
            </button>
          </div>

          <button
            onClick={handleBack}
            style={{
              marginTop: "10px",
              backgroundColor: "#f44336",
              color: "white",
              border: "none",
              borderRadius: "5px",
              padding: "8px 12px",
              cursor: "pointer",
              width: "100%"
            }}
          >
            {t("back")}
          </button>
        </div>
      )}
    </div>
  );
};

export default ContactDesk;
