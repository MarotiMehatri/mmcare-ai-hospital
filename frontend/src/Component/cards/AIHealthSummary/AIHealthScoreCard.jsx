import React from "react";
import { FaChartPie, FaHeartbeat, FaCheckCircle } from "react-icons/fa";

import "../../../Styles/AI/HealthSummary/AIHealthScoreCard.css";

function AIHealthScoreCard({ healthScore = 0, scoreRemark = "" }) {
  const score = Number(healthScore) || 0;

  const remark =
    scoreRemark ||
    (score >= 80
      ? "Excellent health condition"
      : score >= 60
        ? "Moderate health condition"
        : "Needs medical attention");

  return (
    <div className="ai-health-score-card">
      <div className="ai-score-glow"></div>

      <div className="ai-score-header">
        <div className="ai-score-icon">
          <FaChartPie />
        </div>

        <div>
          <span>AI Score Analysis</span>
          <h2>Health Score</h2>
        </div>
      </div>

      <div className="ai-score-circle-wrap">
        <div
          className="ai-score-circle"
          style={{
            background: `conic-gradient(#2563eb ${score * 3.6}deg, rgba(226,232,240,.35) 0deg)`,
          }}
        >
          <div className="ai-score-inner">
            <h1>{score}</h1>
            <span>/100</span>
          </div>
        </div>
      </div>

      <div className="ai-score-remark">
        <FaCheckCircle />
        <p>{remark}</p>
      </div>

      <div className="ai-score-footer">
        <div>
          <FaHeartbeat />
          <span>AI Monitoring</span>
        </div>
        <strong>{score >= 70 ? "Stable" : "Review Needed"}</strong>
      </div>
    </div>
  );
}

export default AIHealthScoreCard;
