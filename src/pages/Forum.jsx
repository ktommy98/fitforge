import React, { useState } from "react";
import { Authenticator } from "@aws-amplify/ui-react";
import { useNavigate } from "react-router-dom";
import { useForum } from "./ForumContext";

export default function Forum() {
  const { messages, setMessages } = useForum();
  const [newMessage, setNewMessage] = useState("");
  const navigate = useNavigate();

  const sendMessage = (userEmail) => {
    if (newMessage.trim() !== "") {
      const displayUser = userEmail.includes("@") ? userEmail.split("@")[0] : userEmail;
      const newMsg = {
        user: displayUser,
        text: newMessage,
        timestamp: new Date().toISOString(),
      };
      setMessages([...messages, newMsg]);
      setNewMessage("");
    }
  };

  return (
    <Authenticator>
      {({ user }) => {
        const email = user?.signInDetails?.loginId || "anonymous@example.com";
        const username = email.includes("@") ? email.split("@")[0] : email;

        return (
          <div style={{ padding: "2rem", fontFamily: "sans-serif", backgroundColor: "#f0f0f0", minHeight: "100vh" }}>
            <h1 style={{ textAlign: "center", color: "#BF3131" }}>Forum</h1>
            <div style={{ textAlign: "center", marginBottom: "1rem" }}>
              <span style={{ fontWeight: "bold", fontSize: "1rem" }}>Signed in as: </span>
              <span style={{ color: "#FF5733", fontWeight: "bold", fontSize: "1.1rem" }}>{username}</span>
            </div>
            <div style={{
              border: "1px solid #ccc",
              borderRadius: "5px",
              padding: "1rem",
              height: "300px",
              overflowY: "auto",
              backgroundColor: "white",
              marginBottom: "1rem"
            }}>
              {messages.length === 0 ? (
                <div style={{ textAlign: "center", color: "#888" }}>No messages yet.</div>
              ) : (
                messages.map((msg, index) => (
                  <div key={index} style={{ marginBottom: "0.5rem" }}>
                    <strong style={{ color: "#7D0A0A" }}>{msg.user}:</strong> {msg.text}
                  </div>
                ))
              )}
            </div>
            <form onSubmit={(e) => { e.preventDefault(); sendMessage(email); }}>
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                style={{
                  width: "100%",
                  height: "60px",
                  padding: "0.5rem",
                  borderRadius: "5px",
                  border: "1px solid #ccc"
                }}
              />
              <div style={{ textAlign: "center", marginTop: "0.5rem" }}>
                <button
                  type="submit"
                  style={{
                    backgroundColor: "#7D0A0A",
                    color: "white",
                    border: "none",
                    padding: "0.6rem 1.2rem",
                    borderRadius: "5px",
                    fontWeight: "bold",
                    fontSize: "1rem",
                    cursor: "pointer"
                  }}
                >
                  Send
                </button>
              </div>
            </form>
            <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
              <button
                onClick={() => navigate("/")}
                style={{
                  backgroundColor: "#7D0A0A",
                  color: "white",
                  border: "none",
                  padding: "0.6rem 1.2rem",
                  borderRadius: "5px",
                  fontWeight: "bold",
                  fontSize: "1rem",
                  cursor: "pointer"
                }}
              >
                Back to Main Page
              </button>
            </div>
          </div>
        );
      }}
    </Authenticator>
  );
}
