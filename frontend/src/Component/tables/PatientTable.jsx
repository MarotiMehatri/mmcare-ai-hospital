import React from "react";
import "../../Styles/Admin/PatientTable.css";
function PatientTable({ patients, loading, onView, onEdit, onDelete }) {
  if (loading) {
    return <div className="patient-table-empty">Loading patients...</div>;
  }

  if (!patients.length) {
    return <div className="patient-table-empty">No patient data found,</div>;
  }
  return (
    <div className="patient-table-wrapper">
      <table className="patient-table">
        <thead>
          <tr>
            <th>Patient ID</th>
            <th>Full Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Mobile</th>
            <th>City</th>
            <th>Status</th>
            <th>Last Visit</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {patients.map((patient) => (
            <tr key={patient.id}>
              <td>{patient.patientID}</td>
              <td>{patient.fullName || patient.name || "N/A"}</td>
              <td>{patient.age}</td>
              <td>{patient.gender || patient.Gender || "N/A"}</td>
              <td>{patient.mobile}</td>
              <td>{patient.city || patient.state || "N/A"}</td>
              <td>
                {" "}
                <span
                  className={`status-badge ${patient.status?.toLowerCase()}`}
                >
                  {patient.status || "N/A"}
                </span>
              </td>
              <td>{patient.lastVisit || "N/A"}</td>
              <td>
                <div className="patient-actions">
                  {" "}
                  <button onClick={() => onView(patient)}>View</button>
                  <button onClick={() => onEdit(patient)}>Edit</button>
                  <button
                    onClick={() => onDelete(patient.id)}
                    className="delete-btn"
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

export default PatientTable;
