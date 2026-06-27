import React from "react";

function SuggestionLoader() {
  return (
    <div className="ai-loader-wrapper">
      <div className="ai-loader"></div>
      <h3>Generating AI suggestions...</h3>
      <p>Please wait while we analyze patient data.</p>
    </div>
  );
}

export default SuggestionLoader;
