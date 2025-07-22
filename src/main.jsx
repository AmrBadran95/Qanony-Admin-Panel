import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import AppRoutes from "./routes/AppRoutes";
import { LawyerProvider } from "./context/LawyerContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <LawyerProvider>
        <AppRoutes />
        <App />
      </LawyerProvider>
    </AuthProvider>
  </StrictMode>
);
