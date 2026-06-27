import React from "react";
import {
  FaArrowRight,
  FaFileMedical,
  FaHeartbeat,
  FaLightbulb,
  FaNotesMedical,
  FaRobot,
  FaStethoscope,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../../Styles/Doctor/AIAssistantCard.css";
function AIAssistantCard() {
  const navigate = useNavigate();

  const features = [
    {
      title: "Symptom Checker",
      desc: "Analyze symptoms and get AI guidance.",
      icon: <FaHeartbeat />,
      path: "/ai-health/symptom-checker",
    },
    {
      title: "Quick Diagnosis",
      desc: "Get possible condition summary.",
      icon: <FaNotesMedical />,
      path: "/ai-health/diagnosis",
    },
    {
      title: "Report Analyzer",
      desc: "Understand medical reports easily.",
      icon: <FaFileMedical />,
      path: "/ai-health/report-analyzer",
    },
    {
      title: "Suggestions",
      desc: "Receive personalized health advice.",
      icon: <FaLightbulb />,
      path: "/ai-health/suggestions",
    },
  ];

  return (
    <div className="ai-qiuck-card">
      <div className="ai-quick-card-glow"></div>

      <div className="ai-quick-header">
        <div className="ai-quick-icon">
          <FaRobot />
        </div>

        <div className="ai-quick-header-content">
          <h3 className="ai-quick-title">AI Health Assistant</h3>
          <p className="ai-quick-subtitle">
            Amart healthcare tools powered by AI
          </p>
        </div>
      </div>

      <div className="ai-quick-body">
        <div className="ai-quick-message">
          <span>
            Quickly access smart AI tools for symptoms, diagnosis, reports, and
            health suggestions.
          </span>
        </div>

        <div className="ai-feature-grid">
          {features.map((item, index) => (
            <button
              key={index}
              className="ai-feature-box"
              onClick={() => navigate(item.path)}
              type="button"
            >
              <div className="ai-feature-icon">{item.icon}</div>
              <h4>{item.title}</h4>
              <p>{item.desc}</p>
            </button>
          ))}
        </div>

        <div className="ai-quick-footer">
          <button
            className="open-ai-btn"
            onClick={() => navigate("/ai-health")}
            type="button"
          >
            <span>Access AI Assistant</span>
            <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}

export default AIAssistantCard;
