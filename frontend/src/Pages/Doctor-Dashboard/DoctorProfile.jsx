import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  FaUserMd,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaBriefcaseMedical,
  FaGraduationCap,
  FaHospital,
  FaClock,
  FaMoneyBillWave,
  FaIdBadge,
  FaVenusMars,
  FaTint,
} from "react-icons/fa";
import { getDoctorById } from "../../services/Doctor/DoctorAPI";
import "../../Styles/Doctor/DoctorProfile1.css";

function DoctorProfile() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedDoctor = JSON.parse(localStorage.getItem("doctor"));
    const doctorId = storedDoctor?.id;
    if (!doctorId) {
      console.error("Doctor ID is missing in URL");
      setLoading(false);
      return;
    }
    const loadDoctor = async () => {
      try {
        const res = await getDoctorById(doctorId);

        const doctorData = res.data?.data || res.data;

        setDoctor(doctorData);
      } catch (error) {
        console.error("Error loading doctor profile:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDoctor();
  }, [id]);

  if (loading) {
    return (
      <div className="doctor-profile-status">Loading doctor profile...</div>
    );
  }

  if (!doctor) {
    return <div className="doctor-profile-status error">Doctor not found</div>;
  }

  return (
    <div className="doctor-profile-wrapper">
      <div className="doctor-profile-container">
        {/* Top Banner */}
        <div className="doctor-profile-top">
          <div className="doctor-top-left">
            <div className="doctor-photo-wrapper">
              {doctor.profilePhoto ? (
                <img
                  src={doctor.profilePhoto || "/images/default-doctor.png"}
                  alt={doctor.FullName}
                  className="doctor-photo"
                />
              ) : (
                <FaUserMd className="doctor-photo-icon" />
              )}
            </div>
          </div>

          <div className="doctor-top-right">
            <div className="doctor-status-badge">Active Doctor</div>

            <h1 className="doctor-fullname">
              {doctor.FullName || "Doctor Name"}
            </h1>

            <p className="doctor-role-line">
              {doctor.specialization || "Specialist"} •{" "}
              {doctor.department || "Department"}
            </p>

            <div className="doctor-highlight-row">
              <div className="doctor-highlight-card">
                <FaIdBadge className="highlight-icon" />
                <div>
                  <span>Doctor ID</span>
                  <h4>{doctor.doctorId || doctor.id || "N/A"}</h4>
                </div>
              </div>

              <div className="doctor-highlight-card">
                <FaBriefcaseMedical className="highlight-icon" />
                <div>
                  <span>Experience</span>
                  <h4>{doctor.experience || "0 Years"}</h4>
                </div>
              </div>

              <div className="doctor-highlight-card">
                <FaHospital className="highlight-icon" />
                <div>
                  <span>Hospital</span>
                  <h4>{doctor.hospitalName || "MMCare Hospital"}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="doctor-info-grid">
          {/* Personal Information */}
          <div className="doctor-info-card">
            <div className="card-title-row">
              <h3>Personal Information</h3>
            </div>

            <div className="doctor-info-list">
              <div className="doctor-info-item">
                <FaVenusMars className="info-icon" />
                <div>
                  <span>Gender</span>
                  <p>{doctor.gender || "N/A"}</p>
                </div>
              </div>

              <div className="doctor-info-item">
                <FaTint className="info-icon" />
                <div>
                  <span>Blood Group</span>
                  <p>{doctor.bloodGroup || "N/A"}</p>
                </div>
              </div>

              <div className="doctor-info-item">
                <FaEnvelope className="info-icon" />
                <div>
                  <span>Email Address</span>
                  <p>{doctor.email || "N/A"}</p>
                </div>
              </div>

              <div className="doctor-info-item">
                <FaPhoneAlt className="info-icon" />
                <div>
                  <span>Mobile Number</span>
                  <p>{doctor.phone || "N/A"}</p>
                </div>
              </div>

              <div className="doctor-info-item">
                <FaMapMarkerAlt className="info-icon" />
                <div>
                  <span>Address</span>
                  <p>{doctor.city || "N/A"}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div className="doctor-info-card">
            <div className="card-title-row">
              <h3>Professional Information</h3>
            </div>

            <div className="doctor-info-list">
              <div className="doctor-info-item">
                <FaBriefcaseMedical className="info-icon" />
                <div>
                  <span>Department</span>
                  <p>{doctor.department || "N/A"}</p>
                </div>
              </div>

              <div className="doctor-info-item">
                <FaUserMd className="info-icon" />
                <div>
                  <span>Specialization</span>
                  <p>{doctor.specialization || "N/A"}</p>
                </div>
              </div>

              <div className="doctor-info-item">
                <FaGraduationCap className="info-icon" />
                <div>
                  <span>Qualification</span>
                  <p>{doctor.qualification || "N/A"}</p>
                </div>
              </div>

              <div className="doctor-info-item">
                <FaClock className="info-icon" />
                <div>
                  <span>Available Time</span>
                  <p>{doctor.availableTime || "N/A"}</p>
                </div>
              </div>

              <div className="doctor-info-item">
                <FaMoneyBillWave className="info-icon" />
                <div>
                  <span>Consultation Fee</span>
                  <p>₹ {doctor.consultationFee || "N/A"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* About */}
        <div className="doctor-about-card">
          <div className="card-title-row">
            <h3>About Doctor</h3>
          </div>
          <p className="doctor-about-text">
            {doctor.about ||
              "Experienced doctor dedicated to patient care, diagnosis, treatment, and delivering quality healthcare services."}
          </p>
        </div>
      </div>
    </div>
  );
}

export default DoctorProfile;
