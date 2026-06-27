import React from "react";
import { FaTrash, FaEye, FaFileMedical } from "react-icons/fa";

import "../../Styles/Doctor/MedicalReportsTable.css";

function MedicalReportsTable({ reports = [], onDelete }) {
  const safeReports = Array.isArray(reports) ? reports : [];

  return (
    <div className="medical-reports-table-wrapper">
      <table className="medical-reports-table">
        <thead>
          <tr>
            <th>Report No</th>
            <th>Patient</th>
            <th>Doctor</th>
            <th>Department</th>
            <th>Title</th>
            <th>Type</th>
            <th>Date</th>
            <th>Status</th>
            <th>Priority</th>
            <th>File</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {safeReports.map((report) => (
            <tr key={report.id || report.reportNumber}>
              <td>{report.reportNumber || "N/A"}</td>

              <td>
                <strong>{report.patientName || "Unknown Patient"}</strong>
                <br />
                <small>{report.patientCode || "No Code"}</small>
              </td>

              <td>{report.doctorName || report.uploadedBy || "Doctor"}</td>
              <td>{report.department || "N/A"}</td>
              <td>{report.reportTitle || "N/A"}</td>
              <td>{report.reportType || "N/A"}</td>
              <td>{report.reportDate || "N/A"}</td>

              <td>
                <span className="report-status">
                  {report.status || "Uploaded"}
                </span>
              </td>

              <td>
                <span
                  className={`report-priority ${
                    report.priority?.toLowerCase() || "normal"
                  }`}
                >
                  {report.priority || "Normal"}
                </span>
              </td>

              <td>
                {report.fileUrl ? (
                  <a
                    className="report-file-link"
                    href={report.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaEye /> View
                  </a>
                ) : report.fileName ? (
                  <span className="report-file-name">
                    <FaFileMedical /> {report.fileName}
                  </span>
                ) : (
                  <span className="no-report-file">No File</span>
                )}
              </td>

              <td>
                <button
                  type="button"
                  className="report-delete-btn"
                  onClick={() => onDelete?.(report.id)}
                  disabled={!report.id}
                  title="Delete report"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MedicalReportsTable;
