import React from "react";

function AdminReportsFilter({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
}) {
  return (
    <div className="admin-reports-filter">
      <input
        type="text"
        placeholder="Search by patient, doctor, report ID, report type"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
      >
        {" "}
        <option value="All">All Status</option>
        <option value="Pending">Pending</option>
        <option value="In Review">In Review</option>
        <option value="Completed">Completed</option>
      </select>
    </div>
  );
}

export default AdminReportsFilter;
