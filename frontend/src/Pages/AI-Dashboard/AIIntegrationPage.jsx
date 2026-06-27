import React from "react";
import useAIIntegration from "../../hooks/useAIIntegration";
import AIResultPanel from "../../Component/AI/AIResultPanel";
import AIInputForm from "../../Component/AI/AIInputForm";
import AIQuickActions from "../../Component/AI/AIQuickActions";
import AIErrorState from "../../Component/AI/AIErrorState";

import "../../Styles/AI/aiIntegration.css";

function AIIntegrationPage() {
  const { loading, result, error, analyzeData } = useAIIntegration();

  const handleQuickAction = (action) => {
    analyzeData({
      fullName: "Demo Patient",
      age: "30",
      gender: "Male",
      symptoms: "Fever and cough",
      medicalHistory: "No major history",
      currectMedications: "Paracetamol",
      question: action,
    });
  };
  return (
    <div className="ai-page">
      <div className="ai-page-header">
        <h1>AI Integration</h1>
        <p>
          Smart AI-based symptom guidance, department suggestion, urgency check,
          and next-step recommendations.
        </p>
      </div>

      <div className="ai-top-grid">
        <AIInputForm onSubmit={analyzeData} />
        <AIQuickActions onQuickAction={handleQuickAction} />
      </div>

      <div className="ai-bottom-grid">
        {loading && <AILoadingState />}
        {error && <AIErrorState message={error} />}
        {!loading && !error && <AIResultPanel result={result} />}
      </div>
    </div>
  );
}

export default AIIntegrationPage;
