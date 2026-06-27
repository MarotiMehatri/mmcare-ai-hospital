import React from "react";

const AIResultPanel = ({ result }) => {
  if (!result) {
    return (
      <div className="ai-card ai-result-card">
        <h2 className="ai-card-title">AI Result</h2>
        <p>No AI result yet.</p>
      </div>
    );
  }

  return (
    <div className="ai-card ai-result-card">
      <h2 className="ai-card-title">AI Result</h2>

      <div className="ai-result-section">
        <h4>Summary</h4>
        <p>{result.summary}</p>
      </div>

      <div className="ai-result-grid">
        <div className="ai-result-box">
          <h4>Urgency</h4>
          <p>{result.urgency}</p>
        </div>

        <div className="ai-result-box">
          <h4>Department</h4>
          <p>{result.recommendedDepartment}</p>
        </div>

        <div className="ai-result-box">
          <h4>Specialist</h4>
          <p>{result.recommendedSpecialist}</p>
        </div>
      </div>

      <div className="ai-result-section">
        <h4>Precautions</h4>
        <ul>
          {result.precautions?.length ? (
            result.precautions.map((item, index) => <li key={index}>{item}</li>)
          ) : (
            <li>No precautions available</li>
          )}
        </ul>
      </div>

      <div className="ai-result-section">
        <h4>Next Steps</h4>
        <ul>
          {result.nextSteps?.length ? (
            result.nextSteps.map((item, index) => <li key={index}>{item}</li>)
          ) : (
            <li>No next steps available</li>
          )}
        </ul>
      </div>

      <div className="ai-result-section">
        <h4>Disclaimer</h4>
        <p>{result.disclaimer}</p>
      </div>
    </div>
  );
};

export default AIResultPanel;
