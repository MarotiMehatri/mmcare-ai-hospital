import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getDoctorByEmail } from "../../services/Doctor/DoctorAPI";
import { getUserByEmail } from "../../API/UserAPI";
import { getPatientByUserId } from "../../services/Patient/PatientAPI";
import { showError, showSuccess } from "../../utils/toast";

import {
  FaUserInjured,
  FaUserMd,
  FaUserShield,
  FaEnvelope,
  FaLock,
  FaHeartbeat,
  FaArrowRight,
  FaShieldAlt,
  FaCalendarCheck,
} from "react-icons/fa";

import "../../Styles/Login.css";

function Login() {
  const navigate = useNavigate();

  const [role, setRole] = useState("patient");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL;
  const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

  const titles = {
    patient: "Patient Login",
    doctor: "Doctor Login",
    admin: "Admin Login",
  };

  const subtitles = {
    patient: "Access appointments, reports, billing, and AI health support.",
    doctor: "Manage patients, appointments, reports, and prescriptions.",
    admin: "Control departments, billing, reports, and hospital operations.",
  };

  const getFirstItem = (data) => {
    if (Array.isArray(data)) return data[0] || null;
    if (Array.isArray(data?.data)) return data.data[0] || null;
    if (Array.isArray(data?.data?.data)) return data.data.data[0] || null;
    return null;
  };

  const handleAdminLogin = (lowerEmail, loginPassword) => {
    if (lowerEmail === ADMIN_EMAIL && loginPassword === ADMIN_PASSWORD) {
      const adminData = {
        id: 1,
        name: "Admin",
        email: lowerEmail,
        role: "ADMIN",
      };

      localStorage.setItem("token", "admin-token");
      localStorage.setItem("user", JSON.stringify(adminData));
      localStorage.setItem("admin", JSON.stringify(adminData));

      showSuccess("Admin login successful");
      navigate("/admin");
    } else {
      showError("Invalid admin credentials");
    }
  };

  const handleDoctorLogin = async (lowerEmail, loginPassword) => {
    const doctors = await getDoctorByEmail(lowerEmail);
    const doctor = getFirstItem(doctors);

    if (!doctor) {
      showError("Doctor not found");
      return;
    }

    if (String(doctor.password || "").trim() !== loginPassword) {
      showError("Incorrect password");
      return;
    }

    const doctorData = {
      ...doctor,
      role: "DOCTOR",
    };

    localStorage.setItem("token", "doctor-token");
    localStorage.setItem("user", JSON.stringify(doctorData));
    localStorage.setItem("doctor", JSON.stringify(doctorData));

    showSuccess("Doctor login successful");
    navigate("/doctor");
  };

  const handlePatientLogin = async (lowerEmail, loginPassword) => {
    const users = await getUserByEmail(lowerEmail);
    const user = getFirstItem(users);

    if (!user) {
      showError("Patient email not found");
      return;
    }

    if (user.role?.toLowerCase() !== "patient") {
      showError("This account is not patient account");
      return;
    }

    if (String(user.password || "").trim() !== loginPassword) {
      showError("Incorrect patient password");
      return;
    }

    const patient = await getPatientByUserId(user.id);

    localStorage.setItem("token", "patient-token");
    localStorage.setItem("user", JSON.stringify({ ...user, role: "PATIENT" }));
    localStorage.setItem("userId", String(user.id));

    if (patient) {
      localStorage.setItem("patient", JSON.stringify(patient));
      showSuccess("Patient login successful");
      navigate("/patient");
    } else {
      localStorage.removeItem("patient");
      showSuccess("Complete patient profile");
      navigate("/patient/form");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const lowerEmail = email.trim().toLowerCase();
    const loginPassword = password.trim();

    try {
      if (role === "admin") {
        handleAdminLogin(lowerEmail, loginPassword);
        return;
      }

      if (role === "doctor") {
        await handleDoctorLogin(lowerEmail, loginPassword);
        return;
      }

      await handlePatientLogin(lowerEmail, loginPassword);
    } catch (error) {
      console.log("Login Error Full:", error);

      if (error.code === "ERR_NETWORK") {
        showError("API server is not running. Start server on port 8000");
      } else if (error.response?.status === 404) {
        showError("API route not found. Check users, doctors, patients.");
      } else {
        showError(error.message || "Login failed. Please try again.");
      }
    }
  };

  return (
    <div className="login-modern-page">
      <div className="login-shell">
        <section className="login-hero">
          <div className="login-logo-wrap">
            <div className="login-logo-icon">
              <FaHeartbeat />
            </div>

            <div>
              <h3 className="login-logo">MMCare-AI</h3>
              <p className="login-sub-title">Hospital System</p>
            </div>
          </div>

          <div className="login-hero-content">
            <div className="login-hero-badge">
              <FaHeartbeat />
              <span>Smart Digital Healthcare</span>
            </div>

            <h1>
              Smart Hospital Care, Powered by Better{" "}
              <span>Digital Experience</span>
            </h1>

            <p>
              Manage appointments, patient records, billing, reports, and AI
              health services through one modern hospital platform.
            </p>

            <div className="login-feature-list">
              <div className="login-feature-card">
                <FaCalendarCheck />
                <div>
                  <h4>24/7 Care Access</h4>
                  <p>Appointments, reports, and support in one place.</p>
                </div>
              </div>

              <div className="login-feature-card">
                <FaShieldAlt />
                <div>
                  <h4>Secure Hospital System</h4>
                  <p>Role-based access for patients, doctors, and admin.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="login-hero-glow"></div>
        </section>

        <section className="login-form-section">
          <div className="login-form-card">
            <div className="login-icon-circle">
              {role === "patient" && <FaUserInjured />}
              {role === "doctor" && <FaUserMd />}
              {role === "admin" && <FaUserShield />}
            </div>

            <div className="login-heading">
              <h2>{titles[role]}</h2>
              <p>{subtitles[role]}</p>
            </div>

            <div className="login-role-tabs">
              <button
                type="button"
                className={role === "patient" ? "active" : ""}
                onClick={() => setRole("patient")}
              >
                <FaUserInjured />
                Patient
              </button>

              <button
                type="button"
                className={role === "doctor" ? "active" : ""}
                onClick={() => setRole("doctor")}
              >
                <FaUserMd />
                Doctor
              </button>

              <button
                type="button"
                className={role === "admin" ? "active" : ""}
                onClick={() => setRole("admin")}
              >
                <FaUserShield />
                Admin
              </button>
            </div>

            <form onSubmit={handleLogin} className="login-form">
              <div className="login-input">
                <FaEnvelope />
                <input
                  type="email"
                  placeholder="Enter Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="login-input">
                <FaLock />
                <input
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="login-links-row">
                <Link to="/forgot-password">Forgot Password?</Link>
              </div>

              <button type="submit" className="login-submit-btn">
                Login to Dashboard
                <FaArrowRight />
              </button>
            </form>

            <div className="login-safe-box">
              <FaShieldAlt />
              <div>
                <h4>Your data is safe with us</h4>
                <p>
                  We use secure role-based access for your hospital account.
                </p>
              </div>
            </div>

            <div className="login-bottom">
              <span>Don’t have an account?</span>
              <Link to="/signup">Create New Account</Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Login;
