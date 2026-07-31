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
      <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-gray-100 shadow-lg p-6 sm:p-10">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
          ✏️ Edit Task
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Task Title *
            </label>
            <input
              type="text"
              name="title"
              placeholder="Enter task title"
              value={formData.title}
              onChange={handleChange}
              className="w-full h-12 rounded-xl border border-gray-300 px-4 text-base outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Task Description *
            </label>
            <textarea
              name="description"
              placeholder="Enter task description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 p-4 text-base resize-none outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Select Project *
            </label>
            <select
              name="projectId"
              value={formData.projectId}
              onChange={handleChange}
              className="w-full h-12 rounded-xl border border-gray-300 px-4 text-base outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
              required
            >
              <option value="">Select Project</option>

              {projects.map((project) => (
                <option key={project._id} value={project._id}>
                  {project.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full h-12 rounded-xl border border-gray-300 px-4 text-base outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
              >
                <option value="Todo">Todo</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Priority
              </label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full h-12 rounded-xl border border-gray-300 px-4 text-base outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Due Date *
              </label>
              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                className="w-full h-12 rounded-xl border border-gray-300 px-4 text-base outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                required
              />
            </div>

          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">

            <button
              type="submit"
              className="flex-1 h-12 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow transition"
            >
              Update Task
            </button>

            <button
              type="button"
              onClick={() => navigate("/tasks")}
              className="flex-1 h-12 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold transition"
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