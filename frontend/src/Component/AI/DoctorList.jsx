import React from "react";
import { FaSearch, FaUserMd } from "react-icons/fa";
import RecommendedDoctorCard from "../cards/RecommendDoctorCard";
import "../../Styles/AI/DoctorList.css";

function DoctorList({ doctors = [], selectedDoctor, onSelectDoctor }) {
  if (!doctors || doctors.length === 0) return null;

  return (
    <div className="doctor-list-card">
      <div className="doctor-list-header">
        <div className="doctor-list-title">
          <div className="doctor-list-icon">
            <FaUserMd />
          </div>

          <div>
            <span>AI Matched Doctors</span>
            <h3>Recommended Doctors</h3>
            <p>{doctors.length} doctor found based on your symptoms</p>
          </div>
        </div>

        <div className="doctor-list-count">
          <FaSearch />
          {doctors.length}
        </div>
      </div>

      <div className="doctor-list-grid">
        {doctors.map((doctor) => (
          <RecommendedDoctorCard
            key={doctor.id}
            doctor={doctor}
            isSelected={selectedDoctor?.id === doctor.id}
            onSelectDoctor={onSelectDoctor}
          />
        ))}
      </div>
    </div>
  );
}

export default DoctorList;
