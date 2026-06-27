import React from "react";
import { FaSearch, FaFilter, FaTimes, FaCalendarAlt } from "react-icons/fa";

import "../../../Styles/Patient/PatientBillingFilters.css";

function PatientBillingFilters({
  searchTerm,
  setSearchTerm,
  doctorName,
  setDoctorName,
  selectedStatus,
  setSelectedStatus,
  selectedMethod,
  setSelectedMethod,
  selectedDepartment,
  setSelectedDepartment,
  selectedDate,
  setSelectedDate,
  clearFilters,
}) {
  const hasActiveFilters =
    searchTerm ||
    doctorName ||
    selectedStatus ||
    selectedMethod ||
    selectedDepartment ||
    selectedDate;

  return (
    <div className="billing-filters">
      <div className="filter-header">
        <div>
          <span className="filter-badge">
            <FaFilter />
            Smart Filters
          </span>

          <h2>Billing Filters</h2>
          <p>
            Search payment history by bill, doctor, department, status, method,
            or date.
          </p>
        </div>

        <button
          type="button"
          className="clear-filter-btn top-clear"
          onClick={clearFilters}
          disabled={!hasActiveFilters}
        >
          <FaTimes />
          Clear
        </button>
      </div>

      <div className="filter-grid">
        <div className="filter-group">
          <label>Search Payment ID</label>
          <div className="input-box">
            <FaSearch className="input-icon" />
            <input
              type="text"
              placeholder="Search PAY1001"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="filter-group">
          <label>Doctor Name</label>
          <div className="input-box">
            <FaSearch className="input-icon" />
            <input
              type="text"
              placeholder="Dr. Raj Sharma"
              value={doctorName}
              onChange={(e) => setDoctorName(e.target.value)}
            />
          </div>
        </div>

        <div className="filter-group">
          <label>Department</label>
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
          >
            <option value="">All Departments</option>
            <option value="Cardiology">Cardiology</option>
            <option value="Neurology">Neurology</option>
            <option value="Orthopedic">Orthopedic</option>
            <option value="Dermatology">Dermatology</option>
            <option value="ENT">ENT</option>
            <option value="Pediatrics">Pediatrics</option>
            <option value="General Medicine">General Medicine</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Payment Status</label>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Payment Method</label>
          <select
            value={selectedMethod}
            onChange={(e) => setSelectedMethod(e.target.value)}
          >
            <option value="">All Methods</option>
            <option value="Cash">Cash</option>
            <option value="Card">Card</option>
            <option value="UPI">UPI</option>
            <option value="Net Banking">Net Banking</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Payment Date</label>
          <div className="input-box">
            <FaCalendarAlt className="input-icon" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>
        </div>
      </div>

      {hasActiveFilters && (
        <div className="active-filter-note">
          Filters are active. Clear filters to view all payment records.
        </div>
      )}
    </div>
  );
}

export default PatientBillingFilters;
