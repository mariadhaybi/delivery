import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "../pages/LandingPage/LandingPage";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/forgotPassword";
import AdminDashboard from "../pages/admin/Dashboard";
import RestaurantDashboard from "../pages/restaurant/Dashboard";
import { useAuth } from "../context/authContext";

export default function AppRoutes() {
  const { user, token, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  const isAuth = user || token;

  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgotPassword" element={<ForgotPassword />} />

      {/* Protected - بدون أي Layout */}
      <Route
        path="/admin"
        element={
         <AdminDashboard/>
        }
      />

      <Route
        path="/company/dashboard"
        element={
          isAuth && user?.role === "company"
            ? <RestaurantDashboard />
            : <Navigate to="/login" />
        }
      />
    </Routes>
  );
}
