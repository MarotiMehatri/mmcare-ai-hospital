import React from "react";
import {
  FaHeartbeat,
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";

import "../../../Styles/AI/HealthSummary/AIDiseaseCard.css";

function AIDiseaseCard({ currentDiseases, summary }) {
  const rawDiseases =
    currentDiseases ||
    summary?.currentDiseases ||
    summary?.diseases ||
    summary?.currentDisease ||
    summary?.healthConditions ||
    summary?.diagnosis ||
    [];

  const diseaseList = Array.isArray(rawDiseases)
    ? rawDiseases
    : typeof rawDiseases === "string" && rawDiseases.trim()
      ? rawDiseases
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean)
      : [];

  console.log("AIDiseaseCard diseases:", diseaseList);
  console.log("AIDiseaseCard summary:", summary);

  return (
    <div className="ai-disease-card">
      <div className="ai-disease-header">
        <div className="ai-disease-icon">
          <FaHeartbeat />
        </div>

        <div>
          <h2>Current Diseases</h2>
          <p>AI detected health conditions</p>
        </div>
      </div>

      {diseaseList.length > 0 ? (
        <div className="ai-disease-list">
          {diseaseList.map((disease, index) => (
            <div className="ai-disease-item" key={index}>
              <div className="disease-left">
                <FaExclamationTriangle className="disease-warning" />
                <span>
                  {typeof disease === "string"
                    ? disease
                    : disease?.name || disease?.disease || "Unknown Disease"}
                </span>
              </div>

              <FaCheckCircle className="disease-check" />
            </div>
          ))}
        </div>
      ) : (
        <div className="ai-no-disease">
          <FaCheckCircle />
          <span>No diseases detected</span>
        </div>
      )}
    </div>
  );
}

export default AIDiseaseCard;
