import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">

      {/* Sidebar */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Content Column */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Top Navbar */}
        <Navbar setSidebarOpen={setSidebarOpen} />

        {/* Main Centered Workspace */}
        <main className="flex-1 px-6 sm:px-12 lg:px-16 py-8 sm:py-10">
          <div className="max-w-5xl mx-auto w-full">
            {children}
          </div>
        </main>

      </div>

    </div>
  );
};

export default Layout;