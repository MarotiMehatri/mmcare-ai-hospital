import React from "react";
import { FaBrain } from "react-icons/fa";

function MemoryHeader({ patientName }) {
  return (
    <div className="memory-header-card">
      <div className="memory-header-left">
        <h1 className="memory-page-title">AI Memory</h1>
        <p className="memory-page-subtitle">
          Smart health memory for {patientName || "Patient"}
        </p>
      </div>

      <div className="memory-status-badge">
        <FaBrain />
        <span>Memory Active</span>
      </div>
    </div>
  );
}

export default MemoryHeader;
