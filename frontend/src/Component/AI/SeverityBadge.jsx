import React from "react";
import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaShieldAlt,
} from "react-icons/fa";
import "../../Styles/AI/SeverityBadge.css";

function SeverityBadge({ severity = "Normal" }) {
  const level = severity.toLowerCase();

  const config = {
    normal: {
      icon: <FaCheckCircle />,
      label: "Low Risk",
    },
    moderate: {
      icon: <FaShieldAlt />,
      label: "Moderate Risk",
    },
    high: {
      icon: <FaExclamationTriangle />,
      label: "High Risk",
    },
  };

  const current = config[level] || config.normal;

  return (
    <div className={`severity-badge severity-${level}`}>
      <div className="severity-icon">{current.icon}</div>

      <div className="severity-content">
        <span className="severity-label">{current.label}</span>
        <strong>{severity}</strong>
      </div>
    </div>
  );
}

export default SeverityBadge;
