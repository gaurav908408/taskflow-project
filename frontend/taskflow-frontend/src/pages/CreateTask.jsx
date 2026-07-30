import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import Loader from "../components/Loader";
import { createTask, getProjects } from "../services/api";
import toast from "react-hot-toast";

const CreateTask = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "Todo",
    priority: "Medium",
    dueDate: "",
    projectId: "",
  });

  const loadProjects = async () => {
    try {
      const { data } = await getProjects();
      setProjects(data.projects);
    } catch (error) {
      toast.error("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createTask(formData);

      toast.success("Task Created Successfully");

      navigate("/tasks");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to create task"
      );
    }
  };

  if (loading) return <Loader />;
    return (
    <Layout>
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold text-center text-emerald-700 mb-8">
          Create Task
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            type="text"
            name="title"
            placeholder="Task Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 outline-none focus:border-emerald-500"
            required
          />

          <textarea
            name="description"
            placeholder="Task Description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 outline-none focus:border-emerald-500"
            required
          />

          <select
            name="projectId"
            value={formData.projectId}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 outline-none focus:border-emerald-500"
            required
          >
            <option value="">Select Project</option>

            {projects.map((project) => (
              <option
                key={project._id}
                value={project._id}
              >
                {project.name}
              </option>
            ))}
          </select>

          <div className="grid md:grid-cols-3 gap-4">

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="border rounded-lg p-3"
            >
              <option value="Todo">Todo</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>

            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="border rounded-lg p-3"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>

            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="border rounded-lg p-3"
              required
            />

          </div>

          <div className="flex gap-4">

            <button
              type="submit"
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg transition"
            >
              Create Task
            </button>

            <button
              type="button"
              onClick={() => navigate("/tasks")}
              className="flex-1 bg-gray-300 hover:bg-gray-400 py-3 rounded-lg transition"
            >
              Cancel
            </button>

          </div>

        </form>
      </div>
    </Layout>
  );
};

export default CreateTask;