import React, { useState } from "react";

function AIInputForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    gender: "",
    symptom: "",
    medicalHistory: "",
    currentMedications: "",
    question: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefult();
    onsubmit(formData);
  };
  return (
    <div className="ai-card ai-form-card">
      <h2 className="ai-card-title">Patient AI Input</h2>

      <form className="ai-form" onSubmit={handleSubmit}>
        <div className="ai-form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter patient full name"
          />
        </div>

        <div className="ai-form-row">
          <div className="ai-form-group">
            <label>Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Enter age"
            />
          </div>

          <div className="ai-form-group">
            <label>Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div className="ai-form-group">
          <label>Symptoms</label>
          <textarea
            name="symptoms"
            value={formData.symptoms}
            onChange={handleChange}
            placeholder="Example: fever, cough, chest pain..."
          />
        </div>

        <div className="ai-form-group">
          <label>Medical History</label>
          <textarea
            name="medicalHistory"
            value={formData.medicalHistory}
            onChange={handleChange}
            placeholder="Example: diabetes, asthma, BP..."
          />
        </div>

        <div className="ai-form-group">
          <label>Current Medications</label>
          <textarea
            name="currentMedications"
            value={formData.currentMedications}
            onChange={handleChange}
            placeholder="Example: paracetamol, insulin..."
          />
        </div>

        <div className="ai-form-group">
          <label>Ask AI</label>
          <textarea
            name="question"
            value={formData.question}
            onChange={handleChange}
            placeholder="Ask something like: Which department should I visit?"
          />
        </div>

        <button type="submit" className="ai-btn">
          Analyze with AI
        </button>
      </form>
    </div>
  );
}

export default AIInputForm;
