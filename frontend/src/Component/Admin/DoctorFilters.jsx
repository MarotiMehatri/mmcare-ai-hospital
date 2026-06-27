import React from "react";
import "../../Styles/Admin/DoctorFilters.css";
import { FaSearch } from "react-icons/fa";
function DoctorFilters({
  searchTerm,
  setSearchTerm,
  departmentFilter,
  setDepartmentFilter,
  statusFilter,
  setStatusFilter,
  departments,
}) {
  return (
    <div className="doctor-filters">
      <div className="doctor-search-box">
        <FaSearch className="doctor-search-icon" />

        <input
          type="text"
          placeholder="Search by doctor name, ID, email, Phone.."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <select
        value={departmentFilter}
        onChange={(e) => setDepartmentFilter(e.target.value)}
      >
        {departments.map((department, index) => (
          <option key={index} value={department}>
            {department === "All" ? "All Departments" : department}
          </option>
        ))}
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

export default DoctorFilters;
