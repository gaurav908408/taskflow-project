import { NavLink } from "react-router-dom";
import {
  FaChartPie,
  FaFolderOpen,
  FaTasks,
  FaColumns,
  FaUser,
} from "react-icons/fa";

const Sidebar = () => {
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
    <aside className="w-64 min-h-screen bg-white shadow-md border-r border-gray-200">
      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold text-emerald-600">
          TaskFlow
        </h1>
      </div>

      <nav className="mt-5">
        {menus.map((menu) => (
          <NavLink
            key={menu.path}
            to={menu.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-6 py-4 transition-all ${
                isActive
                  ? "bg-emerald-600 text-white"
                  : "text-gray-700 hover:bg-emerald-100 hover:text-emerald-700"
              }`
            }
          >
            {menu.icon}
            <span>{menu.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;