import React from "react";
import {
  FaExclamationTriangle,
  FaShieldAlt,
  FaCheckCircle,
  FaHeartbeat,
} from "react-icons/fa";

import "../../../Styles/AI/HealthSummary/AIWarningCard.css";

function AIWarningCard({ summary = {}, emergencyLevel, warnings }) {
  const level =
    emergencyLevel || summary?.emergencyLevel || summary?.riskLevel || "Normal";

  const rawWarnings =
    warnings ||
    summary?.warnings ||
    summary?.warningMessage ||
    summary?.doctorAdvice ||
    summary?.lifestyleAdvice ||
    [];

  const warningList = Array.isArray(rawWarnings)
    ? rawWarnings
    : typeof rawWarnings === "string" && rawWarnings.trim()
      ? rawWarnings
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean)
      : [];

  const levelClass = String(level).toLowerCase();

  return (
    <div className={`ai-warning-card ${levelClass}`}>
      <div className="ai-warning-glow"></div>

      <div className="ai-warning-header">
        <div className="ai-warning-icon">
          <FaExclamationTriangle />
        </div>

        <div>
          <h2>Health Warning</h2>
          <p>AI detected emergency and risk alerts</p>
        </div>
      </div>

      <div className="ai-emergency-level-box">
        <div>
          <span>Emergency Level</span>
          <strong>{level}</strong>
        </div>

        {levelClass === "normal" ? (
          <FaShieldAlt className="safe-icon" />
        ) : (
          <FaHeartbeat className="danger-icon" />
        )}
      </div>

      {warningList.length > 0 ? (
        <div className="ai-warning-list">
          {warningList.map((warning, index) => (
            <div className="ai-warning-item" key={index}>
              <FaExclamationTriangle />
              <span>
                {typeof warning === "string" ? warning : warning?.message}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="ai-no-warning">
          <FaCheckCircle />
          <span>No warnings</span>
        </div>
      )}
    </div>
  );
}

export default AIWarningCard;
