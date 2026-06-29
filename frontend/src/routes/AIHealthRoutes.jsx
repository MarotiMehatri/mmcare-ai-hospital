import React from "react";
import { Route, Routes } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";

import AIHealthLayout from "../layout/AIHealthLayout";
import AIHealthAssistantPage from "../Pages/AI-Dashboard/AIHealthAssistantPage";
import AIChatPage from "../Pages/AI-Dashboard/AIChatPage";
import SymptomCheckerPage from "../Pages/AI-Dashboard/SymptomCheckerPage";
import DiagnosisPage from "../Pages/AI-Dashboard/DiagnosisPage";
import AIAppointmentPage from "../Pages/AI-Dashboard/AIAppointmentPage";
import MedicineReminderPage from "../Pages/AI-Dashboard/MedicineReminderPage";
import AIHealthTrendsPage from "../Pages/AI-Dashboard/AIHealthTrendsPage";
import ReportAnalyzerPage from "../Pages/AI-Dashboard/ReportAnalyzerPage";
import AITriagePage from "../Pages/AI-Dashboard/AITriagePage";
import AISuggestionsPage from "../Pages/AI-Dashboard/AISuggestionsPage";
import AIMemoryPage from "../Pages/AI-Dashboard/AIMemoryPage";
import AINearbyServicesPage from "../Pages/AI-Dashboard/AINearbyServicesPage";
import AIIntegrationPage from "../Pages/AI-Dashboard/AIIntegrationPage";
import AIHealthSummaryPage from "../Pages/AI-Dashboard/AIHealthSummaryPage";
import About from "../Pages/Hospital-Home/About";
import Departments from "../Pages/Hospital-Home/Departments";
import Contact from "../Pages/Hospital-Home/Contact";

import Doctors from "../Component/HomePage/Doctors";

import AppointmentSection from "../Component/HomePage/AppointmentSection";

function AIHealthRoutes() {
  return (
    <Routes>
      <Route
        element={
          <ProtectedRoute allowedRoles={["PATIENT", "DOCTOR", "ADMIN"]}>
            <AIHealthLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AIHealthAssistantPage />} />

        <Route
          path="about"
          element={
            <ProtectedRoute allowedRoles={["PATIENT", "DOCTOR", "ADMIN"]}>
              <Aboute />
            </ProtectedRoute>
          }
        />

        <Route
          path="departments"
          element={
            <ProtectedRoute allowedRoles={["PATIENT", "DOCTOR", "ADMIN"]}>
              <Departments />
            </ProtectedRoute>
          }
        />

        <Route
          path="doctors"
          element={
            <ProtectedRoute allowedRoles={["PATIENT", "DOCTOR", "ADMIN"]}>
              <Doctors />
            </ProtectedRoute>
          }
        />

        <Route
          path="contact"
          element={
            <ProtectedRoute allowedRoles={["PATIENT", "DOCTOR", "ADMIN"]}>
              <Contact />
            </ProtectedRoute>
          }
        />

        <Route
          path="appointment"
          element={
            <ProtectedRoute allowedRoles={["PATIENT", "DOCTOR", "ADMIN"]}>
              <AppointmentSection />
            </ProtectedRoute>
          }
        />

        <Route
          path="ai-chat"
          element={
            <ProtectedRoute allowedRoles={["PATIENT", "DOCTOR", "ADMIN"]}>
              <AIChatPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="ai-health-summary"
          element={
            <ProtectedRoute allowedRoles={["PATIENT", "DOCTOR", "ADMIN"]}>
              <AIHealthSummaryPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="symptom-checker"
          element={
            <ProtectedRoute allowedRoles={["PATIENT", "DOCTOR", "ADMIN"]}>
              <SymptomCheckerPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="diagnosis"
          element={
            <ProtectedRoute allowedRoles={["PATIENT", "DOCTOR", "ADMIN"]}>
              <DiagnosisPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="appointment"
          element={
            <ProtectedRoute allowedRoles={["PATIENT", "DOCTOR", "ADMIN"]}>
              <AIAppointmentPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="medicine-reminder"
          element={
            <ProtectedRoute allowedRoles={["PATIENT", "DOCTOR", "ADMIN"]}>
              <MedicineReminderPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="health-trends"
          element={
            <ProtectedRoute allowedRoles={["PATIENT", "DOCTOR", "ADMIN"]}>
              <AIHealthTrendsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="report-analyzer"
          element={
            <ProtectedRoute allowedRoles={["PATIENT", "DOCTOR", "ADMIN"]}>
              <ReportAnalyzerPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="triage"
          element={
            <ProtectedRoute allowedRoles={["PATIENT", "DOCTOR", "ADMIN"]}>
              <AITriagePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="suggestions"
          element={
            <ProtectedRoute allowedRoles={["PATIENT", "DOCTOR", "ADMIN"]}>
              <AISuggestionsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="memory"
          element={
            <ProtectedRoute allowedRoles={["PATIENT", "DOCTOR", "ADMIN"]}>
              <AIMemoryPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="nearby-services"
          element={
            <ProtectedRoute allowedRoles={["PATIENT", "DOCTOR", "ADMIN"]}>
              <AINearbyServicesPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="integration"
          element={
            <ProtectedRoute allowedRoles={["PATIENT", "DOCTOR", "ADMIN"]}>
              <AIIntegrationPage />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default AIHealthRoutes;
