import React from "react";

const AIErrorState = ({ message }) => {
  return (
    <div className="ai-card ai-error-card">
      <h3>Error</h3>
      <p>{message}</p>
    </div>
  );
};

export default AIErrorState;