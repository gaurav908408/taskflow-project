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
      <div className="min-h-[calc(100vh-90px)] bg-gray-50 flex justify-center items-start px-6 py-12">
        {/* Form Card */}
        <div className="w-full max-w-3xl bg-white rounded-3xl border border-gray-100 shadow-xl">
          <div className="px-14 py-12">
            {/* Heading */}
            <h1 className="text-5xl font-bold text-gray-900 leading-tight">
              Create New Project
            </h1>

            <p className="mt-3 mb-10 text-lg text-gray-500">
              Create your project and start managing your tasks.
            </p>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Project Name */}
              <div>
                <label className="block text-base font-semibold text-gray-900 mb-3">
                  Project Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter project name"
                  required
                  className="
                    w-full
                    h-14
                    rounded-2xl
                    border
                    border-gray-200
                    bg-white
                    px-6
                    text-lg
                    placeholder:text-gray-400
                    outline-none
                    transition-all
                    duration-200
                    focus:border-emerald-500
                    focus:ring-4
                    focus:ring-emerald-100
                  "
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-base font-semibold text-gray-900 mb-3">
                  Description
                </label>

                <textarea
                  rows={6}
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Write something about your project..."
                  className="
                    w-full
                    rounded-2xl
                    border
                    border-gray-200
                    bg-white
                    px-6
                    py-5
                    resize-none
                    text-lg
                    placeholder:text-gray-400
                    outline-none
                    transition-all
                    duration-200
                    focus:border-emerald-500
                    focus:ring-4
                    focus:ring-emerald-100
                  "
                />
              </div>

              {/* Button */}
              <div className="flex justify-center pt-2">
                <button
                  type="submit"
                  className="
                    w-full
                    md:w-[38%]
                    h-14
                    rounded-2xl
                    bg-emerald-600
                    hover:bg-emerald-700
                    text-white
                    text-lg
                    font-semibold
                    shadow-lg
                    hover:shadow-xl
                    transition-all
                    duration-300
                  "
                >
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProject;