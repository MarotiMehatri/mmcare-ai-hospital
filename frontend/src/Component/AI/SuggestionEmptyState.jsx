import React from "react";
import { FaRegLightbulb } from "react-icons/fa";

function SuggestionEmptyState({ onRefresh }) {
  return (
    <div className="ai-state-card empty-state">
      <FaRegLightbulb className="state-icon" />
      <h3>No suggestions available</h3>
      <p>We could not find any suggestion data for this patient.</p>
      <button className="state-btn" onClick={onRefresh}>
        Generate Suggestions
      </button>
    </div>
  );
}

export default SuggestionEmptyState;
