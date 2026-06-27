import React from "react";
import "../Unauthorized/Unauthorized.css";

const Unauthorized = () => {
  return (
    <div className="unauthorized-page">
      <div className="unauthorized-card">
        <h1>403</h1>

        <h2>Unauthorized Access</h2>

        <p>You do not have permission to access this page.</p>

        <button onClick={() => window.history.back()}>Go Back</button>
      </div>
    </div>
  );
};

export default Unauthorized;
