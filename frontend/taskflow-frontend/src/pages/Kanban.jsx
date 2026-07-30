import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import Loader from "../components/Loader";
import KanbanColumn from "../components/KanbanColumn";
import { getTasks, deleteTask } from "../services/api";
import toast from "react-hot-toast";

const Kanban = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);

  const loadTasks = async () => {
    try {
      const { data } = await getTasks();

      setTasks(data.tasks);
    } catch (error) {
      toast.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this task?"
    );

    if (!confirmDelete) return;

    try {
      await deleteTask(id);

      toast.success("Task Deleted");

      loadTasks();
    } catch (error) {
      toast.error("Delete Failed");
    }
  };

  const handleEdit = (task) => {
    navigate(`/tasks/edit/${task._id}`);
  };

  const todoTasks = tasks.filter(
    (task) => task.status === "Todo"
  );

  const progressTasks = tasks.filter(
    (task) => task.status === "In Progress"
  );

  const doneTasks = tasks.filter(
    (task) => task.status === "Done"
  );

  if (loading) {
    return <Loader />;
  }

    return (
    <Layout>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Kanban Board
        </h1>

        <button
          onClick={() => navigate("/tasks/create")}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 rounded-lg transition"
        >
          + Create Task
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <KanbanColumn
          title="Todo"
          bgColor="bg-gray-600"
          tasks={todoTasks}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <KanbanColumn
          title="In Progress"
          bgColor="bg-orange-500"
          tasks={progressTasks}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <KanbanColumn
          title="Done"
          bgColor="bg-emerald-600"
          tasks={doneTasks}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

      </div>
    </Layout>
  );
};

export default Kanban;