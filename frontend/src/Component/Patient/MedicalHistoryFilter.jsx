import React from "react";
import "../../Styles/Patient/MedicalHistoryFilter.css";
function MedicalHistoryFilter({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
}) {
  return (
    <div className="medical-history-filter">
      <input
        type="text"
        placeholder="Search by doctor, department, diagnosis, visit ID"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
      >
        <option value="All">All Status</option>
        <option value="Completed">Completed</option>
        <option value="Pending Review">Pending Review</option>
      </select>
    </div>
  );
}

export default MedicalHistoryFilter;
