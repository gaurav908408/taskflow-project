import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Loader from "../components/Loader";
import { getMe } from "../services/api";
import toast from "react-hot-toast";
import { FaUserShield, FaCalendarAlt, FaEnvelope, FaIdCard, FaRocket } from "react-icons/fa";

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

  const initial = user?.name ? user.name.charAt(0).toUpperCase() : "U";

  return (
    <Layout>
      <div className="max-w-3xl mx-auto space-y-6">

        {/* Profile Card Header */}
        <div className="w-full bg-white rounded-3xl border border-slate-200/80 shadow-sm p-8 sm:p-10 relative overflow-hidden">
          
          {/* Top Banner Accent */}
          <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700" />

          <div className="relative pt-6 flex flex-col items-center text-center">

            {/* Avatar Initial Badge */}
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-sky-500 via-teal-400 to-emerald-400 border-4 border-white text-white font-extrabold text-4xl flex items-center justify-center shadow-xl ring-2 ring-emerald-500/20">
              {initial}
            </div>

            <div className="mt-4">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                <FaUserShield className="text-emerald-600 dark:text-emerald-400" />
                Verified TaskFlow Admin
              </span>
            </div>

          </div>

          {/* Account Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10">

            <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-5 transition duration-300 hover:border-emerald-200">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                <FaUserShield className="text-emerald-500" />
                Full Name
              </div>
              <p className="text-base font-bold text-slate-800 mt-2">
                {user?.name}
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-5 transition duration-300 hover:border-emerald-200">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                <FaEnvelope className="text-emerald-500" />
                Email Address
              </div>
              <p className="text-sm font-semibold text-slate-800 mt-2 break-all">
                {user?.email}
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-5 transition duration-300 hover:border-emerald-200">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                <FaCalendarAlt className="text-emerald-500" />
                Account Created
              </div>
              <p className="text-sm font-semibold text-slate-800 mt-2">
                {new Date(user?.createdAt).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-5 transition duration-300 hover:border-emerald-200">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                <FaIdCard className="text-emerald-500" />
                Account ID
              </div>
              <p className="text-xs font-mono font-semibold text-slate-600 mt-2 break-all bg-white px-2.5 py-1 rounded border border-slate-200">
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