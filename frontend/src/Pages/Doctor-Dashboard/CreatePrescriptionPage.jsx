import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaCapsules,
  FaHeartbeat,
  FaNotesMedical,
  FaPlus,
  FaSave,
  FaTrash,
  FaUserInjured,
  FaUserMd,
} from "react-icons/fa";

import { createPrescription } from "../../services/Doctor/PresscriptionApi";
import api from "../../api/axios";

import "../../Styles/Doctor/CreatePrescriptionPage.css";

function CreatePrescriptionPage() {
  const navigate = useNavigate();

  const doctor = useMemo(() => {
    try {
      return (
        JSON.parse(localStorage.getItem("doctor")) || {
          id: "DOC-1001",
          fullName: "Dr. Raj Sharma",
          specialization: "Cardiology",
          department: "Cardiology",
        }
      );
    } catch {
      return {
        id: "DOC-1001",
        fullName: "Dr. Raj Sharma",
        specialization: "Cardiology",
        department: "Cardiology",
      };
    }
  }, []);

  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  const [formData, setFormData] = useState({
    visitDate: "",
    visitTime: "",
    consultationType: "OPD",
    bp: "",
    pulseRate: "",
    temperature: "",
    height: "",
    weight: "",
    bmi: "",
    oxygenLevel: "",
    chiefComplaint: "",
    diagnosis: "",
    secondaryDiagnosis: "",
    symptomsText: "",
    testsText: "",
    drugAllergies: "",
    foodAllergies: "",
    dietAdvice: "",
    exerciseAdvice: "",
    lifestyleAdvice: "",
    advice: "",
    followUpDate: "",
    followUpNotes: "",
    status: "completed",
  });

  const [medicines, setMedicines] = useState([
    {
      name: "",
      dosage: "",
      frequency: "",
      duration: "",
      timing: "",
      instructions: "",
    },
  ]);

  const getArrayData = (res, key) => {
    if (Array.isArray(res?.data)) return res.data;
    if (Array.isArray(res?.data?.data)) return res.data.data;
    if (Array.isArray(res?.data?.[key])) return res.data[key];
    return [];
  };

  useEffect(() => {
    loadPatients();
  }, []);

  useEffect(() => {
    const heightInMeter = Number(formData.height) / 100;
    const weight = Number(formData.weight);

    if (heightInMeter > 0 && weight > 0) {
      const bmi = (weight / (heightInMeter * heightInMeter)).toFixed(1);
      setFormData((prev) => ({ ...prev, bmi }));
    } else {
      setFormData((prev) => ({ ...prev, bmi: "" }));
    }
  }, [formData.height, formData.weight]);

  const loadPatients = async () => {
    try {
      setPageLoading(true);

      const [patientsRes, appointmentsRes] = await Promise.all([
        api.get("/patients"),
        api.get("/appointments"),
      ]);

      setPatients(getArrayData(patientsRes, "patients"));
      setAppointments(getArrayData(appointmentsRes, "appointments"));
    } catch (error) {
      console.error("Failed to load patients:", error);
      setPatients([]);
      setAppointments([]);
    } finally {
      setPageLoading(false);
    }
  };

  const handlePatientSelect = (e) => {
    const patient = patients.find(
      (item) => String(item.id) === String(e.target.value),
    );

    setSelectedPatient(patient || null);

    if (!patient) return;

    const patientAppointments = appointments.filter(
      (item) => String(item.patientId) === String(patient.id),
    );

    const latestAppointment =
      patientAppointments.length > 0
        ? [...patientAppointments].sort(
            (a, b) =>
              new Date(b.appointmentDate || b.createdAt || 0) -
              new Date(a.appointmentDate || a.createdAt || 0),
          )[0]
        : null;

    setFormData((prev) => ({
      ...prev,
      doctorName: latestAppointment?.doctorName || doctor?.fullName || "",
      department: latestAppointment?.department || doctor?.department || "",
      diagnosis: latestAppointment?.disease || "",
      chiefComplaint: latestAppointment?.notes || "",
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMedicineChange = (index, field, value) => {
    const updated = [...medicines];
    updated[index][field] = value;
    setMedicines(updated);
  };

  const addMedicine = () => {
    setMedicines((prev) => [
      ...prev,
      {
        name: "",
        dosage: "",
        frequency: "",
        duration: "",
        timing: "",
        instructions: "",
      },
    ]);
  };

  const removeMedicine = (index) => {
    setMedicines((prev) => prev.filter((_, i) => i !== index));
  };

  const splitText = (value) =>
    String(value || "")
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

  const validateForm = () => {
    if (!selectedPatient) {
      alert("Please select patient.");
      return false;
    }

    if (!formData.visitDate) {
      alert("Please select visit date.");
      return false;
    }

    if (!formData.diagnosis.trim()) {
      alert("Please enter diagnosis.");
      return false;
    }

    const validMedicines = medicines.filter(
      (med) =>
        med.name.trim() &&
        med.dosage.trim() &&
        med.frequency.trim() &&
        med.duration.trim(),
    );

    if (validMedicines.length === 0) {
      alert("Please add at least one valid medicine.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const payload = {
      prescriptionId: `RX-${Date.now()}`,

      doctorId: doctor?.id || doctor?.doctorId,
      doctorName: doctor?.fullName || doctor?.FullName || "",
      specialization: doctor?.specialization || "",
      department: doctor?.department || "",
      disease: formData.diagnosis,

      patientId: selectedPatient.id,
      patientCode: selectedPatient.patientID || selectedPatient.patientCode,
      patientName: selectedPatient.fullName || selectedPatient.name,

      age: selectedPatient.age,
      gender: selectedPatient.gender,
      bloodGroup: selectedPatient.bloodGroup,
      mobile: selectedPatient.mobile,
      address: selectedPatient.address,

      visitDate: formData.visitDate,
      visitTime: formData.visitTime,
      consultationType: formData.consultationType,

      bp: formData.bp,
      pulseRate: formData.pulseRate,
      temperature: formData.temperature,
      height: formData.height,
      weight: formData.weight,
      bmi: formData.bmi,
      oxygenLevel: formData.oxygenLevel,

      chiefComplaint: formData.chiefComplaint,
      diagnosis: formData.diagnosis,
      secondaryDiagnosis: formData.secondaryDiagnosis,

      symptoms: splitText(formData.symptomsText),
      medicines,

      testsRecommended: splitText(formData.testsText),

      allergies: {
        drug: formData.drugAllergies,
        food: formData.foodAllergies,
      },

      dietAdvice: formData.dietAdvice,
      exerciseAdvice: formData.exerciseAdvice,
      lifestyleAdvice: formData.lifestyleAdvice,
      doctorAdvice: formData.advice,

      followUpDate: formData.followUpDate,
      followUpNotes: formData.followUpNotes,

      status: formData.status,
      createdAt: new Date().toISOString(),
    };

    try {
      setLoading(true);
      await createPrescription(payload);

      alert("Prescription Created Successfully");
      navigate("/doctor/prescriptions");
    } catch (error) {
      console.error("Failed to create prescription:", error);
      alert("Failed to create prescription.");
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <div className="create-prescription-page">
        <div className="prescription-loader">Loading prescription page...</div>
      </div>
    );
  }

  return (
    <div className="create-prescription-page">
      <div className="create-prescription-hero">
        <button
          className="back-btn"
          type="button"
          onClick={() => navigate("/doctor/prescriptions")}
        >
          <FaArrowLeft /> Back
        </button>

        <div>
          <span className="hero-badge">Doctor Prescription Panel</span>
          <h2>Create Prescription</h2>
          <p>
            Select patient, add diagnosis, medicines, advice and AI memory
            notes.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="create-prescription-form">
        <section className="prescription-card">
          <div className="card-title">
            <FaUserInjured />
            <div>
              <h3>Select Patient</h3>
              <p>Choose patient and auto-fill latest appointment details.</p>
            </div>
          </div>

          <select onChange={handlePatientSelect} required>
            <option value="">Select Patient</option>

            {(Array.isArray(patients) ? patients : []).map((patient) => (
              <option key={patient.id} value={patient.id}>
                {patient.patientID || patient.patientCode || patient.id} -{" "}
                {patient.fullName || patient.name || "Unknown Patient"}
              </option>
            ))}
          </select>

          {selectedPatient && (
            <div className="selected-patient-info">
              <h4>{selectedPatient.fullName || selectedPatient.name}</h4>
              <p>ID: {selectedPatient.patientID || selectedPatient.id}</p>
              <p>Age: {selectedPatient.age || "N/A"}</p>
              <p>Gender: {selectedPatient.gender || "N/A"}</p>
              <p>Blood Group: {selectedPatient.bloodGroup || "N/A"}</p>
            </div>
          )}
        </section>

        <section className="prescription-card">
          <div className="card-title">
            <FaUserMd />
            <div>
              <h3>Doctor Information</h3>
              <p>Doctor details are filled from login data.</p>
            </div>
          </div>

          <div className="form-grid">
            <input value={doctor?.id || ""} placeholder="Doctor ID" readOnly />
            <input
              value={doctor?.fullName || doctor?.FullName || ""}
              placeholder="Doctor Name"
              readOnly
            />
            <input
              value={doctor?.specialization || ""}
              placeholder="Specialization"
              readOnly
            />
            <input
              value={doctor?.department || ""}
              placeholder="Department"
              readOnly
            />
          </div>
        </section>

        <section className="prescription-card">
          <div className="card-title">
            <FaHeartbeat />
            <div>
              <h3>Diagnosis & Vitals</h3>
              <p>Add visit details, diagnosis and patient vitals.</p>
            </div>
          </div>

          <div className="form-grid">
            <input
              type="date"
              name="visitDate"
              value={formData.visitDate}
              onChange={handleChange}
              required
            />

            <input
              type="time"
              name="visitTime"
              value={formData.visitTime}
              onChange={handleChange}
            />

            <select
              name="consultationType"
              value={formData.consultationType}
              onChange={handleChange}
            >
              <option value="OPD">OPD</option>
              <option value="IPD">IPD</option>
              <option value="Emergency">Emergency</option>
              <option value="Telemedicine">Telemedicine</option>
            </select>

            <input
              type="text"
              name="diagnosis"
              placeholder="Diagnosis"
              value={formData.diagnosis}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="secondaryDiagnosis"
              placeholder="Secondary Diagnosis"
              value={formData.secondaryDiagnosis}
              onChange={handleChange}
            />

            <input
              type="text"
              name="bp"
              placeholder="Blood Pressure"
              value={formData.bp}
              onChange={handleChange}
            />

            <input
              type="text"
              name="pulseRate"
              placeholder="Pulse Rate"
              value={formData.pulseRate}
              onChange={handleChange}
            />

            <input
              type="text"
              name="oxygenLevel"
              placeholder="Oxygen Level"
              value={formData.oxygenLevel}
              onChange={handleChange}
            />

            <input
              type="text"
              name="temperature"
              placeholder="Temperature"
              value={formData.temperature}
              onChange={handleChange}
            />

            <input
              type="number"
              name="height"
              placeholder="Height in cm"
              value={formData.height}
              onChange={handleChange}
            />

            <input
              type="number"
              name="weight"
              placeholder="Weight in kg"
              value={formData.weight}
              onChange={handleChange}
            />

            <input
              type="text"
              name="bmi"
              placeholder="BMI"
              value={formData.bmi}
              readOnly
            />
          </div>

          <textarea
            name="chiefComplaint"
            value={formData.chiefComplaint}
            onChange={handleChange}
            placeholder="Chief Complaint"
          />

          <textarea
            name="symptomsText"
            placeholder="Symptoms comma separated: fever, cough, headache"
            value={formData.symptomsText}
            onChange={handleChange}
          />

          <textarea
            name="testsText"
            placeholder="Tests recommended comma separated: CBC, ECG, X-Ray"
            value={formData.testsText}
            onChange={handleChange}
          />
        </section>

        <section className="prescription-card">
          <div className="card-title">
            <FaCapsules />
            <div>
              <h3>Medicines</h3>
              <p>Add medicine dosage, frequency, duration and timing.</p>
            </div>
          </div>

          {medicines.map((med, index) => (
            <div key={index} className="medicine-box">
              <div className="medicine-head">
                <h4>Medicine #{index + 1}</h4>

                {medicines.length > 1 && (
                  <button
                    type="button"
                    className="remove-medicine-btn"
                    onClick={() => removeMedicine(index)}
                  >
                    <FaTrash /> Remove
                  </button>
                )}
              </div>

              <div className="form-grid">
                <input
                  type="text"
                  placeholder="Medicine Name"
                  value={med.name}
                  onChange={(e) =>
                    handleMedicineChange(index, "name", e.target.value)
                  }
                  required
                />

                <input
                  type="text"
                  placeholder="Dosage"
                  value={med.dosage}
                  onChange={(e) =>
                    handleMedicineChange(index, "dosage", e.target.value)
                  }
                  required
                />

                <input
                  type="text"
                  placeholder="Frequency"
                  value={med.frequency}
                  onChange={(e) =>
                    handleMedicineChange(index, "frequency", e.target.value)
                  }
                  required
                />

                <input
                  type="text"
                  placeholder="Duration"
                  value={med.duration}
                  onChange={(e) =>
                    handleMedicineChange(index, "duration", e.target.value)
                  }
                  required
                />

                <input
                  type="text"
                  placeholder="Timing"
                  value={med.timing}
                  onChange={(e) =>
                    handleMedicineChange(index, "timing", e.target.value)
                  }
                />

                <input
                  type="text"
                  placeholder="Instructions"
                  value={med.instructions}
                  onChange={(e) =>
                    handleMedicineChange(index, "instructions", e.target.value)
                  }
                />
              </div>
            </div>
          ))}

          <button
            type="button"
            className="add-medicine-btn"
            onClick={addMedicine}
          >
            <FaPlus /> Add Medicine
          </button>
        </section>

        <section className="prescription-card">
          <div className="card-title">
            <FaNotesMedical />
            <div>
              <h3>Advice & Follow Up</h3>
              <p>Add allergies, lifestyle advice and follow-up notes.</p>
            </div>
          </div>

          <div className="form-grid">
            <input
              type="text"
              name="drugAllergies"
              placeholder="Drug Allergies"
              value={formData.drugAllergies}
              onChange={handleChange}
            />

            <input
              type="text"
              name="foodAllergies"
              placeholder="Food Allergies"
              value={formData.foodAllergies}
              onChange={handleChange}
            />

            <input
              type="date"
              name="followUpDate"
              value={formData.followUpDate}
              onChange={handleChange}
            />

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="sent">Sent</option>
            </select>
          </div>

          <textarea
            name="dietAdvice"
            placeholder="Diet Advice"
            value={formData.dietAdvice}
            onChange={handleChange}
          />

          <textarea
            name="exerciseAdvice"
            placeholder="Exercise Advice"
            value={formData.exerciseAdvice}
            onChange={handleChange}
          />

          <textarea
            name="lifestyleAdvice"
            placeholder="Lifestyle Advice"
            value={formData.lifestyleAdvice}
            onChange={handleChange}
          />

          <textarea
            name="advice"
            placeholder="Doctor Advice"
            value={formData.advice}
            onChange={handleChange}
          />

          <textarea
            name="followUpNotes"
            placeholder="Follow-up Notes"
            value={formData.followUpNotes}
            onChange={handleChange}
          />
        </section>

        <div className="prescription-submit-area">
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? (
              "Saving..."
            ) : (
              <>
                <FaSave /> Save Prescription
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreatePrescriptionPage;
