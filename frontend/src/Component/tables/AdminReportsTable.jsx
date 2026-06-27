import React from "react";

function AdminReportsTable({ reports = [], onStatusChange, onDelete }) {
  const getDoctorName = (item) =>
    item.doctorName ||
    item.DoctorName ||
    item.doctorFullName ||
    item.doctor?.fullName ||
    item.doctor?.name ||
    item.doctor ||
    "Not Assigned";

  const getTechnicianName = (item) =>
    item.labTechnician ||
    item.technicianName ||
    item.technician ||
    item.labTechnicianName ||
    item.TechnicianName ||
    "Not Assigned";

  return (
    <div className="admin-reports-table-wrapper">
      <table className="admin-reports-table">
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

        <tbody>
          {reports.length > 0 ? (
            reports.map((item) => (
              <tr key={item.id || item.reportNumber}>
                <td>{item.reportNumber || item.reportId || "N/A"}</td>
                <td>{item.patientName || "Unknown Patient"}</td>
                <td>{getDoctorName(item)}</td>
                <td>{item.department || "N/A"}</td>
                <td>{item.reportType || "Medical Report"}</td>
                <td>{item.reportDate || "N/A"}</td>
                <td>{item.priority || "Normal"}</td>

                <td>
                  <span
                    className={`admin-report-status ${(item.status || "Pending")
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                  >
                    {item.status || "Pending"}
                  </span>
                </td>

                <td>{getTechnicianName(item)}</td>

                <td>
                  <div className="admin-reports-actions">
                    <select
                      value={item.status || "Pending"}
                      onChange={(e) => onStatusChange(item.id, e.target.value)}
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Review">In Review</option>
                      <option value="Completed">Completed</option>
                    </select>

                    <button onClick={() => onDelete(item.id)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10" className="admin-no-reports">
                No reports found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AdminReportsTable;
