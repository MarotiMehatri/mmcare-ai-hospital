import React from "react";
import {
  FaClipboardCheck,
  FaClipboardList,
  FaExclamationCircle,
  FaHospital,
  FaLaptopMedical,
  FaLightbulb,
  FaStethoscope,
  FaUserMd,
} from "react-icons/fa";
import "../../Styles/AI/AIRecommendationCard.css";

function AIRecommendationCard({ recommendation }) {
  if (!recommendation) return null;

  const urgency = recommendation.urgency || "normal";

  return (
    <div className={`ai-recommendation-card urgency-${urgency}`}>
      <div className="ai-recommendation-header">
        <div className="ai-recommendation-title">
          <div className="ai-recommendation-icon">
            <FaHospital />
          </div>

          <div>
            <span>AI Recommendation</span>
            <h3>Best Department Match</h3>
          </div>
        </div>

        <div className={`ai-urgency-pill urgency-${urgency}`}>
          <FaExclamationCircle />
          {urgency}
        </div>
      </div>

      <div className="ai-recommendation-grid">
        <div className="ai-info-box">
          <FaHospital className="ai-info-icon" />
          <div>
            <span>Department</span>
            <strong>{recommendation.department || "General Physician"}</strong>
          </div>
        </div>

        <div className="ai-info-box">
          <FaUserMd className="ai-info-icon" />
          <div>
            <span>Specialization</span>
            <strong>{recommendation.specialization || "General Care"}</strong>
          </div>
        </div>

        <div className="ai-info-box">
          <FaStethoscope className="ai-info-icon" />
          <div>
            <span>Urgency</span>
            <strong>{urgency}</strong>
          </div>
        </div>

        <div className="ai-info-box">
          <FaLaptopMedical className="ai-info-icon" />
          <div>
            <span>Visit Type</span>
            <strong>{recommendation.visitType || "offline"}</strong>
          </div>
        </div>
      </div>

      <div className="ai-reason-box">
        <div className="ai-reason-title">
          <FaLightbulb />
          <h4>Why this department?</h4>
        </div>
        <p>
          {recommendation.reason ||
            "Based on your symptoms, this department may be suitable for initial evaluation."}
        </p>
      </div>

      <div className="ai-reason-box">
        <div className="ai-reason-title">
          <FaClipboardCheck />
          <h4>Preparation Tips</h4>
        </div>
        <p>
          {recommendation.preparation ||
            "Carry previous reports, note your symptoms clearly, and share your medical history with the doctor."}
        </p>
      </div>

      <div className="ai-disclaimer-box">
        <FaClipboardList />
        <p>
          This recommendation is for appointment guidance only. Please consult a
          doctor for proper medical evaluation.
        </p>
      </div>
    </div>
  );
}

export default AIRecommendationCard;
