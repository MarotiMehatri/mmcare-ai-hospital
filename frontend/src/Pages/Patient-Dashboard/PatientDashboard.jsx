import React from "react";
import { Outlet } from "react-router-dom";
import "../../Styles/Patient/dashboard.css";
import PatientLayout from "./layout/Sidebar/PatientLayout";
import PatientSidebar from "./layout/Sidebar/PatientSidebar";
function PatientDashboard() {
  //const navigate = useNavigate();
  return (
    <PatientLayout>
      {/* Dashboard Wrapper */}
      <div className="patient-dashboard">
        {/* Sidebar */}
        <PatientSidebar />
        {/* Main Content Area */}
        <main className="patient-main">
          <div className="patient-container">
            <div className="patient-page-content">
              {/* Dynamic pages render here */}
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </PatientLayout>
  );
}

export default PatientDashboard;
