import React from "react";
import { FaUserInjured, FaHeartbeat, FaNotesMedical } from "react-icons/fa";
import { getPriorityClass } from "../../utils/suggestionHelpers";

function SuggestionsSummaryCard({ patient, summary, priority }) {
  return (
    <div className="ai-summary-card">
      <div className="ai-summary-top">
        <div>
          <h3>AI Summary</h3>
          <p className="ai-summary-text">
            {summary || "No summary available."}
          </p>
        </div>
        <span className={`ai-priority-badge ${getPriorityClass(priority)}`}>
          {priority || "Unknown"} Priority{" "}
        </span>
      </div>

      <div className="ai-patient-mini-grid">
        <div className="ai-mini-item">
          <FaUserInjured />
          <span>{patient?.fullName || "Patient"}</span>
        </div>
        <div className="ai-mini-item">
          <FaHeartbeat />
          <span>Age: {patient?.age || "N/A"}</span>
        </div>
        <div className="ai-mini-item">
          <FaNotesMedical />
          <span>Blood Group: {patient?.bloodGroup || "N/A"}</span>
        </div>
      </div>
    </div>
  );
}

export default SuggestionsSummaryCard;
