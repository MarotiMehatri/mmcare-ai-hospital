import React from "react";
import {
  FaNotesMedical,
  FaUser,
  FaVenusMars,
  FaThermometerHalf,
  FaBolt,
} from "react-icons/fa";

function TriageForm({
  formData,
  onChange,
  onCheckboxChange,
  onSymptomSelect,
  onSubmit,
  loading,
  symptomsMaster,
}) {
  return (
    <form className="triage-form-card" onSubmit={onSubmit}>
      <div className="section-title">
        <FaNotesMedical />
        <h3>Patient Symptom Assessment</h3>
      </div>

      <div className="triage-form-grid">
        <div className="input-group">
          <label>
            <FaUser /> Full Name
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={onChange}
            placeholder="Enter patient name"
          />
        </div>

        <div className="input-group">
          <label>Patient ID</label>
          <input
            type="text"
            name="patientId"
            value={formData.patientId}
            onChange={onChange}
            placeholder="Patient ID"
          />
        </div>

        <div className="input-group">
          <label>Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={onChange}
            placeholder="Age"
          />
        </div>

        <div className="input-group">
          <label>
            <FaVenusMars /> Gender
          </label>
          <select name="gender" value={formData.gender} onChange={onChange}>
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="input-group full-width">
          <label>Main Symptoms</label>
          <textarea
            name="symptoms"
            value={formData.symptoms}
            onChange={onChange}
            rows="5"
            placeholder="Describe symptoms in detail..."
          />
        </div>

        <div className="input-group">
          <label>Duration</label>
          <input
            type="text"
            name="duration"
            value={formData.duration}
            onChange={onChange}
            placeholder="e.g. 2 days"
          />
        </div>

        <div className="input-group">
          <label>
            <FaBolt /> Pain Level
          </label>
          <input
            type="number"
            name="painLevel"
            min="0"
            max="10"
            value={formData.painLevel}
            onChange={onChange}
            placeholder="0 - 10"
          />
        </div>

        <div className="input-group">
          <label>
            <FaThermometerHalf /> Fever / Temperature
          </label>
          <input
            type="text"
            name="fever"
            value={formData.fever}
            onChange={onChange}
            placeholder="e.g. 101 F"
          />
        </div>

        <div className="input-group">
          <label>Existing Conditions</label>
          <input
            type="text"
            name="existingConditions"
            value={formData.existingConditions}
            onChange={onChange}
            placeholder="Diabetes, asthma, BP..."
          />
        </div>

        <div className="input-group">
          <label>Current Medications</label>
          <input
            type="text"
            name="medications"
            value={formData.medications}
            onChange={onChange}
            placeholder="Current medicines"
          />
        </div>

        <div className="input-group">
          <label>Allergies</label>
          <input
            type="text"
            name="allergies"
            value={formData.allergies}
            onChange={onChange}
            placeholder="Drug / food allergies"
          />
        </div>
      </div>

      <div className="triage-chip-section">
        <h4>Quick Symptoms</h4>
        <div className="triage-chip-wrap">
          {symptomsMaster?.map((item, index) => (
            <button
              type="button"
              key={index}
              className="triage-chip"
              onClick={() => onSymptomSelect(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="triage-checkbox-grid">
        <label className="checkbox-card">
          <input
            type="checkbox"
            name="breathingIssue"
            checked={formData.breathingIssue}
            onChange={onCheckboxChange}
          />
          Breathing difficulty
        </label>

        <label className="checkbox-card">
          <input
            type="checkbox"
            name="dizziness"
            checked={formData.dizziness}
            onChange={onCheckboxChange}
          />
          Dizziness
        </label>

        <label className="checkbox-card">
          <input
            type="checkbox"
            name="chestPain"
            checked={formData.chestPain}
            onChange={onCheckboxChange}
          />
          Chest pain
        </label>

        <label className="checkbox-card">
          <input
            type="checkbox"
            name="vomiting"
            checked={formData.vomiting}
            onChange={onCheckboxChange}
          />
          Vomiting
        </label>
      </div>

      <button type="submit" className="triage-submit-btn" disabled={loading}>
        {loading ? "Analyzing..." : "Start AI Triage"}
      </button>
    </form>
  );
}

export default TriageForm;
