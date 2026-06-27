import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaRobot,
  FaHeartbeat,
  FaChartLine,
  FaArrowRight,
  FaFileMedical,
} from "react-icons/fa";

import "../../../Styles/AI/HealthSummary/HealthSummaryPreview.css";

function HealthSummaryPreview({ summary = {}, prescription = {} }) {
  const navigate = useNavigate();

  const healthScore = summary?.healthScore || prescription?.healthScore || "--";

  const riskLevel = summary?.riskLevel || prescription?.riskLevel || "Normal";

  const overallHealth =
    summary?.overallHealth ||
    prescription?.overallHealth ||
    "AI health summary ready to view";

  return (
    <div className="health-summary-preview">
      <div className="health-summary-preview-glow"></div>

      <div className="health-summary-preview-header">
        <div className="health-summary-preview-icon">
          <FaRobot />
        </div>

        <div>
          <span>AI Health Intelligence</span>
          <h3>Smart Health Summary</h3>
        </div>
      </div>

      <p className="health-summary-preview-text">
        View complete AI-generated patient overview including vitals, medicines,
        disease analysis, diet, exercise, warnings and health progress.
      </p>

      <div className="health-summary-preview-grid">
        <div className="health-summary-preview-item">
          <FaHeartbeat />
          <span>Health Score</span>
          <strong>{healthScore}</strong>
        </div>

        <div className="health-summary-preview-item">
          <FaChartLine />
          <span>Risk Level</span>
          <strong>{riskLevel}</strong>
        </div>

        <div className="health-summary-preview-item">
          <FaFileMedical />
          <span>Status</span>
          <strong>{overallHealth}</strong>
        </div>
      </div>

      <button
        type="button"
        className="health-summary-preview-btn"
        onClick={() => navigate("/ai-health/ai-health-summary")}
      >
        Open AI Health Summary
        <FaArrowRight />
      </button>
    </div>
  );
}

export default HealthSummaryPreview;
