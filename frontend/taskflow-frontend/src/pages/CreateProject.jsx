import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProject } from "../services/api";
import Layout from "../components/Layout";
import toast from "react-hot-toast";

const CreateProject = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createProject(formData);
      toast.success("Project Created Successfully");
      navigate("/projects");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to create project"
      );
    }
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-gray-100 shadow-lg p-6 sm:p-10">

        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            🚀 Create Project
          </h1>

          <p className="mt-2 text-gray-500 text-base">
            Create your project and start managing your tasks.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Project Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Project Name *
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter project name"
              required
              className="w-full h-12 rounded-xl border border-gray-300 px-4 text-base outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description
            </label>

            <textarea
              rows={4}
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Write something about your project..."
              className="w-full rounded-xl border border-gray-300 p-4 text-base resize-none outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 h-12 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-base font-semibold shadow transition"
            >
              Create Project
            </button>

            <button
              type="button"
              onClick={() => navigate("/projects")}
              className="flex-1 h-12 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-base font-semibold transition"
            >
              Cancel
            </button>
          </div>

        </form>

      </div>
    </Layout>
  );
};

export default CreateProject;