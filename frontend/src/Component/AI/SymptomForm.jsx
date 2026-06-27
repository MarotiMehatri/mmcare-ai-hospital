import React from "react";
import {
  FaCalendarAlt,
  FaClock,
  FaHeartbeat,
  FaMapMarkedAlt,
  FaNotesMedical,
  FaUser,
  FaVenusMars,
} from "react-icons/fa";

function SymptomForm({ formData, handleChange, handleSubmit, loading }) {
  return (
    <form className="ai-card ai-form-card" onSubmit={handleSubmit}>
      <div className="ai-card-header">
        <FaNotesMedical className="ai-card-header-icon" />
        <div>
          <h3>Describe Your Health Issue</h3>
          <p>AI will suggest department and suitable doctors.</p>
        </div>
      </div>

      <div className="ai-form-group">
        <label>Symptoms / Main Problem</label>
        <textarea
          name="symptoms"
          value={formData.symptoms}
          onChange={handleChange}
          placeholder="Example: fever, cough, weakness, headache since 2 days"
          rows="5"
          required
        />
      </div>

      <div className="ai-form-grid">
        <div className="ai-form-group">
          <label>Duration</label>
          <div className="ai-input-with-icon">
            <FaClock />
            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="Example: 2 days"
            />
          </div>
        </div>

        <div className="ai-form-group">
          <label>Severity</label>
          <div className="ai-input-with-icon">
            <FaHeartbeat />
            <select
              name="severity"
              value={formData.severity}
              onChange={handleChange}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        <div className="ai-form-group">
          <label>Age</label>
          <div className="ai-input-with-icon">
            <FaUser />
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="24"
              required
            />
          </div>
        </div>

        <div className="ai-form-group">
          <label>Gender</label>
          <div className="ai-input-with-icon">
            <FaVenusMars />
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div className="ai-form-group">
          <label>Preferred Date</label>
          <div className="ai-input-with-icon">
            <FaCalendarAlt />
            <input
              type="date"
              name="preferredDate"
              value={formData.preferredDate}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="ai-form-group">
          <label>Preferred Time</label>
          <div className="ai-input-with-icon">
            <FaClock />
            <select
              name="preferredTime"
              value={formData.preferredTime}
              onChange={handleChange}
            >
              <option value="">Any Time</option>
              <option value="morning">Morning</option>
              <option value="afternoon">Afternoon</option>
              <option value="evening">Evening</option>
            </select>
          </div>
        </div>

        <div className="ai-form-group">
          <label>Visit Type</label>
          <select
            name="visitType"
            value={formData.visitType}
            onChange={handleChange}
          >
            <option value="offline">Offline</option>
            <option value="online">Online</option>
          </select>
        </div>

        <div className="ai-form-group">
          <label>City</label>
          <div className="ai-input-with-icon">
            <FaMapMarkedAlt />
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Pune"
            />
          </div>
        </div>
      </div>

      <div className="ai-form-group">
        <label>Medical History</label>
        <input
          type="text"
          name="medicalHistory"
          value={formData.medicalHistory}
          onChange={handleChange}
          placeholder="Example: allergy, asthma, diabetes"
        />
      </div>

      <button type="submit" className="ai-primary-btn" disabled={loading}>
        {loading ? "Getting AI Recommendation..." : "Get AI Recommendation"}
      </button>
    </form>
  );
}

export default SymptomForm;
