import React from "react";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationTriangle,
  FaChartLine,
  FaHeartbeat,
} from "react-icons/fa";
import "../../Styles/AI/AdherenceStats.css";

function AdherenceStats({ stats = {} }) {
  const total = stats.total || 0;
  const taken = stats.taken || 0;
  const skipped = stats.skipped || 0;
  const missed = stats.missed || 0;
  const adherencePercent = Math.min(stats.adherencePercent || 0, 100);

  return (
    <div className="adherence-card">
      <div className="adherence-header">
        <div>
          <span className="adherence-label">
            <FaHeartbeat /> Health Tracking
          </span>
          <h3>Adherence Statistics</h3>
        </div>

        <div className="adherence-score">
          <strong>{adherencePercent}%</strong>
          <span>Rate</span>
        </div>
      </div>

      <div className="adherence-grid">
        <div className="adherence-box total">
          <FaChartLine />
          <h4>Total Logs</h4>
          <p>{total}</p>
        </div>

        <div className="adherence-box taken">
          <FaCheckCircle />
          <h4>Taken</h4>
          <p>{taken}</p>
        </div>

        <div className="adherence-box skipped">
          <FaTimesCircle />
          <h4>Skipped</h4>
          <p>{skipped}</p>
        </div>

        <div className="adherence-box missed">
          <FaExclamationTriangle />
          <h4>Missed</h4>
          <p>{missed}</p>
        </div>
      </div>

      <div className="adherence-progress-wrap">
        <div className="adherence-progress-header">
          <span>Adherence Rate</span>
          <strong>{adherencePercent}%</strong>
        </div>

        <div className="adherence-progress-bar">
          <div
            className="adherence-progress-fill"
            style={{ width: `${adherencePercent}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export default AdherenceStats;
