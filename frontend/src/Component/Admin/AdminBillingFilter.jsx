import React from "react";
import { FaSearch, FaFilter } from "react-icons/fa";

import "../../Styles/Admin/AdminBillingFilter.css";

function AdminBillingFilter({
  searchTerm,
  setSearchTerm,
  paymentStatusFilter,
  setPaymentStatusFilter,
}) {
  return (
    <div className="admin-billing-filter">
      <div className="admin-billing-search-box">
        <FaSearch className="admin-billing-search-icon" />

        <input
          type="text"
          placeholder="Search by patient, doctor, bill ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="admin-billing-select-box">
        <FaFilter className="admin-billing-filter-icon" />

        <select
          value={paymentStatusFilter}
          onChange={(e) => setPaymentStatusFilter(e.target.value)}
        >
          <option value="All">All Payment Status</option>

          <option value="Paid">Paid</option>

          <option value="Pending">Pending</option>

          <option value="Overdue">Overdue</option>
        </select>
      </div>
    </div>
  );
}

export default AdminBillingFilter;
