import React from "react";

function BillingFilters({
  searchText,
  setSearchText,
  statusFilter,
  setStatusFilter,
}) {
  return (
    <div className="billing-filters">
      <input
        type="text"
        placeholder="Search by Bill ID, Service, Doctor..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="billing-search-input"
      />

      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="billing-filter-select"
      >
        <option value="ALL">All Status</option>
        <option value="Paid">Paid</option>
        <option value="Pending">Pending</option>
      </select>
    </div>
  );
}

export default BillingFilters;
