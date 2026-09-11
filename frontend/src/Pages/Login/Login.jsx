
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { getUserByEmail } from "../../api/UserAPI";
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
  FaEye,
  FaEyeSlash,
  FaSpinner,
} from "react-icons/fa";

import "../../Styles/Login1.css";

function Login() {
  const navigate = useNavigate();

  // =====================================================
  // STATE
  // =====================================================

  const [role, setRole] = useState("patient");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // =====================================================
  // ENV
  // =====================================================

  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL ||
    "http://localhost:8000";

  const ADMIN_EMAIL =
    import.meta.env.VITE_ADMIN_EMAIL;

  const ADMIN_PASSWORD =
    import.meta.env.VITE_ADMIN_PASSWORD;

  // =====================================================
  // ROLE CONFIG
  // =====================================================

  const titles = {
    patient: "Patient Login",
    doctor: "Doctor Login",
    admin: "Admin Login",
  };

  const subtitles = {
    patient:
      "Access appointments, reports, billing, and AI health support.",

    doctor:
      "Manage patients, appointments, reports, and prescriptions.",

    admin:
      "Control departments, billing, reports, and hospital operations.",
  };

  // =====================================================
  // GET FIRST API ITEM
  // =====================================================

  const getFirstItem = (data) => {
    if (Array.isArray(data)) {
      return data[0] || null;
    }

    if (Array.isArray(data?.data)) {
      return data.data[0] || null;
    }

    if (Array.isArray(data?.data?.data)) {
      return data.data.data[0] || null;
    }

    return null;
  };

  // =====================================================
  // GET ENTITY ID
  // =====================================================

  const getEntityId = (entity) => {
    if (!entity) {
      return null;
    }

    return (
      entity._id ||
      entity.id ||
      entity.userId ||
      entity.legacyId ||
      null
    );
  };

  // =====================================================
  // CLEAR OLD LOGIN DATA
  // =====================================================

  const clearLoginStorage = () => {
    localStorage.removeItem("token");

    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    localStorage.removeItem("userMongoId");
    localStorage.removeItem("userLegacyId");

    localStorage.removeItem("admin");

    localStorage.removeItem("doctor");
    localStorage.removeItem("doctorId");
    localStorage.removeItem("doctorMongoId");

    localStorage.removeItem("patient");
    localStorage.removeItem("patientId");
    localStorage.removeItem("patientMongoId");
  };

  // =====================================================
  // SAVE USER DATA
  // =====================================================

  const saveUserData = (userData) => {
    if (!userData) {
      return null;
    }

    const userId = getEntityId(userData);

    if (!userId) {
      console.error(
        "Unable to determine user ID:",
        userData
      );

      return null;
    }

    localStorage.setItem(
      "user",
      JSON.stringify(userData)
    );

    localStorage.setItem(
      "userId",
      String(userId)
    );

    localStorage.setItem(
      "userMongoId",
      String(userId)
    );

    if (userData.legacyId) {
      localStorage.setItem(
        "userLegacyId",
        String(userData.legacyId)
      );
    }

    return String(userId);
  };

  // =====================================================
  // ADMIN LOGIN
  // =====================================================

  const handleAdminLogin = (
    lowerEmail,
    loginPassword
  ) => {
    if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
      showError(
        "Admin credentials are not configured."
      );

      return false;
    }

    const configuredAdminEmail =
      ADMIN_EMAIL.trim().toLowerCase();

    if (
      lowerEmail === configuredAdminEmail &&
      loginPassword === ADMIN_PASSWORD
    ) {
      clearLoginStorage();

      const adminData = {
        id: 1,
        name: "Admin",
        email: lowerEmail,
        role: "ADMIN",
      };

      localStorage.setItem(
        "token",
        "admin-token"
      );

      localStorage.setItem(
        "user",
        JSON.stringify(adminData)
      );

      localStorage.setItem(
        "admin",
        JSON.stringify(adminData)
      );

      showSuccess(
        "Admin login successful"
      );

      navigate("/admin");

      return true;
    }

    showError(
      "Invalid admin credentials"
    );

    return false;
  };

  // =====================================================
  // DOCTOR LOGIN
  // =====================================================
  //
  // IMPORTANT:
  // Do NOT call GET /api/doctors and check doctor.password.
  //
  // Password is intentionally excluded from GET /api/doctors.
  //
  // Correct flow:
  //
  // POST /api/doctors/login
  // {
  //   email,
  //   password
  // }
  //
  // Backend:
  // - finds doctor
  // - loads hashed password
  // - bcrypt.compare()
  // - creates JWT
  // - removes password
  // - returns token + doctor
  //
  // =====================================================

  const handleDoctorLogin = async (
    lowerEmail,
    loginPassword
  ) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/doctors/login`,
        {
          email: lowerEmail,
          password: loginPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(
        "Doctor login API response:",
        response.data
      );

      if (!response.data?.success) {
        showError(
          response.data?.message ||
          "Doctor login failed."
        );

        return false;
      }

      // ---------------------------------------------------
      // GET TOKEN
      // ---------------------------------------------------

      const token =
        response.data?.token;

      if (!token) {
        console.error(
          "Doctor login succeeded but token is missing:",
          response.data
        );

        showError(
          "Login succeeded but authentication token was not returned."
        );

        return false;
      }

      // ---------------------------------------------------
      // GET DOCTOR DATA
      // ---------------------------------------------------

      const doctor =
        response.data?.doctor ||
        response.data?.data?.doctor ||
        response.data?.data;

      if (!doctor) {
        console.error(
          "Doctor data missing from login response:",
          response.data
        );

        showError(
          "Doctor information was not returned by the server."
        );

        return false;
      }

      console.log(
        "Authenticated doctor:",
        doctor
      );

      // ---------------------------------------------------
      // DOCTOR ID
      // ---------------------------------------------------

      const doctorId =
        getEntityId(doctor);

      if (!doctorId) {
        console.error(
          "Doctor ID missing:",
          doctor
        );

        showError(
          "Doctor ID not found."
        );

        return false;
      }

      // ---------------------------------------------------
      // CLEAR OLD LOGIN DATA
      // ---------------------------------------------------

      clearLoginStorage();

      // ---------------------------------------------------
      // CREATE SAFE DOCTOR DATA
      // ---------------------------------------------------

      const doctorData = {
        ...doctor,

        role: "DOCTOR",

        // Make IDs consistently available
        _id: doctor._id
          ? String(doctor._id)
          : String(doctorId),

        id: doctor.id
          ? String(doctor.id)
          : String(doctorId),
      };

      // Never store password even if backend accidentally
      // sends it.
      delete doctorData.password;

      // ---------------------------------------------------
      // SAVE JWT TOKEN
      // ---------------------------------------------------

      localStorage.setItem(
        "token",
        String(token)
      );

      // ---------------------------------------------------
      // SAVE USER
      // ---------------------------------------------------

      localStorage.setItem(
        "user",
        JSON.stringify(doctorData)
      );

      // ---------------------------------------------------
      // SAVE USER ID
      // ---------------------------------------------------

      localStorage.setItem(
        "userId",
        String(doctorId)
      );

      // ---------------------------------------------------
      // SAVE DOCTOR MONGO ID
      // ---------------------------------------------------

      localStorage.setItem(
        "doctorMongoId",
        String(doctor._id || doctorId)
      );

      // ---------------------------------------------------
      // SAVE DOCTOR OBJECT
      // ---------------------------------------------------

      localStorage.setItem(
        "doctor",
        JSON.stringify(doctorData)
      );

      // ---------------------------------------------------
      // SAVE LEGACY DOCTOR ID
      // ---------------------------------------------------

      if (doctor.legacyId) {
        localStorage.setItem(
          "doctorId",
          String(doctor.legacyId)
        );

        localStorage.setItem(
          "userLegacyId",
          String(doctor.legacyId)
        );
      } else if (doctor.id) {
        localStorage.setItem(
          "doctorId",
          String(doctor.id)
        );
      }

      // ---------------------------------------------------
      // SUCCESS
      // ---------------------------------------------------

      showSuccess(
        "Doctor login successful"
      );

      navigate("/doctor");

      return true;
    } catch (error) {
      console.error(
        "Doctor Login Error:",
        error
      );

      // ---------------------------------------------------
      // AXIOS NETWORK ERROR
      // ---------------------------------------------------

      if (
        error?.code === "ERR_NETWORK"
      ) {
        showError(
          "API server is not running. Start backend on port 8000."
        );

        return false;
      }

      // ---------------------------------------------------
      // 400
      // ---------------------------------------------------

      if (
        error?.response?.status === 400
      ) {
        showError(
          error?.response?.data?.message ||
          "Email and password are required."
        );

        return false;
      }

      // ---------------------------------------------------
      // 401
      // ---------------------------------------------------

      if (
        error?.response?.status === 401
      ) {
        showError(
          error?.response?.data?.message ||
          "Invalid doctor email or password."
        );

        return false;
      }

      // ---------------------------------------------------
      // 403
      // ---------------------------------------------------

      if (
        error?.response?.status === 403
      ) {
        showError(
          error?.response?.data?.message ||
          "Doctor account is not authorized."
        );

        return false;
      }

      // ---------------------------------------------------
      // 404
      // ---------------------------------------------------

      if (
        error?.response?.status === 404
      ) {
        showError(
          "Doctor login API route not found. Check /api/doctors/login."
        );

        return false;
      }

      // ---------------------------------------------------
      // 500
      // ---------------------------------------------------

      if (
        error?.response?.status >= 500
      ) {
        showError(
          error?.response?.data?.message ||
          "Server error. Please try again later."
        );

        return false;
      }

      // ---------------------------------------------------
      // DEFAULT
      // ---------------------------------------------------

      showError(
        error?.response?.data?.message ||
        error?.message ||
        "Doctor login failed. Please try again."
      );

      return false;
    }
  };

  // =====================================================
  // PATIENT LOGIN
  // =====================================================

  const handlePatientLogin = async (
    lowerEmail,
    loginPassword
  ) => {
    try {
      // ---------------------------------------------------
      // GET USER BY EMAIL
      // ---------------------------------------------------

      const users =
        await getUserByEmail(lowerEmail);

      console.log(
        "Patient user API response:",
        users
      );

      const user =
        getFirstItem(users);

      if (!user) {
        showError(
          "Patient email not found"
        );

        return false;
      }

      console.log(
        "Patient user:",
        user
      );

      // ---------------------------------------------------
      // CHECK ROLE
      // ---------------------------------------------------

      const userRole = String(
        user.role || ""
      )
        .trim()
        .toLowerCase();

      if (userRole !== "patient") {
        showError(
          "This account is not a patient account"
        );

        return false;
      }

      // ---------------------------------------------------
      // PASSWORD
      // ---------------------------------------------------
      //
      // NOTE:
      // This is kept compatible with your current patient
      // API. For production, patient login should also use
      // a dedicated POST login endpoint rather than
      // returning passwords from GET APIs.
      //
      // ---------------------------------------------------

      if (!user.password) {
        console.error(
          "Patient password missing:",
          user
        );

        showError(
          "Patient password missing from API response."
        );

        return false;
      }

      if (
        String(user.password).trim() !==
        loginPassword
      ) {
        showError(
          "Incorrect patient password"
        );

        return false;
      }

      // ---------------------------------------------------
      // GET PATIENT USER ID
      // ---------------------------------------------------

      const userId =
        user._id ||
        user.id ||
        user.userId ||
        user.legacyId;

      console.log(
        "Resolved patient userId:",
        userId
      );

      if (!userId) {
        showError(
          "Patient user ID not found."
        );

        console.error(
          "Patient user has no valid ID:",
          user
        );

        return false;
      }

      // ---------------------------------------------------
      // FIND PATIENT PROFILE
      // ---------------------------------------------------

      let patient = null;

      try {
        patient =
          await getPatientByUserId(
            String(userId)
          );

        console.log(
          "Patient profile API response:",
          patient
        );
      } catch (patientError) {
        console.warn(
          "Patient profile lookup failed:",
          patientError
        );

        patient = null;
      }

      // ---------------------------------------------------
      // CLEAR OLD LOGIN DATA
      // ---------------------------------------------------

      clearLoginStorage();

      // ---------------------------------------------------
      // CREATE PATIENT USER
      // ---------------------------------------------------

      const patientUser = {
        ...user,

        role: "PATIENT",

        id: String(userId),

        _id: String(userId),
      };

      // Never store password in localStorage
      delete patientUser.password;

      // ---------------------------------------------------
      // SAVE TOKEN
      // ---------------------------------------------------

      localStorage.setItem(
        "token",
        "patient-token"
      );

      // ---------------------------------------------------
      // SAVE USER
      // ---------------------------------------------------

      localStorage.setItem(
        "user",
        JSON.stringify(patientUser)
      );

      // ---------------------------------------------------
      // SAVE USER ID
      // ---------------------------------------------------

      localStorage.setItem(
        "userId",
        String(userId)
      );

      localStorage.setItem(
        "userMongoId",
        String(userId)
      );

      // ---------------------------------------------------
      // SAVE LEGACY ID
      // ---------------------------------------------------

      if (user.legacyId) {
        localStorage.setItem(
          "userLegacyId",
          String(user.legacyId)
        );
      }

      // ---------------------------------------------------
      // PATIENT PROFILE EXISTS
      // ---------------------------------------------------

      if (patient) {
        const patientId =
          getEntityId(patient);

        const patientData = {
          ...patient,
        };

        if (patientId) {
          patientData.id =
            String(patientId);

          patientData._id =
            String(patientId);

          localStorage.setItem(
            "patientId",
            String(patientId)
          );

          localStorage.setItem(
            "patientMongoId",
            String(patientId)
          );
        }

        localStorage.setItem(
          "patient",
          JSON.stringify(patientData)
        );

        showSuccess(
          "Patient login successful"
        );

        console.log(
          "LOGIN SUCCESS",
          {
            userId,
            patientId,
            user: patientUser,
            patient: patientData,
          }
        );

        navigate("/patient");

        return true;
      }

      // ---------------------------------------------------
      // PATIENT PROFILE DOES NOT EXIST
      // ---------------------------------------------------

      localStorage.removeItem(
        "patient"
      );

      localStorage.removeItem(
        "patientId"
      );

      localStorage.removeItem(
        "patientMongoId"
      );

      showSuccess(
        "Login successful. Complete your patient profile."
      );

      navigate("/patient/form");

      return true;
    } catch (error) {
      console.error(
        "Patient Login Error:",
        error
      );

      throw error;
    }
  };

  // =====================================================
  // MAIN LOGIN
  // =====================================================

  const handleLogin = async (e) => {
    e.preventDefault();

    if (loading) {
      return;
    }

    // ---------------------------------------------------
    // NORMALIZE INPUT
    // ---------------------------------------------------

    const lowerEmail =
      email.trim().toLowerCase();

    const loginPassword =
      password;

    // ---------------------------------------------------
    // VALIDATION
    // ---------------------------------------------------

    if (!lowerEmail) {
      showError(
        "Please enter your email"
      );

      return;
    }

    if (!loginPassword) {
      showError(
        "Please enter your password"
      );

      return;
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(lowerEmail)) {
      showError(
        "Please enter a valid email address"
      );

      return;
    }

    // ---------------------------------------------------
    // START LOADING
    // ---------------------------------------------------

    setLoading(true);

    try {
      // -------------------------------------------------
      // ADMIN
      // -------------------------------------------------

      if (role === "admin") {
        handleAdminLogin(
          lowerEmail,
          loginPassword
        );

        return;
      }

      // -------------------------------------------------
      // DOCTOR
      // -------------------------------------------------

      if (role === "doctor") {
        await handleDoctorLogin(
          lowerEmail,
          loginPassword
        );

        return;
      }

      // -------------------------------------------------
      // PATIENT
      // -------------------------------------------------

      await handlePatientLogin(
        lowerEmail,
        loginPassword
      );
    } catch (error) {
      console.error(
        "Login Error Full:",
        error
      );

      // -------------------------------------------------
      // NETWORK
      // -------------------------------------------------

      if (
        error?.code ===
        "ERR_NETWORK"
      ) {
        showError(
          "API server is not running. Start backend on port 8000."
        );

        return;
      }

      // -------------------------------------------------
      // 401
      // -------------------------------------------------

      if (
        error?.response?.status === 401
      ) {
        showError(
          error?.response?.data?.message ||
          "Invalid email or password"
        );

        return;
      }

      // -------------------------------------------------
      // 403
      // -------------------------------------------------

      if (
        error?.response?.status === 403
      ) {
        showError(
          error?.response?.data?.message ||
          "You are not authorized to login."
        );

        return;
      }

      // -------------------------------------------------
      // 404
      // -------------------------------------------------

      if (
        error?.response?.status === 404
      ) {
        showError(
          error?.response?.data?.message ||
          "API route not found. Check backend routes."
        );

        return;
      }

      // -------------------------------------------------
      // 409
      // -------------------------------------------------

      if (
        error?.response?.status === 409
      ) {
        showError(
          error?.response?.data?.message ||
          "Account already exists."
        );

        return;
      }

      // -------------------------------------------------
      // 500
      // -------------------------------------------------

      if (
        error?.response?.status >= 500
      ) {
        showError(
          error?.response?.data?.message ||
          "Server error. Please try again later."
        );

        return;
      }

      // -------------------------------------------------
      // DEFAULT
      // -------------------------------------------------

      showError(
        error?.response?.data?.message ||
        error?.message ||
        "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // ROLE CHANGE
  // =====================================================

  const handleRoleChange = (
    newRole
  ) => {
    if (loading) {
      return;
    }

    setRole(newRole);
    setEmail("");
    setPassword("");
    setShowPassword(false);
  };

  // =====================================================
  // ROLE ICON
  // =====================================================

  const getRoleIcon = (
    currentRole
  ) => {
    if (currentRole === "doctor") {
      return <FaUserMd />;
    }

    if (currentRole === "admin") {
      return <FaUserShield />;
    }

    return <FaUserInjured />;
  };

  // =====================================================
  // JSX
  // =====================================================

  return (
    <div className="login-page">

      {/* =================================================
          LEFT / BRAND SECTION
      ================================================= */}

      <div className="login-brand-section">

        <div className="login-brand-content">

          <div className="login-brand-logo">

            <div className="login-brand-icon">
              <FaHeartbeat />
            </div>

            <div>
              <h1>MMCare</h1>
              <span>AI Hospital</span>
            </div>

          </div>

          <div className="login-brand-heading">

            <span className="login-small-label">
              <FaShieldAlt />
              Secure Healthcare Platform
            </span>

            <h2>
              Smart Healthcare.
              <br />
              <strong>Better Care.</strong>
            </h2>

            <p>
              A modern hospital management
              platform connecting patients,
              doctors, and hospital
              administration in one place.
            </p>

          </div>

          <div className="login-feature-list">

            <div className="login-feature-item">

              <div className="login-feature-icon">
                <FaCalendarCheck />
              </div>

              <div>
                <strong>
                  Easy Appointment Management
                </strong>

                <span>
                  Book and manage appointments
                  easily.
                </span>
              </div>

            </div>

            <div className="login-feature-item">

              <div className="login-feature-icon">
                <FaHeartbeat />
              </div>

              <div>
                <strong>
                  AI Health Support
                </strong>

                <span>
                  Get intelligent health insights
                  and assistance.
                </span>
              </div>

            </div>

            <div className="login-feature-item">

              <div className="login-feature-icon">
                <FaShieldAlt />
              </div>

              <div>
                <strong>
                  Secure Patient Data
                </strong>

                <span>
                  Your healthcare information is
                  protected.
                </span>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* =================================================
          RIGHT LOGIN SECTION
      ================================================= */}

      <div className="login-form-section">

        <div className="login-form-container">

          <div className="login-form-header">

            <div className="login-mobile-logo">

              <div className="login-brand-icon">
                <FaHeartbeat />
              </div>

              <div>
                <h1>MMCare</h1>
                <span>AI Hospital</span>
              </div>

            </div>

            <div className="login-role-icon">
              {getRoleIcon(role)}
            </div>

            <h2>
              {titles[role]}
            </h2>

            <p>
              {subtitles[role]}
            </p>

          </div>

          {/* =================================================
              ROLE SELECTOR
          ================================================= */}

          <div className="login-role-selector">

            <button
              type="button"
              className={
                role === "patient"
                  ? "login-role-button active"
                  : "login-role-button"
              }
              onClick={() =>
                handleRoleChange(
                  "patient"
                )
              }
              disabled={loading}
            >
              <FaUserInjured />

              <span>
                Patient
              </span>
            </button>

            <button
              type="button"
              className={
                role === "doctor"
                  ? "login-role-button active"
                  : "login-role-button"
              }
              onClick={() =>
                handleRoleChange(
                  "doctor"
                )
              }
              disabled={loading}
            >
              <FaUserMd />

              <span>
                Doctor
              </span>
            </button>

            <button
              type="button"
              className={
                role === "admin"
                  ? "login-role-button active"
                  : "login-role-button"
              }
              onClick={() =>
                handleRoleChange(
                  "admin"
                )
              }
              disabled={loading}
            >
              <FaUserShield />

              <span>
                Admin
              </span>
            </button>

          </div>

          {/* =================================================
              LOGIN FORM
          ================================================= */}

          <form
            className="login-form"
            onSubmit={handleLogin}
          >

            {/* EMAIL */}

            <div className="login-input-group">

              <label htmlFor="login-email">
                Email Address
              </label>

              <div className="login-input-wrapper">

                <FaEnvelope className="login-input-icon" />

                <input
                  id="login-email"
                  type="email"
                  placeholder={
                    role === "admin"
                      ? "Enter admin email"
                      : `Enter ${role} email`
                  }
                  value={email}
                  onChange={(e) =>
                    setEmail(
                      e.target.value
                    )
                  }
                  autoComplete="email"
                  disabled={loading}
                  required
                />

              </div>

            </div>

            {/* PASSWORD */}

            <div className="login-input-group">

              <div className="login-password-label-row">

                <label htmlFor="login-password">
                  Password
                </label>

                {role !== "admin" && (
                  <Link
                    to="/forgot-password"
                    className="login-forgot-link"
                  >
                    Forgot Password?
                  </Link>
                )}

              </div>

              <div className="login-input-wrapper">

                <FaLock className="login-input-icon" />

                <input
                  id="login-password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) =>
                    setPassword(
                      e.target.value
                    )
                  }
                  autoComplete="current-password"
                  disabled={loading}
                  required
                />

                <button
                  type="button"
                  className="login-password-toggle"
                  onClick={() =>
                    setShowPassword(
                      (prev) => !prev
                    )
                  }
                  disabled={loading}
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? (
                    <FaEyeSlash />
                  ) : (
                    <FaEye />
                  )}
                </button>

              </div>

            </div>

            {/* REMEMBER */}

            <div className="login-options">

              <label className="login-remember">

                <input
                  type="checkbox"
                  disabled={loading}
                />

                <span>
                  Remember me
                </span>

              </label>

            </div>

            {/* SUBMIT */}

            <button
              type="submit"
              className="login-submit-button"
              disabled={loading}
            >

              {loading ? (
                <>
                  <FaSpinner className="login-spinner" />

                  <span>
                    Signing in...
                  </span>
                </>
              ) : (
                <>
                  <span>
                    Sign In
                  </span>

                  <FaArrowRight />
                </>
              )}

            </button>

          </form>

          {/* REGISTER */}

          {role === "patient" && (
            <div className="login-register-section">

              <span>
                Don't have an account?
              </span>

              <Link to="/signup">
                Create Patient Account
              </Link>

            </div>
          )}

          {/* SECURITY */}

          <div className="login-security-note">

            <FaShieldAlt />

            <span>
              Your information is protected
              using secure authentication.
            </span>

          </div>

          {/* FOOTER */}

          <div className="login-footer">

            <span>
              © {new Date().getFullYear()}
              {" "}MMCare AI Hospital
            </span>

            <div className="login-footer-links">

              <Link to="/privacy">
                Privacy
              </Link>

              <Link to="/terms">
                Terms
              </Link>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;
