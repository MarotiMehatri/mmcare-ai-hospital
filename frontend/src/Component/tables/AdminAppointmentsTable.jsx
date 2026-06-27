import React from "react";

function AdminAppointmentsTable({ appointments, onStatusChange, onDelete }) {
  return (
    <div className="admin-appointments-table-wrapper">
      <table className="admin-appointments-table">
        {" "}
        <thead>
          {" "}
          <tr>
            <th>Appointment ID</th>
            <th>Patient</th>
            <th>Doctor</th>
            <th>Department</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
            <th>Payment</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {appointments.length > 0 ? (
            appointments.map((item) => (
              <tr key={item.id}>
                <td>{item.appointmentId}</td>
                <td>{item.patientName}</td>
                <td>{item.doctorName}</td>
                <td>{item.department}</td>
                <td>{item.appointmentDate}</td>
                <td>{item.appointmentTime}</td>
                <td>
                  <span
                    className={`admin-table-status ${item.status?.toLowerCase()}`}
                  >
                    {item.status}
                  </span>
                </td>
                <td>{item.paymentStatus}</td>
                <td>
                  <div className="admin-table-actions">
                    <select
                      value={item.status}
                      onChange={(e) => onStatusChange(item.id, e.target.value)}
                    >
                      <option value="Booked">Booked</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>

                    <button onClick={() => onDelete(item.id)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" className="admin-no-appointments">
                No appointments found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AdminAppointmentsTable;
