import React from "react";
import { FaCheckCircle, FaStethoscope, FaArrowRight } from "react-icons/fa";
import { getPriorityClass } from "../../utils/suggestionHelpers";

function SuggestionCard({ suggestion }) {
  return (
    <div className="ai-suggestion-card">
      <div className="ai-suggestion-card-top">
        <div className="ai-suggestion-title-wrap">
          <FaCheckCircle className="ai-suggestion-icon" />
          <h4>{suggestion?.title}</h4>
        </div>
        <span
          className={`ai-priority-pill ${getPriorityClass(suggestion?.priority)}`}
        >
          {suggestion?.priority || "low"}
        </span>
      </div>

      <p className="ai-suggestion-description">
        {suggestion?.description || "No description available."}
      </p>

      <div className="ai-suggestion-meta">
        <span className="meta-chip">
          <FaStethoscope />
          {suggestion?.category || "General"}
        </span>

        <span className="meta-chip">
          <FaArrowRight />
          {suggestion?.actionType || "advice"}
        </span>
      </div>
    </div>
  );
}

export default SuggestionCard;
