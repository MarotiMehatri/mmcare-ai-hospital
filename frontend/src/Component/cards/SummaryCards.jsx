import React from "react";
import {
  FaHeartbeat,
  FaChartLine,
  FaShieldAlt,
  FaCalendarCheck,
  FaUser,
  FaTint,
  FaPills,
  FaNotesMedical,
} from "react-icons/fa";
import "../../Styles/AI/SummaryCards.css";

function SummaryCards({ analysis = {}, patient = {}, rawData = {} }) {
  const vitalsHistory = rawData?.vitalsHistory || [];
  const latestVital = vitalsHistory[vitalsHistory.length - 1];

  const medicineCount = patient?.medications?.length || 0;
  const historyCount = patient?.medicalHistory?.length || 0;

  const cards = [
    {
      label: "Patient Name",
      value: patient?.patientName || "Not available",
      icon: <FaUser />,
      className: "patient",
    },
    {
      label: "Blood Group",
      value: patient?.bloodGroup || "Not available",
      icon: <FaTint />,
      className: "blood",
    },
    {
      label: "Health Score",
      value: `${analysis?.healthScore || 0}/100`,
      icon: <FaHeartbeat />,
      className: "score",
    },
    {
      label: "Overall Trend",
      value: analysis?.overallTrend || "Stable",
      icon: <FaChartLine />,
      className: "trend",
    },
    {
      label: "Risk Level",
      value: analysis?.riskLevel || "Low",
      icon: <FaShieldAlt />,
      className: "risk",
    },
    {
      label: "Follow Up",
      value: analysis?.followUp?.needed
        ? analysis?.followUp?.timeline
        : "Not needed",
      icon: <FaCalendarCheck />,
      className: "followup",
    },
    {
      label: "Medicines",
      value: medicineCount
        ? `${medicineCount} Active Medicines`
        : "No medicines",
      tooltip: patient?.medications?.join(", "),
      icon: <FaPills />,
      className: "medicine",
    },
    {
      label: "Medical History",
      value: historyCount ? `${historyCount} Records` : "No history",
      tooltip: patient?.medicalHistory?.join(", "),
      icon: <FaNotesMedical />,
      className: "history",
    },
    {
      label: "Latest BP",
      value: latestVital?.bloodPressure || "Not available",
      icon: <FaHeartbeat />,
      className: "bp",
    },
    {
      label: "Sugar",
      value: latestVital?.sugar
        ? `${latestVital.sugar} mg/dL`
        : "Not available",
      icon: <FaHeartbeat />,
      className: "sugar",
    },
  ];

  return (
    <div className="summary-grid">
      {cards.map((card, index) => (
        <div className={`summary-card ${card.className}`} key={index}>
          <div className="summary-icon">{card.icon}</div>

          <div className="summary-content">
            <h4>{card.label}</h4>
            <p title={card.tooltip || card.value}>{card.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SummaryCards;
