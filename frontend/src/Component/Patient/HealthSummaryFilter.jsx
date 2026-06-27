import React from "react";
import { FaSearch, FaFilter, FaTimes } from "react-icons/fa";
import "../../Styles/Patient/HealthSummaryFilter.css";
function HealthSummaryFilter({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
}) {
  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("All");
  };

  return (
    <div className="health-summary-filter">
      <div className="health-summary-filter__search">
        <FaSearch className="health-summary-filter__icon" />

        <input
          type="text"
          placeholder="Search by Record ID, Doctor, Diagnosis..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="health-summary-filter__select">
        <FaFilter className="health-summary-filter__icon" />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Status</option>
          <option value="Healthy">Healthy</option>
          <option value="Observation">Observation</option>
          <option value="Critical">Critical</option>
        </select>
      </div>

      <button className="health-summary-filter__clear" onClick={clearFilters}>
        <FaTimes />
        Clear
      </button>
    </div>
  );
}

export default HealthSummaryFilter;
