import React, { createContext, useContext, useState, useEffect } from "react";

const ForumContext = createContext();

export const ForumProvider = ({ children }) => {
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("forumMessages");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("forumMessages", JSON.stringify(messages));
  }, [messages]);

  return (
    <ForumContext.Provider value={{ messages, setMessages }}>
      {children}
    </ForumContext.Provider>
  );
};

export const useForum = () => {
  return useContext(ForumContext);
};
