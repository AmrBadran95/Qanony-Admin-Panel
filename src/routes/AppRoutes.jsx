import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { useAuth } from "./../context/AuthContext";
import LoginPage from "./../pages/LoginPage";
import DashboardLayout from "./../layouts/DashboardLayout";
import LawyersList from "./../pages/LawyersList";
import PendingLawyers from "./../pages/PendingLawyers";
import LawyerDetails from "../pages/LawyerDetails";

import StripeConnectSuccess from "../pages/StripeConnectSuccess";
import StripeConnectRetry from "../pages/StripeConnectRetry";

const ProtectedRoute = ({ children }) => {
  const { admin, loading } = useAuth();

  if (loading) return <div className="text-center p-8">جارٍ التحقق...</div>;

  return admin ? children : <Navigate to="/login" />;
};

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }>
          <Route index element={<Navigate to="/lawyers" />} />
          <Route path="lawyers" element={<LawyersList />} />
          <Route path="lawyers/pending" element={<PendingLawyers />} />
          <Route path="lawyers/:uid" element={<LawyerDetails />} />
        </Route>

        <Route
          path="/stripe-connect/success"
          element={<StripeConnectSuccess />}
        />
        <Route path="/stripe-connect/retry" element={<StripeConnectRetry />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
