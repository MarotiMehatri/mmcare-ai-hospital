import React from "react";
import {
  FaComments,
  FaChartLine,
  FaCalendarCheck,
  FaFileMedical,
  FaArrowUp,
  FaShieldAlt,
} from "react-icons/fa";

import "../../Styles/AI/AIQuickStats.css";

const AIQuickStats = () => {
  const stats = [
    {
      id: 1,
      title: "Chat Support",
      value: "24/7",
      icon: FaComments,
      sub: "Always available",
      badge: "Live",
      trend: "Instant replies",
    },
    {
      id: 2,
      title: "Health Trends",
      value: "Live",
      icon: FaChartLine,
      sub: "Track progress",
      badge: "Smart",
      trend: "AI monitoring",
    },
    {
      id: 3,
      title: "Appointments",
      value: "Fast",
      icon: FaCalendarCheck,
      sub: "Faster booking",
      badge: "Easy",
      trend: "Quick scheduling",
    },
    {
      id: 4,
      title: "Reports",
      value: "AI",
      icon: FaFileMedical,
      sub: "Easy analysis",
      badge: "Secure",
      trend: "Report insights",
    },
  ];

  return (
    <section className="ai-stats-section">
      <div className="ai-stats-header">
        <div>
          <span className="ai-stats-badge">
            <FaShieldAlt />
            Smart Hospital Features
          </span>
          <h2>AI-Powered Healthcare Shortcuts</h2>
          <p>
            Quick access to the most useful AI features for patients, doctors,
            appointments, reports, and hospital support.
          </p>
        </div>
      </div>

      <div className="ai-stats-grid">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div key={item.id} className="ai-stat-card">
              <div className="ai-stat-top">
                <div className="ai-stat-icon-box">
                  <Icon />
                </div>

                <span className="ai-stat-mini-badge">{item.badge}</span>
              </div>

              <div className="ai-stat-content">
                <h3>{item.value}</h3>
                <h4>{item.title}</h4>
                <p>{item.sub}</p>
              </div>

              <div className="ai-stat-footer">
                <span>
                  <FaArrowUp />
                  {item.trend}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default AIQuickStats;
