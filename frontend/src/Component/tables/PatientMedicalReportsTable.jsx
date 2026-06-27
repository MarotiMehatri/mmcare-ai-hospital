import React from "react";

function PatientMedicalReportsTable({ reports = [], doctors = [] }) {
  const getDoctorName = (report) => {
    if (report.doctorName) return report.doctorName;

    const doctor = doctors.find(
      (doc) =>
        String(doc.id) === String(report.doctorId) ||
        String(doc.doctorId) === String(report.doctorId),
    );

    return (
      doctor?.fullName ||
      doctor?.name ||
      doctor?.doctorName ||
      "Doctor Not Found"
    );
  };

  const formatDate = (report) => {
    const date = report.uploadDate || report.reportDate || report.createdAt;

    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="patient-medical-reports-table-card">
      <div className="patient-medical-reports-table-header">
        <div>
          <h3>Medical Reports History</h3>
          <p>All reports uploaded by your doctor are shown below.</p>
        </div>
      </div>

      <div className="patient-medical-reports-table-wrapper">
        <table className="patient-medical-reports-table">
          <thead>
            <tr>
              <th>Report Title</th>
              <th>Type</th>
              <th>Doctor</th>
              <th>Department</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Date</th>
              <th>File</th>
            </tr>
          </thead>

          <tbody>
            {reports.map((report) => (
              <tr key={report.id}>
                <td>
                  <div className="patient-report-title-cell">
                    <strong>{report.reportTitle || "Untitled Report"}</strong>
                    <span>
                      {report.description || "No description available"}
                    </span>
                  </div>
                </td>

                <td>{report.reportType || "-"}</td>

                <td>{getDoctorName(report)}</td>

                <td>{report.department || "-"}</td>

                <td>
                  <span
                    className={`patient-report-badge patient-priority-${String(
                      report.priority || "normal",
                    )
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                  >
                    {report.priority || "Normal"}
                  </span>
                </td>

                <td>
                  <span
                    className={`patient-report-badge patient-status-${String(
                      report.status || "uploaded",
                    )
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                  >
                    {report.status || "Uploaded"}
                  </span>
                </td>

                <td>{formatDate(report)}</td>

                <td>
                  {report.fileUrl ? (
                    <a
                      href={report.fileUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="patient-report-view-link"
                    >
                      View File
                    </a>
                  ) : (
                    "-"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PatientMedicalReportsTable;
