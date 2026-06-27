import React, { useState } from "react";
import "../Styles/Doctor.css";
const diseaseDepartmentMap = {
  Fever: "General",
  Cancer: "Medical Oncology",
  Diabetes: "Internal Medicine",
  Heart: "Interventional Cardiology",
  Food_Allergies: "Gastroenterology",
  Migraine: "Neurology",
  HIV_AIDS: "Dermatology",
  Influenza: "Pulmonology",
  Tuberculosis: "Pulmonologists",
  Malaria: "Infectious Diseases",
  Measles: "Pediatricians",
};

export default function DoctorRequestForm() {
  const [formData, setFormData] = useState({
    doctorId: "",
    disease: "",
    department: "",
    password: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "disease") {
      setFormData({
        ...formData,
        disease: value,
        department: diseaseDepartmentMap[value] || "",
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.doctorId ||
      !formData.disease ||
      !formData.department ||
      !formData.password
    ) {
      alert("All fields are required!");
      return;
    }

    setSubmitted(true);
    alert("Request Submitted Successfully!");
  };

  if (submitted) {
    return (
      <div className="success-box">
        <h3>Request Already Submitted ✅</h3>
        <p>You can create only one request.</p>
      </div>
    );
  }

  return (
    <div className="request-card">
      <h3>Create One-Time Doctor Request</h3>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="doctorId"
          placeholder="Enter Doctor ID"
          onChange={handleChange}
          required
        />

        <select name="disease" onChange={handleChange} required>
          <option value="">Select Disease</option>
          {Object.keys(diseaseDepartmentMap).map((disease) => (
            <option key={disease} value={disease}>
              {disease}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="department"
          placeholder="Department"
          value={formData.department}
          readOnly
        />

        <input
          type="password"
          name="password"
          placeholder="Confirm Password"
          onChange={handleChange}
          required
        />

        <button type="submit">Submit Request</button>
      </form>
    </div>
  );
}
