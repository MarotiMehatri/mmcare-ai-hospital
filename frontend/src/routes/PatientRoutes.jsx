import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import PatientHome from "../Pages/Patient-Dashboard/PatientHome";
import PatientForm from "../Pages/Patient-Dashboard/PatientForm";
import PatientProfile from "../Pages/Patient-Dashboard/PatientProfile";
// import BookAppointment from "../Pages/Patient-Dashboard/BookAppointment";
import AIQuickAssistant from "../Component/Patient/AIQuickAssistant";
import ForgotPassword from "../Pages/Login/ForgetPassword";
import PatientChatPages from "../Pages/Patient-Dashboard/PatientChatPages";
import PatientLayout from "../layout/PatientLayout";
import PatientPrescriptionHistoryPage from "../Pages/Patient-Dashboard/PatientPrescriptionHistoryPage";
import PatientMedicalReportsPage from "../Pages/Patient-Dashboard/PatientMedicalReportsPage";
import PatientMedicalHistoryPage from "../Pages/Patient-Dashboard/PatientMedicalHistoryPage";
import PatientHealthSummaryPage from "../Pages/Patient-Dashboard/PatientHealthSummaryPage";
import PatientAppointmentsPage from "../Pages/Patient-Dashboard/PatientAppointmentsPage";
import PatientBookAppointmentPage from "../Pages/Patient-Dashboard/PatientBookAppointmentPage";

import ProtectedRoute from "./ProtectedRoute";
import PageLoader from "../Component/loaders/PageLoader";
import PatientPaymentsPage from "../Pages/Patient-Dashboard/PatientPaymentsPage";

function PatientRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route
          element={
            <ProtectedRoute allowedRoles={["PATIENT"]}>
              <PatientLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<PatientHome />} />
          <Route
            path="form"
            element={
              <ProtectedRoute allowedRoles={["PATIENT"]}>
                <PatientForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="profile/:id"
            element={
              <ProtectedRoute allowedRoles={["PATIENT"]}>
                <PatientProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="appointments"
            element={
              <ProtectedRoute allowedRoles={["PATIENT", "DOCTOR", "ADMIN"]}>
                <PatientAppointmentsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="medical-reports"
            element={
              <ProtectedRoute allowedRoles={["PATIENT", "DOCTOR", "ADMIN"]}>
                <PatientMedicalReportsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="medical-history"
            element={
              <ProtectedRoute allowedRoles={["PATIENT", "DOCTOR"]}>
                <PatientMedicalHistoryPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="health-summary"
            element={
              <ProtectedRoute allowedRoles={["PATIENT", "DOCTOR"]}>
                <PatientHealthSummaryPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="book-appointment"
            element={
              <ProtectedRoute allowedRoles={["PATIENT"]}>
                <PatientBookAppointmentPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="payments"
            element={
              <ProtectedRoute allowedRoles={["PATIENT", "ADMIN"]}>
                <PatientPaymentsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="ai-chat"
            element={
              <ProtectedRoute allowedRoles={["PATIENT", "DOCTOR"]}>
                <AIQuickAssistant />
              </ProtectedRoute>
            }
          />
          <Route
            path="Patient-chat"
            element={
              <ProtectedRoute allowedRoles={["PATIENT", "DOCTOR"]}>
                <PatientChatPages />
              </ProtectedRoute>
            }
          />
          <Route
            path="prescriptions"
            element={
              <ProtectedRoute allowedRoles={["PATIENT", "DOCTOR"]}>
                <PatientPrescriptionHistoryPage />
              </ProtectedRoute>
            }
          />
          <Route path="forgot-password" element={<ForgotPassword />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default PatientRoutes;
