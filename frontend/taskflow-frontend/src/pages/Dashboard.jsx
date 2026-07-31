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
      await Promise.all([loadDashboard(), loadUser()]);
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
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="bg-white rounded-3xl shadow-lg p-8 flex flex-col lg:flex-row justify-between items-center gap-6">

          <div>
            <h1 className="text-4xl font-bold text-gray-800">
              👋 {greeting}, {user?.name || "User"}!
            </h1>

            <p className="mt-3 text-lg text-gray-500">
              Welcome back to TaskFlow. Manage your projects and complete your tasks efficiently.
            </p>
          </div>

          <div className="bg-emerald-50 rounded-2xl shadow px-6 py-4 text-center">

            <p className="text-sm text-gray-500">
              Today's Date
            </p>

            <h2 className="mt-1 text-lg font-bold text-emerald-600">
              {new Date().toLocaleDateString("en-GB", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </h2>

          </div>

        </div>

        {/* Dashboard Heading */}
        <div className="flex justify-center mt-16 mb-14">

          <h2 className="text-4xl font-bold text-gray-800">
            📊 Dashboard Overview
          </h2>

        </div>

        {/* Cards */}
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