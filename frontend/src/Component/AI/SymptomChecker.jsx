import React, { useMemo, useState } from "react";
import {
  FaArrowRight,
  FaCheckCircle,
  FaExclamationTriangle,
  FaHeartbeat,
  FaNotesMedical,
  FaRedo,
  FaShieldAlt,
  FaStethoscope,
  FaUserMd,
} from "react-icons/fa";

import BodyPartSelector from "./BodyPartSelector";
import SymptomQuestionFlow from "./SymptomQuestionFlow";
import SeverityBadge from "./SeverityBadge";
import "../../Styles/AI/SymptomChecker.css";

function SymptomChecker() {
  const [formData, setFormData] = useState({
    symptom: "",
    duration: "",
    severity: "Moderate",
    bodyPart: "",
    notes: "",
    hasFever: false,
    hasBreathingIssue: false,
    hasChestPain: false,
  });

  const [submitted, setSubmitted] = useState(false);

  const quickSymptoms = [
    "Fever and cough",
    "Headache",
    "Chest pain",
    "Stomach pain",
    "Skin rash",
    "Breathing problem",
  ];

  const updateField = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (submitted) setSubmitted(false);
  };

  const result = useMemo(() => {
    const lowerSymptom = formData.symptom.toLowerCase();

    let urgency = "Normal";
    let department = "General Physician";
    let advice =
      "Monitor your symptoms, drink enough water, take rest, and consult a doctor if symptoms continue.";
    let alert = "";
    let riskScore = 30;
    let nextSteps = [
      "Track your symptoms for the next 24 hours.",
      "Avoid self-medication without doctor advice.",
      "Book an appointment if symptoms increase.",
    ];

    if (
      formData.hasBreathingIssue ||
      formData.hasChestPain ||
      lowerSymptom.includes("chest pain") ||
      lowerSymptom.includes("breathing")
    ) {
      urgency = "High";
      riskScore = 90;
      department = "Emergency / Cardiology";
      alert = "Emergency warning signs detected.";
      advice =
        "This may require urgent medical attention. Visit the nearest hospital immediately.";
      nextSteps = [
        "Do not delay medical care.",
        "Avoid heavy activity.",
        "Contact emergency services or visit hospital immediately.",
      ];
    } else if (
      lowerSymptom.includes("fever") ||
      lowerSymptom.includes("cold") ||
      lowerSymptom.includes("cough") ||
      formData.hasFever
    ) {
      urgency = formData.severity === "Severe" ? "High" : "Moderate";
      riskScore = formData.severity === "Severe" ? 75 : 55;
      department = "General Physician";
      advice =
        "Rest, hydrate well, monitor temperature, and consult a doctor if fever continues.";
      nextSteps = [
        "Check temperature regularly.",
        "Drink warm fluids.",
        "Consult doctor if fever is high or continues more than 2 days.",
      ];
    } else if (
      lowerSymptom.includes("skin") ||
      lowerSymptom.includes("rash") ||
      lowerSymptom.includes("itching")
    ) {
      urgency = formData.severity === "Severe" ? "High" : "Moderate";
      riskScore = formData.severity === "Severe" ? 70 : 50;
      department = "Dermatology";
      advice =
        "Keep the area clean, avoid scratching, and consult a dermatologist.";
      nextSteps = [
        "Do not apply unknown creams.",
        "Keep the affected area clean.",
        "Visit dermatologist if rash spreads.",
      ];
    } else if (
      lowerSymptom.includes("headache") ||
      lowerSymptom.includes("migraine")
    ) {
      urgency = formData.severity === "Severe" ? "Moderate" : "Normal";
      riskScore = formData.severity === "Severe" ? 60 : 35;
      department = "General Physician / Neurology";
      advice =
        "Rest in a calm place, drink water, and seek medical advice if headaches are frequent.";
      nextSteps = [
        "Rest in a quiet room.",
        "Avoid bright screen light.",
        "Consult doctor if headache is severe or repeated.",
      ];
    } else if (
      lowerSymptom.includes("stomach") ||
      lowerSymptom.includes("abdomen") ||
      lowerSymptom.includes("vomit")
    ) {
      urgency = formData.severity === "Severe" ? "High" : "Moderate";
      riskScore = formData.severity === "Severe" ? 75 : 55;
      department = "Gastroenterology";
      advice =
        "Take light meals, avoid oily food, and consult a specialist if pain or vomiting continues.";
      nextSteps = [
        "Eat light food.",
        "Drink clean water.",
        "Consult doctor if vomiting or pain continues.",
      ];
    }

    return { urgency, department, advice, alert, riskScore, nextSteps };
  }, [formData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setFormData({
      symptom: "",
      duration: "",
      severity: "Moderate",
      bodyPart: "",
      notes: "",
      hasFever: false,
      hasBreathingIssue: false,
      hasChestPain: false,
    });
    setSubmitted(false);
  };

  return (
    <div className="symptom-checker-wrapper">
      <div className="symptom-checker-grid">
        <div className="symptom-form-card">
          <div className="symptom-card-header">
            <div className="symptom-card-icon">
              <FaStethoscope />
            </div>
            <div>
              <span className="symptom-mini-title">Patient Support Tool</span>
              <h2>Check Your Symptoms</h2>
              <p>Fill details below and get smart health guidance.</p>
            </div>
          </div>

          <div className="quick-symptom-box">
            <p>Quick select</p>
            <div className="quick-symptom-list">
              {quickSymptoms.map((item) => (
                <button
                  type="button"
                  key={item}
                  onClick={() => updateField("symptom", item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <form className="symptom-form" onSubmit={handleSubmit}>
            <div className="symptom-form-group">
              <label>Main Symptom</label>
              <input
                type="text"
                placeholder="Example: Fever, headache, skin rash"
                value={formData.symptom}
                onChange={(e) => updateField("symptom", e.target.value)}
                required
              />
            </div>

            <div className="symptom-form-row">
              <div className="symptom-form-group">
                <label>Duration</label>
                <select
                  value={formData.duration}
                  onChange={(e) => updateField("duration", e.target.value)}
                  required
                >
                  <option value="">Select duration</option>
                  <option value="Few hours">Few hours</option>
                  <option value="1 day">1 day</option>
                  <option value="2-3 days">2-3 days</option>
                  <option value="More than a week">More than a week</option>
                </select>
              </div>

              <div className="symptom-form-group">
                <label>Severity</label>
                <select
                  value={formData.severity}
                  onChange={(e) => updateField("severity", e.target.value)}
                >
                  <option value="Mild">Mild</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Severe">Severe</option>
                </select>
              </div>
            </div>

            <BodyPartSelector
              value={formData.bodyPart}
              onChange={(value) => updateField("bodyPart", value)}
            />

            <SymptomQuestionFlow
              formData={formData}
              updateField={updateField}
            />

            <div className="symptom-form-group">
              <label>Extra Notes</label>
              <textarea
                rows={4}
                placeholder="Add more details about the symptom..."
                value={formData.notes}
                onChange={(e) => updateField("notes", e.target.value)}
              />
            </div>

            <div className="symptom-form-actions">
              <button type="submit" className="symptom-primary-btn">
                Analyze Symptoms <FaArrowRight />
              </button>

              <button
                type="button"
                className="symptom-secondary-btn"
                onClick={handleReset}
              >
                Reset <FaRedo />
              </button>
            </div>
          </form>
        </div>

        <div className="symptom-result-column">
          <div className="symptom-info-card">
            <div className="info-item">
              <FaShieldAlt />
              <div>
                <h4>Safe Guidance</h4>
                <p>General support only, not final diagnosis.</p>
              </div>
            </div>

            <div className="info-item">
              <FaUserMd />
              <div>
                <h4>Department Suggestion</h4>
                <p>Helps patient choose suitable specialist.</p>
              </div>
            </div>
          </div>

          {!submitted && (
            <div className="symptom-empty-card">
              <FaHeartbeat />
              <h3>Your analysis will appear here</h3>
              <p>
                Enter symptoms and click Analyze Symptoms to get urgency,
                department, guidance, and next steps.
              </p>
            </div>
          )}

          {submitted && (
            <div className="symptom-result-card">
              <div className="symptom-result-header">
                <div>
                  <span>AI Analysis Result</span>
                  <h3>Health Guidance Summary</h3>
                </div>
                <SeverityBadge severity={result.urgency} />
              </div>

              {result.alert && (
                <div className="symptom-alert-box">
                  <FaExclamationTriangle />
                  <span>{result.alert}</span>
                </div>
              )}

              <div className="risk-score-card">
                <div>
                  <span>Risk Score</span>
                  <strong>{result.riskScore}%</strong>
                </div>
                <div className="risk-track">
                  <div
                    className={`risk-fill ${result.urgency.toLowerCase()}`}
                    style={{ width: `${result.riskScore}%` }}
                  />
                </div>
              </div>

              <div className="result-block highlight">
                <span className="result-label">Recommended Department</span>
                <strong>{result.department}</strong>
              </div>

              <div className="result-block">
                <span className="result-label">Guidance</span>
                <p>{result.advice}</p>
              </div>

              <div className="result-block">
                <span className="result-label">Next Steps</span>
                <ul className="next-step-list">
                  {result.nextSteps.map((step, index) => (
                    <li key={index}>
                      <FaCheckCircle /> {step}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="result-block">
                <span className="result-label">Submitted Summary</span>
                <ul className="symptom-summary-list">
                  <li>
                    <strong>Symptom:</strong> {formData.symptom}
                  </li>
                  <li>
                    <strong>Duration:</strong> {formData.duration}
                  </li>
                  <li>
                    <strong>Severity:</strong> {formData.severity}
                  </li>
                  <li>
                    <strong>Body Part:</strong>{" "}
                    {formData.bodyPart || "Not selected"}
                  </li>
                  <li>
                    <strong>Notes:</strong> {formData.notes || "No notes added"}
                  </li>
                </ul>
              </div>

              <div className="symptom-disclaimer">
                This result is for initial guidance only. Please consult a
                qualified doctor for accurate diagnosis and treatment.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SymptomChecker;
