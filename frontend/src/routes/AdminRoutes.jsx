import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminDashboard from "../Pages/Admin-Dashboard/AdminDashboard";
import AdminHome from "../Pages/Admin-Dashboard/AdminHome";
import AdminPatientsPage from "../Pages/Admin-Dashboard/AdminPatientsPage";
import AdminDoctorsPage from "../Pages/Admin-Dashboard/AdminDoctorsPage";
import AdminAppointmentsPage from "../Pages/Admin-Dashboard/AdminAppointmentsPage";
import AdminBillingPage from "../Pages/Admin-Dashboard/AdminBillingPage";
import AdminReportsPage from "../Pages/Admin-Dashboard/AdminReportsPage";
import AdminDepartmentsPage from "../Pages/Admin-Dashboard/AdminDepartmentsPage";

import ProtectedRoute from "../routes/ProtectedRoute";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminHome />} />
        <Route
          path="/patients"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "DOCTOR"]}>
              <AdminPatientsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctors"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminDoctorsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/appointments"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "DOCTOR"]}>
              <AdminAppointmentsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/billing"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminBillingPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reports"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "DOCTOR"]}>
              <AdminReportsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/departments"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminDepartmentsPage />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
