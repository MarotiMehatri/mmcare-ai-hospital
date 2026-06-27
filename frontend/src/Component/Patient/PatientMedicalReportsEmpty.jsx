import React from "react";
import { useNavigate } from "react-router-dom";
import { FaFileMedical, FaUpload } from "react-icons/fa";
import "../../Styles/Patient/PatientMedicalReportsEmpty.css";

function PatientMedicalReportsEmpty() {
  const navigate = useNavigate();

  return (
    <div className="patient-medical-empty">
      <div className="patient-medical-empty-icon">
        <FaFileMedical />
      </div>

      <h3>No Medical Reports Found</h3>

      <p>
        Your lab reports, prescriptions, scan reports, and doctor documents will
        appear here after upload.
      </p>

      <button
        className="patient-medical-empty-btn"
        onClick={() => navigate("/patient/book-appointment")}
      >
        <FaUpload />
        Book Appointment
      </button>
    </div>
  );
}

export default PatientMedicalReportsEmpty;
