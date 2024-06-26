import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Chat.css";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    const storedChatHistory = localStorage.getItem("chatHistory");
    if (storedChatHistory) {
      setChatHistory(JSON.parse(storedChatHistory));
    }

    const handleBeforeUnload = () => {
      localStorage.removeItem("chatHistory");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
  }, [chatHistory]);

  const getCurrentDate = () => {
    const date = new Date();
    return date.toLocaleDateString();
  };

  const sendMessage = async () => {
    if (message.trim() === "") return;

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

      const content = res.data.candidates
        ? res.data.candidates[0].content
        : "No response";

      const responseText = formatResponse(content);
      const newChatEntry = {
        question: message,
        answer: responseText,
        date: getCurrentDate(),
        isOpen: false,
      };

      setChatHistory([...chatHistory, newChatEntry]);
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatResponse = (content) => {
    if (content && content.parts && content.parts.length > 0) {
      return content.parts[0].text.trim();
    } else {
      return "No response";
    }
  };

  const toggleAnswer = (index) => {
    const updatedHistory = chatHistory.map((entry, i) => {
      if (i === index) {
        return { ...entry, isOpen: !entry.isOpen };
      }
      return entry;
    });
    setChatHistory(updatedHistory);
  };

  const getTodayAndYesterdayQuestions = () => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const todayStr = today.toLocaleDateString();
    const yesterdayStr = yesterday.toLocaleDateString();

    return chatHistory.filter(
      (entry) => entry.date === todayStr || entry.date === yesterdayStr
    );
  };

  return (
    <div className="chat-page">
      <div className="sidebar">
        <h3 style={caresStyle}>Questions</h3>
        {getTodayAndYesterdayQuestions().map((entry, index) => (
          <div key={index} className="sidebar-entry">
            <div>{entry.date}</div>
            <div>{entry.question}</div>
            {entry.isOpen ? (
              <div className="answer">
                <p>{entry.answer}</p>
                <button
                  style={{
                    background: "#008829",
                    color: "#ffffff",
                    padding: "10px",
                    borderRadius: "6px",
                  }}
                  onClick={() => toggleAnswer(index)}
                >
                  Close
                </button>
              </div>
            ) : (
              <button
                style={{
                  background: "#008829",
                  color: "#ffffff",
                  padding: "10px",
                  borderRadius: "6px",
                }}
                onClick={() => toggleAnswer(index)}
              >
                Open Answer
              </button>
            )}
          </div>
        ))}
      </div>
      <div className="chat-container">
        <div className="chat-header">
          <h2 style={caresStyle}>Chat with PharmacyHub</h2>
        </div>
        <div className="chat-body">
          {chatHistory.map((entry, index) => (
            <div key={index} className="chat-entry">
              <div className="chat-question">You: {entry.question}</div>
              <div className="chat-answer">
                Bot:{" "}
                {typeof entry.answer === "object" ? (
                  <pre className="code">{entry.answer}</pre>
                ) : (
                  <p className="normal-text">{entry.answer}</p>
                )}
              </div>
            </div>
          ))}
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
    </div>
  );
};

const caresStyle = {
  fontSize: "24px",
  fontWeight: "bold",
  color: "#27b43e",
  backgroundColor: "#e5e0e021",
  padding: "10px 20px",
  borderRadius: "8px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  width: "fit-content",
};

export default Chat;
