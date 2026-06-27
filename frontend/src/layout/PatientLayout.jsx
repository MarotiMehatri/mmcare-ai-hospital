import React from "react";
import PatientNavbar from "./PatientNavbar";

import { Outlet } from "react-router-dom";

function PatientLayout() {
  return (
    <div className="layout-full">
      {/* Navbar */}
      <PatientNavbar />

      {/* Main Content */}
      <div className="main-full">
        <div className="page-content-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default PatientLayout;
