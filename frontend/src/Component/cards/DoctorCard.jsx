import React from "react";

function DoctorList({ doctor }) {
  return (
    <div className="doctor-card">
      <h3>{doctor.name}</h3>
      <p>
        <strong>Doctor ID:</strong>
        {doctor.id}
      </p>
      <p>
        <strong>Disease:</strong> {doctor.disease}
      </p>
      <p>
        <strong>Department:</strong>
        {doctor.department}
      </p>
    </div>
  );
}

export default DoctorList;
