import React, { useEffect, useMemo, useState } from "react";
import {
  createHealthSummary,
  getAllPatients,
} from "../../services/Doctor/healthSummaryAPI";
import "../../Styles/Doctor/DoctorHealthSummaryPage.css";

const initialFormState = {
  patientId: "",
  patientCode: "",
  patientName: "",
  bp: "",
  heartRate: "",
  sugar: "",
  temperature: "",
  spo2: "",
  weight: "",
  height: "",
  bmi: "",
  notes: "",
};

function DoctorHealthSummaryPage() {
  const doctor = useMemo(() => {
    return JSON.parse(localStorage.getItem("doctor"));
  }, []);

  const [patients, setPatients] = useState([]);
  const [formData, setFormData] = useState(initialFormState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = async () => {
    try {
      const response = await getAllPatients();
      setPatients(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Failed to load patients:", error);
      setPatients([]);
    }
  };

  const calculateBMI = (weight, height) => {
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);

    if (!weightNum || !heightNum) return "";

    const heightMeter = heightNum / 100;
    return (weightNum / (heightMeter * heightMeter)).toFixed(1);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "patientId") {
      const selectedPatient = patients.find(
        (item) => String(item.id) === String(value),
      );

      setFormData((prev) => ({
        ...prev,
        patientId: value,
        patientCode: selectedPatient?.patientID || "",
        patientName:
          selectedPatient?.fullName || selectedPatient?.FullName || "",
      }));
      return;
    }

    const updatedData = {
      ...formData,
      [name]: value,
    };

    if (name === "weight" || name === "height") {
      updatedData.bmi = calculateBMI(
        name === "weight" ? value : updatedData.weight,
        name === "height" ? value : updatedData.height,
      );
    }

    setFormData(updatedData);
  };

  const handleReset = () => {
    setFormData(initialFormState);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!doctor?.id) {
      alert("Doctor data not found");
      return;
    }

    if (!formData.patientId) {
      alert("Please select patient");
      return;
    }

    const payload = {
      patientId: Number(formData.patientId),
      patientCode: formData.patientCode,
      patientName: formData.patientName,
      doctorId: doctor.id,
      doctorName: doctor.FullName || doctor.name || "Doctor",
      bp: formData.bp,
      heartRate: formData.heartRate,
      sugar: formData.sugar,
      temperature: formData.temperature,
      spo2: formData.spo2,
      weight: formData.weight,
      height: formData.height,
      bmi: formData.bmi,
      notes: formData.notes,
      createdAt: new Date().toISOString(),
    };

    try {
      setLoading(true);
      await createHealthSummary(payload);
      alert("Health summary saved successfully");
      handleReset();
    } catch (error) {
      console.error("Failed to save health summary:", error);
      alert("Failed to save health summary");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="doctor-health-summary-page">
      <div className="doctor-health-summary-header">
        <h2>Doctor Health Summary</h2>
        <p>
          Update patient vitals and health condition. This data will appear on
          the patient dashboard and health summary page.
        </p>
      </div>

      <form className="doctor-health-summary-form" onSubmit={handleSubmit}>
        <div className="doctor-health-summary-grid">
          <div className="doctor-form-group">
            <label>Select Patient</label>
            <select
              name="patientId"
              value={formData.patientId}
              onChange={handleChange}
            >
              <option value="">Choose patient</option>
              {patients.map((patient) => (
                <option key={patient.id} value={patient.id}>
                  {patient.fullName || patient.FullName} (
                  {patient.patientID || `ID-${patient.id}`})
                </option>
              ))}
            </select>
          </div>

          <div className="doctor-form-group">
            <label>Patient Name</label>
            <input type="text" value={formData.patientName} readOnly />
          </div>

          <div className="doctor-form-group">
            <label>Patient Code</label>
            <input type="text" value={formData.patientCode} readOnly />
          </div>

          <div className="doctor-form-group">
            <label>Blood Pressure</label>
            <input
              type="text"
              name="bp"
              value={formData.bp}
              onChange={handleChange}
              placeholder="120/80"
            />
          </div>

          <div className="doctor-form-group">
            <label>Heart Rate</label>
            <input
              type="text"
              name="heartRate"
              value={formData.heartRate}
              onChange={handleChange}
              placeholder="78 bpm"
            />
          </div>

          <div className="doctor-form-group">
            <label>Sugar</label>
            <input
              type="text"
              name="sugar"
              value={formData.sugar}
              onChange={handleChange}
              placeholder="98 mg/dL"
            />
          </div>

          <div className="doctor-form-group">
            <label>Temperature</label>
            <input
              type="text"
              name="temperature"
              value={formData.temperature}
              onChange={handleChange}
              placeholder="98.6 F"
            />
          </div>

          <div className="doctor-form-group">
            <label>SpO2</label>
            <input
              type="text"
              name="spo2"
              value={formData.spo2}
              onChange={handleChange}
              placeholder="99%"
            />
          </div>

          <div className="doctor-form-group">
            <label>Weight (kg)</label>
            <input
              type="text"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              placeholder="68"
            />
          </div>

          <div className="doctor-form-group">
            <label>Height (cm)</label>
            <input
              type="text"
              name="height"
              value={formData.height}
              onChange={handleChange}
              placeholder="170"
            />
          </div>

          <div className="doctor-form-group">
            <label>BMI</label>
            <input type="text" value={formData.bmi} readOnly />
          </div>
        </div>

        <div className="doctor-form-group doctor-form-group-full">
          <label>Doctor Notes</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows="5"
            placeholder="Write patient condition notes"
          />
        </div>

        <button
          type="submit"
          className="doctor-btn doctor-btn-primary"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Health Summary"}
        </button>
      </form>
    </div>
  );
}

export default DoctorHealthSummaryPage;
