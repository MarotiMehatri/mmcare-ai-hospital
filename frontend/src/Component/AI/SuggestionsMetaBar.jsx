import React from "react";
import { FaClock, FaListAlt } from "react-icons/fa";
import { formatDateTime } from "../../utils/suggestionHelpers";

function SuggestionsMetaBar({ generatedAt, totalSuggestions }) {
  return (
    <div className="ai-meta-bar">
      <div className="ai-meta-item">
        <FaClock />
        <span>Last Updated: {formatDateTime(generatedAt)}</span>
      </div>

      <div className="ai-meta-item">
        <FaListAlt />
        <span>Total Suggestions: {totalSuggestions || 0}</span>
      </div>
    </div>
  );
}

export default SuggestionsMetaBar;
