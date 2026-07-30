import { useNavigate } from "react-router-dom";
import { FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 shadow-sm flex items-center justify-between px-8">
      <div>
        <h2 className="text-2xl font-bold text-emerald-600">
          TaskFlow
        </h2>
      </div>

      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2">
          <FaUserCircle className="text-3xl text-emerald-600" />

          <div>
            <p className="text-sm text-gray-500">Welcome</p>
            <h3 className="font-semibold text-gray-800">
              {user?.name || "User"}
            </h3>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;