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
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold mb-6 text-emerald-600">
          Create Project
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block mb-2 font-medium">
              Project Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter Project Name"
              className="w-full border rounded-lg p-3 outline-none focus:border-emerald-600"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 font-medium">
              Description
            </label>

            <textarea
              rows="5"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter Description"
              className="w-full border rounded-lg p-3 outline-none focus:border-emerald-600"
            ></textarea>
          </div>

          <button
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg"
          >
            Create Project
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default CreateProject;