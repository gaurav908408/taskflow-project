import { useEffect, useState, useRef } from "react";
import Layout from "../components/Layout";
import Loader from "../components/Loader";
import { getMe, uploadProfilePicture } from "../services/api";
import toast from "react-hot-toast";
import {
  FaUser,
  FaCalendarAlt,
  FaEnvelope,
  FaIdCard,
  FaCamera,
  FaSpinner,
  FaCheckCircle,
  FaCopy,
  FaShieldAlt,
  FaUpload,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import Avatar from "../components/Avatar";

const Profile = () => {
  const { updateUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [user, setUser] = useState(null);
  const fileInputRef = useRef(null);

  const loadProfile = async () => {
    try {
      const { data } = await getMe();
      setUser(data.user);
      if (data.user) {
        updateUser(data.user);
      }
    } catch (error) {
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be under 5MB");
      return;
    }

    const formData = new FormData();
    formData.append("profileImage", file);

    setUploading(true);
    try {
      const { data } = await uploadProfilePicture(formData);
      toast.success("Profile picture updated!");
      setUser((prev) => ({ ...prev, avatarUrl: data.avatarUrl }));
      updateUser({ avatarUrl: data.avatarUrl });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Account ID copied to clipboard!");
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8 pb-12">
        {/* Profile Hero Card */}
        <div className="w-full bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-lg shadow-slate-100/80 dark:shadow-none overflow-hidden transition-all duration-300">
          {/* Light Soft Pastel Header Banner */}
          <div className="relative h-32 bg-gradient-to-r from-emerald-100/80 via-teal-100/60 to-sky-100/80 dark:from-slate-800 dark:via-slate-800/90 dark:to-slate-800 border-b border-slate-200/60 dark:border-slate-800 overflow-hidden">
            <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-emerald-200/40 dark:bg-emerald-900/20 blur-2xl" />
            <div className="absolute top-1/2 right-10 w-48 h-48 rounded-full bg-sky-200/40 dark:bg-sky-900/20 blur-2xl" />
          </div>

          {/* Profile Details Container */}
          <div className="relative px-6 sm:px-10 pb-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5 -mt-16 sm:-mt-20">
              {/* Avatar Box with Light Border & Soft Shadow */}
              <div
                className="relative group cursor-pointer flex-shrink-0"
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-3xl bg-white dark:bg-slate-900 p-1 shadow-xl ring-4 ring-white dark:ring-slate-900 transition-transform duration-300 group-hover:scale-[1.02]">
                  <div className="w-full h-full rounded-2xl overflow-hidden relative">
                    <Avatar
                      user={user}
                      sizeClass="w-full h-full text-5xl sm:text-6xl"
                      roundedClass="rounded-2xl"
                    />

                    {/* Hover Upload Overlay */}
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-200">
                      {uploading ? (
                        <FaSpinner className="animate-spin text-2xl" />
                      ) : (
                        <>
                          <FaCamera className="text-xl mb-1 transform group-hover:scale-110 transition" />
                          <span className="text-[11px] font-bold tracking-wide">Change Photo</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Camera Badge Button */}
                <button
                  type="button"
                  className="absolute bottom-1 right-1 w-9 h-9 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-md border-2 border-white dark:border-slate-900 transition-all hover:scale-110 active:scale-95"
                  title="Upload Profile Picture"
                >
                  {uploading ? <FaSpinner className="animate-spin text-xs" /> : <FaCamera className="text-xs" />}
                </button>

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                />
              </div>

              {/* Title & Info section cleanly positioned below banner */}
              <div className="flex-1 text-center sm:text-left space-y-2 pt-2 sm:pt-4">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight">
                    {user?.name || "User Profile"}
                  </h1>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200/80 dark:border-emerald-800">
                    <FaCheckCircle className="text-emerald-600 dark:text-emerald-400" />
                    Active Account
                  </span>
                </div>

                <p className="text-sm font-medium text-slate-500 dark:text-slate-400 flex items-center justify-center sm:justify-start gap-2">
                  <FaEnvelope className="text-emerald-500" />
                  {user?.email}
                </p>

                <div className="pt-2 flex flex-wrap justify-center sm:justify-start gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm transition-all hover:shadow-emerald-500/20"
                  >
                    <FaUpload className="text-xs" />
                    {uploading ? "Uploading..." : "Upload New Photo"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Light & Clean Info Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Full Name Card */}
          <div className="group bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-emerald-300 dark:hover:border-emerald-700 transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400 flex items-center justify-center text-lg flex-shrink-0 border border-emerald-100 dark:border-emerald-900 group-hover:scale-105 transition duration-300">
                <FaUser />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Full Name
                </p>
                <p className="text-base font-bold text-slate-800 dark:text-white mt-0.5 truncate">
                  {user?.name || "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* Email Address Card */}
          <div className="group bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-sky-300 dark:hover:border-sky-700 transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-2xl bg-sky-50 text-sky-600 dark:bg-sky-950/50 dark:text-sky-400 flex items-center justify-center text-lg flex-shrink-0 border border-sky-100 dark:border-sky-900 group-hover:scale-105 transition duration-300">
                <FaEnvelope />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Email Address
                </p>
                <p className="text-base font-bold text-slate-800 dark:text-white mt-0.5 truncate">
                  {user?.email || "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* Account Created Card */}
          <div className="group bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-teal-300 dark:hover:border-teal-700 transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-2xl bg-teal-50 text-teal-600 dark:bg-teal-950/50 dark:text-teal-400 flex items-center justify-center text-lg flex-shrink-0 border border-teal-100 dark:border-teal-900 group-hover:scale-105 transition duration-300">
                <FaCalendarAlt />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Member Since
                </p>
                <p className="text-base font-bold text-slate-800 dark:text-white mt-0.5">
                  {user?.createdAt
                    ? new Date(user.createdAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })
                    : "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* Account ID Card with Copy Feature */}
          <div className="group bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-purple-300 dark:hover:border-purple-700 transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-2xl bg-purple-50 text-purple-600 dark:bg-purple-950/50 dark:text-purple-400 flex items-center justify-center text-lg flex-shrink-0 border border-purple-100 dark:border-purple-900 group-hover:scale-105 transition duration-300">
                <FaIdCard />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    Account ID
                  </p>
                  {user?._id && (
                    <button
                      onClick={() => copyToClipboard(user._id)}
                      className="text-[11px] font-bold text-emerald-600 hover:text-emerald-500 flex items-center gap-1 transition"
                      title="Copy Account ID"
                    >
                      <FaCopy className="text-[10px]" />
                      Copy
                    </button>
                  )}
                </div>
                <p className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 mt-1 break-all bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-200/60 dark:border-slate-700">
                  {user?._id || "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Light Soft Security & Activity Overview */}
        <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-sky-50 dark:from-slate-800 dark:via-slate-800 dark:to-slate-800/90 rounded-3xl p-6 shadow-xs border border-emerald-200/60 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center text-xl flex-shrink-0 shadow-md shadow-emerald-600/20">
              <FaShieldAlt />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800 dark:text-white">Account Security & Access</h3>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">
                Your TaskFlow session is protected with JWT Encryption & Auth Token.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-slate-700 text-xs font-bold shadow-xs flex-shrink-0">
            <FaCheckCircle className="text-emerald-600 dark:text-emerald-400" /> Protected & Verified
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;