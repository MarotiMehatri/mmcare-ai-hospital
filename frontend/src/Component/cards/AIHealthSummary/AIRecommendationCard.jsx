import React from "react";
import {
  FaUserMd,
  FaCalendarCheck,
  FaLightbulb,
  FaStethoscope,
  FaCheckCircle,
} from "react-icons/fa";

import "../../Styles/AI/AIRecommendationCard.css";

function AIRecommendationCard({ summary = {}, recommendations = [] }) {
  const adviceList = Array.isArray(recommendations)
    ? recommendations
    : typeof recommendations === "string" && recommendations.trim()
      ? recommendations
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean)
      : [];

  const doctorAdvice =
    summary?.doctorAdvice ||
    summary?.advice ||
    summary?.lifestyleAdvice ||
    adviceList[0] ||
    "No doctor advice available";

  const followUpDate = summary?.followUpDate || "No follow-up date available";

  const recommendedSpecialist =
    summary?.recommendedSpecialist ||
    summary?.specialization ||
    summary?.department ||
    "No specialist recommended";

  return (
    <div className="ai-recommendation-card">
      <div className="ai-recommendation-glow"></div>

      <div className="ai-recommendation-header">
        <div className="ai-recommendation-icon">
          <FaLightbulb />
        </div>

        <div>
          <h2>Doctor Advice</h2>
          <p>Personalized AI health recommendations</p>
        </div>
      </div>

      <div className="ai-advice-box">
        <div className="ai-advice-title">
          <FaUserMd />
          <span>Medical Advice</span>
        </div>

        <p>{doctorAdvice}</p>
      </div>

      {adviceList.length > 1 && (
        <div className="ai-extra-recommendations">
          {adviceList.slice(1).map((item, index) => (
            <div className="ai-extra-recommendation" key={index}>
              <FaCheckCircle />
              <span>{item}</span>
            </div>
          ))}
        </div>
      )}

      <div className="ai-recommendation-grid">
        <div className="ai-recommendation-info">
          <div className="info-icon follow">
            <FaCalendarCheck />
          </div>

          <div>
            <span>Follow Up Date</span>
            <strong>{followUpDate}</strong>
          </div>
        </div>

        <div className="ai-recommendation-info">
          <div className="info-icon specialist">
            <FaStethoscope />
          </div>

          <div>
            <span>Recommended Specialist</span>
            <strong>{recommendedSpecialist}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AIRecommendationCard;
