import React from "react";
import {
  FaFileMedical,
  FaDownload,
  FaExternalLinkAlt,
  FaShieldAlt,
} from "react-icons/fa";

import "../../../Styles/AI/HealthSummary/AIreportDownloadCard.css";

function AIReportDownloadCard({ summary = {}, report = {} }) {
  const finalReport = summary || report || {};

  const reportUrl =
    finalReport?.reportUrl ||
    finalReport?.pdfUrl ||
    finalReport?.downloadUrl ||
    "";

  const handleDownload = () => {
    if (!reportUrl) {
      alert("Report PDF is not available.");
      return;
    }

    window.open(reportUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="ai-report-download-card">
      <div className="ai-report-glow"></div>

      <div className="ai-report-header">
        <div className="ai-report-icon">
          <FaFileMedical />
        </div>

        <div>
          <h2>AI Health Report</h2>
          <p>Download complete AI-generated health summary</p>
        </div>
      </div>

      <div className="ai-report-info-box">
        <div>
          <span>Report Status</span>
          <strong>
            {reportUrl ? "Ready to Download" : "PDF Not Available"}
          </strong>
        </div>

        <FaShieldAlt />
      </div>

      <button
        type="button"
        className="ai-report-download-btn"
        onClick={handleDownload}
        disabled={!reportUrl}
      >
        <FaDownload />
        Download PDF
        <FaExternalLinkAlt className="external-icon" />
      </button>
    </div>
  );
}

export default AIReportDownloadCard;
