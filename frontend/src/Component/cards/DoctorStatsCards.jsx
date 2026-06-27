import React from "react";
import {
  FaUserMd,
  FaCheckCircle,
  FaTimesCircle,
  FaHospital,
} from "react-icons/fa";

import "../../Styles/Admin/DoctorStatsCards.css";

function DoctorStatsCards({ doctors }) {
  const totalDoctors = doctors.length;

  const activeDoctors = doctors.filter(
    (doctor) => doctor.status === "Active",
  ).length;

  const inactiveDoctors = doctors.filter(
    (doctor) => doctor.status === "InActive",
  ).length;

  const totalDepartments = new Set(doctors.map((doctor) => doctor.department))
    .size;

  const cards = [
    {
      title: "Total Doctors",
      value: totalDoctors,
      icon: <FaUserMd />,
      className: "total",
    },
    {
      title: "Active Doctors",
      value: activeDoctors,
      icon: <FaCheckCircle />,
      className: "active",
    },
    {
      title: "Inactive Doctors",
      value: inactiveDoctors,
      icon: <FaTimesCircle />,
      className: "inactive",
    },
    {
      title: "Departments",
      value: totalDepartments,
      icon: <FaHospital />,
      className: "department",
    },
  ];

  return (
    <div className="doctor-stats-grid">
      {cards.map((card, index) => (
        <div className={`doctor-stat-card ${card.className}`} key={index}>
          <div className="doctor-stat-top">
            <div className="doctor-stat-icon">{card.icon}</div>
          </div>

          <h4>{card.title}</h4>
          <h2>{card.value}</h2>
        </div>
      ))}
    </div>
  );
}

export default DoctorStatsCards;
