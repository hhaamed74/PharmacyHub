import React, { useState } from "react";
import axios from "axios";
import "./Chat.css";

const Chat = ({ onClose }) => {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/api/Gemini/Text", null, {
        params: {
          message: message,
        },
        headers: {
          Accept: "text/plain",
        },
      });
      setResponse(res.data.candidates[0].content);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        <h2>Chat with PharmacyHub</h2>
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
      </div>
      <div className="chat-body">
        {response && <div className="response">{response}</div>}
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message"
        />
        <button onClick={sendMessage} disabled={loading}>
          {loading ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default Chat;
