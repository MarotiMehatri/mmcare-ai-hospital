import React, { useEffect, useMemo, useState } from "react";
import { getPatientReports } from "../../services/Doctor/reportAPI";
import { getDoctors } from "../../services/Doctor/DoctorAPI";
import PatientMedicalReportsCards from "../../Component/cards/PatientMedicalReportsCard";
import PatientMedicalReportsTable from "../../Component/tables/PatientMedicalReportsTable";
import PatientMedicalReportsEmpty from "../../Component/Patient/PatientMedicalReportsEmpty";
import "../../Styles/Patient/PatientMedicalReportsPage.css";

function PatientMedicalReportsPage() {
  const patient = useMemo(() => {
    return (
      JSON.parse(localStorage.getItem("patient")) ||
      JSON.parse(localStorage.getItem("Patient"))
    );
  }, []);

  const [reports, setReports] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPatientReports();
  }, []);

  const loadPatientReports = async () => {
    try {
      setLoading(true);

      if (!patient?.id) {
        //console.warn("Patient not found in localStorage");
        setReports([]);
        setDoctors([]);
        return;
      }

      const reportsData = await getPatientReports(patient.id);
      setReports(Array.isArray(reportsData) ? reportsData : []);

      const doctorsData = await getDoctors();
      setDoctors(Array.isArray(doctorsData) ? doctorsData : []);
    } catch (error) {
      console.error("Failed to load patient reports:", error);
      setReports([]);
      setDoctors([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="patient-medical-reports-page">
      <div className="patient-medical-reports-page-header">
        <div className="patient-medical-reports-page-title">
          <h2>My Medical Reports</h2>
          <p>
            Access all your lab reports, scan reports, prescriptions, and other
            medical documents uploaded by your doctor.
          </p>
        </div>

        <div className="patient-medical-reports-profile-box">
          <span>Patient Name</span>
          <strong>{patient?.fullName || patient?.name || "Patient"}</strong>
          <small>{patient?.patientID || `ID-${patient?.id || ""}`}</small>
        </div>
      </div>

      <PatientMedicalReportsCards reports={reports} />

      <div className="patient-medical-reports-main-section">
        {loading ? (
          <div className="patient-medical-reports-loading-box">
            Loading medical reports...
          </div>
        ) : reports.length === 0 ? (
          <PatientMedicalReportsEmpty />
        ) : (
          <PatientMedicalReportsTable reports={reports} doctors={doctors} />
        )}
      </div>
    </div>
  );
}

export default PatientMedicalReportsPage;
