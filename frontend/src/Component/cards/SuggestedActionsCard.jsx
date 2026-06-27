import React from "react";
import { FaLightbulb } from "react-icons/fa";
import "../../Styles/AI/SuggestedActionsCard.css";

function SuggestedActionsCard({ nextSteps = [], possibleConditions = [] }) {
  if (!nextSteps.length && !possibleConditions.length) return null;

  return (
    <div className="suggested-actions-card">
      <h3>
        <FaLightbulb /> Suggested Actions
      </h3>

      {possibleConditions.length > 0 && (
        <div className="action-section">
          <h4>Possible Conditions</h4>
          <ul>
            {possibleConditions.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {nextSteps.length > 0 && (
        <div className="action-section">
          <h4>Next Steps</h4>
          <ul>
            {nextSteps.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SuggestedActionsCard;
