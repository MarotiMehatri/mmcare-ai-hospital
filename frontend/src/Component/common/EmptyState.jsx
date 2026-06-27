import React from "react";
import "./EmptyState.css";
function EmptyState({ icon, title, message, buttonText, onClick }) {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{message}</p>

      {buttonText && (
        <button onClick={onClick} className="empty-state-btn">
          {buttonText}
        </button>
      )}
    </div>
  );
}

export default EmptyState;
