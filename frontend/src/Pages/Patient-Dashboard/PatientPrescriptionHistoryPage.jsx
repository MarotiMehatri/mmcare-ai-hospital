import React, { useState, useEffect } from "react";
import {
  FaUserMd,
  FaCalendarAlt,
  FaHeartbeat,
  FaNotesMedical,
  FaCapsules,
  FaFlask,
  FaTint,
  FaWeight,
  FaThermometerHalf,
  FaLungs,
  FaRulerVertical,
  FaAppleAlt,
  FaRunning,
  FaHospital,
  FaFileMedical,
} from "react-icons/fa";
import { getPrescriptionsByPatient } from "../../services/Doctor/PresscriptionApi";
import "../../Styles/Patient/PatientPrescriptionHistoryPages.css";

function PatientPrescriptionHistoryPage() {
  const patient = JSON.parse(localStorage.getItem("patient")) || {};

  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadPrescriptionHistory();
  }, []);

  const loadPrescriptionHistory = async () => {
    try {
      setLoading(true);
      setError("");

      if (!patient?.id) {
        setError("Patient not logged in.");
        setLoading(false);
        return;
      }

      const data = await getPrescriptionsByPatient(patient.id);

      setPrescriptions(data || []);
    } catch (error) {
      console.error("Prescription history error:", error);
      setError("Failed to load prescription history.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="patient-prescription-page">
      {/* Header */}

      <div className="patient-prescription-header">
        <div>
          <h1>Prescription History</h1>
          <p>
            View all medical prescriptions, medicines, tests, and doctor advice.
          </p>
        </div>

        <div className="patient-history-count-card">
          <span>Total Reports</span>
          <h2>{prescriptions.length}</h2>
        </div>
      </div>

      {/*Loading*/}
      {loading && (
        <div className="patient-prescription-loading">
          Loading prescriotion history...
        </div>
      )}

      {/*Error*/}
      {error && !loading && (
        <div className="patient-prescription-error">{error}</div>
      )}

      {/* Empty State */}
      {!loading && !error && prescriptions.length === 0 && (
        <div className="patient-prescription-empty">
          {" "}
          <img
            src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
            alt="empty"
          />
          <h3>No Prescription History Found</h3>
          <p>Your doctor prescriptions and medical reports will appear here</p>
        </div>
      )}

      {/* Prescription Cards */}
      <div className="patient-prescriptio-list">
        {!loading &&
          prescriptions.length > 0 &&
          prescriptions.map((item) => (
            <div key={item.id} className="patient-prescription-card">
              {" "}
              {/* Top Section*/}
              <div className="Patient-prescription-card-top">
                <div>
                  {" "}
                  <h2>{item.diagnosis}</h2>
                  <div className="patient-prescription-status-row">
                    <span
                      className={`patient-prescription-status ${item.status}`}
                    >
                      {item.status}
                    </span>
                  </div>
                </div>

                <div className="patient-prescription-date">
                  <FaCalendarAlt />
                  <span>{item.visitDate}</span>
                </div>
              </div>
              {/* Doctor Info */}
              <div className="patient-prescription-doctor-box">
                <div className="patient-prescription-info-item">
                  <FaUserMd />
                  <div>
                    <span>Doctor ID</span>
                    <h4>{item.doctorId}</h4>
                  </div>
                </div>

                <div className="patient-prescription-info-item">
                  <FaHeartbeat />
                  <div>
                    <span>Specialization</span>
                    <h4>{item.specialization}</h4>
                  </div>
                </div>
              </div>
              {/* Vitals */}
              <div className="patient-prescription-vitals-grid">
                <div className="patient-vital-card">
                  <FaTint />
                  <div>
                    <span>Blood Pressure</span>
                    <h4>{item.bp}</h4>
                  </div>
                </div>

                <div className="patient-vital-card">
                  <FaHeartbeat />
                  <div>
                    <span>Pulse Rate</span>
                    <h4>{item.pulseRate}</h4>
                  </div>
                </div>

                <div className="patient-vital-card">
                  <FaLungs />
                  <div>
                    <span>Oxygen Level</span>
                    <h4>{item.oxygenLevel}</h4>
                  </div>
                </div>

                <div className="patient-vital-card">
                  <FaThermometerHalf />
                  <div>
                    <span>Temperature</span>
                    <h4>{item.temperature}</h4>
                  </div>
                </div>

                <div className="patient-vital-card">
                  <FaRulerVertical />
                  <div>
                    <span>Height</span>
                    <h4>{item.height}</h4>
                  </div>
                </div>

                <div className="patient-vital-card">
                  <FaWeight />
                  <div>
                    <span>Weight</span>
                    <h4>{item.weight}</h4>
                  </div>
                </div>

                <div className="patient-vital-card">
                  <FaHeartbeat />
                  <div>
                    <span>BMI</span>
                    <h4>{item.bmi}</h4>
                  </div>
                </div>
              </div>
              {/* Visit INformation Section */}
              <div className="patient-prescription-section">
                <div className="patient-section-title">
                  <FaHospital />
                  <h3>Visit Information</h3>
                </div>

                <div className="patient-visit-info-grid">
                  <div className="patient-info-card">
                    <span>Department</span>
                    <h4>{item.department}</h4>
                  </div>

                  <div className="patient-info-card">
                    <span>Visit Type</span>
                    <h4>{item.visitType}</h4>
                  </div>

                  <div className="patient-info-card">
                    <span>Prescription ID</span>
                    <h4>{item.id}</h4>
                  </div>
                </div>
              </div>
              {/* Heief Complait */}
              <div className="patient-prescription-section">
                <div className="patient-section-title">
                  <FaNotesMedical />
                  <h3>Chief Complaint</h3>
                </div>

                <div className="patient-advice-box">{item.chiefComplaint}</div>
              </div>
              {/* Symptoms*/}
              <div className="patient-prescription-section">
                <h3>Symptoms</h3>

                <div className="patient-tags-wrapper">
                  {item.symptoms?.map((symptom, index) => (
                    <span key={index} className="patient-tag symptom-tag">
                      {symptom}
                    </span>
                  ))}
                </div>
              </div>
              {/* Medicines */}
              <div className="patient-prescription-section">
                <div className="patient-section-title">
                  <FaCapsules />
                  <h3>Medicines</h3>
                </div>

                <div className="patient-medicine-table-wrapper">
                  <table>
                    <thead>
                      <tr>
                        <th>Medicine</th>
                        <th>Dosage</th>
                        <th>Instructions</th>
                        <th>Frequency</th>
                        <th>Duration</th>
                        <th>Timing</th>
                      </tr>
                    </thead>

                    <tbody>
                      {item.medicines?.map((med, index) => (
                        <tr key={index}>
                          <td>{med.name}</td>
                          <td>{med.dosage}</td>
                          <td>{med.instructions}</td>
                          <td>{med.frequency}</td>
                          <td>{med.duration}</td>
                          <td>{med.timing}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              {/* Tests */}
              <div className="patient-prescription-section">
                <div className="patient-section-title">
                  <FaFlask />
                  <h3>Recommended Tests</h3>
                </div>

                <div className="patient-tags-wrapper">
                  {item.testsRecommended?.map((test, index) => (
                    <span key={index} className="patient-tag test-tag">
                      {test}
                    </span>
                  ))}
                </div>
              </div>
              {/* Diagnosis Details */}
              <div className="patient-prescription-section">
                <div className="patient-section-title">
                  <FaFileMedical />
                  <h3>Diagnosis Details</h3>
                </div>

                <div className="patient-advice-box">
                  <p>
                    <strong>Primary Diagnosis:</strong> {item.primaryDiagnosis}
                  </p>

                  <p>
                    <strong>Secondary Diagnosis:</strong>{" "}
                    {item.secondaryDiagnosis}
                  </p>

                  <p>
                    <strong>Clinical Notes:</strong> {item.clinicalNotes}
                  </p>
                </div>
              </div>
              {/* Advice */}
              <div className="patient-prescription-section">
                <div className="patient-section-title">
                  <FaAppleAlt />
                  <h3>Exercise Advice</h3>
                </div>

                <div className="patient-advice-box">{item.dietAdvice}</div>

                <div className="patient-dection-title">
                  <FaRunning />
                  <h3>Exercise Advice</h3>
                </div>

                <div className="patient-advice-box">{item.exerciseAdvice}</div>

                <div className="patient-section-title">
                  <FaHeartbeat />
                  <h3>Lifedtyle Advice</h3>
                </div>

                <div className="patient-advice-box">{item.lifestyleAdvice}</div>
              </div>
              {/* Attachments Section */}
              {item.attachments?.length > 0 && (
                <div className="patient-prescription-section">
                  <div className="patient-section-title">
                    <FaFileMedical />
                    <h3>Attachments</h3>
                  </div>

                  <div className="patient-tags-wrapper">
                    {item.attachments.map((file, index) => (
                      <a
                        key={index}
                        href={file.url}
                        target="_blank"
                        rel="noreferrer"
                        className="patient-tag test-tag"
                      >
                        {file.name}
                      </a>
                    ))}
                  </div>
                </div>
              )}
              {/* Follow Up */}
              <div className="patient-prescription-footer">
                <div>
                  <strong>Follow-up Date:</strong>
                  {item.followUpDate}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default PatientPrescriptionHistoryPage;
