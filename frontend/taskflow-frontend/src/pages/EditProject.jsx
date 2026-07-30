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
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-emerald-600 mb-6">
          Edit Project
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block mb-2">
              Project Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2">
              Description
            </label>

            <textarea
              rows="5"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            />
          </div>

          <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg">
            Update Project
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default EditProject;