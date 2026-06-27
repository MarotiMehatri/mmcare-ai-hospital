import React from "react";
import { FaChartBar, FaArrowUp } from "react-icons/fa";

import "../../Styles/AI/AIGraphCard.css";

const AIGraphCard = ({ title, subtitle, bars = [] }) => {
  const safeBars = Array.isArray(bars) ? bars : [];
  const avg =
    safeBars.length > 0
      ? Math.round(
          safeBars.reduce((sum, item) => sum + Number(item.value || 0), 0) /
            safeBars.length,
        )
      : 0;

  return (
    <article className="ai-graph-card">
      <div className="ai-graph-card-glow"></div>

      <div className="ai-graph-header">
        <div>
          <span className="ai-graph-badge">
            <FaChartBar />
            Analytics
          </span>
          <h3>{title}</h3>
          <p>{subtitle}</p>
        </div>

        <div className="ai-graph-score">
          <strong>{avg}%</strong>
          <span>Average</span>
        </div>
      </div>

      <div className="ai-graph-body">
        {safeBars.map((bar, index) => (
          <div key={index} className="ai-graph-row">
            <div className="ai-graph-row-top">
              <div className="ai-graph-label">{bar.label}</div>
              <div className="ai-graph-value">
                <FaArrowUp />
                {bar.value}%
              </div>
            </div>

            <div className="ai-graph-track">
              <div
                className="ai-graph-fill"
                style={{
                  width: `${Math.min(Number(bar.value || 0), 100)}%`,
                  animationDelay: `${index * 0.08}s`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </article>
  );
};

export default AIGraphCard;
