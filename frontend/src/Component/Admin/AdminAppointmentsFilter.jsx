import React from "react";

function AdminAppointmentsFilter({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
}) {
  return (
    <div className="admin-appointments-filter">
      <input
        type="text"
        placeholder="Search by patient, doctor, appointment ID"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
      >
        <option value="All"> All Status</option>
        <option value="Booked">Booked</option>
        <option value="Completed">Completed</option>
        <option value="Cancelled">Cancelled</option>
      </select>
    </div>
  );
}

export default AdminAppointmentsFilter;
