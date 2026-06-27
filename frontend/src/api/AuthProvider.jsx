import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  /* =========================
     STATES
  ========================= */

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  /* =========================
     LOAD AUTH ON REFRESH
  ========================= */

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    const token = localStorage.getItem("token");

    const expiry = localStorage.getItem("expiry");

    /* =========================
       CHECK TOKEN EXPIRY
    ========================= */

    if (expiry && Date.now() > Number(expiry)) {
      logout();
      setLoading(false);
      return;
    }

    /* =========================
       RESTORE SESSION
    ========================= */

    if (storedUser && token) {
      setUser(storedUser);
    }

    setLoading(false);
  }, []);

  /* =========================
     LOGIN FUNCTION
  ========================= */

  const login = (userData) => {
    /* =========================
       CREATE FAKE TOKEN
    ========================= */

    const fakeToken = `hospital-token-${userData.id}`;

    /* =========================
       TOKEN EXPIRY
       24 HOURS
    ========================= */

    const expiry = Date.now() + 24 * 60 * 60 * 1000;

    /* =========================
       SAVE TO LOCALSTORAGE
    ========================= */

    localStorage.setItem("token", fakeToken);

    localStorage.setItem("user", JSON.stringify(userData));

    localStorage.setItem("expiry", expiry);

    /* =========================
       UPDATE STATE
    ========================= */

    setUser(userData);
  };

  /* =========================
     LOGOUT FUNCTION
  ========================= */

  const logout = () => {
    setUser(null);

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    localStorage.removeItem("expiry");

    window.location.href = "/login";
  };

  /* =========================
     AUTH CHECK
  ========================= */

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,

        role: user?.role || null,

        login,

        logout,

        isAuthenticated,

        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
