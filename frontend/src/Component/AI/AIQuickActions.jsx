import React from "react";

const AIQuickActions = ({ onQuickAction }) => {
  const actions = [
    "Suggest department",
    "Check urgency",
    "Give precautions",
    "Recommend specialist",
  ];

  return (
    <div className="ai-card ai-quick-card">
      <h3 className="ai-card-title">Quick Actions</h3>

      <div className="ai-quick-actions">
        {actions.map((action, index) => (
          <button
            key={index}
            type="button"
            className="ai-quick-btn"
            onClick={() => onQuickAction(action)}
          >
            {action}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AIQuickActions;
