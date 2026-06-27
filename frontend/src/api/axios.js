import axios from "axios";

/* =========================
   API BASE URL
========================= */

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

console.log("API BASE URL:", API_BASE_URL);

/* =========================
   AXIOS INSTANCE
========================= */

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

/* =========================
   REQUEST INTERCEPTOR
========================= */

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

/* =========================
   RESPONSE INTERCEPTOR
========================= */

api.interceptors.response.use(
  (response) => response,

  (error) => {
    const status = error.response?.status;
    const message =
      error.response?.data?.message || error.message || "Something went wrong";

    console.error(`[API Error] Status: ${status || "Network"} — ${message}`);

    if (error.code === "ERR_NETWORK") {
      console.error(
        "Network Error: Backend server not reachable or CORS blocked.",
      );
    }

    if (status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("patient");
      localStorage.removeItem("doctor");
      localStorage.removeItem("admin");

      window.location.href = "/login";
    }

    if (status === 403) {
      window.location.href = "/unauthorized";
    }

    if (status === 404) {
      console.error("API route not found. Check backend route URL.");
    }

    if (status === 500) {
      console.error("Backend internal server error.");
    }

    return Promise.reject(error);
  },
);

export default api;
