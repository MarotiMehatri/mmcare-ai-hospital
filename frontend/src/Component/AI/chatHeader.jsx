import React from "react";
import {
  FaRobot,
  FaHeartbeat,
  FaBrain,
  FaCircle,
  FaShieldAlt,
  FaBolt,
} from "react-icons/fa";

import "../../Styles/AI/ChatHeader.css";

const ChatHeader = () => {
  return (
    <header className="ai-chat-header">
      <div className="ai-chat-header-glow"></div>

      <div className="ai-chat-header-left">
        <div className="ai-chat-avatar">
          <FaRobot />
        </div>

        <div className="ai-chat-header-content">
          <div className="ai-chat-online">
            <FaCircle />
            <span>AI Assistant Online</span>
          </div>

          <h1>AI Health Assistant</h1>

          <p>
            Get intelligent healthcare guidance, symptom explanations,
            appointment assistance, medication information, medical report
            understanding, and personalized health recommendations.
          </p>

          <div className="ai-chat-capabilities">
            <span>
              <FaHeartbeat />
              Health Guidance
            </span>

            <span>
              <FaBrain />
              Smart AI
            </span>

            <span>
              <FaShieldAlt />
              Secure
            </span>

            <span>
              <FaBolt />
              Instant Response
            </span>
          </div>
        </div>
      </div>

      <div className="ai-chat-header-right">
        <div className="ai-chat-status-card">
          <h2>24/7</h2>
          <span>Available</span>
        </div>

        <div className="ai-chat-status-card">
          <h2>AI</h2>
          <span>Healthcare</span>
        </div>
      </div>
    </header>
  );
};

export default ChatHeader;
