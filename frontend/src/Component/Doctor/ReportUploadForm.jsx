import React, { useMemo, useState } from "react";
import {
  FaUpload,
  FaUserInjured,
  FaFileMedical,
  FaNotesMedical,
  FaCalendarAlt,
} from "react-icons/fa";

import { createMedicalReport } from "../../services/Doctor/MedicalReportAPI";
import "../../Styles/Doctor/ReportUploadForm.css";

function ReportUploadForm({ patients = [], onSuccess }) {
  const safePatients = useMemo(() => {
    if (Array.isArray(patients)) return patients;
    if (Array.isArray(patients?.data)) return patients.data;
    if (Array.isArray(patients?.data?.data)) return patients.data.data;
    return [];
  }, [patients]);

  const doctor = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("doctor")) || {};
    } catch {
      return {};
    }
  }, []);

  const initialForm = {
    patientId: "",
    patientName: "",
    patientCode: "",
    age: "",
    gender: "",
    bloodGroup: "",
    department: "",
    reportTitle: "",
    reportType: "",
    reportDate: new Date().toISOString().split("T")[0],
    status: "Uploaded",
    priority: "Normal",
    symptoms: "",
    diagnosis: "",
    description: "",
    doctorNotes: "",
    fileName: "",
    doctorId: doctor?.id || doctor?.doctorId || "",
    doctorName:
      doctor?.FullName || doctor?.fullName || doctor?.name || "Doctor",
  };

  const [formData, setFormData] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);

  const handlePatientChange = (e) => {
    const patientId = e.target.value;

    const selectedPatient = safePatients.find(
      (p) => String(p.id || p.patientId) === String(patientId),
    );

    setFormData((prev) => ({
      ...prev,
      patientId,
      patientName:
        selectedPatient?.FullName ||
        selectedPatient?.fullName ||
        selectedPatient?.name ||
        selectedPatient?.patientName ||
        "",
      patientCode:
        selectedPatient?.patientCode ||
        selectedPatient?.patientID ||
        selectedPatient?.patientId ||
        "",
      age: selectedPatient?.age || "",
      gender: selectedPatient?.gender || "",
      bloodGroup: selectedPatient?.bloodGroup || "",
      department: selectedPatient?.department || "",
    }));
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "fileName") {
      setFormData((prev) => ({
        ...prev,
        fileName: files?.[0]?.name || "",
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const generateReportNumber = () => {
    return `REP-${Math.floor(100000 + Math.random() * 900000)}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.patientId) {
      alert("Please select patient");
      return;
    }

    if (!formData.reportTitle.trim()) {
      alert("Please enter report title");
      return;
    }

    try {
      setSubmitting(true);

      const payload = {
        ...formData,
        reportNumber: generateReportNumber(),
        createdAt: new Date().toISOString(),
      };

      await createMedicalReport(payload);

      alert("Medical report uploaded successfully");
      setFormData(initialForm);

      if (onSuccess) {
        await onSuccess();
      }
    } catch (error) {
      console.error("Report upload failed:", error);
      alert("Failed to upload medical report");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="report-upload-form-card">
      <div className="report-upload-form-header">
        <div className="report-upload-form-icon">
          <FaUpload />
        </div>
        <div>
          <h3>Upload Medical Report</h3>
          <p>Add patient report details and doctor notes.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="report-upload-form">
        <div className="report-form-section-title">
          <FaUserInjured />
          <span>Patient Information</span>
        </div>

        <div className="report-form-grid">
          <div className="report-form-group">
            <label>Select Patient</label>
            <select
              name="patientId"
              value={formData.patientId}
              onChange={handlePatientChange}
              required
            >
              <option value="">Choose patient</option>

              {safePatients.map((patient) => (
                <option
                  key={patient.id || patient.patientId}
                  value={patient.id || patient.patientId}
                >
                  {patient.FullName ||
                    patient.fullName ||
                    patient.name ||
                    patient.patientName ||
                    "Unnamed Patient"}
                </option>
              ))}
            </select>
          </div>

          <div className="report-form-group">
            <label>Patient Code</label>
            <input value={formData.patientCode} readOnly />
          </div>

          <div className="report-form-group">
            <label>Age</label>
            <input value={formData.age} readOnly />
          </div>

          <div className="report-form-group">
            <label>Gender</label>
            <input value={formData.gender} readOnly />
          </div>

          <div className="report-form-group">
            <label>Blood Group</label>
            <input value={formData.bloodGroup} readOnly />
          </div>

          <div className="report-form-group">
            <label>Department</label>
            <input
              name="department"
              value={formData.department}
              onChange={handleChange}
              placeholder="Cardiology"
            />
          </div>
        </div>

        <div className="report-form-section-title">
          <FaFileMedical />
          <span>Report Details</span>
        </div>

        <div className="report-form-grid">
          <div className="report-form-group">
            <label>Report Title</label>
            <input
              name="reportTitle"
              value={formData.reportTitle}
              onChange={handleChange}
              placeholder="Coronary Artery Disease Evaluation"
              required
            />
          </div>

          <div className="report-form-group">
            <label>Report Type</label>
            <input
              name="reportType"
              value={formData.reportType}
              onChange={handleChange}
              placeholder="Diagnostic Report"
            />
          </div>

          <div className="report-form-group">
            <label>
              <FaCalendarAlt /> Report Date
            </label>
            <input
              type="date"
              name="reportDate"
              value={formData.reportDate}
              onChange={handleChange}
            />
          </div>

          <div className="report-form-group">
            <label>Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Uploaded">Uploaded</option>
              <option value="Pending">Pending</option>
              <option value="Reviewed">Reviewed</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="report-form-group">
            <label>Priority</label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
            >
              <option value="Normal">Normal</option>
              <option value="Low">Low</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>
          </div>

          <div className="report-form-group">
            <label>Upload File</label>
            <input type="file" name="fileName" onChange={handleChange} />
            {formData.fileName && (
              <small className="selected-file-name">{formData.fileName}</small>
            )}
          </div>
        </div>

        <div className="report-form-section-title">
          <FaNotesMedical />
          <span>Clinical Notes</span>
        </div>

        <div className="report-form-group full-width">
          <label>Symptoms</label>
          <textarea
            name="symptoms"
            value={formData.symptoms}
            onChange={handleChange}
            placeholder="Chest pain, shortness of breath, fatigue..."
          />
        </div>

        <div className="report-form-group full-width">
          <label>Diagnosis</label>
          <textarea
            name="diagnosis"
            value={formData.diagnosis}
            onChange={handleChange}
            placeholder="Enter diagnosis details"
          />
        </div>

        <div className="report-form-group full-width">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter report description"
          />
        </div>

        <div className="report-form-group full-width">
          <label>Doctor Notes</label>
          <textarea
            name="doctorNotes"
            value={formData.doctorNotes}
            onChange={handleChange}
            placeholder="Enter doctor advice and follow-up instructions"
          />
        </div>

        <button
          type="submit"
          className="report-submit-btn"
          disabled={submitting}
        >
          {submitting ? "Uploading..." : "Upload Report"}
        </button>
      </form>
    </div>
  );
}

export default ReportUploadForm;
