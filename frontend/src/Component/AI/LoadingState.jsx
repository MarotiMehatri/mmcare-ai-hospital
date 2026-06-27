import React from "react";
import { FaBrain, FaHeartbeat, FaRobot, FaStethoscope } from "react-icons/fa";
import "../../Styles/AI/LoadingState.css";

function LoadingState({
  text = "Analyzing symptoms and finding the best recommendation...",
}) {
  return (
    <div className="ai-loading-card">
      <div className="ai-loading-animation">
        <div className="ai-loading-ring"></div>

        <div className="ai-loading-center">
          <FaRobot />
        </div>
      </div>

      <h3>AI Processing</h3>

      <p>{text}</p>

      <div className="ai-loading-steps">
        <div className="loading-step active">
          <FaBrain />
          <span>Analyzing Symptoms</span>
        </div>

        <div className="loading-step active">
          <FaStethoscope />
          <span>Finding Department</span>
        </div>

        <div className="loading-step active">
          <FaHeartbeat />
          <span>Matching Doctors</span>
        </div>
      </div>
    </div>
  );
}

export default LoadingState;
