import React from "react";
import { Outlet } from "react-router-dom";
import AdminLayout from "../../layout/AdminLayout";
function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="admin-dashboard-page">
        <Outlet />
      </div>
    </AdminLayout>
  );
}

export default AdminDashboard;
