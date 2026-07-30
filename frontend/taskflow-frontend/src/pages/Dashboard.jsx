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
import { getDashboard } from "../services/api";

const Dashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadDashboard = async () => {
    try {
      const { data } = await getDashboard();

      setDashboard(data.dashboard);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <Layout>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
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
    </Layout>
  );
};

export default Dashboard;