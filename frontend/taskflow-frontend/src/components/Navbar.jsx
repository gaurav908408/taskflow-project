import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaSignOutAlt,
  FaBars,
  FaShieldAlt,
  FaSun,
  FaMoon,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const Navbar = ({ setSidebarOpen }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const initial = user?.name ? user.name.charAt(0).toUpperCase() : "U";
  const avatarSrc = user?.avatarUrl
    ? user.avatarUrl.startsWith("http")
      ? user.avatarUrl
      : `http://localhost:5000${user.avatarUrl}`
    : null;

  return (
    <header className="h-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 sticky top-0 z-20 px-6 sm:px-12 lg:px-16 flex items-center justify-between transition-colors duration-300">

      {/* Mobile Toggle */}
      <div className="flex items-center gap-3">
        <button
          className="md:hidden text-lg text-slate-700 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400 p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          onClick={() => setSidebarOpen(true)}
        >
          <FaBars />
        </button>
      </div>

      {/* Right User Navigation */}
      <div className="flex items-center gap-3 sm:gap-4 ml-auto">

        {/* Dark Mode / Light Mode Toggle Button */}
        <button
          onClick={toggleTheme}
          className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-amber-400 hover:scale-105 transition flex items-center justify-center border border-slate-200/80 dark:border-slate-700"
          title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {darkMode ? (
            <FaSun className="text-amber-400 text-base" />
          ) : (
            <FaMoon className="text-slate-600 text-base" />
          )}
        </button>

        {/* User Profile Badge */}
        <div className="flex items-center gap-3 pl-3 border-l border-slate-200 dark:border-slate-800">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white font-bold text-sm flex items-center justify-center shadow-xs overflow-hidden">
            {avatarSrc ? (
              <img src={avatarSrc} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              initial
            )}
          </div>

          <div className="hidden sm:block text-left">
            <p className="text-[11px] font-medium text-slate-400 dark:text-slate-500 leading-none">
              Signed in as
            </p>
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 leading-tight mt-0.5">
              {user?.name || "User"}
            </h3>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-200 hover:text-white px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition shadow-xs border border-transparent dark:border-slate-700"
        >
          <FaSignOutAlt className="text-rose-400" />
          <span className="hidden sm:inline">Logout</span>
        </button>

      </div>

    </header>
  );
};

export default Navbar;