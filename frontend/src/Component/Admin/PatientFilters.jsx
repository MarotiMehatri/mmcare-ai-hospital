import React from "react";
import "../../Styles/Admin/PatientFilters.css";
import { FaSearch } from "react-icons/fa";
function PatientFilters({
  searchTerm,
  setSearchTerm,
  genderFilter,
  setGenderFilter,
  statusFilter,
  setStatusFilter,
}) {
  return (
    <div className="patient-filters">
      <div className="patient-search-box">
        <FaSearch className="patient-search-icon" />
        <input
          type="text"
          placeholder="Search by name, patient ID, mobile..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <select
        value={genderFilter}
        onChange={(e) => setGenderFilter(e.target.value)}
      >
        <option value="All">All Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>

      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
      >
        <option value="All">All Status</option>
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>
    </div>
  );
}

export default PatientFilters;
