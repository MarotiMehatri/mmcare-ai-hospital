import React from "react";

function PatientAppointmentsTable({ appointments = [] }) {
  const formatStatusClass = (status) => {
    return String(status || "scheduled")
      .toLowerCase()
      .replace(/\s+/g, "-");
  };

  return (
    <div className="patient-appointments-table-wrapper">
      <table className="patient-appointments-table">
        <thead>
          <tr>
            <th>Appointment ID</th>
            <th>Doctor</th>
            <th>Department</th>
            <th>Specialization</th>
            <th>Disease</th>
            <th>Date</th>
            <th>Time</th>
            <th>Visit Type</th>
            <th>Status</th>
            <th>Notes</th>
          </tr>
        </thead>

        <tbody>
          {appointments.length > 0 ? (
            appointments.map((item) => (
              <tr key={item.id || item.appointmentId}>
                <td>{item.appointmentId || "-"}</td>
                <td>{item.doctorName || item.fullName || "Doctor"}</td>
                <td>{item.department || "-"}</td>
                <td>{item.specialization || "-"}</td>
                <td>{item.disease || "-"}</td>
                <td>{item.appointmentDate || item.date || "-"}</td>
                <td>{item.appointmentTime || item.time || "-"}</td>
                <td>{item.visitType || item.appointmentType || "-"}</td>
                <td>
                  <span
                    className={`patient-appointments-table__status ${formatStatusClass(
                      item.status,
                    )}`}
                  >
                    {item.status || "Scheduled"}
                  </span>
                </td>
                <td>{item.notes || item.reason || "-"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10" className="patient-appointments-table__empty">
                No appointments found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default PatientAppointmentsTable;
