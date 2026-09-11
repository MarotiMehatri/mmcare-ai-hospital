import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import PatientHome from "../Pages/Patient-Dashboard/PatientHome";
import PatientForm from "../Pages/Patient-Dashboard/PatientForm";
import PatientProfile from "../Pages/Patient-Dashboard/PatientProfile";

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
import PatientPaymentsPage from "../Pages/Patient-Dashboard/PatientPaymentsPage";

import ProtectedRoute from "./ProtectedRoute";
import PageLoader from "../Component/loaders/PageLoader";
import PatientSettings from "../Pages/Patient-Dashboard/PatientSettings";

function PatientRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>

        {/* ======================================================
            PUBLIC ROUTE
            ====================================================== */}

        <Route
          path="forgot-password"
          element={<ForgotPassword />}
        />

        {/* ======================================================
            PROTECTED PATIENT ROUTES
            ====================================================== */}

        <Route
          element={
            <ProtectedRoute allowedRoles={["PATIENT"]}>
              <PatientLayout />
            </ProtectedRoute>
          }
        >
          {/* ==================================================
              PATIENT HOME
              /patient
              ================================================== */}

          <Route
            index
            element={<PatientHome />}
          />

          {/* ==================================================
              PATIENT FORM
              /patient/form
              ================================================== */}

          <Route
            path="form"
            element={<PatientForm />}
          />

          {/* ==================================================
              PATIENT PROFILE
              /patient/profile/:id
              ================================================== */}

          <Route
            path="profile/:id"
            element={<PatientProfile />}
          />

          {/* ==================================================
              APPOINTMENTS
              /patient/appointments
              ================================================== */}

          <Route
            path="appointments"
            element={<PatientAppointmentsPage />}
          />

          {/* ==================================================
              MEDICAL REPORTS
              /patient/medical-reports
              ================================================== */}

          <Route
            path="medical-reports"
            element={<PatientMedicalReportsPage />}
          />

          {/* ==================================================
              MEDICAL HISTORY
              /patient/medical-history
              ================================================== */}

          <Route
            path="medical-history"
            element={<PatientMedicalHistoryPage />}
          />

          {/* ==================================================
              HEALTH SUMMARY
              /patient/health-summary
              ================================================== */}

          <Route
            path="health-summary"
            element={<PatientHealthSummaryPage />}
          />

          {/* ==================================================
              BOOK APPOINTMENT
              /patient/book-appointment
              ================================================== */}

          <Route
            path="book-appointment"
            element={<PatientBookAppointmentPage />}
          />

          {/* ==================================================
              PAYMENTS
              /patient/payments
              ================================================== */}

          <Route
            path="payments"
            element={<PatientPaymentsPage />}
          />

          {/* ==================================================
              AI CHAT
              /patient/ai-chat
              ================================================== */}

          <Route
            path="ai-chat"
            element={<AIQuickAssistant />}
          />

          {/* ==================================================
              PATIENT CHAT
              /patient/patient-chat
              ================================================== */}

          <Route
            path="patient-chat"
            element={<PatientChatPages />}
          />

          {/* ==================================================
              PRESCRIPTIONS
              /patient/prescriptions
              ================================================== */}

          <Route
            path="prescriptions"
            element={<PatientPrescriptionHistoryPage />}
          />
        </Route>

        <Route path="Settings" element={<PatientSettings />} />
      </Routes>
    </Suspense>
  );
}

export default PatientRoutes;
