import { FaEdit, FaTrash } from "react-icons/fa";

const TaskCard = ({ task, onEdit, onDelete }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "Todo":
        return "bg-gray-100 text-gray-700";
      case "In Progress":
        return "bg-yellow-100 text-yellow-700";
      case "Done":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-700";
      case "Medium":
        return "bg-orange-100 text-orange-700";
      case "Low":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6">

      <div className="flex justify-between items-start">

        <h2 className="text-xl font-bold text-gray-800">
          {task.title}
        </h2>

        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(
            task.priority
          )}`}
        >
          {task.priority}
        </span>

      </div>

      <p className="text-gray-600 mt-3">
        {task.description}
      </p>

      <div className="flex justify-between mt-5">

        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
            task.status
          )}`}
        >
          {task.status}
        </span>

        <span className="text-sm text-gray-500">
          📅{" "}
          {new Date(task.dueDate).toLocaleDateString()}
        </span>

      </div>

      <div className="mt-3">
        <span className="text-sm text-gray-500">
          Project :
        </span>

        <span className="font-semibold ml-2 text-emerald-700">
          {task.projectId?.name}
        </span>
      </div>

      <div className="flex gap-3 mt-6">

        <button
          onClick={() => onEdit(task)}
          className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg flex items-center justify-center gap-2 transition"
        >
          <FaEdit />
          Edit
        </button>

        <button
          onClick={() => onDelete(task._id)}
          className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg flex items-center justify-center gap-2 transition"
        >
          <FaTrash />
          Delete
        </button>

      </div>

    </div>
  );
};

export default TaskCard;