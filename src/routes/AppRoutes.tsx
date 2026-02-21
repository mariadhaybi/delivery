import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import LandingPage from "../pages/LandingPage/LandingPage";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/forgotPassword";
import AdminDashboard from "../modules/admin/pages/Dashboard";
import Orders from "../modules/admin/pages/Orders";
import OrdersPage from "../modules/admin/pages/OrdersPage";
import Companies from "../modules/admin/pages/Companies";
import Drivers from "../modules/admin/pages/Drivers";
import Reports from "../modules/admin/pages/Reports";
import Settings from "../modules/admin/pages/Settings";
import RestaurantDashboard from "../pages/restaurant/Dashboard";
import { useAuth } from "../context/authContext";
import AdminLayout from "../layouts/AdminLayout";



// Protected route component
const ProtectedRoute = ({ user, allowedRoles }: { user: any; allowedRoles: string[] }) => {
  if (!user) return <Navigate to="/login" replace />;

  if (!allowedRoles.includes(user.role)) {
    if (user.role === "driver") return <Navigate to="/delivery/driver" replace />;
    if (user.role === "company") return <Navigate to="/company/dashboard" replace />;
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default function AppRoutes() {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgotPassword" element={<ForgotPassword />} />

      {/* Admin routes */}
      <Route element={<ProtectedRoute user={user} allowedRoles={["admin"]} />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="orders" element={<Orders />} />
          <Route path="all-orders" element={<OrdersPage />} />
          <Route path="companies" element={<Companies />} />
          <Route path="drivers" element={<Drivers />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Route>

      {/* Company routes */}
      <Route
        path="/company/dashboard"
        element={
          user?.role === "company" ? <RestaurantDashboard /> : <Navigate to="/login" replace />
        }
      />

      {/* Driver route example */}
      <Route
        path="/delivery/driver"
        element={
          user?.role === "driver" ? <div>Driver Dashboard</div> : <Navigate to="/login" replace />
        }
      />

      {/* Redirect old paths to detailed all-orders page */}
      <Route path="/orders" element={<Navigate to="/admin/all-orders" replace />} />
      <Route path="/OrdersPage" element={<Navigate to="/admin/all-orders" replace />} />
    </Routes>
  );
}
