import { NavLink } from "react-router-dom";
import {
  FaChartPie,
  FaFolderOpen,
  FaTasks,
  FaColumns,
  FaUser,
  FaTimes,
} from "react-icons/fa";

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
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static
          top-0 left-0
          h-screen
          w-60
          bg-white
          border-r border-gray-200
          shadow-md
          z-50
          transition-transform duration-300
          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }
        `}
      >
        {/* Logo */}
        <div className="px-6 py-7 border-b border-gray-200">

          <h1 className="text-4xl font-extrabold text-emerald-600 tracking-tight">
            TaskFlow
          </h1>

        </div>

        {/* Menu Background */}
        <div className="mx-3 mt-6 rounded-3xl bg-sky-50 border border-sky-100 shadow-sm p-4">

          <nav className="flex flex-col gap-4">

            {menus.map((menu) => (

              <NavLink
                key={menu.path}
                to={menu.path}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `
                  flex items-center
                  gap-4
                  px-5
                  py-3.5
                  rounded-2xl
                  text-[17px]
                  font-semibold
                  transition-all
                  duration-300
                  ${
                    isActive
                      ? "bg-emerald-600 text-white shadow-lg"
                      : "text-gray-700 hover:bg-white hover:text-emerald-600 hover:shadow-md"
                  }
                  `
                }
              >

                <span className="text-xl w-6 flex justify-center">
                  {menu.icon}
                </span>

                <span>{menu.name}</span>

              </NavLink>

            ))}

          </nav>

        </div>

        {/* Bottom */}
        <div className="absolute bottom-6 left-0 w-full px-6">

          <div className="border-t pt-4 text-center text-xs text-gray-400">
            TaskFlow v1.0
          </div>

        </div>

      </aside>
    </>
  );
};

export default Sidebar;