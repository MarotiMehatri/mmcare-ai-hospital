import React, { useEffect, useState } from "react";
import {
  FaUserCircle,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaHeartbeat,
  FaCalendarAlt,
  FaIdBadge,
  FaUserShield,
} from "react-icons/fa";
import { MdBloodtype, MdEmergency } from "react-icons/md";
import { useParams } from "react-router-dom";
import { getPatientById } from "../../services/Patient/PatientAPI";
import "../../Styles/Patient/PatientProfile.css";

function PatientProfile() {
  const { id } = useParams();

  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const safeParse = (key) => {
    try {
      return JSON.parse(localStorage.getItem(key)) || {};
    } catch {
      return {};
    }
  };

  // useEffect(() => {
  //   console.log("Profile page opened");
  //   console.log("Route ID:", id);

  //   const loadPatient = async () => {
  //     try {
  //       setLoading(true);
  //       setError("");

  //       if (!id) {
  //         console.log("NO ID found");
  //         setError("Patient ID not found");
  //         return;
  //       }

  //       const patientData = await getPatientById(id);
  //       console.log("Patinet Data:", patientData);

  //       if (!patientData) {
  //         setError("Patient not found");
  //         return;
  //       }

  //       const storedUser = safeParse("user");
  //       const storedPatient = safeParse("patient");

  //       const mergedPatient = {
  //         ...storedUser,
  //         ...storedPatient,
  //         ...patientData,

  //         fullName:
  //           patientData.fullName ||
  //           patientData.name ||
  //           storedPatient.fullName ||
  //           storedPatient.name ||
  //           storedUser.fullName ||
  //           "Patient Name",

  //         email:
  //           patientData.email || storedPatient.email || storedUser.email || "",

  //         dob: patientData.dob || storedPatient.dob || storedUser.dob || "",

  //         age: patientData.age || storedPatient.age || storedUser.age || "",

  //         bloodGroup:
  //           patientData.bloodGroup ||
  //           storedPatient.bloodGroup ||
  //           storedUser.bloodGroup ||
  //           "",

  //         gender:
  //           patientData.gender ||
  //           storedPatient.gender ||
  //           storedUser.gender ||
  //           "",

  //         mobile:
  //           patientData.mobile ||
  //           patientData.phone ||
  //           storedPatient.mobile ||
  //           storedPatient.phone ||
  //           storedUser.mobile ||
  //           storedUser.phone ||
  //           "",

  //         address:
  //           patientData.address ||
  //           storedPatient.address ||
  //           storedUser.address ||
  //           "",

  //         city: patientData.city || storedPatient.city || storedUser.city || "",

  //         state:
  //           patientData.state || storedPatient.state || storedUser.state || "",

  //         emergencyName:
  //           patientData.emergencyName ||
  //           patientData.emergencyContactName ||
  //           storedPatient.emergencyName ||
  //           storedPatient.emergencyContactName ||
  //           "",

  //         emergencyContact:
  //           patientData.emergencyContact ||
  //           patientData.emergencyPhone ||
  //           storedPatient.emergencyContact ||
  //           storedPatient.emergencyPhone ||
  //           "",

  //         photo:
  //           patientData.photo ||
  //           patientData.profilePhoto ||
  //           patientData.image ||
  //           storedPatient.photo ||
  //           storedPatient.profilePhoto ||
  //           storedUser.photo ||
  //           "",
  //       };

  //       setPatient(mergedPatient);
  //     } catch (error) {
  //       console.error("Error loading patient:", error);
  //       setError("Error loading patient");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   loadPatient();
  // }, [id]);

  useEffect(() => {
    const loadPatient = async () => {
      try {
        setLoading(true);
        setError("");

        const storedUser = safeParse("user");
        const storedPatient = safeParse("patient");

        let patientData = null;

        // Case 1: /patient/profile/:id
        if (id) {
          patientData = await getPatientById(id);
        }

        // Case 2: /patient/profile or /patient
        if (!patientData && storedPatient?.id) {
          patientData = storedPatient;
        }

        if (!patientData) {
          setError("Patient data not found. Please login again.");
          return;
        }

        const mergedPatient = {
          ...storedUser,
          ...storedPatient,
          ...patientData,

          fullName:
            patientData.fullName ||
            patientData.name ||
            storedPatient.fullName ||
            storedPatient.name ||
            storedUser.fullName ||
            "Patient Name",

          email:
            patientData.email || storedPatient.email || storedUser.email || "",

          dob: patientData.dob || storedPatient.dob || storedUser.dob || "",

          age: patientData.age || storedPatient.age || storedUser.age || "",

          bloodGroup:
            patientData.bloodGroup ||
            storedPatient.bloodGroup ||
            storedUser.bloodGroup ||
            "",

          gender:
            patientData.gender ||
            storedPatient.gender ||
            storedUser.gender ||
            "",

          mobile:
            patientData.mobile ||
            patientData.phone ||
            storedPatient.mobile ||
            storedPatient.phone ||
            storedUser.mobile ||
            storedUser.phone ||
            "",

          address:
            patientData.address ||
            storedPatient.address ||
            storedUser.address ||
            "",

          city: patientData.city || storedPatient.city || storedUser.city || "",

          state:
            patientData.state || storedPatient.state || storedUser.state || "",

          emergencyName:
            patientData.emergencyName ||
            patientData.emergencyContactName ||
            storedPatient.emergencyName ||
            storedPatient.emergencyContactName ||
            "",

          emergencyContact:
            patientData.emergencyContact ||
            patientData.emergencyPhone ||
            storedPatient.emergencyContact ||
            storedPatient.emergencyPhone ||
            "",

          photo:
            patientData.photo ||
            patientData.profilePhoto ||
            patientData.image ||
            storedPatient.photo ||
            storedPatient.profilePhoto ||
            storedUser.photo ||
            "",
        };

        setPatient(mergedPatient);
      } catch (error) {
        console.error("Error loading patient:", error);
        setError("Error loading patient");
      } finally {
        setLoading(false);
      }
    };

    loadPatient();
  }, [id]);

  if (loading) return <h3>Loading Patient...</h3>;
  if (error) return <h3>{error}</h3>;

  return (
    <div className="patient-profile-page">
      <div className="patient-profile-card">
        <div className="patient-profile-header">
          <h2 className="patient-profile-title">Patient Profile</h2>
          <p className="patient-profile-subtitle">
            Personal details and emergency information
          </p>
        </div>

        <div className="patient-profile-top">
          <div className="patient-profile-image-box">
            {patient?.photo ? (
              <img
                src={patient.photo}
                alt={patient.fullName || "patient"}
                className="patient-profile-photo"
              />
            ) : (
              <FaUserCircle className="patient-profile-default-icon" />
            )}
          </div>

          <div className="patient-profile-main-info">
            <h2 className="patient-profile-name">
              {patient?.fullName || "Patient Name"}
            </h2>

            <p className="patient-profile-id">
              <FaIdBadge className="profile-inline-icon" />
              Patient ID:{" "}
              {patient?.patientID || patient?.patientId || patient?.id || "N/A"}
            </p>
          </div>
        </div>

        <div className="patient-info-grid">
          <div className="patient-info-box">
            <h3 className="info-box-title">
              <FaUserShield className="section-icon" />
              Personal Info
            </h3>

            <div className="patient-info-item">
              <FaCalendarAlt className="item-icon" />
              <span className="label">DOB</span>
              <span className="value">{patient?.dob || "N/A"}</span>
            </div>

            <div className="patient-info-item">
              <MdBloodtype className="item-icon" />
              <span className="label">Blood Group</span>
              <span className="value">{patient?.bloodGroup || "N/A"}</span>
            </div>

            <div className="patient-info-item">
              <FaHeartbeat className="item-icon" />
              <span className="label">Age</span>
              <span className="value">{patient?.age || "N/A"}</span>
            </div>

            <div className="patient-info-item">
              <FaUserCircle className="item-icon" />
              <span className="label">Gender</span>
              <span className="value">{patient?.gender || "N/A"}</span>
            </div>
          </div>

          <div className="patient-info-box">
            <h3 className="info-box-title">
              <FaEnvelope className="section-icon" />
              Contact Info
            </h3>

            <div className="patient-info-item">
              <FaEnvelope className="item-icon" />
              <span className="label">Email</span>
              <span className="value">{patient?.email || "N/A"}</span>
            </div>

            <div className="patient-info-item">
              <FaPhone className="item-icon" />
              <span className="label">Mobile</span>
              <span className="value">{patient?.mobile || "N/A"}</span>
            </div>

            <div className="patient-info-item">
              <FaMapMarkerAlt className="item-icon" />
              <span className="label">Address</span>
              <span className="value">
                {patient?.address || "N/A"}
                {patient?.city ? `, ${patient.city}` : ""}
                {patient?.state ? `, ${patient.state}` : ""}
              </span>
            </div>
          </div>

          <div className="patient-info-box emergency-box">
            <h3 className="info-box-title">
              <MdEmergency className="section-icon" />
              Emergency Contact
            </h3>

            <div className="patient-info-item">
              <FaUserCircle className="item-icon" />
              <span className="label">Name</span>
              <span className="value">{patient?.emergencyName || "N/A"}</span>
            </div>

            <div className="patient-info-item">
              <FaPhone className="item-icon" />
              <span className="label">Contact</span>
              <span className="value">
                {patient?.emergencyContact || "N/A"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientProfile;
