import React from "react";
import "../../Styles/Admin/PatientStatsCards.css";
import { FaClock, FaFemale, FaMale, FaUsers } from "react-icons/fa";
function PatientStatsCards({ patients }) {
  const totalPatients = patients.length;
  const malePatients = patients.filter((p) => p.gender === "Male").length;
  const femalePatients = patients.filter((p) => p.gender === "Female").length;
  const activePatients = patients.filter((p) => p.status === "Active").length;

  const cards = [
    { title: "Total Patients", value: totalPatients, icon: <FaUsers /> },
    { title: "Male Patients", value: malePatients, icon: <FaMale /> },
    { title: "Female Patient", value: femalePatients, icon: <FaFemale /> },
    { title: "Active Patients", value: activePatients, icon: <FaClock /> },
  ];
  return (
    <div className="patient-stats-grid">
      {cards.map((card, index) => (
        <div className="patient-stat-card" key={index}>
          <div className="patient-stat-icon">{card.icon}</div>
          <h4>{card.title}</h4>
          <h2>{card.value}</h2>
        </div>
      ))}
    </div>
  );
}

export default PatientStatsCards;
