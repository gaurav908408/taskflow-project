import { useEffect, useState, useRef } from "react";
import Layout from "../components/Layout";
import Loader from "../components/Loader";
import { getMe, uploadProfilePicture } from "../services/api";
import toast from "react-hot-toast";
import { FaUserShield, FaCalendarAlt, FaEnvelope, FaIdCard, FaCamera, FaSpinner } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

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

  if (loading) {
    return <Loader />;
  }

  const initial = user?.name ? user.name.charAt(0).toUpperCase() : "U";
  const avatarSrc = user?.avatarUrl
    ? user.avatarUrl.startsWith("http")
      ? user.avatarUrl
      : `http://localhost:5000${user.avatarUrl}`
    : null;

  return (
    <Layout>
      <div className="max-w-3xl mx-auto space-y-6">

        {/* Profile Card Header */}
        <div className="w-full bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm p-8 sm:p-10 relative overflow-hidden">
          
          {/* Top Banner Accent */}
          <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600" />

          <div className="relative pt-6 flex flex-col items-center text-center">

            {/* Avatar Circle / Image Upload Box */}
            <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
              <div className="w-28 h-28 rounded-3xl bg-gradient-to-tr from-sky-500 via-teal-400 to-emerald-400 border-4 border-white dark:border-slate-900 text-white font-extrabold text-4xl flex items-center justify-center shadow-xl ring-2 ring-emerald-500/20 overflow-hidden">
                {avatarSrc ? (
                  <img src={avatarSrc} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  initial
                )}

                {/* Upload Overlay Spinner / Camera */}
                <div className="absolute inset-0 bg-slate-950/50 backdrop-blur-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  {uploading ? (
                    <FaSpinner className="animate-spin text-white text-2xl" />
                  ) : (
                    <FaCamera className="text-white text-2xl" />
                  )}
                </div>
              </div>

              {/* Camera Icon Badge */}
              <button
                type="button"
                className="absolute -bottom-1 -right-1 w-9 h-9 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-lg border-2 border-white dark:border-slate-900 transition"
                title="Upload Profile Picture"
              >
                {uploading ? <FaSpinner className="animate-spin text-sm" /> : <FaCamera className="text-sm" />}
              </button>

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />
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