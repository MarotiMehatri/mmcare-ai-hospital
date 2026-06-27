import React from "react";
import {
  FaVial,
  FaCheckCircle,
  FaClipboardList,
  FaMicroscope,
} from "react-icons/fa";

import "../../../Styles/AI/HealthSummary/AITestCard.css";

function AITestCard({ summary, tests }) {
  const rawTests =
    tests ||
    summary?.recommendedTests ||
    summary?.testsRecommended ||
    summary?.tests ||
    summary?.labTests ||
    [];

  const testList = Array.isArray(rawTests)
    ? rawTests
    : typeof rawTests === "string" && rawTests.trim()
      ? rawTests
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean)
      : [];

  return (
    <div className="ai-test-card">
      <div className="ai-test-header">
        <div className="ai-test-icon">
          <FaVial />
        </div>

        <div>
          <h2>Recommended Tests</h2>
          <p>{testList.length} tests suggested by AI</p>
        </div>
      </div>

      {testList.length > 0 ? (
        <div className="ai-test-list">
          {testList.map((test, index) => (
            <div className="ai-test-item" key={index}>
              <div className="test-left">
                <div className="test-icon-box">
                  <FaMicroscope />
                </div>

                <div>
                  <h3>
                    {typeof test === "string"
                      ? test
                      : test?.name || "Unknown Test"}
                  </h3>
                  <p>Recommended diagnostic test</p>
                </div>
              </div>

              <FaCheckCircle className="test-check" />
            </div>
          ))}
        </div>
      ) : (
        <div className="ai-no-test">
          <FaClipboardList />
          <span>No tests recommended</span>
        </div>
      )}
    </div>
  );
}

export default AITestCard;
