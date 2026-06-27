import React from "react";
import {
  FaRunning,
  FaCheckCircle,
  FaDumbbell,
  FaHeartbeat,
} from "react-icons/fa";

import "../../../Styles/AI/HealthSummary/AIExerciseCard.css";

function AIExerciseCard({ summary, prescription }) {
  const rawExercise =
    summary?.exerciseAdvice ||
    summary?.exercisePlan ||
    summary?.exercises ||
    prescription?.exerciseAdvice ||
    "";

  const exerciseList = Array.isArray(rawExercise)
    ? rawExercise
    : typeof rawExercise === "string" && rawExercise.trim()
      ? rawExercise
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean)
      : [];

  return (
    <div className="ai-exercise-card">
      <div className="ai-exercise-header">
        <div className="ai-exercise-icon">
          <FaRunning />
        </div>

        <div>
          <h2>Exercise Plan</h2>
          <p>{exerciseList.length} exercise recommendations</p>
        </div>
      </div>

      {exerciseList.length > 0 ? (
        <div className="ai-exercise-list">
          {exerciseList.map((exercise, index) => (
            <div className="ai-exercise-item" key={index}>
              <div className="exercise-left">
                <div className="exercise-icon-box">
                  <FaDumbbell />
                </div>

                <div>
                  <h3>{exercise}</h3>
                  <p>
                    <FaHeartbeat />
                    Recommended activity
                  </p>
                </div>
              </div>

              <FaCheckCircle className="exercise-check" />
            </div>
          ))}
        </div>
      ) : (
        <div className="ai-no-exercise">
          <FaCheckCircle />
          <span>No exercise recommendation.</span>
        </div>
      )}
    </div>
  );
}

export default AIExerciseCard;
