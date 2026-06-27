import React from "react";
import AdminNavbar from "./AdminNavbar";
import "../Styles/Admin/AdminLayout.css";
function AdminLayout({ children }) {
  return (
    <div className="admin-layout">
      <AdminNavbar />
      <main className="admin-layout-main">
        <div className="admin-layout-container">{children}</div>
      </main>
    </div>
  );
}

export default AdminLayout;
