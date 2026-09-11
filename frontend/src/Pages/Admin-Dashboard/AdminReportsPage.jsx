// frontend/src/Pages/Admin/AdminReportsPage.jsx

import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  getAllReports,
  updateReportStatus,
  deleteReport,
} from "../../services/Admin/adminReportApi";

import AdminReportsFilter from "../../Component/Admin/AdminReportsFilter";
import AdminReportsTable from "../../Component/tables/AdminReportsTable";

import "../../Styles/Admin/AdminReportsPage.css";

function AdminReportsPage() {
  // ============================================================
  // STATE
  // ============================================================

  const [reports, setReports] = useState([]);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [actionLoading, setActionLoading] =
    useState(false);

  // ============================================================
  // NORMALIZE REPORT
  // ============================================================

  const normalizeReport = useCallback(
    (item = {}) => {
      // --------------------------------------------------------
      // MongoDB ID
      // --------------------------------------------------------

      const mongoId =
        item._id ||
        item.id ||
        item.reportId ||
        item.reportID ||
        item.reportNumber ||
        null;

      // --------------------------------------------------------
      // Report display ID
      // --------------------------------------------------------

      const displayReportId =
        item.reportNumber ||
        item.reportId ||
        item.reportID ||
        item.id ||
        item._id ||
        "N/A";

      // --------------------------------------------------------
      // Patient name
      // --------------------------------------------------------

      const patientName =
        item.patientName ||
        item.patient?.fullName ||
        item.patient?.FullName ||
        item.patient?.name ||
        item.FullName ||
        "Unknown Patient";

      // --------------------------------------------------------
      // Doctor name
      // --------------------------------------------------------

      const doctorName =
        item.doctorName ||
        item.DoctorName ||
        item.doctorFullName ||
        item.doctor?.fullName ||
        item.doctor?.FullName ||
        item.doctor?.name ||
        "Not Assigned";

      // --------------------------------------------------------
      // Technician
      // --------------------------------------------------------

      const technicianName =
        item.technicianName ||
        item.technicianFullName ||
        item.technician ||
        item.labTechnician ||
        item.labTechnicianName ||
        item.TechnicianName ||
        "Not Assigned";

      // --------------------------------------------------------
      // Report type
      // --------------------------------------------------------

      const reportType =
        item.reportType ||
        item.type ||
        item.testName ||
        item.reportTitle ||
        item.title ||
        "Medical Report";

      // --------------------------------------------------------
      // Status
      // --------------------------------------------------------

      const status =
        item.status || "Pending";

      // --------------------------------------------------------
      // Return normalized object
      // --------------------------------------------------------

      return {
        ...item,

        // MongoDB identifier
        _id: mongoId,

        // Display identifier
        reportId: displayReportId,

        patientName,
        doctorName,
        technicianName,
        reportType,
        status,

        department:
          item.department || "N/A",

        priority:
          item.priority || "Normal",

        reportDate:
          item.reportDate ||
          item.createdAt ||
          item.uploadDate ||
          null,
      };
    },
    []
  );

  // ============================================================
  // LOAD REPORTS
  // ============================================================

  const loadReports = useCallback(
    async () => {
      try {
        setLoading(true);
        setError("");

        const response =
          await getAllReports();

        console.log(
          "📋 Admin reports API response:",
          response
        );

        // ------------------------------------------------------
        // Axios response:
        //
        // response.data = {
        //   success: true,
        //   count: 10,
        //   data: [...]
        // }
        // ------------------------------------------------------

        const responseBody =
          response?.data;

        const rawReports =
          Array.isArray(
            responseBody?.data
          )
            ? responseBody.data
            : Array.isArray(
                responseBody
              )
              ? responseBody
              : [];

        // ------------------------------------------------------
        // Normalize all reports
        // ------------------------------------------------------

        const normalizedReports =
          rawReports.map(
            normalizeReport
          );

        console.log(
          "✅ Normalized admin reports:",
          normalizedReports
        );

        setReports(
          normalizedReports
        );
      } catch (err) {
        console.error(
          "❌ Failed to load reports:",
          err
        );

        setReports([]);

        setError(
          err?.response?.data
            ?.message ||
            err?.message ||
            "Failed to load medical reports."
        );
      } finally {
        setLoading(false);
      }
    },
    [normalizeReport]
  );

  // ============================================================
  // INITIAL LOAD
  // ============================================================

  useEffect(() => {
    loadReports();
  }, [loadReports]);

  // ============================================================
  // UPDATE REPORT STATUS
  // ============================================================

  const handleStatusChange =
    async (id, newStatus) => {
      if (!id) {
        console.error(
          "❌ Report ID is missing."
        );

        setError(
          "Unable to update report because the report ID is missing."
        );

        return;
      }

      if (!newStatus) {
        return;
      }

      try {
        setActionLoading(true);
        setError("");

        console.log(
          "🔄 Updating report status:",
          {
            id,
            newStatus,
          }
        );

        await updateReportStatus(
          id,
          newStatus
        );

        // ------------------------------------------------------
        // Update local state
        // ------------------------------------------------------

        setReports((previousReports) =>
          previousReports.map(
            (item) =>
              String(item._id) ===
              String(id)
                ? {
                    ...item,
                    status: newStatus,
                  }
                : item
          )
        );

        console.log(
          "✅ Report status updated successfully."
        );
      } catch (err) {
        console.error(
          "❌ Failed to update report status:",
          err
        );

        setError(
          err?.response?.data
            ?.message ||
            err?.message ||
            "Failed to update report status."
        );
      } finally {
        setActionLoading(false);
      }
    };

  // ============================================================
  // DELETE REPORT
  // ============================================================

  const handleDelete = async (id) => {
    if (!id) {
      console.error(
        "❌ Report ID is missing."
      );

      setError(
        "Unable to delete report because the report ID is missing."
      );

      return;
    }

    const confirmed =
      window.confirm(
        "Are you sure you want to delete this medical report?\n\nThis action cannot be undone."
      );

    if (!confirmed) {
      return;
    }

    try {
      setActionLoading(true);
      setError("");

      console.log(
        "🗑️ Deleting medical report:",
        id
      );

      await deleteReport(id);

      // ------------------------------------------------------
      // Remove from local state
      // ------------------------------------------------------

      setReports((previousReports) =>
        previousReports.filter(
          (item) =>
            String(item._id) !==
            String(id)
        )
      );

      console.log(
        "✅ Medical report deleted successfully."
      );
    } catch (err) {
      console.error(
        "❌ Failed to delete report:",
        err
      );

      setError(
        err?.response?.data
          ?.message ||
          err?.message ||
          "Failed to delete report."
      );
    } finally {
      setActionLoading(false);
    }
  };

  // ============================================================
  // FILTER REPORTS
  // ============================================================

  const filteredReports =
    useMemo(() => {
      const search =
        searchTerm
          .trim()
          .toLowerCase();

      return reports.filter(
        (item) => {
          // ----------------------------------------------------
          // Search
          // ----------------------------------------------------

          const searchableText = [
            item.patientName,
            item.doctorName,
            item.reportId,
            item.reportType,
            item.technicianName,
            item.department,
            item.priority,
            item.status,
          ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase();

          const matchesSearch =
            !search ||
            searchableText.includes(
              search
            );

          // ----------------------------------------------------
          // Status
          // ----------------------------------------------------

          const matchesStatus =
            statusFilter === "All" ||
            String(
              item.status || ""
            ).toLowerCase() ===
              String(
                statusFilter
              ).toLowerCase();

          return (
            matchesSearch &&
            matchesStatus
          );
        }
      );
    }, [
      reports,
      searchTerm,
      statusFilter,
    ]);

  // ============================================================
  // REPORT COUNTS
  // ============================================================

  const totalReports =
    reports.length;

  const filteredCount =
    filteredReports.length;

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <div className="admin-reports-page">
      {/* ====================================================== */}
      {/* PAGE HEADER */}
      {/* ====================================================== */}

      <div className="admin-reports-header">
        <div className="admin-reports-title-section">
          <div className="admin-reports-title-icon">
            📄
          </div>

          <div>
            <h2>
              Medical Reports
            </h2>

            <p>
              Manage and monitor patient
              medical reports.
            </p>
          </div>
        </div>

        {/* ---------------------------------------------------- */}
        {/* REPORT COUNT */}
        {/* ---------------------------------------------------- */}

        <div className="admin-reports-count">
          <strong>
            {filteredCount}
          </strong>

          <span>
            {filteredCount === 1
              ? "Report"
              : "Reports"}
          </span>
        </div>
      </div>

      {/* ====================================================== */}
      {/* SUMMARY CARDS */}
      {/* ====================================================== */}

      {!loading &&
        !error && (
          <div className="admin-reports-summary">
            <div className="admin-report-summary-card">
              <span className="summary-label">
                Total Reports
              </span>

              <strong>
                {totalReports}
              </strong>
            </div>

            <div className="admin-report-summary-card">
              <span className="summary-label">
                Pending
              </span>

              <strong>
                {
                  reports.filter(
                    (item) =>
                      String(
                        item.status
                      ).toLowerCase() ===
                      "pending"
                  ).length
                }
              </strong>
            </div>

            <div className="admin-report-summary-card">
              <span className="summary-label">
                In Review
              </span>

              <strong>
                {
                  reports.filter(
                    (item) =>
                      String(
                        item.status
                      ).toLowerCase() ===
                      "in review"
                  ).length
                }
              </strong>
            </div>

            <div className="admin-report-summary-card">
              <span className="summary-label">
                Completed
              </span>

              <strong>
                {
                  reports.filter(
                    (item) =>
                      String(
                        item.status
                      ).toLowerCase() ===
                      "completed"
                  ).length
                }
              </strong>
            </div>
          </div>
        )}

      {/* ====================================================== */}
      {/* ERROR */}
      {/* ====================================================== */}

      {error && (
        <div
          className="admin-reports-error"
          role="alert"
        >
          <div className="admin-reports-error-content">
            <span className="admin-error-icon">
              ⚠️
            </span>

            <div>
              <strong>
                Something went wrong
              </strong>

              <span>
                {error}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={loadReports}
            disabled={loading}
          >
            {loading
              ? "Retrying..."
              : "Retry"}
          </button>
        </div>
      )}

      {/* ====================================================== */}
      {/* FILTER */}
      {/* ====================================================== */}

      <AdminReportsFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={
          setStatusFilter
        }
      />

      {/* ====================================================== */}
      {/* CONTENT */}
      {/* ====================================================== */}

      {loading ? (
        <div className="admin-reports-loading">
          <div className="admin-reports-spinner" />

          <span>
            Loading medical reports...
          </span>
        </div>
      ) : filteredReports.length ===
        0 ? (
        <div className="admin-reports-empty">
          <div className="admin-reports-empty-icon">
            📄
          </div>

          <h3>
            No reports found
          </h3>

          <p>
            {reports.length === 0
              ? "There are no medical reports available yet."
              : "No medical reports match your current search or status filter."}
          </p>

          {(searchTerm ||
            statusFilter !==
              "All") && (
            <button
              type="button"
              onClick={() => {
                setSearchTerm("");
                setStatusFilter(
                  "All"
                );
              }}
            >
              Clear Filters
            </button>
          )}
        </div>
      ) : (
        <AdminReportsTable
          reports={filteredReports}
          onStatusChange={
            handleStatusChange
          }
          onDelete={handleDelete}
          actionLoading={
            actionLoading
          }
        />
      )}
    </div>
  );
}

export default AdminReportsPage;