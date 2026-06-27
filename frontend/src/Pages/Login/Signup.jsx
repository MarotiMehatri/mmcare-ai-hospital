import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signupSchema } from "../../validations/signupValidation";
import { createUser, getUserByEmail } from "../../api/UserAPI";
import {
  FaUser,
  FaEnvelope,
  FaTint,
  FaVenusMars,
  FaLock,
  FaCalendarAlt,
  FaHeartbeat,
  FaShieldAlt,
  FaCalendarCheck,
  FaUserShield,
  FaArrowRight,
} from "react-icons/fa";
import { toast } from "react-toastify";
import "../../Styles/Signup.css";

function Signup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const existing = await getUserByEmail(data.email);

      const existingUsers = Array.isArray(existing)
        ? existing
        : Array.isArray(existing?.data)
          ? existing.data
          : Array.isArray(existing?.data?.data)
            ? existing.data.data
            : [];

      if (existingUsers.length > 0) {
        toast.error("Email already registered");
        return;
      }

      const newUser = {
        fullName: data.fullName,
        email: data.email.toLowerCase().trim(),
        dob: data.dob,
        bloodGroup: data.bloodGroup,
        gender: data.gender,
        password: data.password,
        role: "PATIENT",
      };

      const res = await createUser(newUser);

      localStorage.setItem("userId", String(res?.data?.id));

      toast.success("Signup successful");
      navigate("/login");
    } catch (error) {
      console.error("Signup Error:", error);
      toast.error("Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-modern-page">
      <div className="signup-shell">
        <section className="signup-hero">
          <div className="signup-logo">
            <div className="signup-logo-icon">
              <FaHeartbeat />
            </div>
            <div className="logo-content">
              <h3 className="logo">MMCare</h3>
              <p className="sub-title">Hospital System</p>
            </div>
          </div>

          <div className="signup-hero-text">
            <h1>
              Create Your <span>Patient Account</span>
            </h1>
            <p>
              Join MMCare Hospital System and manage appointments, medical
              reports, billing, and healthcare services in one secure platform.
            </p>
          </div>

          <div className="signup-features">
            <div className="signup-feature">
              <FaShieldAlt />
              <div>
                <h4>Secure & Private</h4>
                <p>Your data is encrypted and protected.</p>
              </div>
            </div>

            <div className="signup-feature">
              <FaCalendarCheck />
              <div>
                <h4>Easy Management</h4>
                <p>Manage appointments and reports easily.</p>
              </div>
            </div>

            <div className="signup-feature">
              <FaUserShield />
              <div>
                <h4>Better Healthcare</h4>
                <p>Quality care with digital support.</p>
              </div>
            </div>
          </div>

          <div className="signup-glow"></div>
        </section>

        <section className="signup-card">
          <div className="signup-card-header">
            <div className="signup-card-icon">
              <FaUser />
            </div>
            <h2>Create Account</h2>
            <p>
              Join the <span>hospital management</span> system.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="signup-form">
            <div className="signup-input">
              <FaUser />
              <input placeholder="Full Name" {...register("fullName")} />
              <small>{errors.fullName?.message}</small>
            </div>

            <div className="signup-input">
              <FaEnvelope />
              <input
                type="email"
                placeholder="Email Address"
                {...register("email")}
              />
              <small>{errors.email?.message}</small>
            </div>

            <div className="signup-input">
              <FaCalendarAlt />
              <input type="date" {...register("dob")} />
              <small>{errors.dob?.message}</small>
            </div>

            <div className="signup-input">
              <FaTint />
              <select {...register("bloodGroup")}>
                <option value="">Select Blood Group</option>
                <option>A+</option>
                <option>O+</option>
                <option>B+</option>
                <option>AB+</option>
                <option>A-</option>
                <option>O-</option>
                <option>B-</option>
                <option>AB-</option>
              </select>
              <small>{errors.bloodGroup?.message}</small>
            </div>

            <div className="signup-input">
              <FaVenusMars />
              <select {...register("gender")}>
                <option value="">Select Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
              <small>{errors.gender?.message}</small>
            </div>

            <div className="signup-input">
              <FaLock />
              <input
                type="password"
                placeholder="Create Password"
                {...register("password")}
              />
              <small>{errors.password?.message}</small>
            </div>

            <div className="signup-input signup-full">
              <FaLock />
              <input
                type="password"
                placeholder="Confirm Password"
                {...register("confirmPassword")}
              />
              <small>{errors.confirmPassword?.message}</small>
            </div>

            <button className="signup-btn signup-full" disabled={loading}>
              {loading ? "Creating Account..." : "Create Account"}
              <FaArrowRight />
            </button>
          </form>

          <div className="signup-safe-box">
            <FaShieldAlt />
            <div>
              <h4>Your information is safe with us</h4>
              <p>We use advanced security to protect your data.</p>
            </div>
          </div>

          <div className="signup-bottom">
            Already have an account?
            <Link to="/login">Back to Login</Link>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Signup;
