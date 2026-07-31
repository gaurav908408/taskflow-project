import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DragDropContext } from "@hello-pangea/dnd";
import Layout from "../components/Layout";
import Loader from "../components/Loader";
import KanbanColumn from "../components/KanbanColumn";
import {
  getTasks,
  deleteTask,
  updateTaskStatus,
} from "../services/api";
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
    if (!window.confirm("Delete this task?")) return;

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

  const onDragEnd = async (result) => {
    const { destination, source } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const task = tasks.find(
      (t) => t._id === result.draggableId
    );

    if (!task) return;

    try {
      await updateTaskStatus(task._id, destination.droppableId);

      toast.success("Task Status Updated");

      loadTasks();
    } catch (error) {
      toast.error("Failed to update task");
    }
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

  if (loading) return <Loader />;
    return (
    <Layout>
      <div className="w-full space-y-6">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h1 className="text-3xl font-bold text-gray-800">
              Kanban Board
            </h1>

            <button
              onClick={() => navigate("/tasks/create")}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 rounded-xl shadow transition font-medium"
            >
              + Create Task
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            <KanbanColumn
              title="Todo"
              droppableId="Todo"
              bgColor="bg-slate-700"
              tasks={todoTasks}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />

            <KanbanColumn
              title="In Progress"
              droppableId="In Progress"
              bgColor="bg-amber-500"
              tasks={progressTasks}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />

            <KanbanColumn
              title="Done"
              droppableId="Done"
              bgColor="bg-emerald-600"
              tasks={doneTasks}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />

          </div>
        </DragDropContext>
      </div>
    </Layout>
  );
};

export default Kanban;