import React from "react";
import {
  FaHeartbeat,
  FaArrowUp,
  FaCheckCircle,
  FaExclamationTriangle,
  FaTimesCircle,
} from "react-icons/fa";

import "../../../Styles/AI/HealthSummary/AIOverallHealthCard.css";

function AIOverallHealthCard({
  overallHealth = "Unknown",
  riskLevel = "Unknown",
}) {
  const level = riskLevel.toLowerCase();

  const riskIcon =
    level === "low" ? (
      <FaCheckCircle />
    ) : level === "medium" ? (
      <FaExclamationTriangle />
    ) : (
      <FaTimesCircle />
    );

  return (
    <div className="ai-overall-card">
      <div className="ai-overall-glow"></div>

      <div className="ai-overall-header">
        <div className="ai-overall-icon">
          <FaHeartbeat />
        </div>

        <div>
          <span>AI Health Analysis</span>
          <h2>Overall Health</h2>
        </div>
      </div>

      <div className="ai-overall-body">
        <div className="ai-health-score">
          <h1>{overallHealth}</h1>
          <small>Current Health Status</small>
        </div>

        <div className={`ai-risk-badge ${level}`}>
          {riskIcon}
          {riskLevel}
        </div>
      </div>

      <div className="ai-health-footer">
        <div className="ai-health-item">
          <FaArrowUp />
          <div>
            <strong>AI Monitoring</strong>
            <span>Real-time patient analysis</span>
          </div>
        </div>

        <div className="ai-health-item">
          <FaHeartbeat />
          <div>
            <strong>Health Status</strong>
            <span>Continuously updated</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AIOverallHealthCard;
