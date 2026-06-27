import React from "react";
import { useNavigate } from "react-router-dom";
import { FaRobot, FaArrowRight, FaHeartbeat, FaComments } from "react-icons/fa";

import "../../Styles/AI/AIChatPreview.css";

function AIChatPreview() {
  const navigate = useNavigate();

  return (
    <section className="ai-chat-preview">
      <div className="ai-chat-preview-content">
        <span className="ai-chat-preview-badge">
          <FaRobot />
          AI Assistant
        </span>

        <h2>Need quick health guidance?</h2>

        <p>
          Ask about symptoms, reports, precautions, departments, appointments,
          and next medical steps using your AI Health Assistant.
        </p>

        <div className="ai-chat-preview-actions">
          <button type="button" onClick={() => navigate("/ai-health/ai-chat")}>
            Open AI Chat <FaArrowRight />
          </button>
        </div>
      </div>

      <div className="ai-chat-preview-card">
        <div className="ai-chat-preview-mini">
          <FaHeartbeat />
          <div>
            <strong>Health Support</strong>
            <span>Symptom & care guidance</span>
          </div>
        </div>

        <div className="ai-chat-preview-mini">
          <FaComments />
          <div>
            <strong>Smart Chat</strong>
            <span>Ask questions anytime</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AIChatPreview;
