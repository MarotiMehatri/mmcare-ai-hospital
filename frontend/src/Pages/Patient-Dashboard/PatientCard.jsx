import React from "react";

function PatientCard({ patient, openProfile }) {
  return (
    <div>
      <img
        src={
          patient.photo ||
          "https://cdn-icons-png.flaticon.com/512/149/149071.png"
        }
        alt="patient"
        className="patient-photo"
        onClick={() => openProfile(patient)}
      />
      <h3>{patient.fullName}</h3>
      <p>{patient.PatientID}</p>
    </div>
  );
}

export default PatientCard;
