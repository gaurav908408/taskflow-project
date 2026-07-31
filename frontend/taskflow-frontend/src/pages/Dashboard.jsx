import { useEffect, useState } from "react";
import {
  FaFolderOpen,
  FaTasks,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";

import Layout from "../components/Layout";
import Loader from "../components/Loader";
import StatCard from "../components/StatCard";
import { getDashboard, getMe } from "../services/api";

const Dashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadDashboard = async () => {
    try {
      const { data } = await getDashboard();
      setDashboard(data.dashboard);
    } catch (error) {
      console.log(error);
    }
  };

  const loadUser = async () => {
    try {
      const { data } = await getMe();
      setUser(data.user);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await Promise.all([
        loadDashboard(),
        loadUser(),
      ]);

      setLoading(false);
    };

    loadData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) {
    greeting = "Good Morning";
  } else if (hour < 18) {
    greeting = "Good Afternoon";
  }

  return (
    <Layout>

      <div className="w-full max-w-7xl mx-auto px-2">

        {/* Header */}
        <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-10">

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

            {/* Left Section */}
            <div className="flex-1">

              <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 leading-tight">
                👋 {greeting}, {user?.name || "User"}!
              </h1>

              <p className="mt-4 text-lg text-gray-500 leading-8 max-w-3xl">
                Welcome back to TaskFlow. Manage your projects and complete your tasks efficiently.
              </p>

            </div>

            {/* Right Section - Date Card */}
            <div className="flex-shrink-0">

              <div className="min-w-[280px] bg-emerald-50 border border-emerald-100 rounded-2xl px-7 py-5 shadow-md text-center">

                <p className="text-base text-gray-500 font-medium">
                  Today's Date
                </p>

                <h2 className="mt-2 text-2xl font-bold text-emerald-600 whitespace-nowrap">
                  {new Date().toLocaleDateString("en-GB", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </h2>

              </div>

            </div>

          </div>

        </div>
        <br />

        {/* Dashboard Heading */}
        <div className="flex justify-center mt-16 mb-10">

          <h2 className="text-4xl font-bold text-gray-800 flex items-center gap-3">
            📊 Dashboard Overview
          </h2>

        </div>
        <br />
                {/* Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">

          <StatCard
            title="Total Projects"
            value={dashboard?.totalProjects || 0}
            icon={<FaFolderOpen />}
            color="bg-emerald-600"
          />

          <StatCard
            title="Total Tasks"
            value={dashboard?.totalTasks || 0}
            icon={<FaTasks />}
            color="bg-orange-500"
          />

          <StatCard
            title="Completed"
            value={dashboard?.completedTasks || 0}
            icon={<FaCheckCircle />}
            color="bg-green-600"
          />

          <StatCard
            title="Pending"
            value={dashboard?.pendingTasks || 0}
            icon={<FaClock />}
            color="bg-red-500"
          />

        </div>

      </div>

    </Layout>
  );
};

export default Dashboard;