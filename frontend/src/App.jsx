import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const HospitalHome = lazy(() => import("./Pages/Hospital-Home/HospitalHome"));
const Login = lazy(() => import("./Pages/Login/Login"));
const Signup = lazy(() => import("./Pages/Login/Signup"));
const ForgetPassword = lazy(() => import("./Pages/Login/ForgetPassword"));
const AdminRoutes = lazy(() => import("./routes/AdminRoutes"));
const DoctorRoutes = lazy(() => import("./routes/DoctorRoutes"));
const PatientRoutes = lazy(() => import("./routes/PatientRoutes"));
const AIHealthRoutes = lazy(() => import("./routes/AIHealthRoutes"));
import Unauthorized from "./Pages/Unauthorized/Unauthorized";
import PageLoader from "./Component/loaders/PageLoader";
function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* ================= PUBLIC ROUTES ================= */}
          <Route path="/" element={<HospitalHome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/forgot-password" element={<ForgetPassword />} />
          {/* ================= ADMIN ROUTES ================= */}
          <Route path="/admin/*" element={<AdminRoutes />} />
          {/* ================= DOCTOR ROUTES ================= */}
          <Route path="/doctor/*" element={<DoctorRoutes />} />

          <Route path="/patient/*" element={<PatientRoutes />} />

          <Route path="/ai-health/*" element={<AIHealthRoutes />} />
          {/* ================= 404 PAGE ================= */}
          <Route path="/unauthorized" element={<Unauthorized />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
