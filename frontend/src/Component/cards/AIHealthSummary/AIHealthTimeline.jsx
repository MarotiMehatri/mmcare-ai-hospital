import React from "react";
import {
  FaHistory,
  FaCalendarAlt,
  FaHeartbeat,
  FaCheckCircle,
} from "react-icons/fa";

import "../../../Styles/AI/HealthSummary/AIHealthTimeline.css";

function AIHealthTimeline({ timeline, summary }) {
  const rawTimeline =
    timeline ||
    summary?.healthTimeline ||
    summary?.timeline ||
    summary?.AIHealthTimeline ||
    [];

  const timelineList = Array.isArray(rawTimeline)
    ? rawTimeline
    : typeof rawTimeline === "string" && rawTimeline.trim()
      ? rawTimeline.split(",").map((item) => ({
          date: "Recent",
          event: item.trim(),
        }))
      : [];

  return (
    <div className="ai-health-timeline-card">
      <div className="ai-timeline-header">
        <div className="ai-timeline-icon">
          <FaHistory />
        </div>

        <div>
          <h2>Health Timeline</h2>
          <p>{timelineList.length} health history records</p>
        </div>
      </div>

      {timelineList.length > 0 ? (
        <div className="ai-timeline-list">
          {timelineList.map((item, index) => (
            <div key={index} className="ai-timeline-item">
              <div className="ai-timeline-dot">
                <FaHeartbeat />
              </div>

              <div className="ai-timeline-content">
                <span>
                  <FaCalendarAlt />
                  {item?.date || item?.visitDate || item?.createdAt || "Recent"}
                </span>

                <h4>
                  {item?.title ||
                    item?.event ||
                    item?.diagnosis ||
                    "Health Update"}
                </h4>

                <p>
                  {item?.description ||
                    item?.notes ||
                    item?.doctorAdvice ||
                    item?.status ||
                    "No details available"}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="ai-no-timeline">
          <FaCheckCircle />
          <span>No history available</span>
        </div>
      )}
    </div>
  );
}

export default AIHealthTimeline;
