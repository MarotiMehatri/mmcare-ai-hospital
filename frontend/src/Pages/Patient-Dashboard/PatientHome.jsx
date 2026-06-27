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

import "../../Styles/Patient/PatientHome.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import WelcomeBanner from "../../Component/Patient/WelcomeBanner";
import ProfileCard from "../../Component/cards/ProfileCard";
import BookAppointmentPreview from "../../Component/Patient/BookAppointmentPreview";
import AIQuickAssistant from "../../Component/Patient/AIQuickAssistant";
import { getPatientByUserId } from "../../services/Patient/PatientAPI";
import PrescriptionHistoryCard from "../../Component/cards/PrescriptionHistoryCard";
import MedicalHistoryPreview from "../../Component/Patient/MedicalHistoryPreview";
import HealthSummaryPreview from "../../Component/Patient/HealthSummaryPreview";
import PatientAppointmentsPreview from "../../Component/Patient/PatientAppointmentsPreview";
import PatientHomeSkeleton from "../../Component/Skeletons/PatientHomeSkeleton";
import PatientSummaryCards from "../../Component/Patient/PatientPaymentsPage/PatientSummaryCards";
import PatientOnlineStatusCard from "../../Component/cards/PatientOnlineStatusCard";

import { getPaymentsByPatientId } from "../../services/Doctor/DoctorPaymentsAPI";

function PatientHome() {
  const [patient, setPatient] = useState(null);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadPatient = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));

        if (!storedUser?.id) {
          navigate("/login");
          return;
        }

        const patientData = await getPatientByUserId(storedUser.id);

        if (!patientData) {
          console.warn("Patient profile not found");
          navigate("/patient/form");
          return;
        }

        const mergedPatient = {
          ...patientData,
          fullName:
            patientData.fullName ||
            storedUser.fullName ||
            storedUser.name ||
            "",
          email: patientData.email || storedUser.email || "",
          mobile: patientData.mobile || storedUser.mobile || "",
          dob: patientData.dob || storedUser.dob || "",
          bloodGroup: patientData.bloodGroup || storedUser.bloodGroup || "",
          gender: patientData.gender || storedUser.gender || "",
        };

        setPatient(mergedPatient);

        const paymentsData = await getPaymentsByPatientId(mergedPatient.id);
        setPayments(paymentsData || []);

        localStorage.setItem("patient", JSON.stringify(mergedPatient));
      } catch (error) {
        console.error("Failed to load patient:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPatient();
  }, [navigate]);

  if (loading) {
    return <PatientHomeSkeleton />;
  }

  if (!patient) {
    return <h2 className="patient-home-loading">Patient profile not found.</h2>;
  }

  return (
    <section className="patient-home">
      <div className="patient-home__overlay">
        <div className="patient-home__banner">
          <WelcomeBanner patientName={patient.fullName || "Patient"} />
        </div>

        <section className="patient-home__top-strip">
          <Link
            to="/patient/medical-reports"
            className="patient-home__top-card"
          >
            <FaFileMedical className="patient-home__top-card-icon" />
            <div>
              <h3>Medical Reports</h3>
              <p>View your lab reports and doctor notes</p>
            </div>
          </Link>

          <Link to="/patient/appointments" className="patient-home__top-card">
            <FaCalendarCheck className="patient-home__top-card-icon" />
            <div>
              <h4>Appointments</h4>
              <p>Manage consultations and schedules</p>
            </div>
          </Link>

          <Link
            to="/patient/book-appointment"
            className="patient-home__top-card"
          >
            <FaUserMd className="patient-home__top-card-icon" />
            <div>
              <h3>Find Doctors</h3>
              <p>Choose specialists and book visits fast</p>
            </div>
          </Link>

          <Link to="/patient/health-summary" className="patient-home__top-card">
            <FaFileMedical className="patient-home__top-card-icon" />
            <div>
              <h3>Health Records</h3>
              <p>Reports, prescriptions, and visit history</p>
            </div>
          </Link>

          <Link to="/patient/patient-chat" className="patient-home__top-card">
            <FaComments className="patient-home__top-card-icon" />
            <div>
              <h3>Patient Chat</h3>
              <p>Continue conversations with doctors</p>
            </div>
          </Link>
        </section>

        <section className="patient-home__main-grid">
          <div className="patient-home__main-left">
            <div
              onClick={() => navigate(`/patient/profile/${patient.id}`)}
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

            <div className="patient-home__dual-grid">
              <div className="patient-home__panel">
                <BookAppointmentPreview />
              </div>

              <div className="patient-home__panel">
                <PatientAppointmentsPreview patientId={patient.id} />
              </div>
            </div>

            <div className="patient-home__panel">
              <MedicalHistoryPreview patientId={patient.id} />
            </div>

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

              {/* <PatientSummaryCards patientId={patient.id}  /> */}
              <PatientSummaryCards payments={payments} />
            </Link>
          </div>

          <div className="patient-home__main-right">
            <div className="patient-home__panel">
              <PatientOnlineStatusCard />
            </div>

            <div className="patient-home__panel patient-home__panel--clickable">
              <div className="patient-home__panel-head">
                <div className="patient-home__panel-title">
                  <FaFileMedical className="patient-home__icon" />
                  <h3>Prescription History</h3>
                </div>
              </div>

              <PrescriptionHistoryCard patientId={patient.id} />
            </div>

            <Link
              to="/patient/patient-chat"
              className="patient-home__chat-card"
            >
              <div className="patient-home__chat-glow"></div>

              <div className="patient-home__chat-icon">
                <FaComments />
              </div>

              <div className="patient-home__chat-content">
                <span className="patient-home__chat-badge">Live Support</span>
                <h3>Patient Chat</h3>
                <p>
                  Chat with doctors, ask health questions, share reports, and
                  follow up after consultation.
                </p>

                <div className="patient-home__chat-bottom">
                  <span>Start Conversation</span>
                  <FaArrowRight />
                </div>
              </div>
            </Link>

            <Link
              to="/ai-health"
              className="patient-home__feature-card patient-home__feature-card--ai patient-home__feature-card--clickable"
            >
              <div className="patient-home__feature-icon">
                <FaRobot />
              </div>

              <div className="patient-home__feature-content">
                <h3>AI Quick Assistant</h3>
                <p>Get quick support, health prompts, and smart suggestions.</p>
              </div>

              <AIQuickAssistant />
            </Link>

            <div className="patient-home__panel">
              <HealthSummaryPreview patientId={patient.id} />
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}

export default PatientHome;
