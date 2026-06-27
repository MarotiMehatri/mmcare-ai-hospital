import { StrictMode } from "react";
import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
//import "./Styles/main.css";
import { Provider } from "react-redux";
import { store } from "./App/store.js";
import AuthProvider from "./api/AuthProvider.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import "react-loading-skeleton/dist/skeleton.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <AuthProvider>
          <App />
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            pauseOnHover
            draggable
            theme="colored"
          />
        </AuthProvider>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
);
