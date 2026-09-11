import React from "react";

import {
  FaTrash,
  FaEye,
  FaFileMedical,
  FaUserInjured,
  FaUserMd,
} from "react-icons/fa";

import "../../Styles/Doctor/MedicalReportsTable.css";

function MedicalReportsTable({
  reports = [],
  patients = [],
  onDelete,
}) {
  const safeReports = Array.isArray(reports) ? reports : [];
  const safePatients = Array.isArray(patients) ? patients : [];

  /*
  |--------------------------------------------------------------------------
  | FIND PATIENT
  |--------------------------------------------------------------------------
  */

  const getPatient = (patientId) => {
    return safePatients.find((patient) => {
      const id =
        patient?._id ||
        patient?.id ||
        patient?.patientId ||
        patient?.userId;

      return String(id) === String(patientId);
    });
  };

  /*
  |--------------------------------------------------------------------------
  | PATIENT NAME
  |--------------------------------------------------------------------------
  */

  const getPatientName = (report) => {
    if (report?.patientName) {
      return report.patientName;
    }

    const patient = getPatient(report?.patientId);

    return (
      patient?.FullName ||
      patient?.fullName ||
      patient?.name ||
      patient?.patientName ||
      "Unknown Patient"
    );
  };

  /*
  |--------------------------------------------------------------------------
  | PATIENT CODE
  |--------------------------------------------------------------------------
  */

  const getPatientCode = (report) => {
    if (report?.patientCode) {
      return report.patientCode;
    }

    const patient = getPatient(report?.patientId);

    return (
      patient?.patientCode ||
      patient?.patientID ||
      patient?.patientNumber ||
      "No Code"
    );
  };

  /*
  |--------------------------------------------------------------------------
  | DATE
  |--------------------------------------------------------------------------
  */

  const formatDate = (date) => {
    if (!date) {
      return "N/A";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  /*
  |--------------------------------------------------------------------------
  | INTERNAL REPORT ID
  |--------------------------------------------------------------------------
  | Used only for Delete API.
  | It is NOT displayed in the table.
  |--------------------------------------------------------------------------
  */

  const getReportId = (report) => {
    return (
      report?._id ||
      report?.id ||
      report?.reportId ||
      null
    );
  };

  /*
  |--------------------------------------------------------------------------
  | REPORT TITLE
  |--------------------------------------------------------------------------
  */

  const getReportTitle = (report) => {
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
    const fileUrl =
      report?.fileUrl ||
      report?.fileURL ||
      report?.filePath ||
      null;

    const fileName =
      report?.fileName ||
      report?.originalFileName ||
      null;

    /*
     * Actual uploaded file
     */
    if (fileUrl) {
      return (
        <a
          className="report-file-link"
          href={fileUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaEye />
          <span>View</span>
        </a>
      );
    }

    /*
     * File name exists but URL is not available
     */
    if (fileName) {
      return (
        <span className="report-file-name">
          <FaFileMedical />
          <span>{fileName}</span>
        </span>
      );
    }

    /*
     * No file
     */
    return (
      <span className="no-report-file">
        No File
      </span>
    );
  };

  return (
    <div className="medical-reports-table-wrapper">

      <table className="medical-reports-table">

        <thead>
          <tr>
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

          {safeReports.length === 0 ? (

            <tr>
              <td
                colSpan="10"
                className="medical-reports-empty"
              >
                No medical reports found.
              </td>
            </tr>

          ) : (

            safeReports.map((report, index) => {

              /*
               * API ID is still required internally
               * for DELETE operation.
               */
              const reportId = getReportId(report);

              const rowKey =
                reportId
                  ? `medical-report-${String(reportId)}`
                  : `medical-report-row-${index}`;

              return (
                <tr key={rowKey}>

                  {/* PATIENT */}

                  <td>
                    <div className="report-patient-cell">

                      <div className="report-table-icon">
                        <FaUserInjured />
                      </div>

                      <div>
                        <strong>
                          {getPatientName(report)}
                        </strong>

                        <small>
                          {getPatientCode(report)}
                        </small>
                      </div>

                    </div>
                  </td>

                  {/* DOCTOR */}

                  <td>
                    <div className="report-doctor-cell">

                      <FaUserMd />

                      <span>
                        {report?.doctorName ||
                          report?.uploadedBy ||
                          `Doctor #${report?.doctorId || "N/A"}`}
                      </span>

                    </div>
                  </td>

                  {/* DEPARTMENT */}

                  <td>
                    {report?.department || "N/A"}
                  </td>

                  {/* TITLE */}

                  <td>
                    <strong className="report-title">
                      {getReportTitle(report)}
                    </strong>
                  </td>

                  {/* TYPE */}

                  <td>
                    {report?.reportType || "-"}
                  </td>

                  {/* DATE */}

                  <td>
                    {formatDate(
                      report?.reportDate ||
                      report?.uploadDate ||
                      report?.createdAt
                    )}
                  </td>

                  {/* STATUS */}

                  <td>
                    <span
                      className={`report-status ${String(
                        report?.status || "Pending"
                      )
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                    >
                      {report?.status || "Pending"}
                    </span>
                  </td>

                  {/* PRIORITY */}

                  <td>
                    <span
                      className={`report-priority ${String(
                        report?.priority || "Normal"
                      )
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                    >
                      {report?.priority || "Normal"}
                    </span>
                  </td>

                  {/* FILE */}

                  <td>
                    {renderFile(report)}
                  </td>

                  {/* ACTION */}

                  <td>

                    <button
                      type="button"
                      className="report-delete-btn"
                      onClick={() => onDelete?.(reportId)}
                      disabled={!reportId}
                      title="Delete report"
                    >
                      <FaTrash />
                    </button>

                  </td>

                </tr>
              );
            })
          )}

        </tbody>

      </table>

    </div>
  );
}

export default MedicalReportsTable;