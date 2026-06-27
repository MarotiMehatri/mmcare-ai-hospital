import React from "react";

function DoctorAppointmentsFilter({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
}) {
  return (
    <div className="doctor-appointments-filter">
      <input
        type="text"
        placeholder="Search by patient, disease, appointment ID"
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
        <option value="Completed">Completed</option>
      </select>
    </div>
  );
}

export default DoctorAppointmentsFilter;
