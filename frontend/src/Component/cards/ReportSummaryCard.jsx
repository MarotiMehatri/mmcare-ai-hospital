import React from "react";
import {
  FaNotesMedical,
  FaHospital,
  FaExclamationCircle,
} from "react-icons/fa";
import "../../Styles/AI/ReportSummaryCard.css";

function ReportSummaryCard({ result }) {
  if (!result) return null;

  return (
    <div className="report-summary-card">
      <div className="summary-top">
        <h3>
          <FaNotesMedical /> Report Summary
        </h3>
        <span className={`urgency-badge ${result.urgencyLevel?.toLowerCase()}`}>
          {result.urgencyLevel || "Unknown"}
        </span>
      </div>

      <p className="summary-text">{result.summary}</p>

      <div className="summary-meta">
        <div className="meta-item">
          <FaHospital />
          <span>
            <strong>Recommended Department:</strong>{" "}
            {result.recommendedDepartment || "General Medicine"}
          </span>
        </div>

        <div className="meta-item">
          <FaExclamationCircle />
          <span>
            <strong>Report Type:</strong>{" "}
            {result.reportType || "Medical Report"}
          </span>
        </div>
      </div>

      {result.keyFindings?.length > 0 && (
        <div className="key-findings">
          <h4>Key Findings</h4>
          <ul>
            {result.keyFindings.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ReportSummaryCard;
