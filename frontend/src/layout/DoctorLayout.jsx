import React from "react";
import DcotorNavbar from "./DcotorNavbar";
import "../Styles/Doctor/DoctorLayouts.css";
function DoctorLayout({ children }) {
  return (
    <div className="doctor-layout">
      {/* Navbar */}
      <DcotorNavbar />

      {/* Main Layout */}
      <div className="doctor-layout-body">
        {/* Content Area */}
        <div className="doctor-layout-content">{children}</div>
      </div>
    </div>
  );
}

export default DoctorLayout;
