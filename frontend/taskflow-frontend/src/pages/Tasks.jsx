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
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Tasks
        </h1>

        <button
          onClick={handleCreateTask}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 rounded-lg"
        >
          + New Task
        </button>
      </div>

      {/* Search & Filters */}
      <div className="bg-white shadow rounded-xl p-5 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          <input
            type="text"
            placeholder="Search task..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="border rounded-lg p-3 outline-none focus:border-emerald-500"
          />

          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(1);
            }}
            className="border rounded-lg p-3"
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
            className="border rounded-lg p-3"
          >
            <option value="">All Priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>

        </div>
      </div>

      {tasks.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-10 text-center">
          <h2 className="text-2xl font-semibold">
            No Tasks Found
          </h2>

          <p className="text-gray-500 mt-3">
            Create your first task.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-4 mt-10">

            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-5 py-2 rounded-lg bg-gray-200 disabled:opacity-50"
            >
              Previous
            </button>

            <span className="font-semibold">
              Page {page} of {totalPages}
            </span>

            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className="px-5 py-2 rounded-lg bg-emerald-600 text-white disabled:opacity-50"
            >
              Next
            </button>

          </div>
        </>
      )}
    </Layout>
  );
};

export default Tasks;