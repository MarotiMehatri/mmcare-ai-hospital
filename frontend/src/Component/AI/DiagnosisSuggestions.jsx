import React, { useMemo, useState } from "react";
import {
  FaArrowRight,
  FaHeartbeat,
  FaLightbulb,
  FaNotesMedical,
  FaRedo,
  FaSearch,
  FaUserMd,
} from "react-icons/fa";

import PossibleConditionCard from "../cards/PossibleConditionCard";
import RiskLevelIndicator from "./RiskLevelndicator";
import DepartmentRecommendation from "./DepartmentRecommendation";
import "../../Styles/AI/DiagnosisSuggestions.css";

function DiagnosisSuggestions() {
  const [symptomInput, setSymptomInput] = useState("");
  const [duration, setDuration] = useState("");
  const [severity, setSeverity] = useState("Moderate");
  const [showResult, setShowResult] = useState(false);

  const quickSymptoms = [
    "Fever and cough",
    "Chest pain",
    "Skin rash",
    "Headache",
    "Stomach pain",
    "Breathing problem",
  ];

  const diagnosisData = useMemo(() => {
    const text = symptomInput.toLowerCase();

    let conditions = [
      {
        name: "General Health Review",
        probability: "Low",
        description: "Please provide more symptom details for better guidance.",
      },
    ];

    let risk = "Normal";
    let department = "General Physician";
    let action =
      "Monitor your symptoms and consult a doctor if the issue persists.";
    let tips = [
      "Drink enough water",
      "Take proper rest",
      "Track symptom duration",
    ];

    if (
      text.includes("fever") ||
      text.includes("cold") ||
      text.includes("cough")
    ) {
      conditions = [
        {
          name: "Viral Fever",
          probability: "High",
          description:
            "Common signs include fever, tiredness, headache, body pain, and weakness.",
        },
        {
          name: "Seasonal Flu",
          probability: "Moderate",
          description:
            "Often includes fever, cold, throat irritation, and fatigue.",
        },
      ];
      risk = severity === "Severe" ? "Moderate" : "Normal";
      department = "General Physician";
      action =
        "Hydrate well, rest, and consult a doctor if fever remains high or symptoms worsen.";
      tips = [
        "Check temperature regularly",
        "Take light meals",
        "Visit doctor if fever lasts more than 2-3 days",
      ];
    } else if (
      text.includes("chest pain") ||
      text.includes("breathing") ||
      text.includes("shortness of breath")
    ) {
      conditions = [
        {
          name: "Cardiac Concern",
          probability: "High",
          description:
            "Chest pain or breathing difficulty may require urgent medical attention.",
        },
        {
          name: "Respiratory Distress",
          probability: "Moderate",
          description:
            "Breathing discomfort can be associated with respiratory or cardiac causes.",
        },
      ];
      risk = "High";
      department = "Emergency / Cardiology";
      action =
        "Seek immediate medical attention. Visit the nearest hospital or call emergency services.";
      tips = [
        "Do not ignore chest pain",
        "Avoid physical strain",
        "Get emergency medical help immediately",
      ];
    } else if (
      text.includes("skin") ||
      text.includes("rash") ||
      text.includes("itching") ||
      text.includes("allergy")
    ) {
      conditions = [
        {
          name: "Skin Allergy",
          probability: "High",
          description:
            "Often presents with itching, rash, irritation, or redness.",
        },
        {
          name: "Dermatitis",
          probability: "Moderate",
          description:
            "Inflammation of skin that may need specialist review if persistent.",
        },
      ];
      risk = severity === "Severe" ? "Moderate" : "Normal";
      department = "Dermatology";
      action =
        "Avoid triggers, do not scratch the area, and consult a dermatologist if symptoms continue.";
      tips = [
        "Keep skin clean and dry",
        "Avoid unknown creams or self-medication",
        "Consult dermatologist if rash spreads",
      ];
    } else if (
      text.includes("headache") ||
      text.includes("migraine") ||
      text.includes("dizzy")
    ) {
      conditions = [
        {
          name: "Tension Headache",
          probability: "Moderate",
          description:
            "Can happen due to stress, dehydration, lack of sleep, or strain.",
        },
        {
          name: "Migraine",
          probability: "Moderate",
          description:
            "May include severe headache, light sensitivity, or nausea.",
        },
      ];
      risk = severity === "Severe" ? "Moderate" : "Normal";
      department = "General Physician / Neurology";
      action =
        "Rest in a calm place, hydrate, and consult a doctor if headaches are frequent or severe.";
      tips = [
        "Avoid bright screens",
        "Rest properly",
        "Track pain frequency and triggers",
      ];
    } else if (
      text.includes("stomach") ||
      text.includes("vomit") ||
      text.includes("abdomen") ||
      text.includes("acidity")
    ) {
      conditions = [
        {
          name: "Gastric Irritation",
          probability: "Moderate",
          description:
            "Can be related to food, acidity, indigestion, or infection.",
        },
        {
          name: "Digestive Issue",
          probability: "Moderate",
          description:
            "Persistent stomach pain may require specialist evaluation.",
        },
      ];
      risk = severity === "Severe" ? "Moderate" : "Normal";
      department = "Gastroenterology";
      action =
        "Avoid spicy foods, take rest, and consult a doctor if pain or vomiting continues.";
      tips = [
        "Eat light meals",
        "Avoid oily food",
        "See a doctor if symptoms get worse",
      ];
    }

    return { conditions, risk, department, action, tips };
  }, [symptomInput, severity]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!symptomInput.trim()) return;
    setShowResult(true);
  };

  const handleReset = () => {
    setSymptomInput("");
    setDuration("");
    setSeverity("Moderate");
    setShowResult(false);
  };

  return (
    <div className="diagnosis-wrapper">
      <div className="diagnosis-grid">
        <div className="diagnosis-form-card">
          <div className="diagnosis-card-header">
            <div className="diagnosis-card-icon">
              <FaNotesMedical />
            </div>
            <div>
              <span>AI Diagnosis Assistant</span>
              <h2>Symptom-Based Diagnosis Support</h2>
              <p>
                Enter symptoms to view possible conditions and department
                guidance.
              </p>
            </div>
          </div>

          <div className="diagnosis-quick-box">
            <p>Quick Symptoms</p>
            <div>
              {quickSymptoms.map((item) => (
                <button
                  type="button"
                  key={item}
                  onClick={() => {
                    setSymptomInput(item);
                    setShowResult(false);
                  }}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <form className="diagnosis-form" onSubmit={handleSubmit}>
            <div className="diagnosis-form-group">
              <label>Symptoms</label>
              <textarea
                rows="5"
                placeholder="Example: Fever, cold, headache, chest pain, skin rash..."
                value={symptomInput}
                onChange={(e) => {
                  setSymptomInput(e.target.value);
                  setShowResult(false);
                }}
                required
              />
            </div>

            <div className="diagnosis-form-row">
              <div className="diagnosis-form-group">
                <label>Duration</label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                >
                  <option value="">Select duration</option>
                  <option value="Few hours">Few hours</option>
                  <option value="1 day">1 day</option>
                  <option value="2-3 days">2-3 days</option>
                  <option value="More than a week">More than a week</option>
                </select>
              </div>

              <div className="diagnosis-form-group">
                <label>Severity</label>
                <select
                  value={severity}
                  onChange={(e) => setSeverity(e.target.value)}
                >
                  <option value="Mild">Mild</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Severe">Severe</option>
                </select>
              </div>
            </div>

            <div className="diagnosis-actions">
              <button type="submit" className="diagnosis-primary-btn">
                Analyze Diagnosis <FaArrowRight />
              </button>

              <button
                type="button"
                className="diagnosis-reset-btn"
                onClick={handleReset}
              >
                Reset <FaRedo />
              </button>
            </div>
          </form>
        </div>

        <div className="diagnosis-side-column">
          <div className="diagnosis-info-card">
            <div className="diagnosis-info-item">
              <FaHeartbeat />
              <div>
                <h4>Risk-Level Guidance</h4>
                <p>Estimate urgency based on symptom severity.</p>
              </div>
            </div>

            <div className="diagnosis-info-item">
              <FaUserMd />
              <div>
                <h4>Department Mapping</h4>
                <p>Direct patients toward the correct specialist.</p>
              </div>
            </div>

            <div className="diagnosis-info-item">
              <FaLightbulb />
              <div>
                <h4>Safe Suggestions</h4>
                <p>Basic guidance with doctor consultation reminder.</p>
              </div>
            </div>
          </div>

          {!showResult && (
            <div className="diagnosis-empty-card">
              <FaSearch />
              <h3>Diagnosis result will appear here</h3>
              <p>Enter symptoms and click Analyze Diagnosis.</p>
            </div>
          )}

          {showResult && (
            <div className="diagnosis-result-card">
              <div className="diagnosis-result-header">
                <div>
                  <span>AI Result</span>
                  <h3>Diagnosis Result</h3>
                </div>
                <RiskLevelIndicator risk={diagnosisData.risk} />
              </div>

              <DepartmentRecommendation
                department={diagnosisData.department}
                action={diagnosisData.action}
              />

              <div className="diagnosis-condition-list">
                {diagnosisData.conditions.map((condition, index) => (
                  <PossibleConditionCard key={index} condition={condition} />
                ))}
              </div>

              <div className="diagnosis-tips-card">
                <span className="diagnosis-section-label">
                  Suggested Next Steps
                </span>
                <ul>
                  {diagnosisData.tips.map((tip, index) => (
                    <li key={index}>{tip}</li>
                  ))}
                </ul>
              </div>

              <div className="diagnosis-disclaimer">
                This is AI-assisted preliminary guidance only. It does not
                replace professional medical diagnosis or treatment.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DiagnosisSuggestions;
