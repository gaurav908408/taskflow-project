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
          className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 shadow-sm hover:shadow-xl hover:shadow-emerald-500/10 hover:-translate-y-1.5 hover:border-emerald-500/40 dark:hover:border-emerald-500/40 transition-all duration-300 cursor-grab active:cursor-grabbing flex flex-col justify-between group"
        >
          <div>
            <div className="flex justify-between items-start gap-2">
              <h3 className="font-bold text-slate-800 dark:text-slate-100 text-base break-words group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                {task.title}
              </h3>

              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap ${
                  priorityColor[task.priority] || "bg-slate-100 text-slate-700"
                }`}
              >
                {task.priority}
              </span>
            </div>

            <p className="text-slate-500 dark:text-slate-400 text-xs mt-2 line-clamp-3 leading-relaxed">
              {task.description}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>📅 {new Date(task.dueDate).toLocaleDateString()}</span>
              {task.projectId?.name && (
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold truncate max-w-[120px]">
                  {task.projectId.name}
                </span>
              )}
            </div>

            <div className="flex gap-2 pt-1">
              <button
                onClick={() => onEdit(task)}
                className="flex-1 bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-600 text-emerald-700 dark:text-emerald-400 hover:text-white h-8 text-xs font-semibold rounded-lg flex items-center justify-center gap-1 transition-colors"
              >
                <FaEdit />
                Edit
              </button>

              <button
                onClick={() => onDelete(task._id)}
                className="flex-1 bg-rose-50 dark:bg-rose-950/60 hover:bg-rose-600 text-rose-600 dark:text-rose-400 hover:text-white h-8 text-xs font-semibold rounded-lg flex items-center justify-center gap-1 transition-colors"
              >
                <FaTrash />
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default KanbanTaskCard;