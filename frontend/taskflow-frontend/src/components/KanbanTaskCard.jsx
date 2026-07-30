import { FaEdit, FaTrash } from "react-icons/fa";

const KanbanTaskCard = ({ task, onEdit, onDelete }) => {
  const priorityColor = {
    High: "bg-red-100 text-red-700",
    Medium: "bg-orange-100 text-orange-700",
    Low: "bg-blue-100 text-blue-700",
  };

  return (
    <div className="bg-gray-50 border rounded-xl p-4 shadow-sm hover:shadow-md transition">

      <div className="flex justify-between items-start">
        <h3 className="font-bold text-gray-800">
          {task.title}
        </h3>

        <span
          className={`text-xs px-2 py-1 rounded-full ${
            priorityColor[task.priority]
          }`}
        >
          {task.priority}
        </span>
      </div>

      <p className="text-sm text-gray-600 mt-2">
        {task.description}
      </p>

      <p className="text-xs text-gray-500 mt-3">
        📅 {new Date(task.dueDate).toLocaleDateString()}
      </p>

      <div className="flex gap-2 mt-4">

        <button
          onClick={() => onEdit(task)}
          className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg flex items-center justify-center gap-2"
        >
          <FaEdit />
          Edit
        </button>

        <button
          onClick={() => onDelete(task._id)}
          className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg flex items-center justify-center gap-2"
        >
          <FaTrash />
          Delete
        </button>

      </div>

    </div>
  );
};

export default KanbanTaskCard;