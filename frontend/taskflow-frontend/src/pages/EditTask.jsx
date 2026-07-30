import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import Loader from "../components/Loader";
import {
  getTask,
  getProjects,
  updateTask,
} from "../services/api";
import toast from "react-hot-toast";

const EditTask = () => {
  const { id } = useParams();
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

  const loadData = async () => {
    try {
      const [taskRes, projectRes] = await Promise.all([
        getTask(id),
        getProjects(),
      ]);

      const task = taskRes.data.task;

      setProjects(projectRes.data.projects);

      setFormData({
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        dueDate: task.dueDate
          ? task.dueDate.substring(0, 10)
          : "",
        projectId: task.projectId._id,
      });
    } catch (error) {
      toast.error("Failed to load task");
      navigate("/tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
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
      await updateTask(id, formData);

      toast.success("Task Updated Successfully");

      navigate("/tasks");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to update task"
      );
    }
  };

  if (loading) return <Loader />;
    return (
    <Layout>
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold text-center text-emerald-700 mb-8">
          Edit Task
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            type="text"
            name="title"
            placeholder="Task Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <textarea
            name="description"
            placeholder="Task Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            rows="4"
            required
          />

          <select
            name="projectId"
            value={formData.projectId}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          >
            <option value="">Select Project</option>

            {projects.map((project) => (
              <option key={project._id} value={project._id}>
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
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg"
            >
              Update Task
            </button>

            <button
              type="button"
              onClick={() => navigate("/tasks")}
              className="flex-1 bg-gray-300 hover:bg-gray-400 py-3 rounded-lg"
            >
              Cancel
            </button>

          </div>

        </form>
      </div>
    </Layout>
  );
};

export default EditTask;