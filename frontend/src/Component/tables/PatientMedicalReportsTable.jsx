import React from "react";

import {
  FaEye,
  FaFileMedical,
  FaUserMd,
} from "react-icons/fa";

import "../../Styles/Patient/PatientMedicalReportsTable.css";

function PatientMedicalReportsTable({
  reports = [],
  doctors = [],
}) {

  const safeReports =
    Array.isArray(reports)
      ? reports
      : [];

  const safeDoctors =
    Array.isArray(doctors)
      ? doctors
      : [];

  /*
  |--------------------------------------------------------------------------
  | DOCTOR
  |--------------------------------------------------------------------------
  */

  const getDoctorName = (report) => {

    if (report?.doctorName) {
      return report.doctorName;
    }

    const doctor =
      safeDoctors.find(
        (doc) =>
          String(
            doc?._id ||
              doc?.id ||
              doc?.doctorId
          ) ===
          String(report?.doctorId)
      );

    return (
      doctor?.FullName ||
      doctor?.fullName ||
      doctor?.name ||
      doctor?.doctorName ||
      `Doctor #${report?.doctorId || "N/A"}`
    );
  };

  /*
  |--------------------------------------------------------------------------
  | DATE
  |--------------------------------------------------------------------------
  */

  const formatDate = (report) => {

    const date =
      report?.uploadDate ||
      report?.reportDate ||
      report?.createdAt;

    if (!date) {
      return "-";
    }

    const parsedDate =
      new Date(date);

    if (
      Number.isNaN(
        parsedDate.getTime()
      )
    ) {
      return "-";
    }

    return parsedDate.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  /*
  |--------------------------------------------------------------------------
  | TITLE
  |--------------------------------------------------------------------------
  */

  const getTitle = (report) => {
    return (
      report?.reportTitle ||
      report?.title ||
      "Untitled Report"
    );
  };

  /*
  |--------------------------------------------------------------------------
  | FILE
  |--------------------------------------------------------------------------
  */

  const renderFile = (report) => {

    if (report?.fileUrl) {
      return (
        <a
          href={report.fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="patient-report-view-link"
        >
          <FaEye />
          View File
        </a>
      );
    }

    if (report?.fileName) {
      return (
        <span className="patient-report-file-name">
          <FaFileMedical />
          {report.fileName}
        </span>
      );
    }

    return (
      <span className="patient-report-no-file">
        No File
      </span>
    );
  };

  return (
    <div className="patient-medical-reports-table-card">

      <div className="patient-medical-reports-table-header">

        <div>
          <h3>
            Medical Reports History
          </h3>

          <p>
            All medical reports uploaded
            by your doctor.
          </p>
        </div>

        <div className="patient-report-count">
          {safeReports.length} Reports
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

            {safeReports.length === 0 ? (

              <tr>
                <td
                  colSpan="8"
                  className="patient-medical-reports-empty"
                >
                  No medical reports available.
                </td>
              </tr>

            ) : (

              safeReports.map(
                (report, index) => {

                  const reportId =
                    report?._id ||
                    report?.id ||
                    report?.reportId;

                  return (
                    <tr
                      key={
                        reportId
                          ? `patient-report-${String(
                              reportId
                            )}`
                          : `patient-report-${index}`
                      }
                    >

                      <td>

                        <div className="patient-report-title-cell">

                          <div className="patient-report-icon">
                            <FaFileMedical />
                          </div>

                          <div>

                            <strong>
                              {getTitle(report)}
                            </strong>

                            <span>
                              {report?.description ||
                                "No description available"}
                            </span>

                          </div>

                        </div>

                      </td>

                      <td>
                        {report?.reportType ||
                          "-"}
                      </td>

                      <td>

                        <div className="patient-report-doctor">

                          <FaUserMd />

                          <span>
                            {getDoctorName(
                              report
                            )}
                          </span>

                        </div>

                      </td>

                      <td>
                        {report?.department ||
                          "-"}
                      </td>

                      <td>

                        <span
                          className={`patient-report-badge patient-priority-${String(
                            report?.priority ||
                              "normal"
                          )
                            .toLowerCase()
                            .replace(
                              /\s+/g,
                              "-"
                            )}`}
                        >
                          {report?.priority ||
                            "Normal"}
                        </span>

                      </td>

                      <td>

                        <span
                          className={`patient-report-badge patient-status-${String(
                            report?.status ||
                              "uploaded"
                          )
                            .toLowerCase()
                            .replace(
                              /\s+/g,
                              "-"
                            )}`}
                        >
                          {report?.status ||
                            "Uploaded"}
                        </span>

                      </td>

                      <td>
                        {formatDate(report)}
                      </td>

                      <td>
                        {renderFile(report)}
                      </td>

                    </tr>
                  );
                }
              )

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default PatientMedicalReportsTable;