// frontend/src/Component/Admin/AdminReportsFilter.jsx

import React from "react";

function AdminReportsFilter({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
}) {
  const hasFilters =
    searchTerm.trim() ||
    statusFilter !== "All";

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("All");
  };

  return (
    <div className="admin-reports-filter">
      {/* ====================================================== */}
      {/* SEARCH */}
      {/* ====================================================== */}

      <div className="admin-reports-search">
        <span
          className="admin-reports-search-icon"
          aria-hidden="true"
        >
          🔍
        </span>

        <input
          type="text"
          placeholder="Search patient, doctor, report ID, report type..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(
              e.target.value
            )
          }
          aria-label="Search medical reports"
        />

        {searchTerm && (
          <button
            type="button"
            className="admin-reports-search-clear"
            onClick={() =>
              setSearchTerm("")
            }
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>

      {/* ====================================================== */}
      {/* STATUS */}
      {/* ====================================================== */}

      <div className="admin-reports-status-filter">
        <label htmlFor="report-status-filter">
          Status
        </label>

        <select
          id="report-status-filter"
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(
              e.target.value
            )
          }
        >
          <option value="All">
            All Status
          </option>

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
      </div>

      {/* ====================================================== */}
      {/* CLEAR */}
      {/* ====================================================== */}

      {hasFilters && (
        <button
          type="button"
          className="admin-reports-clear-filter"
          onClick={clearFilters}
        >
          Clear Filters
        </button>
      )}
    </div>
  );
}

export default AdminReportsFilter;