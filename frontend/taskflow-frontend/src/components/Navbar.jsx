import { useNavigate } from "react-router-dom";
import {
  FaSignOutAlt,
  FaUserCircle,
  FaBars,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const Navbar = ({ setSidebarOpen }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 shadow-sm px-4 md:px-8 flex items-center justify-between sticky top-0 z-40">

      {/* Left */}
      <div className="flex items-center gap-4">

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl text-gray-700"
          onClick={() => setSidebarOpen(true)}
        >
          <FaBars />
        </button>

        <h2 className="text-xl md:text-2xl font-bold text-emerald-600">
          TaskFlow
        </h2>

      </div>

      {/* Right */}
      <div className="flex items-center gap-3 md:gap-5">

        {/* User */}
        <div className="flex items-center gap-2">

          <FaUserCircle className="text-3xl text-emerald-600" />

          <div className="hidden sm:block">
            <p className="text-xs text-gray-500">
              Welcome
            </p>

            <h3 className="font-semibold text-gray-800">
              {user?.name || "User"}
            </h3>
          </div>

        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-3 md:px-4 py-2 rounded-lg transition"
        >
          <FaSignOutAlt />

          <span className="hidden md:inline">
            Logout
          </span>
        </button>

      </div>

    </header>
  );
};

export default Navbar;