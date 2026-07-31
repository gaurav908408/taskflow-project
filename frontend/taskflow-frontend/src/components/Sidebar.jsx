import { NavLink } from "react-router-dom";
import {
  FaChartPie,
  FaFolderOpen,
  FaTasks,
  FaColumns,
  FaUser,
  FaRocket,
} from "react-icons/fa";

const SidebarContent = ({ menus, setSidebarOpen }) => (
  <div className="flex flex-col h-full bg-slate-900 text-slate-300 border-r border-slate-800 shadow-xl">
    
    {/* Logo Brand Header with Sky Blue Accent */}
    <div className="px-6 h-20 border-b border-slate-800/80 flex items-center gap-3">
      <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 via-teal-400 to-emerald-400 flex items-center justify-center text-white text-lg shadow-md shadow-sky-500/30">
        <FaRocket className="transform -rotate-12" />
      </div>
      <div>
        <h1 className="text-xl font-extrabold text-white tracking-tight leading-none">
          TaskFlow
        </h1>
        <span className="text-[10px] font-bold tracking-wider text-sky-400 uppercase">
          Workspace Pro
        </span>
      </div>
    </div>

    {/* Navigation Menu Links */}
    <div className="flex-1 px-4 py-6 overflow-y-auto">
      <p className="px-3 text-[11px] font-bold text-sky-400/80 uppercase tracking-widest mb-3">
        Main Menu
      </p>

      <nav className="flex flex-col gap-1.5">
        {menus.map((menu) => (
          <NavLink
            key={menu.path}
            to={menu.path}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `
              flex items-center
              gap-3.5
              px-4
              py-3
              rounded-xl
              text-sm
              font-semibold
              transition-all
              duration-200
              ${
                isActive
                  ? "bg-gradient-to-r from-sky-600 via-teal-600 to-emerald-600 text-white shadow-lg shadow-sky-500/25 translate-x-1 border border-sky-400/20"
                  : "text-slate-400 hover:bg-sky-950/40 hover:text-sky-300 hover:border-sky-500/20 border border-transparent"
              }
              `
            }
          >
            <span className="text-lg w-5 flex justify-center">
              {menu.icon}
            </span>

            <span>{menu.name}</span>
          </NavLink>
        ))}
      </nav>
    </div>

    {/* Footer Info with Sky Blue Accent */}
    <div className="p-3.5 mx-4 mb-4 rounded-xl bg-sky-950/30 border border-sky-900/40 text-center">
      <p className="text-xs font-bold text-sky-300">TaskFlow Workspace</p>
      <p className="text-[10px] text-sky-400/70 mt-0.5 font-medium">Version 1.0 • Pro Theme</p>
    </div>
  </div>
);

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const menus = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <FaChartPie />,
    },
    {
      name: "Projects",
      path: "/projects",
      icon: <FaFolderOpen />,
    },
    {
      name: "Tasks",
      path: "/tasks",
      icon: <FaTasks />,
    },
    {
      name: "Kanban",
      path: "/kanban",
      icon: <FaColumns />,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: <FaUser />,
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <aside
        className={`
          fixed top-0 left-0 bottom-0 w-64 z-50 transition-transform duration-300 md:hidden
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <SidebarContent menus={menus} setSidebarOpen={setSidebarOpen} />
      </aside>

      {/* Desktop Permanent Sidebar */}
      <aside className="hidden md:block w-64 flex-shrink-0 sticky top-0 h-screen z-30">
        <SidebarContent menus={menus} setSidebarOpen={setSidebarOpen} />
      </aside>
    </>
  );
};

export default Sidebar;