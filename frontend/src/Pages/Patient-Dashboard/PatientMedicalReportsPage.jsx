import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  getMedicalReportsByPatientId,
} from "../../services/MedicalReports/MedicalReportAPI";

import { getDoctors } from "../../services/Doctor/DoctorAPI";

import PatientMedicalReportsCards from "../../Component/cards/PatientMedicalReportsCard";
import PatientMedicalReportsTable from "../../Component/tables/PatientMedicalReportsTable";
import PatientMedicalReportsEmpty from "../../Component/Patient/PatientMedicalReportsEmpty";

import "../../Styles/Patient/PatientMedicalReportsPage.css";

function PatientMedicalReportsPage() {
  /* =========================================================
     PATIENT FROM LOCAL STORAGE
  ========================================================= */

  const patient = useMemo(() => {
    try {
      const storedPatient =
        localStorage.getItem("patient") ||
        localStorage.getItem("Patient");

      if (!storedPatient) {
        return null;
      }

      const parsedPatient = JSON.parse(storedPatient);

      if (
        !parsedPatient ||
        typeof parsedPatient !== "object"
      ) {
        return null;
      }

      return parsedPatient;
    } catch (error) {
      console.error(
        "Failed to parse patient from localStorage:",
        error
      );

      return null;
    }
  }, []);

  /* =========================================================
     STATE
  ========================================================= */

  const [reports, setReports] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* =========================================================
     PATIENT ID
     
     IMPORTANT:
     Doctor upload stores patientId.
     Therefore we need the same patient ID here.
  ========================================================= */

  const patientId = useMemo(() => {
    return (
      patient?._id ||
      patient?.patientId ||
      patient?.id ||
      localStorage.getItem("patientMongoId") ||
      localStorage.getItem("userMongoId") ||
      localStorage.getItem("patientId") ||
      null
    );
  }, [patient]);

  /* =========================================================
     PATIENT NAME
  ========================================================= */

  const patientName = useMemo(() => {
    return (
      patient?.fullName ||
      patient?.FullName ||
      patient?.name ||
      patient?.patientName ||
      "Patient"
    );
  }, [patient]);

  /* =========================================================
     PATIENT CODE
  ========================================================= */

  const patientCode = useMemo(() => {
    return (
      patient?.patientID ||
      patient?.patientCode ||
      patient?.patientNumber ||
      patient?.registrationNumber ||
      ""
    );
  }, [patient]);

  /* =========================================================
     NORMALIZE API RESPONSE
     
     Supports:

     1. Direct array
        [...]

     2. API object
        {
          success: true,
          data: [...]
        }

     3. Axios response
        {
          data: {
            success: true,
            data: [...]
          }
        }
  ========================================================= */

  const normalizeReports = useCallback((response) => {
    /* Direct array */
    if (Array.isArray(response)) {
      return response;
    }

    /* Axios response.data = array */
    if (Array.isArray(response?.data)) {
      return response.data;
    }

    /* Axios response.data.data = array */
    if (Array.isArray(response?.data?.data)) {
      return response.data.data;
    }

    return [];
  }, []);

  /* =========================================================
     NORMALIZE DOCTORS
  ========================================================= */

  const normalizeDoctors = useCallback((response) => {
    /* Direct array */
    if (Array.isArray(response)) {
      return response;
    }

    /* Axios response.data = array */
    if (Array.isArray(response?.data)) {
      return response.data;
    }

    /* Axios response.data.data = array */
    if (Array.isArray(response?.data?.data)) {
      return response.data.data;
    }

    return [];
  }, []);

  /* =========================================================
     LOAD PATIENT REPORTS + DOCTORS
  ========================================================= */

  const loadPatientReports = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      /* -----------------------------------------------------
         Validate patient ID
      ----------------------------------------------------- */

      if (!patientId) {
        console.warn(
          "PatientMedicalReportsPage: Patient ID not found."
        );

        setReports([]);
        setDoctors([]);

        setError(
          "Patient information was not found. Please login again."
        );

        return;
      }

      console.log(
        "Loading reports for patient:",
        patientId
      );

      /* -----------------------------------------------------
         Load patient reports
         
         GET:
         /api/reports/patient/:patientId
      ----------------------------------------------------- */

      const reportsResponse =
        await getMedicalReportsByPatientId(
          patientId
        );

      console.log(
        "Patient medical reports API response:",
        reportsResponse
      );

      const reportsData =
        normalizeReports(reportsResponse);

      /*
        VERY IMPORTANT:

        Always store an ARRAY.

        This prevents:

        reports.filter is not a function
        reports.map is not a function
        reports.length errors
      */

      setReports(
        Array.isArray(reportsData)
          ? reportsData
          : []
      );

      /* -----------------------------------------------------
         Load doctors
      ----------------------------------------------------- */

      try {
        const doctorsResponse =
          await getDoctors();

        console.log(
          "Doctors API response:",
          doctorsResponse
        );

        const doctorsData =
          normalizeDoctors(doctorsResponse);

        setDoctors(
          Array.isArray(doctorsData)
            ? doctorsData
            : []
        );
      } catch (doctorError) {
        console.error(
          "Failed to load doctors:",
          doctorError
        );

        /*
          Reports should still display even if
          doctor API fails.
        */

        setDoctors([]);
      }
    } catch (error) {
      console.error(
        "Failed to load patient reports:",
        error
      );

      setReports([]);
      setDoctors([]);

      setError(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to load medical reports."
      );
    } finally {
      setLoading(false);
    }
  }, [
    patientId,
    normalizeReports,
    normalizeDoctors,
  ]);

  /* =========================================================
     INITIAL LOAD
  ========================================================= */

  useEffect(() => {
    loadPatientReports();
  }, [loadPatientReports]);

  /* =========================================================
     SAFE REPORT ARRAY
  ========================================================= */

  const safeReports = useMemo(() => {
    return Array.isArray(reports)
      ? reports
      : [];
  }, [reports]);

  /* =========================================================
     SAFE DOCTOR ARRAY
  ========================================================= */

  const safeDoctors = useMemo(() => {
    return Array.isArray(doctors)
      ? doctors
      : [];
  }, [doctors]);

  /* =========================================================
     REFRESH
  ========================================================= */

  const handleRefresh = async () => {
    await loadPatientReports();
  };

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div className="patient-medical-reports-page">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="patient-medical-reports-page-header">

        {/* ---------------------------------------------------
            TITLE
        --------------------------------------------------- */}

        <div className="patient-medical-reports-page-title">

          <h2>
            My Medical Reports
          </h2>

          <p>
            Access all your lab reports, scan reports,
            prescriptions, and other medical documents
            uploaded by your doctor.
          </p>

        </div>

        {/* ---------------------------------------------------
            PATIENT PROFILE
        --------------------------------------------------- */}

        <div className="patient-medical-reports-profile-box">

          <span>
            Patient Name
          </span>

          <strong>
            {patientName}
          </strong>

          <small>
            {patientCode ||
              (patientId
                ? `ID-${patientId}`
                : "Patient ID unavailable")}
          </small>

        </div>

      </div>

      {/* =====================================================
          ERROR
      ===================================================== */}

      {error && (
        <div
          className="patient-medical-reports-error"
          role="alert"
        >
          <div>
            {error}
          </div>

          <button
            type="button"
            onClick={handleRefresh}
            disabled={loading}
          >
            Retry
          </button>
        </div>
      )}

      {/* =====================================================
          REPORT SUMMARY CARDS
      ===================================================== */}

      <PatientMedicalReportsCards
        reports={safeReports}
      />

      {/* =====================================================
          MAIN REPORT SECTION
      ===================================================== */}

      <div className="patient-medical-reports-main-section">

        {/* ===================================================
            LOADING
        =================================================== */}

        {loading ? (

          <div className="patient-medical-reports-loading-box">

            <div className="patient-medical-reports-loading-spinner" />

            <span>
              Loading medical reports...
            </span>

          </div>

        ) : safeReports.length === 0 ? (

          /* =================================================
             EMPTY STATE
          ================================================= */

          <PatientMedicalReportsEmpty />

        ) : (

          /* =================================================
             REPORT TABLE
          ================================================= */

          <PatientMedicalReportsTable
            reports={safeReports}
            doctors={safeDoctors}
          />

        )}

      </div>

    </div>
  );
}

export default PatientMedicalReportsPage;