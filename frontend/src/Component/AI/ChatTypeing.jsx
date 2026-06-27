// import React from "react";
import { FaRobot, FaHeartbeat } from "react-icons/fa";

import "../../Styles/AI/ChatTyping.css";

const ChatTyping = () => {
  return (
    <div className="chat-typing-row">
      <div className="chat-typing-avatar">
        <FaRobot />
      </div>

      <div className="chat-typing-bubble">
        <div className="chat-typing-top">
          <span>
            <FaHeartbeat />
            AI Health Assistant
          </span>
          <small>thinking...</small>
        </div>

        <div className="chat-typing-content">
          <span className="chat-typing-text">Preparing helpful guidance</span>

          <div className="chat-typing-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatTyping;
