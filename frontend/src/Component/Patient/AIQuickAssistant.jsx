import React from "react";
import { FaHeartbeat, FaRobot, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../../Styles/Patient/AIQuickAssistant.css";

function AIQuickAssistant() {
  const navigate = useNavigate();

  const quickPrompts = [
    "Check my symptoms",
    "View medicine reminders",
    "Analyze my reports",
  ];

  return (
    <div className="ai-quick-card">
      <div className="ai-quick-card-glow"></div>

      <div className="ai-quick-header">
        <div className="ai-quick-icon">
          <FaRobot />
        </div>

        <div className="ai-quick-header-content">
          <h3 className="ai-quick-title">AI Health Assistant</h3>
          <p className="ai-quick-subtitle">
            Your smart health support companion
          </p>
        </div>
      </div>

      <div className="ai-quick-body">
        <div className="ai-quick-message">
          <FaHeartbeat className="mini-icon" />
          <span>
            Get help with symptoms, reports, reminders, and appointments.
          </span>
        </div>

        <div className="ai-quick-prompts">
          {quickPrompts.map((item, index) => (
            <button
              key={index}
              className="prompt-chip"
              onClick={() => navigate("/ai-health")}
              type="button"
            >
              {item}
            </button>
          ))}
        </div>

        <div className="ai-quick-footer">
          <button
            className="open-ai-btn"
            onClick={() => navigate("/ai-health")}
            type="button"
          >
            <span>Open Full Assistant</span>
            <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}

export default AIQuickAssistant;
