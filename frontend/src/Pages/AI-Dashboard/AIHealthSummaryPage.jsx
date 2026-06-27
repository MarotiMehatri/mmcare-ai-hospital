import React, { useEffect, useMemo, useState } from "react";
import {
  FaRobot,
  FaSyncAlt,
  FaExclamationTriangle,
  FaFileMedical,
} from "react-icons/fa";

import {
  connectAI,
  disconnectAI,
  listenAISummary,
  removeAISummaryListener,
  requestAISummary,
} from "../../services/AI/AIHealthService";

import AIPatientHeader from "../../Component/cards/AIHealthSummary/AIPatientHeader";
import AIOverallHealthCard from "../../Component/cards/AIHealthSummary/AIOverallHealthCard";
import AIHealthScoreCard from "../../Component/cards/AIHealthSummary/AIHealthScoreCard";
import AIVitalsCard from "../../Component/cards/AIHealthSummary/AIVitalsCard";
import AIDiseaseCard from "../../Component/cards/AIHealthSummary/AIDiseaseCard";
import AIMedicineCard from "../../Component/cards/AIHealthSummary/AIMedicineCard";
import AITestCard from "../../Component/cards/AIHealthSummary/AITestCard";
import AIDietCard from "../../Component/cards/AIHealthSummary/AIDietCard";
import AIExerciseCard from "../../Component/cards/AIHealthSummary/AIExerciseCard";
import AIRecommendationCard from "../../Component/cards/AIRecommendationCard";
import AIWarningCard from "../../Component/cards/AIHealthSummary/AIWarningCard";
import AIHealthTimeline from "../../Component/cards/AIHealthSummary/AIHealthTimeline";
import AIHealthProgressChart from "../../Component/cards/AIHealthSummary/AIHealthProgressChart";
import AIReportDownloadCard from "../../Component/cards/AIHealthSummary/AIReportDownloadCard";

import "../../Styles/AI/HealthSummary/AIHealthSummaryPage.css";

function AIHealthSummaryPage() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  const user = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || {};
    } catch {
      return {};
    }
  }, []);

  const patientId =
    user?.patientId || user?.patientID || user?.id || user?.userId || "";

  const loadSummary = () => {
    if (!patientId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    requestAISummary(patientId);
  };

  useEffect(() => {
    if (!patientId) {
      setLoading(false);
      return;
    }

    connectAI();

    listenAISummary((data) => {
      console.log("AI Summary:", data);
      setSummary(data);
      setLoading(false);
    });

    requestAISummary(patientId);

    return () => {
      removeAISummaryListener();
      disconnectAI();
    };
  }, [patientId]);

  const selectedPrescription =
    summary?.latestPrescription ||
    summary?.prescription ||
    summary?.prescriptions?.[summary.prescriptions.length - 1] ||
    summary;

  if (loading) {
    return (
      <div className="ai-summary-state ai-summary-loading">
        <div className="ai-summary-loader-icon">
          <FaRobot />
        </div>

        <h2>Loading AI Health Summary...</h2>
        <p>
          AI is checking patient health data, vitals, reports and
          recommendations.
        </p>
      </div>
    );
  }

  if (!summary) {
    return (
      <div className="ai-summary-state ai-summary-empty">
        <div className="ai-summary-loader-icon warning">
          <FaExclamationTriangle />
        </div>

        <h2>No AI Health Summary Available</h2>
        <p>Patient data was not found or AI summary is not generated yet.</p>

        <button type="button" onClick={loadSummary}>
          <FaSyncAlt />
          Try Again
        </button>
      </div>
    );
  }

  return (
    <section className="ai-health-summary-page">
      <div className="ai-summary-glow ai-summary-glow-one"></div>
      <div className="ai-summary-glow ai-summary-glow-two"></div>

      <div className="ai-summary-page-header">
        <div>
          <span className="ai-summary-badge">
            <FaRobot />
            AI Health Intelligence
          </span>

          <h2>Smart Health Summary</h2>

          <p>
            Complete AI-generated patient overview with vitals, diseases,
            medicines, diet, exercise, warnings, progress and report download.
          </p>
        </div>

        <button
          type="button"
          className="ai-summary-refresh-btn"
          onClick={loadSummary}
        >
          <FaSyncAlt />
          Refresh Summary
        </button>
      </div>

      <div className="ai-summary-top-grid">
        <div className="ai-summary-card-wrap ai-summary-patient-wrap">
          <AIPatientHeader patient={summary?.patient || selectedPrescription} />
        </div>
        <div className="ai-summary-card-wrap">
          <AIOverallHealthCard
            overallHealth={summary?.overallHealth}
            riskLevel={summary?.riskLevel}
          />
        </div>

        <div className="ai-summary-card-wrap">
          <AIHealthScoreCard
            healthScore={summary?.healthScore}
            scoreRemark={summary?.scoreRemark}
          />
        </div>
      </div>

      <div className="ai-summary-main-grid">
        <div className="ai-summary-card-wrap">
          <AIVitalsCard vitals={summary?.vitals || selectedPrescription} />
        </div>

        <div className="ai-summary-card-wrap">
          <AIDiseaseCard
            currentDiseases={
              summary?.currentDiseases ||
              summary?.diseases ||
              selectedPrescription?.symptoms ||
              []
            }
            summary={summary}
          />
        </div>

        <div className="ai-summary-card-wrap">
          <AIMedicineCard
            medicines={
              summary?.medications ||
              summary?.medicines ||
              selectedPrescription?.medicines ||
              []
            }
            summary={summary}
          />
        </div>

        <div className="ai-summary-card-wrap">
          <AITestCard
            tests={
              summary?.recommendedTests ||
              summary?.testsRecommended ||
              selectedPrescription?.testsRecommended ||
              []
            }
            summary={summary}
          />
        </div>

        <div className="ai-summary-card-wrap">
          <AIDietCard
            dietPlan={
              summary?.dietPlan ||
              summary?.dietAdvice ||
              selectedPrescription?.dietAdvice ||
              ""
            }
            summary={summary}
          />
        </div>

        <div className="ai-summary-card-wrap">
          <AIExerciseCard
            summary={selectedPrescription}
            prescription={selectedPrescription}
          />
        </div>
      </div>

      <div className="ai-summary-wide-grid">
        <div className="ai-summary-card-wrap">
          <AIRecommendationCard
            summary={selectedPrescription}
            recommendations={
              summary?.recommendations ||
              [
                selectedPrescription?.doctorAdvice,
                selectedPrescription?.lifestyleAdvice,
                selectedPrescription?.followUpNotes,
              ].filter(Boolean)
            }
          />
        </div>

        <div className="ai-summary-card-wrap">
          <AIWarningCard
            summary={selectedPrescription}
            emergencyLevel={summary?.emergencyLevel}
            warnings={summary?.warnings}
          />
        </div>
      </div>

      <div className="ai-summary-bottom-grid">
        <div className="ai-summary-card-wrap">
          <AIHealthTimeline
            timeline={summary?.AIHealthTimeline || summary?.timeline}
            summary={summary}
          />
        </div>

        <div className="ai-summary-card-wrap">
          <AIHealthProgressChart progressChart={summary?.progressChart} />
        </div>

        <div className="ai-summary-card-wrap ai-summary-download-wrap">
          <div className="ai-summary-download-heading">
            <FaFileMedical />

            <div>
              <h3>AI Report Export</h3>
              <p>Download or save this complete AI health summary.</p>
            </div>
          </div>

          <AIReportDownloadCard report={summary} />
        </div>
      </div>
    </section>
  );
}

export default AIHealthSummaryPage;
