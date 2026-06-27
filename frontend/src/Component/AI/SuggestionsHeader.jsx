import React from "react";
import { FaLightbulb, FaSyncAlt } from "react-icons/fa";
function SuggestionsHeader({ patientName, onRefresh, refreshing }) {
  return (
    <div className="ai-suggestions-header-card">
      <div className="si-suggestions-header-left">
        <div className="si-suggestions-icon-wrap">
          <FaLightbulb className="ai-suggestions-main-icon" />
        </div>
        <div>
          <h1 className="ai-suggestions-title">AI Health Suggestions</h1>
          <p className="ai-suggestions-subtitle">
            Personalized health recommendations for {patientName || "Patient"}
          </p>
        </div>
      </div>
      <button
        className="ai-refresh-btn"
        onClick={onRefresh}
        disabled={refreshing}
      >
        {" "}
        <FaSyncAlt className={refreshing ? "spin-icon" : ""} />{" "}
        {refreshing ? "Refreshing..." : "Refresh"}
      </button>
    </div>
  );
}

export default SuggestionsHeader;
