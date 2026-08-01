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
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

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

  const hour = currentTime.getHours();

  let greeting = "Good Evening";

  if (hour < 12) {
    greeting = "Good Morning";
  } else if (hour < 18) {
    greeting = "Good Afternoon";
  }

  return (
    <Layout>
      <div className="w-full max-w-5xl mx-auto space-y-8">

        {/* Header */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8">

          <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">

            {/* Greeting */}
            <div className="text-left">

              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
                👋 {greeting}, {user?.name || "User"}!
              </h1>

              <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400 max-w-xl">
                Welcome back to TaskFlow. Manage your projects and complete your
                tasks efficiently.
              </p>

            </div>

            {/* Date & Live Time Card */}
            <div className="bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-100/80 dark:border-emerald-900/60 rounded-xl px-5 py-3 text-left sm:text-center min-w-[210px] shadow-xs">

              <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                Today's Date & Time
              </p>

              <h2 className="mt-1 text-sm font-bold text-emerald-700 dark:text-emerald-400 whitespace-nowrap">
                {currentTime.toLocaleDateString("en-GB", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </h2>

              <div className="mt-1.5 flex items-center justify-start sm:justify-center gap-1.5 text-xs font-extrabold text-emerald-700 dark:text-emerald-300 bg-emerald-100/80 dark:bg-emerald-900/60 px-2.5 py-1 rounded-md">
                <FaClock className="text-emerald-600 dark:text-emerald-400 text-[11px]" />
                <span>
                  {currentTime.toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: true,
                  })}
                </span>
              </div>

            </div>

          </div>

        </div>

        {/* Dashboard Heading */}
        <div className="flex items-center justify-between pt-2">

          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            📊 Dashboard Overview
          </h2>
           
        </div>

        {/* Dashboard Cards: 2 Cards Per Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">

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
            color="bg-amber-500"
          />

          <StatCard
            title="Completed"
            value={dashboard?.completedTasks || 0}
            icon={<FaCheckCircle />}
            color="bg-emerald-500"
          />

          <StatCard
            title="Pending"
            value={dashboard?.pendingTasks || 0}
            icon={<FaClock />}
            color="bg-rose-500"
          />

        </div>

      </div>
    </Layout>
  );
};

export default Dashboard;