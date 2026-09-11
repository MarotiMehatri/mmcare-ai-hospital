import React, { useEffect, useState } from "react";
import {
  FaCalendarCheck,
  FaRobot,
  FaFileMedical,
  FaUserInjured,
  FaMoneyBillWave,
  FaComments,
  FaArrowRight,
  FaUserMd,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

import "../../Styles/Patient/PatientHome.css";

// Components
import WelcomeBanner from "../../Component/Patient/WelcomeBanner";
import ProfileCard from "../../Component/cards/ProfileCard";
import BookAppointmentPreview from "../../Component/Patient/BookAppointmentPreview";
import AIQuickAssistant from "../../Component/Patient/AIQuickAssistant";
import PrescriptionHistoryCard from "../../Component/cards/PrescriptionHistoryCard";
import MedicalHistoryPreview from "../../Component/Patient/MedicalHistoryPreview";
import HealthSummaryPreview from "../../Component/Patient/HealthSummaryPreview";
import PatientAppointmentsPreview from "../../Component/Patient/PatientAppointmentsPreview";
import PatientSummaryCards from "../../Component/Patient/PatientPaymentsPage/PatientSummaryCards";
import PatientOnlineStatusCard from "../../Component/cards/PatientOnlineStatusCard";
import PatientHomeSkeleton from "../../Component/Skeletons/PatientHomeSkeleton";

// APIs
import { getPatientByUserId } from "../../services/Patient/PatientAPI";
import { getPaymentsByPatientId } from "../../services/Doctor/DoctorPaymentsAPI";

function PatientHome() {
  const [patient, setPatient] = useState(null);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const loadPatient = async () => {
      setLoading(true);
      setError("");

      try {
        // ---------------------------------------------------------
        // 1. Get logged-in user from localStorage
        // ---------------------------------------------------------
        const userData = localStorage.getItem("user");

        if (!userData) {
          console.warn("PatientHome: No user found in localStorage.");

          if (isMounted) {
            setLoading(false);
            navigate("/login", { replace: true });
          }

          return;
        }

        let storedUser;

        try {
          storedUser = JSON.parse(userData);
        } catch (parseError) {
          console.error(
            "PatientHome: Invalid user data in localStorage:",
            parseError
          );

          localStorage.removeItem("user");

          if (isMounted) {
            setLoading(false);
            navigate("/login", { replace: true });
          }

          return;
        }

        // ---------------------------------------------------------
        // 2. Validate user ID
        // ---------------------------------------------------------
        const userId = storedUser?.id;

        if (!userId) {
          console.warn(
            "PatientHome: Logged-in user does not contain an ID.",
            storedUser
          );

          if (isMounted) {
            setLoading(false);
            navigate("/login", { replace: true });
          }

          return;
        }

        console.log("PatientHome: Logged-in user:", storedUser);
        console.log("PatientHome: User ID:", userId);
        console.log("PatientHome: User role:", storedUser?.role);

        // ---------------------------------------------------------
        // 3. Fetch patient profile
        // ---------------------------------------------------------
        let patientData = null;

        try {
          patientData = await getPatientByUserId(userId);
        } catch (patientError) {
          console.error(
            "PatientHome: Failed to fetch patient profile:",
            patientError
          );
        }

        // ---------------------------------------------------------
        // 4. If API does not return patient profile,
        //    try previously saved patient data
        // ---------------------------------------------------------
        if (!patientData) {
          const savedPatientData = localStorage.getItem("patient");

          if (savedPatientData) {
            try {
              const savedPatient = JSON.parse(savedPatientData);

              if (savedPatient?.id) {
                console.warn(
                  "PatientHome: Using patient profile from localStorage."
                );

                patientData = savedPatient;
              }
            } catch (savedPatientError) {
              console.error(
                "PatientHome: Invalid saved patient data:",
                savedPatientError
              );

              localStorage.removeItem("patient");
            }
          }
        }

        // ---------------------------------------------------------
        // 5. Patient profile still not found
        // ---------------------------------------------------------
        if (!patientData) {
          console.warn("PatientHome: Patient profile not found.");

          if (isMounted) {
            setLoading(false);
            navigate("/patient/form", { replace: true });
          }

          return;
        }

        // ---------------------------------------------------------
        // 6. Merge user information + patient information
        // ---------------------------------------------------------
        const mergedPatient = {
          ...patientData,

          // IDs
          id: patientData.id || patientData._id || "",
          userId:
            patientData.userId ||
            patientData.user_id ||
            storedUser.id ||
            "",

          // Name
          fullName:
            patientData.fullName ||
            patientData.name ||
            storedUser.fullName ||
            storedUser.name ||
            "",

          // Contact
          email:
            patientData.email ||
            storedUser.email ||
            "",

          mobile:
            patientData.mobile ||
            patientData.phone ||
            storedUser.mobile ||
            storedUser.phone ||
            "",

          // Personal information
          dob:
            patientData.dob ||
            storedUser.dob ||
            "",

          bloodGroup:
            patientData.bloodGroup ||
            storedUser.bloodGroup ||
            "",

          gender:
            patientData.gender ||
            storedUser.gender ||
            "",

          // Role
          role:
            patientData.role ||
            storedUser.role ||
            "patient",
        };

        // ---------------------------------------------------------
        // 7. Validate patient ID
        // ---------------------------------------------------------
        if (!mergedPatient.id) {
          console.error(
            "PatientHome: Patient profile exists but patient ID is missing.",
            mergedPatient
          );

          if (isMounted) {
            setLoading(false);
            setError("Patient ID is missing from the patient profile.");
          }

          return;
        }

        console.log("PatientHome: Final patient:", mergedPatient);
        console.log("PatientHome: Patient ID:", mergedPatient.id);

        // ---------------------------------------------------------
        // 8. Update patient state
        // ---------------------------------------------------------
        if (isMounted) {
          setPatient(mergedPatient);
        }

        // ---------------------------------------------------------
        // 9. Save patient profile for refresh fallback
        // ---------------------------------------------------------
        localStorage.setItem(
          "patient",
          JSON.stringify(mergedPatient)
        );

        // ---------------------------------------------------------
        // 10. Load payments separately
        //     Payment failure should NOT break dashboard
        // ---------------------------------------------------------
        try {
          const paymentsData = await getPaymentsByPatientId(
            mergedPatient.id
          );

          if (isMounted) {
            setFilteredPayments(
              Array.isArray(paymentsData) ? paymentsData : []
            );
          }
        } catch (paymentError) {
          console.error(
            "PatientHome: Failed to load payments:",
            paymentError
          );

          // Keep dashboard working even if payments fail
          if (isMounted) {
            setFilteredPayments([]);
          }
        }
      } catch (error) {
        console.error(
          "PatientHome: Unexpected error while loading patient:",
          error
        );

        if (isMounted) {
          setError(
            "Unable to load your patient dashboard. Please try again."
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadPatient();

    return () => {
      isMounted = false;
    };
  }, [navigate]);

  // ---------------------------------------------------------
  // Loading
  // ---------------------------------------------------------
  if (loading) {
    return <PatientHomeSkeleton />;
  }

  // ---------------------------------------------------------
  // Error
  // ---------------------------------------------------------
  if (error) {
    return (
      <section className="patient-home">
        <div className="patient-home__overlay">
          <div className="patient-home__panel patient-home__error-panel">
            <div className="patient-home__panel-title">
              <FaFileMedical className="patient-home__icon" />

              <h3>Unable to Load Dashboard</h3>
            </div>

            <p>{error}</p>

            <button
              type="button"
              className="patient-home__retry-button"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  // ---------------------------------------------------------
  // Patient not found
  // ---------------------------------------------------------
  if (!patient) {
    return (
      <section className="patient-home">
        <div className="patient-home__overlay">
          <div className="patient-home__panel patient-home__error-panel">
            <div className="patient-home__panel-title">
              <FaUserInjured className="patient-home__icon" />

              <h3>Patient Profile Not Found</h3>
            </div>

            <p>
              We could not find your patient profile. Please complete
              your patient profile first.
            </p>

            <button
              type="button"
              className="patient-home__retry-button"
              onClick={() => navigate("/patient/form")}
            >
              Complete Profile
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="patient-home">
      <div className="patient-home__overlay">

        {/* =====================================================
            WELCOME BANNER
        ====================================================== */}
        <div className="patient-home__banner">
          <WelcomeBanner
            patientName={patient.fullName || "Patient"}
          />
        </div>

        {/* =====================================================
            QUICK ACTIONS
        ====================================================== */}
        <section className="patient-home__top-strip">

          <Link
            to="/patient/medical-reports"
            className="patient-home__top-card"
          >
            <FaFileMedical className="patient-home__top-card-icon" />

            <div>
              <h3>Medical Reports</h3>

              <p>
                View your lab reports and doctor notes
              </p>
            </div>
          </Link>

          <Link
            to="/patient/appointments"
            className="patient-home__top-card"
          >
            <FaCalendarCheck className="patient-home__top-card-icon" />

            <div>
              <h4>Appointments</h4>

              <p>
                Manage consultations and schedules
              </p>
            </div>
          </Link>

          <Link
            to="/patient/book-appointment"
            className="patient-home__top-card"
          >
            <FaUserMd className="patient-home__top-card-icon" />

            <div>
              <h3>Find Doctors</h3>

              <p>
                Choose specialists and book visits fast
              </p>
            </div>
          </Link>

          <Link
            to="/patient/health-summary"
            className="patient-home__top-card"
          >
            <FaFileMedical className="patient-home__top-card-icon" />

            <div>
              <h3>Health Records</h3>

              <p>
                Reports, prescriptions, and visit history
              </p>
            </div>
          </Link>

          <Link
            to="/patient/patient-chat"
            className="patient-home__top-card"
          >
            <FaComments className="patient-home__top-card-icon" />

            <div>
              <h3>Patient Chat</h3>

              <p>
                Continue conversations with doctors
              </p>
            </div>
          </Link>

        </section>

        {/* =====================================================
            MAIN DASHBOARD GRID
        ====================================================== */}
        <section className="patient-home__main-grid">

          {/* ===================================================
              LEFT COLUMN
          ==================================================== */}
          <div className="patient-home__main-left">

            {/* Patient Profile */}
            <div
              onClick={() =>
                navigate(`/patient/profile/${patient.id}`)
              }
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  navigate(`/patient/profile/${patient.id}`);
                }
              }}
              role="button"
              tabIndex={0}
              className="patient-home__panel patient-home__panel--profile patient-home__panel--clickable"
            >
              <div className="patient-home__panel-head">
                <div className="patient-home__panel-title">
                  <FaUserInjured className="patient-home__icon" />

                  <h3>Patient Profile</h3>
                </div>
              </div>

              <ProfileCard patient={patient} />
            </div>

            {/* Appointment + Upcoming Appointment */}
            <div className="patient-home__dual-grid">

              <div className="patient-home__panel">
                <BookAppointmentPreview />
              </div>

              <div className="patient-home__panel">
                <PatientAppointmentsPreview
                  patientId={patient.id}
                />
              </div>

            </div>

            {/* Medical History */}
            <div className="patient-home__panel">
              <MedicalHistoryPreview
                patientId={patient.id}
              />
            </div>

            {/* Billing Summary */}
            <Link
              to="/patient/payments"
              className="patient-home__panel patient-home__panel--clickable"
            >
              <div className="patient-home__panel-head">

                <div className="patient-home__panel-title">
                  <FaMoneyBillWave className="patient-home__icon" />

                  <h3>Billing Summary</h3>
                </div>

                <span className="patient-home__panel-link">
                  View More <FaArrowRight />
                </span>

              </div>

              <PatientSummaryCards
                payments={filteredPayments}
              />
            </Link>

          </div>

          {/* ===================================================
              RIGHT COLUMN
          ==================================================== */}
          <div className="patient-home__main-right">

            {/* Online Status */}
            <div className="patient-home__panel">
              <PatientOnlineStatusCard />
            </div>

            {/* Prescription History */}
            <div className="patient-home__panel patient-home__panel--clickable">

              <div className="patient-home__panel-head">

                <div className="patient-home__panel-title">
                  <FaFileMedical className="patient-home__icon" />

                  <h3>Prescription History</h3>
                </div>

              </div>

              <PrescriptionHistoryCard
                patientId={patient.id}
              />

            </div>

            {/* Doctor Chat */}
            <Link
              to="/patient/patient-chat"
              className="patient-home__chat-card"
            >
              <div className="patient-home__chat-glow"></div>

              <div className="patient-home__chat-icon">
                <FaComments />
              </div>

              <div className="patient-home__chat-content">

                <span className="patient-home__chat-badge">
                  Live Support
                </span>

                <h3>Patient Chat</h3>

                <p>
                  Chat with doctors, ask health questions, share
                  reports, and follow up after consultation.
                </p>

                <div className="patient-home__chat-bottom">
                  <span>Start Conversation</span>

                  <FaArrowRight />
                </div>

              </div>
            </Link>

            {/* AI Assistant */}
            <Link
              to="/ai-health"
              className="patient-home__feature-card patient-home__feature-card--ai patient-home__feature-card--clickable"
            >
              <div className="patient-home__feature-icon">
                <FaRobot />
              </div>

              <div className="patient-home__feature-content">
                <h3>AI Quick Assistant</h3>

                <p>
                  Get quick support, health prompts, and smart
                  suggestions.
                </p>
              </div>

              <AIQuickAssistant />
            </Link>

            {/* Health Summary */}
            <div className="patient-home__panel">
              <HealthSummaryPreview
                patientId={patient.id}
              />
            </div>

          </div>
        </section>
      </div>
    </section>
  );
}

export default PatientHome;
