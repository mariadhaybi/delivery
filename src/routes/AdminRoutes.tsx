import { Routes, Route } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";

import Dashboard from "../modules/admin/pages/Dashboard";
import Orders  from "../modules/admin/pages/Orders";
import Companies from "../modules/admin/pages/Companies";
import Drivers from "../modules/admin/pages/Drivers";
import Reports from "../modules/admin/pages/Reports";
import Settings from "../modules/admin/pages/Settings";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="orders" element={<Orders />} />
        <Route path="companies" element={<Companies />} />
        <Route path="drivers" element={<Drivers />} />
        <Route path="reports" element={<Reports />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
