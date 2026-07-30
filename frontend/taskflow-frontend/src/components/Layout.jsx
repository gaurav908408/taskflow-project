import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <Navbar setSidebarOpen={setSidebarOpen} />

      <div className="flex">

        {/* Sidebar */}
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 overflow-x-auto">
          {children}
        </main>

      </div>

    </div>
  );
};

export default Layout;