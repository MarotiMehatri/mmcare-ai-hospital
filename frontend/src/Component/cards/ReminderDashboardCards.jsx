import React from "react";
import {
  FaCapsules,
  FaClock,
  FaExclamationTriangle,
  FaPrescriptionBottleAlt,
} from "react-icons/fa";
import "../../Styles/AI/ReminderDashboardCards.css";

function ReminderDashboardCards({ summary = {}, loading = false }) {
  const cards = [
    {
      title: "Today's Medicines",
      value: loading ? "..." : summary?.totalMedicinesToday || 0,
      icon: <FaCapsules />,
      className: "card-blue",
    },
    {
      title: "Next Dose",
      value: loading
        ? "..."
        : summary?.nextDose?.time
          ? `${summary.nextDose.time} - ${summary.nextDose.medicineName}`
          : "No dose pending",
      icon: <FaClock />,
      className: "card-green",
    },
    {
      title: "Missed Doses",
      value: loading ? "..." : summary?.missedDoses || 0,
      icon: <FaExclamationTriangle />,
      className: "card-red",
    },
    {
      title: "Refill Due",
      value: loading ? "..." : summary?.refillDue || 0,
      icon: <FaPrescriptionBottleAlt />,
      className: "card-orange",
    },
  ];

  return (
    <div className="medicine-summary-grid">
      {cards.map((card) => (
        <div
          key={card.title}
          className={`medicine-summary-card ${card.className}`}
        >
          <div className="medicine-summary-icon">{card.icon}</div>

          <div className="medicine-summary-info">
            <span>{card.title}</span>
            <h4>{card.value}</h4>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ReminderDashboardCards;
