import React from "react";
import "../../Styles/Admin/DoctorDetailsModal.css";

function DoctorDetailsModal({ doctor, onClose }) {
  if (!doctor) return null;
  return (
    <div className="doctor-modal-overlay">
      <div className="doctor-details-modal">
        <div className="doctor-details-header">
          <h3>Doctor Details</h3>
          <button onClick={onClose}>X</button>
        </div>

        <div className="doctor-details-grid">
          <p>
            <strong>Doctor ID:</strong> {doctor.id}
          </p>
          <p>
            <strong>Full Name:</strong> {doctor.FullName}
          </p>
          <p>
            <strong>Gender:</strong> {doctor.gender}
          </p>
          <p>
            <strong>DOB:</strong> {doctor.dob}
          </p>
          <p>
            <strong>Email:</strong> {doctor.email}
          </p>
          <p>
            <strong>Phone:</strong> {doctor.phone}
          </p>
          <p>
            <strong>Department:</strong> {doctor.department}
          </p>
          <p>
            <strong>Specialization:</strong> {doctor.specialization}
          </p>
          <p>
            <strong>Qualification:</strong> {doctor.qualification}
          </p>
          <p>
            <strong>Experience:</strong> {doctor.experience} years
          </p>
          <p>
            <strong>License Number:</strong> {doctor.licenseNumber}
          </p>
          <p>
            <strong>Hospital Name:</strong> {doctor.hospitalName}
          </p>
          <p>
            <strong>Address:</strong> {doctor.address}
          </p>
          <p>
            <strong>Available Days:</strong>{" "}
            {doctor.availableDays?.join(", ") || "N/A"}
          </p>
          <p>
            <strong>Morning Slot:</strong> {doctor.timeSlots?.morning || "N/A"}
          </p>
          <p>
            <strong>Evening Slot:</strong> {doctor.timeSlots?.evening || "N/A"}
          </p>
          <p>
            <strong>Consultation Fee:</strong> ₹{doctor.consultationFee}
          </p>
          <p>
            <strong>Status:</strong> {doctor.status}
          </p>
        </div>
      </div>
    </div>
  );
}

export default DoctorDetailsModal;
