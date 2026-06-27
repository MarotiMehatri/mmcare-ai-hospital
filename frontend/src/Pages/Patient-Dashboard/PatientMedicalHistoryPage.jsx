import React, { useState, useEffect, useMemo } from "react";
import {
  FaFileMedical,
  FaUserDoctor,
  FaCalendarCheck,
  FaNotesMedical,
} from "react-icons/fa6";

import { getMedicalHistoryByPatientId } from "../../services/Patient/medicalHistoryAPI";
import MedicalHistoryFilter from "../../Component/Patient/MedicalHistoryFilter";
import MedicalHistoryTable from "../../Component/tables/MedicalHistoryTable";
import "../../Styles/Patient/MedicalHistory.css";

function PatientMedicalHistoryPage() {
  const patient = JSON.parse(localStorage.getItem("patient"));

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const patientId = patient?.id;
  useEffect(() => {
    const loadHistory = async () => {
      try {
        setLoading(true);
        setError("");

        if (!patientId) {
          setError("Patient information not found. Please login again.");
          return;
        }

        const data = await getMedicalHistoryByPatientId(patientId);
        setHistory(data);
      } catch (error) {
        console.error("Failed to load medical history:", error);
        setError("Unable to load medical history. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadHistory();
  }, [patientId]);

  const filteredHistory = useMemo(() => {
    const search = searchTerm.toLowerCase();

    return history.filter((item) => {
      const matchesSearch =
        item.visitId?.toString().toLowerCase().includes(search) ||
        item.doctorName?.toLowerCase().includes(search) ||
        item.department?.toLowerCase().includes(search) ||
        item.diagnosis?.toLowerCase().includes(search) ||
        item.treatment?.toLowerCase().includes(search);

      const matchesStatus =
        statusFilter === "All" || item.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [history, searchTerm, statusFilter]);

  const totalVisits = history.length;

  const completedVisits = history.filter(
    (item) => item.status === "Completed",
  ).length;

  const uniqueDoctors = new Set(history.map((item) => item.doctorName)).size;

  const latestVisit =
    history.length > 0
      ? [...history].sort(
          (a, b) => new Date(b.visitDate) - new Date(a.visitDate),
        )[0]?.visitDate
      : "N/A";

  return (
    <div className="patient-medical-history-page">
      <div className="patient-medical-history-page__head">
        <div>
          <h2>My Medical History</h2>
          <p>
            Review your hospital visits, diagnoses, treatment details, and
            medical notes.
          </p>
        </div>
      </div>

      <div className="medical-history-summary">
        <div className="medical-history-summary__card">
          <div className="medical-history-summary__icon">
            <FaFileMedical />
          </div>
          <div>
            <h4>Total Visits</h4>
            <h3>{totalVisits}</h3>
          </div>
        </div>

        <div className="medical-history-summary__card">
          <div className="medical-history-summary__icon">
            <FaCalendarCheck />
          </div>
          <div>
            <h4>Completed Visits</h4>
            <h3>{completedVisits}</h3>
          </div>
        </div>

        <div className="medical-history-summary__card">
          <div className="medical-history-summary__icon">
            <FaUserDoctor />
          </div>
          <div>
            <h4>Doctors Consulted</h4>
            <h3>{uniqueDoctors}</h3>
          </div>
        </div>

        <div className="medical-history-summary__card">
          <div className="medical-history-summary__icon">
            <FaNotesMedical />
          </div>
          <div>
            <h4>Latest Visit</h4>
            <h3>{latestVisit}</h3>
          </div>
        </div>
      </div>

      <MedicalHistoryFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      {loading && (
        <div className="patient-medical-history-page__loading">
          Loading medical history...
        </div>
      )}

      {!loading && error && (
        <div className="patient-medical-history-page__error">{error}</div>
      )}

      {!loading && !error && <MedicalHistoryTable history={filteredHistory} />}
    </div>
  );
}

export default PatientMedicalHistoryPage;
