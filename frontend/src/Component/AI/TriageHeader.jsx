import React from "react";
import { FaHeartbeat, FaInfoCircle } from "react-icons/fa";

function TriageHeader() {
  return (
    <div className="triage-header-card">
      <div className="triage-header-top">
        <div className="triage-icon-wrap">
          <FaHeartbeat />
        </div>
        <div>
          <h1>AI Triage</h1>
          <p>Check symptom urgency and get the right medical next step.</p>
        </div>
      </div>

      <div className="triage-disclaimer">
        <FaInfoCircle />
        <span>
          This tool helps with urgency guidance only. It is not a final medical
          diagnosis.
        </span>
      </div>
    </div>
  );
}

export default TriageHeader;
