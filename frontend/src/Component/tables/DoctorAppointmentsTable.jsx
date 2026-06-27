import React from "react";

function DoctorAppointmentsTable({ appointments, onStatusChange }) {
  return (
    <div className="doctor-appointments-table-wrapper">
      <table className="doctor-appointments-table">
        <thead>
          <tr>
            <th>Appointment ID</th>
            <th>Patient</th>
            <th>Disease</th>
            <th>Date</th>
            <th>Time</th>
            <th>Visit Type</th>
            <th>Status</th>
            <th>Notes</th>
            <th>Update</th>
          </tr>
        </thead>

        <tbody>
          {appointments.length > 0 ? (
            appointments.map((item) => (
              <tr key={item.id}>
                <td>{item.appointmentId}</td>
                <td>{item.patientName}</td>
                <td>{item.disease}</td>
                <td>{item.appointmentDate}</td>
                <td>{item.appointmentTime}</td>
                <td>{item.visitType}</td>
                <td>
                  <span
                    className={`doctor-appointments-table__status ${item.status?.toLowerCase()}`}
                  >
                    {item.status}
                  </span>
                </td>
                <td>{item.notes}</td>
                <td>
                  <select
                    value={item.status}
                    onChange={(e) => onStatusChange(item.id, e.target.value)}
                  >
                    <option value="Booked">Booked</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                  </select>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" className="doctor-appointments-table__empty">
                No appointments found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DoctorAppointmentsTable;
