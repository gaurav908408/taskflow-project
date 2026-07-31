import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { getProject, updateProject } from "../services/api";
import toast from "react-hot-toast";

const EditProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    fetchProject();
  }, []);

  const fetchProject = async () => {
    try {
      const { data } = await getProject(id);

      setFormData({
        name: data.project.name,
        description: data.project.description,
      });
    } catch (error) {
      toast.error("Failed to load project");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateProject(id, formData);

      toast.success("Project Updated Successfully");
      navigate("/projects");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Update Failed"
      );
    }
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-gray-100 shadow-lg p-6 sm:p-10">

        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            ✏️ Edit Project
          </h1>

          <p className="mt-2 text-gray-500 text-base">
            Update your project details
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
              Update Project
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

export default EditProject;