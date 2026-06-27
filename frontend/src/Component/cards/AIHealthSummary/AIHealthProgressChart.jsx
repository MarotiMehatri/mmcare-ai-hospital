import React from "react";
import { FaChartLine, FaHeartbeat, FaCheckCircle } from "react-icons/fa";

import "../../../Styles/AI/HealthSummary/AIHealthProgressChart.css";

function AIHealthProgressChart({ progressChart, summary }) {
  const rawProgress =
    progressChart || summary?.progressChart || summary?.healthProgress || [];

  const progressList = Array.isArray(rawProgress)
    ? rawProgress
    : Array.isArray(rawProgress?.progressChart)
      ? rawProgress.progressChart
      : [];

  const maxScore = Math.max(
    ...progressList.map((item) => Number(item.healthScore || item.score || 0)),
    100,
  );

  return (
    <div className="ai-progress-card">
      <div className="ai-progress-header">
        <div className="ai-progress-icon">
          <FaChartLine />
        </div>

        <div>
          <h2>Health Progress</h2>
          <p>{progressList.length} progress records available</p>
        </div>
      </div>

      {progressList.length > 0 ? (
        <div className="ai-progress-list">
          {progressList.map((item, index) => {
            const score = Number(item.healthScore || item.score || 0);
            const percent = Math.min((score / maxScore) * 100, 100);

            return (
              <div className="ai-progress-item" key={index}>
                <div className="progress-top">
                  <div>
                    <h4>{item.month || item.date || `Record ${index + 1}`}</h4>
                    <p>
                      <FaHeartbeat />
                      Health Score
                    </p>
                  </div>

                  <strong>{score}</strong>
                </div>

                <div className="progress-bar-track">
                  <div
                    className="progress-bar-fill"
                    style={{ width: `${percent}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="ai-no-progress">
          <FaCheckCircle />
          <span>No progress data available</span>
        </div>
      )}
    </div>
  );
}

export default AIHealthProgressChart;
