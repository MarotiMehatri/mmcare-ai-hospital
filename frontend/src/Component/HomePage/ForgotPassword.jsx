import React, { useState } from "react";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleReset = () => {
    alert("Password reset link sent to: " + email);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Forgot Password</h2>

        <input
          type="email"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <button onClick={handleReset}>Send Reset Link</button>
      </div>
    </div>
  );
}

export default ForgotPassword;
