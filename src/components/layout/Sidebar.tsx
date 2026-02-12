import { NavLink, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <aside className="w-64 bg-white shadow-lg min-h-screen flex flex-col justify-between">
      <div>
        <div className="p-6 font-bold text-xl">
          Delivery Dashboard
        </div>

        <nav className="flex flex-col gap-2 px-4">
          {/* Restaurant / Orders */}
          <NavLink
            to="/company"
            className={({ isActive }) =>
              `p-3 rounded ${
                isActive
                  ? "bg-orange-100 text-orange-600"
                  : "hover:bg-gray-100"
              }`
            }
          >
            company Dashboard
          </NavLink>

          {/* Admin */}
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              `p-3 rounded ${
                isActive
                  ? "bg-orange-100 text-orange-600"
                  : "hover:bg-gray-100"
              }`
            }
          >
            Admin Dashboard
          </NavLink>
        </nav>
      </div>

      <div className="p-4">
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 hover:bg-red-600 text-white p-2 rounded font-medium"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
