import React from "react";
import { FaFileMedicalAlt } from "react-icons/fa";

import "../../Styles/Doctor/EmptyReportsState.css";

function EmptyReportsState() {
  return (
    <div className="empty-reports-state">
      <FaFileMedicalAlt />

      <h3>No Medical Reports Found</h3>

      <p>
        There are currently no medical reports available. Upload a new report to
        store it in the backend database and manage it from the reports
        dashboard.
      </p>

      <div className="empty-reports-action">
        <button className="empty-reports-btn">Upload First Report</button>
      </div>
    </div>
  );
}

export default EmptyReportsState;
