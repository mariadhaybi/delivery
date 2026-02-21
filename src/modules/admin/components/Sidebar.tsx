import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/authContext";

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const linkClass =
    "block px-4 py-2 rounded hover:bg-orange-100";

  const activeClass = "bg-orange-500 text-white";

  const handleLogout = () => {
    // Assuming logout() in your context handles clearing user state and localStorage
    logout();
    navigate("/login");
  };

  return (
    <div className="w-64 h-screen fixed left-0 top-0 bg-white shadow-md p-4">
      <h1 className="text-xl font-bold text-orange-500 mb-6">
        Loop Delivery
      </h1>

      <nav className="space-y-2">
        <NavLink
          to="/admin"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ""}`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/admin/orders"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ""}`
          }
        >
          Orders
        </NavLink>

        <NavLink
          to="/admin/companies"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ""}`
          }
        >
          Companies
        </NavLink>

        <NavLink
          to="/admin/drivers"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ""}`
          }
        >
          Drivers Management
        </NavLink>

        <NavLink
          to="/admin/reports"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ""}`
          }
        >
          Reports & Analytics
        </NavLink>

        <NavLink
          to="/admin/settings"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ""}`
          }
        >
          Settings
        </NavLink>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="text-red-500 mt-6"
        >
          Logout
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
