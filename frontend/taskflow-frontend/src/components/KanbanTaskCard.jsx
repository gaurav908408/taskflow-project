import { Draggable } from "@hello-pangea/dnd";
import { FaEdit, FaTrash } from "react-icons/fa";

const KanbanTaskCard = ({
  task,
  index,
  onEdit,
  onDelete,
}) => {
  const priorityColor = {
    High: "bg-red-100 text-red-700",
    Medium: "bg-orange-100 text-orange-700",
    Low: "bg-blue-100 text-blue-700",
  };

  return (
    <Draggable
      draggableId={task._id}
      index={index}
    >
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-white border rounded-xl p-4 shadow hover:shadow-lg transition"
        >
          <div className="flex justify-between items-start">

            <h3 className="font-bold text-gray-800">
              {task.title}
            </h3>

            <span
              className={`px-2 py-1 rounded-full text-xs font-semibold ${
                priorityColor[task.priority]
              }`}
            >
              {task.priority}
            </span>

          </div>

          <p className="text-gray-600 text-sm mt-3">
            {task.description}
          </p>

          <div className="mt-4 text-sm text-gray-500">
            📅{" "}
            {new Date(task.dueDate).toLocaleDateString()}
          </div>

          <div className="mt-2 text-sm">
            <span className="font-medium text-gray-500">
              Project:
            </span>{" "}
            <span className="text-emerald-700 font-semibold">
              {task.projectId?.name}
            </span>
          </div>

          <div className="flex gap-3 mt-5">

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
      )}
    </Draggable>
  );
};

export default KanbanTaskCard;