import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const location = useLocation();

  let token = null;
  let user = null;

  try {
    token = localStorage.getItem("token");

    const userData = localStorage.getItem("user");

    if (userData) {
      user = JSON.parse(userData);
    }
  } catch (error) {
    console.error("ProtectedRoute: Failed to read authentication data:", error);

    // Clear corrupted authentication data
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  // User is not logged in
  if (!token || !user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  // Normalize role to avoid Patient vs patient problems
  const userRole = String(user.role || "").toLowerCase();

  const normalizedAllowedRoles = allowedRoles.map((role) =>
    String(role).toLowerCase()
  );

  // Check role
  if (
    normalizedAllowedRoles.length > 0 &&
    !normalizedAllowedRoles.includes(userRole)
  ) {
    console.warn("ProtectedRoute: Role not allowed", {
      userRole,
      allowedRoles: normalizedAllowedRoles,
      user,
    });

    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;