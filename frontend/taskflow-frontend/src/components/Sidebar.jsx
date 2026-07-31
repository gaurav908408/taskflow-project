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
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}


      {/* Sidebar */}
      <aside
        className={`
          fixed md:static
          top-0 left-0
          h-screen
          w-64
          bg-white
          shadow-lg
          border-r
          border-gray-200
          z-50
          transform
          transition-transform
          duration-300
          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }
        `}
      >

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-5 border-b">

          <h1 className="text-2xl font-bold text-emerald-600">
            TaskFlow
          </h1>

          <button
            className="md:hidden text-xl"
            onClick={() => setSidebarOpen(false)}
          >
            <FaTimes />
          </button>

        </div>


        {/* Menu */}
        <nav className="mt-4 space-y-1">

          {menus.map((menu) => (

            <NavLink
              key={menu.path}
              to={menu.path}
              onClick={() => setSidebarOpen(false)}

              className={({ isActive }) =>
                `
                flex items-center gap-4
                px-5
                py-3
                transition-all
                ${
                  isActive
                    ? "bg-emerald-600 text-white"
                    : "text-gray-700 hover:bg-emerald-100 hover:text-emerald-700"
                }
                `
              }
            >

              <span className="text-lg flex items-center">
                {menu.icon}
              </span>


              <span className="font-medium">
                {menu.name}
              </span>


            </NavLink>

          ))}

        </nav>


      </aside>

    </>
  );
};

export default Sidebar;