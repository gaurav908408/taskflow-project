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
        <main className="flex-1 md:ml-60 overflow-x-hidden">
          <div className="w-full px-8 lg:px-10 xl:px-12 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;