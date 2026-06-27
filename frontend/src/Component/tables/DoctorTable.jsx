import React from "react";
import "../../Styles/Admin/DoctorTable.css";

function DoctorTable({ doctors, loading, onView, onEdit, onDelete }) {
  if (loading) {
    return <div className="doctor-table-empty">Loading doctors...</div>;
  }

  if (!doctors.length) {
    return <div className="dictor-table-empty">No doctor data found.</div>;
  }
  return (
    <div className="doctor-table-wrapper">
      <table className="doctor-table">
        <thead>
          <tr>
            <th>Doctor ID</th>
            <th>Name</th>
            <th>Department</th>
            <th>Specialization</th>
            <th>Phone</th>
            <th>Experience</th>
            <th>Fees</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor) => (
            <tr key={doctor.id}>
              <td>{doctor.id}</td>
              <td>{doctor.FullName}</td>
              <td>{doctor.department}</td>
              <td>{doctor.specialization}</td>
              <td>{doctor.phone}</td>
              <td>{doctor.experience} yrs</td>
              <td>₹{doctor.consultationFee}</td>
              <td>
                <span
                  className={`doctor-status-budge ${doctor.status?.toLowerCase()}`}
                >
                  {doctor.status}
                </span>
              </td>
              <td>
                <div className="doctor-actions">
                  <button onClick={() => onView(doctor)}>View</button>
                  <button onClick={() => onEdit(doctor)}>Edit</button>
                  <button
                    className="doctor-delete-btn"
                    onClick={() => onDelete(doctor.id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DoctorTable;
