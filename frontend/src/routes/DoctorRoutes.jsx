import React from "react";
import DoctorLayout from "../layout/DoctorLayout";
import { Route, Routes } from "react-router-dom";
import DoctorHome from "../Pages/Doctor-Dashboard/DoctorHome";
import DoctorProfile from "../Pages/Doctor-Dashboard/DoctorProfile";
import DoctorDashboard from "../Pages/Doctor-Dashboard/DoctorDashboard";
import DoctorChatPages from "../Pages/Doctor-Dashboard/DoctorChatPages";
import DoctorPrescriptionPage from "../Pages/Doctor-Dashboard/DoctorPrescriprionsPage";
import CreatePrescriptionPage from "../Pages/Doctor-Dashboard/CreatePrescriptionPage";
import DoctorAppointmentsPage from "../Pages/Doctor-Dashboard/DoctorAppointmetsPage";
import DoctorMedicalReportsPage from "../Pages/Doctor-Dashboard/DoctorMedicalReportsPage";
import ProtectedRoute from "./ProtectedRoute";
import DoctorPayments from "../Pages/Doctor-Dashboard/DoctorPayments";
import CreatePaymentsPage from "../component/Doctor/CreatePaymentsPage";

const DoctorRoutes = () => {
  return (
    <Routes>
      <Route
        element={
          <ProtectedRoute allowedRoles={["DOCTOR"]}>
            <DoctorDashboard />
          </ProtectedRoute>
        }
      >
        <Route index element={<DoctorHome />} />
        <Route
          path="profile/:id"
          element={
            <ProtectedRoute allowedRoles={["DOCTOR", "ADMIN"]}>
              <DoctorProfile />
            </ProtectedRoute>
          }
        />
        {/* <Route path="schedule" element={<DoctorSchedule />} /> */}
        <Route
          path="appointments"
          element={
            <ProtectedRoute allowedRoles={["DOCTOR", "ADMIN"]}>
              <DoctorAppointmentsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="chat"
          element={
            <ProtectedRoute allowedRoles={["DOCTOR"]}>
              <DoctorChatPages />
            </ProtectedRoute>
          }
        />
        {/* <Route path="patients" element={<PatientListPage />} /> */}
        <Route
          path="medical-reports"
          element={
            <ProtectedRoute allowedRoles={["DOCTOR", "ADMIN"]}>
              <DoctorMedicalReportsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="prescriptions"
          element={
            <ProtectedRoute allowedRoles={["DOCTOR"]}>
              <DoctorPrescriptionPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="create-prescriptions"
          element={
            <ProtectedRoute allowedRoles={["DOCTOR"]}>
              <CreatePrescriptionPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="payments"
          element={
            <ProtectedRoute allowedRoles={["DOCTOR"]}>
              <DoctorPayments />
            </ProtectedRoute>
          }
        />
        <Route
          path="create-payment"
          element={
            <ProtectedRoute allowedRoles={["DOCTOR"]}>
              <CreatePaymentsPage />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
};

export default DoctorRoutes;
