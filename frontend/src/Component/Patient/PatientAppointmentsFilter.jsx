import React from "react";

function PatientAppointmentsFilter({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
}) {
  return (
    <div className="patient-appointments-filter">
      <input
        type="text"
        placeholder="Search by doctor, department, disease, appointment ID"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
      >
        <option value="All">All Status</option>
        <option value="Booked">Booked</option>
        <option value="Confirmed">Confirmed</option>
        <option value="Pending">Pending</option>
        <option value="Cancelled">Cancelled</option>
      </select>
    </div>
  );
}

export default PatientAppointmentsFilter;
