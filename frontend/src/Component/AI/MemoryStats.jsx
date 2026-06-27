import React from "react";
import {
  FaNotesMedical,
  FaHeartbeat,
  FaPills,
  FaExclamationTriangle,
} from "react-icons/fa";

function MemoryStats({ summary }) {
  const stats = [
    {
      id: 1,
      icon: <FaNotesMedical />,
      title: "Total Records",
      value: summary?.totalRecords || 0,
    },
    {
      id: 2,
      icon: <FaHeartbeat />,
      title: "Symptoms",
      value: summary?.symptomCount || 0,
    },
    {
      id: 3,
      icon: <FaPills />,
      title: "Medicines",
      value: summary?.medicationCount || 0,
    },
    {
      id: 4,
      icon: <FaExclamationTriangle />,
      title: "Critical",
      value: summary?.criticalCount || 0,
    },
  ];

  return (
    <div className="memory-stats-grid">
      {stats.map((item) => (
        <div className="memory-stat-card" key={item.id}>
          <div className="memory-stat-icon">{item.icon}</div>
          <div>
            <h3 className="memory-stat-value">{item.value}</h3>
            <p className="memory-stat-title">{item.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MemoryStats;