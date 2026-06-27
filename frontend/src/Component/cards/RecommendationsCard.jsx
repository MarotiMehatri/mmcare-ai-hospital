import React from "react";
import {
  FaRobot,
  FaLightbulb,
  FaCalendarCheck,
  FaCheckCircle,
} from "react-icons/fa";
import "../../Styles/AI/RecommendationsCard.css";

function RecommendationsCard({ summary, recommendations = [], followUp }) {
  return (
    <div className="recommend-card">
      <div className="recommend-card__header">
        <div className="recommend-card__icon">
          <FaRobot />
        </div>

        <div>
          <h3>AI Insights</h3>
          <p>Smart health summary and suggestions</p>
        </div>
      </div>

      <div className="ai-summary-box">
        <span>Summary</span>
        <p>{summary || "No summary available"}</p>
      </div>

      <div className="recommend-section">
        <h4>
          <FaLightbulb /> Recommendations
        </h4>

        {recommendations.length === 0 ? (
          <div className="recommend-empty">
            <FaCheckCircle />
            <p>No recommendations available</p>
          </div>
        ) : (
          <ul className="recommend-list">
            {recommendations.map((item, index) => (
              <li key={index}>
                <span>{index + 1}</span>
                <p>{item}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div
        className={`followup-box ${
          followUp?.needed ? "followup-box--needed" : "followup-box--safe"
        }`}
      >
        <div className="followup-box__icon">
          <FaCalendarCheck />
        </div>

        <div>
          <h4>Follow Up</h4>
          <p>
            {followUp?.needed
              ? `${followUp.department} - ${followUp.timeline}`
              : "No follow-up needed"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default RecommendationsCard;
