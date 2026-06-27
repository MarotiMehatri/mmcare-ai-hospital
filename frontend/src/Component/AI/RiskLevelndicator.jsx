import React from "react";
import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaShieldAlt,
} from "react-icons/fa";
import "../../Styles/AI/RiskLevelIndicator.css";

function RiskLevelIndicator({ risk = "Normal" }) {
  const level = risk.toLowerCase();

  const riskConfig = {
    high: {
      label: "High Risk",
      icon: <FaExclamationTriangle />,
    },
    moderate: {
      label: "Moderate Risk",
      icon: <FaShieldAlt />,
    },
    normal: {
      label: "Normal Risk",
      icon: <FaCheckCircle />,
    },
  };

  const current = riskConfig[level] || riskConfig.normal;

  return (
    <div className={`risk-indicator risk-${level}`}>
      <span className="risk-icon">{current.icon}</span>
      <span>{current.label}</span>
    </div>
  );
}

export default RiskLevelIndicator;
