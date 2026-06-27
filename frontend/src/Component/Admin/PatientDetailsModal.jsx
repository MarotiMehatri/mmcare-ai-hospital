import React from "react";
import "../../Styles/Admin/PatientDetailsModal.css";
function PatientDetailsModal({ patient, onClose }) {
  if (!patient) return null;
  return (
    <div className="patient-modal-overlay">
      <div className="patient-details-modal">
        <div className="patient-details-header">
          <h3>Patient Details</h3>
          <button onClick={onClose}>X</button>
        </div>

        <div className="patient-details-grid">
          <p>
            <strong>Patient ID:</strong> {patient.patientID}
          </p>
          <p>
            <strong>Full Name:</strong> {patient.fullName}
          </p>
          <p>
            <strong>Age:</strong> {patient.age}
          </p>
          <p>
            <strong>Gender:</strong> {patient.gender}
          </p>
          <p>
            <strong>DOB:</strong> {patient.dob}
          </p>
          <p>
            <strong>Blood Group:</strong> {patient.bloodGroup}
          </p>
          <p>
            <strong>Email:</strong> {patient.email}
          </p>
          <p>
            <strong>Mobile:</strong> {patient.mobile}
          </p>
          <p>
            <strong>Address:</strong> {patient.address}
          </p>
          <p>
            <strong>City:</strong> {patient.city}
          </p>
          <p>
            <strong>State:</strong> {patient.state}
          </p>
          <p>
            <strong>PIN:</strong> {patient.pin}
          </p>
          <p>
            <strong>Emergency Name:</strong> {patient.emergencyName}
          </p>
          <p>
            <strong>Emergency Contact:</strong> {patient.emergencyContact}
          </p>
          <p>
            <strong>Status:</strong> {patient.status}
          </p>
          <p>
            <strong>Last Visit:</strong> {patient.lastVisit}
          </p>
        </div>
      </div>
    </div>
  );
}

export default PatientDetailsModal;
