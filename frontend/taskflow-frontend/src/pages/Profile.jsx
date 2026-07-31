import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Loader from "../components/Loader";
import { getMe } from "../services/api";
import toast from "react-hot-toast";

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const loadProfile = async () => {
    try {
      const { data } = await getMe();
      setUser(data.user);
    } catch (error) {
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <Layout>
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-6 py-10">

        <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl p-10">

          {/* Profile Header */}
          <div className="flex flex-col items-center">

            <div className="w-32 h-32 rounded-full bg-emerald-600 text-white flex items-center justify-center text-5xl font-bold shadow-lg">
              {user?.name?.charAt(0).toUpperCase()}
            </div>

            <h1 className="text-4xl font-bold text-gray-800 mt-6">
              {user?.name}
            </h1>

            <p className="text-gray-500 text-lg mt-2">
              {user?.email}
            </p>

          </div>

          {/* Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">

            {/* Full Name */}
            <div className="bg-gray-50 border border-gray-200 rounded-2xl px-8 py-6 shadow-sm hover:shadow-lg transition duration-300">

              <h3 className="text-xs uppercase tracking-widest text-gray-500 font-semibold">
                Full Name
              </h3>

              <p className="text-xl font-bold text-gray-800 mt-3">
                {user?.name}
              </p>

            </div>

            {/* Email */}
            <div className="bg-gray-50 border border-gray-200 rounded-2xl px-8 py-6 shadow-sm hover:shadow-lg transition duration-300">

              <h3 className="text-xs uppercase tracking-widest text-gray-500 font-semibold">
                Email Address
              </h3>

              <p className="text-lg font-semibold text-gray-800 mt-3 break-all">
                {user?.email}
              </p>

            </div>

            {/* Created */}
            <div className="bg-gray-50 border border-gray-200 rounded-2xl px-8 py-6 shadow-sm hover:shadow-lg transition duration-300">

              <h3 className="text-xs uppercase tracking-widest text-gray-500 font-semibold">
                Account Created
              </h3>

              <p className="text-lg font-semibold text-gray-800 mt-3">
                {new Date(user?.createdAt).toLocaleDateString()}
              </p>

            </div>

            {/* User ID */}
            <div className="bg-gray-50 border border-gray-200 rounded-2xl px-8 py-6 shadow-sm hover:shadow-lg transition duration-300">

              <h3 className="text-xs uppercase tracking-widest text-gray-500 font-semibold">
                User ID
              </h3>

              <p className="text-sm text-gray-700 mt-3 break-all leading-6">
                {user?._id}
              </p>

            </div>

          </div>

        </div>

      </div>
    </Layout>
  );
};

export default Profile;