import React from "react";
import { FaBrain, FaChartLine, FaHeartbeat, FaRobot } from "react-icons/fa";

import AIGraphCard from "../cards/AIGraphCard";
import "../../Styles/AI/AIInsightsPanel.css";

const AIInsightsPanel = () => {
  return (
    <section className="ai-insights-section">
      <div className="ai-insights-glow"></div>

      <div className="ai-insights-header">
        <span className="ai-insights-badge">
          <FaBrain />
          AI Analytics
        </span>

        <div className="ai-insights-title-row">
          <div>
            <h2>AI Insights</h2>
            <p>
              Dashboard style overview for patient activity, AI tool usage,
              health trends, and hospital support performance.
            </p>
          </div>

          <div className="ai-insights-status-card">
            <FaRobot />
            <strong>Live</strong>
            <span>Monitoring</span>
          </div>
        </div>
      </div>

      <div className="ai-insights-summary-row">
        <div className="ai-insights-mini-stat">
          <FaHeartbeat />
          <div>
            <strong>88%</strong>
            <span>Follow-up Guidance</span>
          </div>
        </div>

        <div className="ai-insights-mini-stat">
          <FaChartLine />
          <div>
            <strong>91%</strong>
            <span>Chat Assistant Usage</span>
          </div>
        </div>

        <div className="ai-insights-mini-stat">
          <FaBrain />
          <div>
            <strong>84%</strong>
            <span>Suggestions Engine</span>
          </div>
        </div>
      </div>

      <div className="ai-insights-grid">
        <AIGraphCard
          title="Patient Health Trends"
          subtitle="Recent AI-monitored health activity"
          bars={[
            { label: "Vitals Tracking", value: 82 },
            { label: "Symptom Analysis", value: 74 },
            { label: "Report Review", value: 65 },
            { label: "Follow-up Guidance", value: 88 },
          ]}
        />

        <AIGraphCard
          title="AI Tool Usage"
          subtitle="Hospital support modules activity"
          bars={[
            { label: "Chat Assistant", value: 91 },
            { label: "Appointment AI", value: 76 },
            { label: "Reminder System", value: 68 },
            { label: "Suggestions Engine", value: 84 },
          ]}
        />
      </div>
    </section>
  );
};

export default AIInsightsPanel;
