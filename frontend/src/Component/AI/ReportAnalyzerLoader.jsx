import React from "react";
import { FaSpinner } from "react-icons/fa";
import "../../Styles/AI/ReportAnalyzerLoader.css";

function ReportAnalyzerLoader() {
  return (
    <div className="report-loader">
      <FaSpinner className="spin" />
      <h3>Analyzing Report...</h3>
      <p>Please wait while AI reads and summarizes your medical report.</p>
    </div>
  );
}

export default ReportAnalyzerLoader;
