import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import Loader from "../components/Loader";
import TaskCard from "../components/TaskCard";
import { getTasks, deleteTask } from "../services/api";
import toast from "react-hot-toast";

const Tasks = () => {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadTasks = async () => {
    try {
      setLoading(true);

      const { data } = await getTasks({
        search,
        status,
        priority,
        page,
        limit: 6,
      });

      setTasks(data.tasks);
      setTotalPages(data.totalPages);
    } catch (error) {
      toast.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, [search, status, priority, page]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmDelete) return;

    try {
      await deleteTask(id);

      toast.success("Task deleted successfully");

      loadTasks();
    } catch (error) {
      toast.error("Failed to delete task");
    }
  };

  const handleEdit = (task) => {
    navigate(`/tasks/edit/${task._id}`);
  };

  const handleCreateTask = () => {
    navigate("/tasks/create");
  };

  if (loading) {
    return <Loader />;
  }
    return (
    <Layout>
      <div className="w-full max-w-5xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              Task Management
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Organize, filter and track your team tasks.
            </p>
          </div>

          <button
            onClick={handleCreateTask}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl shadow-xs transition font-semibold text-sm"
          >
            + Create Task
          </button>
        </div>

        {/* Search & Filters */}
        <div className="bg-white rounded-2xl shadow-xs border border-gray-200/80 p-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            <input
              type="text"
              placeholder="🔍 Search Task..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />

            <select
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setPage(1);
              }}
              className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            >
              <option value="">All Status</option>
              <option value="Todo">Todo</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>

            <select
              value={priority}
              onChange={(e) => {
                setPriority(e.target.value);
                setPage(1);
              }}
              className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            >
              <option value="">All Priority</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>

          </div>
        </div>

        {/* Task Cards Grid: Exactly 2 Cards Per Row */}
        {tasks.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200/80 p-12 text-center shadow-xs">
            <h2 className="text-xl font-bold text-gray-700">
              No Tasks Found
            </h2>

            <p className="text-gray-500 text-xs mt-1.5">
              Create your first task or change your search filter.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {tasks.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>

            <div className="flex justify-center items-center gap-4 pt-4">

              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="px-4 py-2 text-sm font-semibold rounded-xl bg-gray-100 text-gray-700 disabled:opacity-40 hover:bg-gray-200 transition"
              >
                Previous
              </button>

              <span className="font-semibold text-sm text-gray-600">
                Page {page} of {totalPages}
              </span>

              <button
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
                className="px-4 py-2 text-sm font-semibold rounded-xl bg-emerald-600 text-white disabled:opacity-40 hover:bg-emerald-700 transition"
              >
                Next
              </button>

            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Tasks;