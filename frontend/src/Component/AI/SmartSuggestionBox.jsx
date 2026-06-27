import React from "react";
import {
  FaRobot,
  FaLightbulb,
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationTriangle,
  FaPercent,
} from "react-icons/fa";
import "../../Styles/AI/SmartSuggestionBox.css";

function SmartSuggestionBox({ aiSummary, onGenerate, stats = {} }) {
  const taken = stats.taken || 0;
  const skipped = stats.skipped || 0;
  const missed = stats.missed || 0;
  const adherencePercent = Math.min(stats.adherencePercent || 0, 100);

  return (
    <div className="smart-suggestion-card">
      <div className="smart-header">
        <div>
          <span className="smart-label">
            <FaRobot /> AI Assistant
          </span>
          <h3>AI Smart Suggestions</h3>
        </div>
      </div>

      <div className="smart-box">
        <div className="smart-top">
          <div className="smart-icon">
            <FaRobot />
          </div>

          <div>
            <h4>Medication Adherence Summary</h4>
            <p>
              Generate a simple AI-based summary of how well the patient is
              following the medicine schedule.
            </p>
          </div>
        </div>

        <div className="smart-stats-preview">
          <div className="smart-stat taken">
            <FaCheckCircle />
            <span>Taken</span>
            <strong>{taken}</strong>
          </div>

          <div className="smart-stat skipped">
            <FaTimesCircle />
            <span>Skipped</span>
            <strong>{skipped}</strong>
          </div>

          <div className="smart-stat missed">
            <FaExclamationTriangle />
            <span>Missed</span>
            <strong>{missed}</strong>
          </div>

          <div className="smart-stat rate">
            <FaPercent />
            <span>Rate</span>
            <strong>{adherencePercent}%</strong>
          </div>
        </div>

        <button className="smart-ai-btn" onClick={onGenerate}>
          <FaLightbulb /> Generate AI Summary
        </button>

        <div className={`smart-output ${aiSummary ? "has-summary" : ""}`}>
          {aiSummary ? (
            <p>{aiSummary}</p>
          ) : (
            <p className="empty-ai-text">
              AI summary will appear here after generation.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default SmartSuggestionBox;
