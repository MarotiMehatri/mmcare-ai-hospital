import React, { useState, useEffect, useMemo } from "react";
import {
  getAllReports,
  updateReportStatus,
  deleteReport,
} from "../../services/Admin/adminReportApi";
import AdminReportsFilter from "../../Component/Admin/AdminReportsFilter";
import AdminReportsTable from "../../Component/tables/AdminReportsTable";
import "../../Styles/Admin/AdminReportsPage.css";

function AdminReportsPage() {
  const [reports, setReports] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    try {
      setLoading(true);

      const res = await getAllReports();
      const data = res?.data?.data || res?.data || [];

      const normalizedReports = Array.isArray(data)
        ? data.map((item) => ({
            ...item,

            reportId:
              item.reportId ||
              item.reportID ||
              item.reportNumber ||
              item.id ||
              "N/A",

            patientName:
              item.patientName ||
              item.patient?.fullName ||
              item.patient?.name ||
              item.FullName ||
              "Unknown Patient",

            doctorName:
              item.doctorName ||
              item.doctor?.fullName ||
              item.doctor?.name ||
              item.doctorFullName ||
              item.DoctorName ||
              item.doctor ||
              "Not Assigned",

            technicianName:
              item.technicianName ||
              item.technician ||
              item.technicianFullName ||
              item.labTechnician ||
              item.labTechnicianName ||
              item.TechnicianName ||
              "Not Assigned",

            reportType:
              item.reportType ||
              item.type ||
              item.testName ||
              item.reportTitle ||
              "Medical Report",

            status: item.status || "Pending",
          }))
        : [];

      setReports(normalizedReports);
    } catch (error) {
      console.error("Failed to load reports:", error);
      setReports([]);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateReportStatus(id, newStatus);
      setReports((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, status: newStatus } : item,
        ),
      );
    } catch (error) {
      console.error("Failed to update report status:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteReport(id);
      setReports((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Failed to delete report:", error);
    }
  };

  const filteredReports = useMemo(() => {
    return reports.filter((item) => {
      const matchesSearch =
        item.patientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.doctorName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.reportId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.reportType?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || item.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [reports, searchTerm, statusFilter]);

  return (
    <div className="admin-reports-page">
      <div className="admin-reports-header">
        <h2>All Reports</h2>
        <p>Manage all medical reports from admin panel.</p>
      </div>

      <AdminReportsFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      {loading ? (
        <div className="admin-reports-loading">Loading reports...</div>
      ) : (
        <AdminReportsTable
          reports={filteredReports}
          onStatusChange={handleStatusChange}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

export default AdminReportsPage;
