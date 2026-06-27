import React from "react";
import { FaExclamationCircle } from "react-icons/fa";

function SuggestionErrorState({ message, onRetry }) {
  return (
    <div className="ai-state-card error-state">
      <FaExclamationCircle className="state-icon" />
      <h3>Something went wrong</h3>
      <p>{message || "Unable to load AI suggestions."}</p>
      <button className="state-btn" onClick={onRetry}>
        Try Again
      </button>
    </div>
  );
}

export default SuggestionErrorState;