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
      const res = await axios.post(
        "https://e-pharmacyhub-edarcdhhakcaeaad.eastus-01.azurewebsites.net/api/Gemini/Text",
        null,
        {
          params: { message },
          headers: { Accept: "text/plain" },
        }
      );

      console.log(res.data);
      const content = res.data.candidates
        ? res.data.candidates[0].content
        : "No response";
      setResponse(
        typeof content === "object" ? JSON.stringify(content) : content
      );
    } catch (error) {
      console.error("Error sending message:", error);
      setResponse("Error sending message");
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
      <div className="chat-body">
        {response && (
          <textarea
            className="response-textarea"
            value={response}
            readOnly
            rows={Math.max(2, response.split("\n").length)}
          />
        )}
      </div>
    </div>
  );
};

export default Chat;
