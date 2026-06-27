import React from "react";
import {
  FaFileMedical,
  FaCheckCircle,
  FaClock,
  FaExclamationTriangle,
} from "react-icons/fa";

import "../../Styles/Doctor/DoctorReportsStats.css";

function DoctorReportsStats({ reports = [] }) {
  const totalReports = reports.length;

  const uploadedReports = reports.filter(
    (report) => report.status === "Uploaded",
  ).length;

  const reviewedReports = reports.filter(
    (report) => report.status === "Reviewed",
  ).length;

  const criticalReports = reports.filter(
    (report) => report.priority === "Critical",
  ).length;

  return (
    <div className="doctor-reports-stats">
      <div className="doctor-report-stat-card">
        <FaFileMedical />
        <div>
          <h4>Total Reports</h4>
          <strong>{totalReports}</strong>
        </div>
      </div>

      <div className="doctor-report-stat-card">
        <FaCheckCircle />
        <div>
          <h4>Uploaded</h4>
          <strong>{uploadedReports}</strong>
        </div>
      </div>

      <div className="doctor-report-stat-card">
        <FaClock />
        <div>
          <h4>Reviewed</h4>
          <strong>{reviewedReports}</strong>
        </div>
      </div>

      <div className="doctor-report-stat-card">
        <FaExclamationTriangle />
        <div>
          <h4>Critical</h4>
          <strong>{criticalReports}</strong>
        </div>
      </div>
    </div>
  );
}

export default DoctorReportsStats;
