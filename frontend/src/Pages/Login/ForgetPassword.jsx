import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEnvelope, FaKey } from "react-icons/fa";
import "../../Styles/Login1.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Password reset link demo sent to: ${email}`);
  };

  return (
    <div className="auth-page">
      <div className="auth-layout">
        <div className="auth-visual-panel">
          <img
            src="/AIDoctors/doctor2.png"
            alt="Doctor Support"
            className="auth-side-image"
          />
          <div className="auth-visual-overlay"></div>
          <div className="auth-visual-content">
            <div className="auth-brand-badge">
              <FaKey />
              <span>Password Recovery</span>
            </div>
            <h1>Recover Your Hospital Account Securely</h1>
            <p>
              Enter your registered email address to continue password recovery.
            </p>
          </div>
        </div>

        <div className="auth-form-panel">
          <div className="auth-form-card">
            <div className="auth-form-header">
              <h2 className="login-title">
                <FaKey />
                <span>Forgot Password</span>
              </h2>
              <p>Enter your email to continue the recovery process.</p>
            </div>

            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="input-group">
                <span className="input-icon">
                  <FaEnvelope />
                </span>
                <input
                  type="email"
                  placeholder="Enter Registered Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="login-btn">
                Send Reset Link
              </button>
            </form>

            <div className="auth-bottom-text">
              <Link to="/login" className="signup-link">
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
