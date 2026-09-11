// frontend/src/Component/tables/AdminReportsTable.jsx

import React from "react";

function AdminReportsTable({
  reports = [],
  onStatusChange,
  onDelete,
  actionLoading = false,
}) {
  // ============================================================
  // GET REPORT ID
  // ============================================================

  const getReportId = (item) => {
    return (
      item?._id ||
      item?.id ||
      item?.reportId ||
      item?.reportID ||
      item?.reportNumber ||
      null
    );
  };

  // ============================================================
  // GET DISPLAY REPORT ID
  // ============================================================

  const getReportDisplayId = (
    item
  ) => {
    return (
      item?.reportNumber ||
      item?.reportId ||
      item?.reportID ||
      item?.id ||
      item?._id ||
      "N/A"
    );
  };

  // ============================================================
  // GET DOCTOR NAME
  // ============================================================

  const getDoctorName = (
    item
  ) => {
    return (
      item?.doctorName ||
      item?.DoctorName ||
      item?.doctorFullName ||
      item?.doctor?.fullName ||
      item?.doctor?.FullName ||
      item?.doctor?.name ||
      "Not Assigned"
    );
  };

  // ============================================================
  // GET TECHNICIAN
  // ============================================================

  const getTechnicianName = (
    item
  ) => {
    return (
      item?.technicianName ||
      item?.technicianFullName ||
      item?.technician ||
      item?.labTechnician ||
      item?.labTechnicianName ||
      item?.TechnicianName ||
      "Not Assigned"
    );
  };

  // ============================================================
  // FORMAT DATE
  // ============================================================

  const formatDate = (
    date
  ) => {
    if (!date) {
      return "N/A";
    }

    const parsedDate =
      new Date(date);

    if (
      Number.isNaN(
        parsedDate.getTime()
      )
    ) {
      return String(date);
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

  // ============================================================
  // STATUS CLASS
  // ============================================================

  const getStatusClass = (
    status
  ) => {
    return String(
      status || "Pending"
    )
      .toLowerCase()
      .replace(
        /\s+/g,
        "-"
      );
  };

  // ============================================================
  // PRIORITY CLASS
  // ============================================================

  const getPriorityClass = (
    priority
  ) => {
    return String(
      priority || "Normal"
    )
      .toLowerCase()
      .replace(
        /\s+/g,
        "-"
      );
  };

  // ============================================================
  // HANDLE STATUS
  // ============================================================

  const handleStatusChange = (
    item,
    newStatus
  ) => {
    const reportId =
      getReportId(item);

    if (!reportId) {
      console.error(
        "❌ Cannot update report. ID is missing:",
        item
      );

      return;
    }

    if (
      typeof onStatusChange !==
      "function"
    ) {
      console.error(
        "❌ onStatusChange is not a function."
      );

      return;
    }

    onStatusChange(
      reportId,
      newStatus
    );
  };

  // ============================================================
  // HANDLE DELETE
  // ============================================================

  const handleDelete = (
    item
  ) => {
    const reportId =
      getReportId(item);

    if (!reportId) {
      console.error(
        "❌ Cannot delete report. ID is missing:",
        item
      );

      return;
    }

    if (
      typeof onDelete !==
      "function"
    ) {
      console.error(
        "❌ onDelete is not a function."
      );

      return;
    }

    onDelete(reportId);
  };

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <div className="admin-reports-table-card">
      <div className="admin-reports-table-wrapper">
        <table className="admin-reports-table">
          {/* ================================================== */}
          {/* HEADER */}
          {/* ================================================== */}

          <thead>
            <tr>
              <th>Report ID</th>
              <th>Patient</th>
              <th>Doctor</th>
              <th>Department</th>
              <th>Report Type</th>
              <th>Report Date</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Technician</th>
              <th>Action</th>
            </tr>
          </thead>

          {/* ================================================== */}
          {/* BODY */}
          {/* ================================================== */}

          <tbody>
            {reports.length > 0 ? (
              reports.map(
                (
                  item,
                  index
                ) => {
                  const reportId =
                    getReportId(
                      item
                    );

                  /*
                   * IMPORTANT:
                   *
                   * MongoDB _id is preferred.
                   *
                   * The final index fallback prevents
                   * React's "unique key" warning even if
                   * malformed legacy data has no ID.
                   */

                  const rowKey =
                    reportId
                      ? `medical-report-${reportId}`
                      : `medical-report-fallback-${index}`;

                  const currentStatus =
                    item?.status ||
                    "Pending";

                  const currentPriority =
                    item?.priority ||
                    "Normal";

                  return (
                    <tr
                      key={rowKey}
                    >
                      {/* ====================================== */}
                      {/* REPORT ID */}
                      {/* ====================================== */}

                      <td>
                        <span className="admin-report-id">
                          {getReportDisplayId(
                            item
                          )}
                        </span>
                      </td>

                      {/* ====================================== */}
                      {/* PATIENT */}
                      {/* ====================================== */}

                      <td>
                        <div className="admin-report-patient">
                          <div className="admin-report-avatar">
                            {String(
                              item?.patientName ||
                                "P"
                            )
                              .charAt(
                                0
                              )
                              .toUpperCase()}
                          </div>

                          <div>
                            <strong>
                              {item?.patientName ||
                                "Unknown Patient"}
                            </strong>

                            {item?.patientCode && (
                              <small>
                                {
                                  item.patientCode
                                }
                              </small>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* ====================================== */}
                      {/* DOCTOR */}
                      {/* ====================================== */}

                      <td>
                        <span className="admin-report-doctor">
                          {getDoctorName(
                            item
                          )}
                        </span>
                      </td>

                      {/* ====================================== */}
                      {/* DEPARTMENT */}
                      {/* ====================================== */}

                      <td>
                        <span className="admin-report-department">
                          {item?.department ||
                            "N/A"}
                        </span>
                      </td>

                      {/* ====================================== */}
                      {/* REPORT TYPE */}
                      {/* ====================================== */}

                      <td>
                        <span className="admin-report-type">
                          {item?.reportType ||
                            "Medical Report"}
                        </span>
                      </td>

                      {/* ====================================== */}
                      {/* DATE */}
                      {/* ====================================== */}

                      <td>
                        <span className="admin-report-date">
                          {formatDate(
                            item?.reportDate ||
                              item?.createdAt ||
                              item?.uploadDate
                          )}
                        </span>
                      </td>

                      {/* ====================================== */}
                      {/* PRIORITY */}
                      {/* ====================================== */}

                      <td>
                        <span
                          className={`admin-report-priority ${getPriorityClass(
                            currentPriority
                          )}`}
                        >
                          {currentPriority}
                        </span>
                      </td>

                      {/* ====================================== */}
                      {/* STATUS */}
                      {/* ====================================== */}

                      <td>
                        <span
                          className={`admin-report-status ${getStatusClass(
                            currentStatus
                          )}`}
                        >
                          <span className="status-dot" />

                          {currentStatus}
                        </span>
                      </td>

                      {/* ====================================== */}
                      {/* TECHNICIAN */}
                      {/* ====================================== */}

                      <td>
                        <span className="admin-report-technician">
                          {getTechnicianName(
                            item
                          )}
                        </span>
                      </td>

                      {/* ====================================== */}
                      {/* ACTION */}
                      {/* ====================================== */}

                      <td>
                        <div className="admin-reports-actions">
                          {/* STATUS */}

                          <select
                            value={
                              currentStatus
                            }
                            onChange={(
                              e
                            ) =>
                              handleStatusChange(
                                item,
                                e
                                  .target
                                  .value
                              )
                            }
                            disabled={
                              !reportId ||
                              actionLoading
                            }
                            aria-label={`Change status for ${getReportDisplayId(
                              item
                            )}`}
                          >
                            <option value="Pending">
                              Pending
                            </option>

                            <option value="In Review">
                              In Review
                            </option>

                            <option value="Completed">
                              Completed
                            </option>
                          </select>

                          {/* DELETE */}

                          <button
                            type="button"
                            className="admin-report-delete-btn"
                            onClick={() =>
                              handleDelete(
                                item
                              )
                            }
                            disabled={
                              !reportId ||
                              actionLoading
                            }
                            title="Delete medical report"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                }
              )
            ) : (
              <tr>
                <td
                  colSpan="10"
                  className="admin-no-reports"
                >
                  No reports found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminReportsTable;