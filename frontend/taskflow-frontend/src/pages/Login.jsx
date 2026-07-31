import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaRocket, FaEnvelope, FaLock, FaCheckCircle } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const success = await login(formData);
    setLoading(false);

    if (success) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      
      {/* Background Glow Circles */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-5xl bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 z-10">
        
        {/* Left Side: Brand Section */}
        <div className="p-8 sm:p-12 bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-900 border-b lg:border-b-0 lg:border-r border-slate-800/80 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white text-xl shadow-lg shadow-emerald-500/20">
                <FaRocket className="transform -rotate-12" />
              </div>
              <h1 className="text-2xl font-extrabold text-white tracking-tight">
                TaskFlow
              </h1>
            </div>

            <div className="mt-10">
              <h2 className="text-3xl font-extrabold text-white tracking-tight leading-tight">
                Organize work. <br />
                <span className="text-emerald-400">Deliver projects faster.</span>
              </h2>
              <p className="mt-3 text-slate-400 text-sm leading-relaxed">
                TaskFlow gives teams the clarity and alignment needed to execute projects on time with intuitive tracking and kanban boards.
              </p>
            </div>
          </div>

          <div className="mt-10 space-y-3">
            <div className="flex items-center gap-3 text-xs font-semibold text-slate-300">
              <FaCheckCircle className="text-emerald-400 text-sm" />
              <span>Real-time Project & Task Tracking</span>
            </div>
            <div className="flex items-center gap-3 text-xs font-semibold text-slate-300">
              <FaCheckCircle className="text-emerald-400 text-sm" />
              <span>Interactive Drag & Drop Kanban Boards</span>
            </div>
            <div className="flex items-center gap-3 text-xs font-semibold text-slate-300">
              <FaCheckCircle className="text-emerald-400 text-sm" />
              <span>Role-Based Access & Secure Sign-In</span>
            </div>
          </div>
        </div>

        {/* Right Side: Form Section */}
        <div className="p-8 sm:p-12 flex flex-col justify-center">
          <div className="mb-8">
            <h3 className="text-2xl font-extrabold text-white tracking-tight">
              Welcome back
            </h3>
            <p className="text-slate-400 text-sm mt-1">
              Please enter your credentials to access your workspace.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                  <FaEnvelope />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full h-12 rounded-xl bg-slate-800/80 border border-slate-700/80 pl-11 pr-4 text-white text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                  <FaLock />
                </div>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full h-12 rounded-xl bg-slate-800/80 border border-slate-700/80 pl-11 pr-4 text-white text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-sm font-semibold shadow-lg shadow-emerald-600/30 transition mt-2 flex items-center justify-center gap-2"
            >
              {loading ? "Signing in..." : "Sign In to Workspace"}
            </button>
          </form>

          <p className="mt-8 text-center text-slate-400 text-sm">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-emerald-400 hover:text-emerald-300 font-semibold underline underline-offset-4"
            >
              Create Account
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Login;