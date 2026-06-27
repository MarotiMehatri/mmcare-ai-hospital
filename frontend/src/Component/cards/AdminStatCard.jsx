import React from "react";
import "../../Styles/Admin/AdminStatCard.css";

function AdminStatCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  progress,
  variant,
  loading,
}) {
  if (loading) {
    return (
      <div className="admin-stat-card skeleton">
        <div className="skeleton-icon"></div>

        <div className="skeleton-content">
          <div className="skeleton-title"></div>
          <div className="skeleton-value"></div>
          <div className="skeleton-subtitle"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`admin-stat-card ${variant}`}>
      <div className="admin-stat-card-top">
        <div className="admin-stat-icon">{icon}</div>

        <span className="admin-stat-trend">{trend}</span>
      </div>

      <div className="admin-stat-body">
        <h5>{title}</h5>

        <h2>{value}</h2>

        <p>{subtitle}</p>
      </div>

      <div className="admin-progress-bar">
        <div
          className="admin-progress-fill"
          style={{
            width: `${progress}%`,
          }}
        ></div>
      </div>
    </div>
  );
}

export default AdminStatCard;
