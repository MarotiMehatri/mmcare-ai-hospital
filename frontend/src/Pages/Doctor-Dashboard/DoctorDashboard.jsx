import React from "react";
import { Outlet } from "react-router-dom";
import DoctorLayout from "../../layout/DoctorLayout";
//import DoctorSidebar from "../../layout/DoctorSidebar";
import "../../Styles/Doctor/DoctorDashboard.css";
function DoctorDashboard() {
  //const navigate = useNavigate();
  return (
    <DoctorLayout>
      {/* Dashboard Wrapper */}
      <div className="doctor-dashboard">
        <main className="doctor-main">
          <div className="doctor-container">
            <section className="doctor-page-content">
              <Outlet />
            </section>
          </div>
        </main>
      </div>
    </DoctorLayout>
  );
}

export default DoctorDashboard;
