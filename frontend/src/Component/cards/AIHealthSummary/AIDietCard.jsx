import React from "react";
import { FaAppleAlt, FaCheckCircle } from "react-icons/fa";

import "../../../Styles/AI/HealthSummary/AIDietCard.css";

function AIDietCard({ dietPlan }) {
  const safeDiet = dietPlan || {};

  const meals = Array.isArray(safeDiet)
    ? safeDiet
    : safeDiet.meals ||
      safeDiet.diet ||
      safeDiet.items ||
      safeDiet.recommendations ||
      [];

  return (
    <div className="ai-diet-card">
      <div className="ai-diet-header">
        <div className="ai-diet-icon">
          <FaAppleAlt />
        </div>
        <div>
          <h3>AI Diet Plan</h3>
          <p>Personalized food and nutrition suggestions.</p>
        </div>
      </div>

      {meals.length > 0 ? (
        <div className="ai-diet-list">
          {meals.map((item, index) => (
            <div className="ai-diet-item" key={index}>
              <FaCheckCircle />
              <span>
                {typeof item === "string"
                  ? item
                  : item.title ||
                    item.name ||
                    item.food ||
                    item.description ||
                    "Diet item"}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="ai-diet-empty">No diet plan available.</div>
      )}
    </div>
  );
}

export default AIDietCard;
