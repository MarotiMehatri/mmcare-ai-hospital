import React from "react";
import { FaFileMedical, FaRobot } from "react-icons/fa";
import "../../styles/AI/ReportHeader.css";

function ReportHeader() {
  return (
    <div className="report-header">
      <div className="report-header-left">
        <div className="report-header-icon">
          <FaFileMedical />
        </div>
        <div>
          <h1>AI Report Analyzer</h1>
          <p>
            Upload your medical report and get AI-based summary, abnormal
            values, suggested actions, and doctor guidance.
          </p>
        </div>
      </div>

      <div className="report-header-badge">
        <FaRobot />
        <span>Gemini AI Powered</span>
      </div>
    </div>
  );
}

export default ReportHeader;
