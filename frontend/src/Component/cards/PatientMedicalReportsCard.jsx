import React from "react";
import {
  FaFileMedical,
  FaClock,
  FaCheckCircle,
  FaNotesMedical,
} from "react-icons/fa";

function PatientMedicalReportsCard({ reports }) {
  const totalReports = reports.length;
  const uploadedReports = reports.filter(
    (item) => item.status === "Uploaded",
  ).length;
  const pendingReports = reports.filter(
    (item) => item.status === "Pending Review",
  ).length;
  const reviewedReports = reports.filter(
    (item) => item.status === "Reviewed",
  ).length;

  const cards = [
    {
      id: 1,
      title: "Total Reports",
      value: totalReports,
      icon: <FaNotesMedical />,
      className: "patient-report-card-blue",
    },
    {
      id: 2,
      title: "Uploaded",
      value: uploadedReports,
      icon: <FaFileMedical />,
      className: "patient-report-card-sky",
    },
    {
      id: 3,
      title: "Pending Review",
      value: pendingReports,
      icon: <FaClock />,
      className: "patient-report-card-orange",
    },
    {
      id: 4,
      title: "Reviewed",
      value: reviewedReports,
      icon: <FaCheckCircle />,
      className: "patient-report-card-green",
    },
  ];
  return (
    <div className="patient-medical-reports-cards-grid">
      {cards.map((card) => (
        <div
          key={card.id}
          className={`patient-medical-report-summary-card ${card.className}`}
        >
          <div className="patient-medical-report-summary-icon">{card.icon}</div>
          <div className="patient-medical-report-summary-content">
            <h4>{card.title}</h4>
            <span>{card.value}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PatientMedicalReportsCard;
