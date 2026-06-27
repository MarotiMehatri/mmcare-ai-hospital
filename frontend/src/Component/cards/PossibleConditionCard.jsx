import React from "react";
import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaInfoCircle,
  FaNotesMedical,
} from "react-icons/fa";
import "../../Styles/AI/PossibleConditionCard.css";

function PossibleConditionCard({ condition }) {
  const probability = condition?.probability || "Low";
  const level = probability.toLowerCase();

  const config = {
    high: {
      className: "high",
      icon: <FaExclamationTriangle />,
      label: "High Possibility",
    },
    moderate: {
      className: "moderate",
      icon: <FaInfoCircle />,
      label: "Moderate Possibility",
    },
    low: {
      className: "low",
      icon: <FaCheckCircle />,
      label: "Low Possibility",
    },
  };

  const current = config[level] || config.low;

  return (
    <div className={`possible-condition-card ${current.className}`}>
      <div className="condition-glow"></div>

      <div className="possible-condition-top">
        <div className="condition-title-wrap">
          <div className="condition-main-icon">
            <FaNotesMedical />
          </div>

          <div>
            <span className="condition-small-label">Possible Condition</span>
            <h4>{condition?.name || "General Health Review"}</h4>
          </div>
        </div>

        <span className={`probability-chip ${current.className}`}>
          {current.icon}
          {probability}
        </span>
      </div>

      <p>{condition?.description || "Please provide more symptom details."}</p>

      <div className="condition-footer">
        <span>{current.label}</span>
        <div className={`condition-line ${current.className}`}></div>
      </div>
    </div>
  );
}

export default PossibleConditionCard;
