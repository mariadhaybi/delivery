import { Outlet } from "react-router-dom";
import Sidebar from "../modules/admin/components/Sidebar";

const AdminLayout = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Sidebar />

      {/* Content */}
      <div className="ml-64 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
