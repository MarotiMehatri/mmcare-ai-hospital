import React from "react";
import AIHealthSidebar from "./AIHealthSidebar";
import AIHealthHeader from "./AIHealthHeader";
import { Outlet } from "react-router-dom";
import "../Styles/AI/AIHealthLayout.css";
function AIHealthLayout() {
  return (
    <div className="ai-health-layout">
      {/* <AIHealthSidebar /> */}

      <div className="ai-health-main">
        <AIHealthHeader />
        <div className="ai-health-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AIHealthLayout;
