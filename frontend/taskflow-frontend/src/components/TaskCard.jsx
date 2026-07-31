import { FaEdit, FaTrash, FaCalendarAlt, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

const TaskCard = ({ task, onEdit, onDelete }) => {
  const getStatusBadge = (status) => {
    switch (status) {
      case "Todo":
        return "bg-slate-100 text-slate-700 border-slate-200";
      case "In Progress":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "Done":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "High":
        return "bg-rose-50 text-rose-600 border-rose-200";
      case "Medium":
        return "bg-amber-50 text-amber-600 border-amber-200";
      case "Low":
        return "bg-sky-50 text-sky-600 border-sky-200";
      default:
        return "bg-slate-50 text-slate-600 border-slate-200";
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:shadow-emerald-500/25 transform hover:-translate-y-3 hover:scale-[1.02] hover:border-emerald-500 dark:hover:border-emerald-400 transition-all duration-300 p-6 flex flex-col justify-between h-full group cursor-pointer">

      <div>
        {/* Header Badges */}
        <div className="flex items-center justify-between gap-3 mb-3">
          <span
            className={`px-3 py-1 rounded-lg text-xs font-semibold border ${getStatusBadge(
              task.status
            )}`}
          >
            {task.status}
          </span>

          <span
            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wider border flex items-center gap-1 ${getPriorityBadge(
              task.priority
            )}`}
          >
            <FaExclamationCircle className="text-[10px]" />
            {task.priority} Priority
          </span>
        </div>

        {/* Task Title */}
        <h3 className="text-lg font-bold text-slate-900 break-words group-hover:text-emerald-600 transition-colors leading-snug">
          {task.title}
        </h3>

        {/* Description */}
        <p className="text-slate-500 text-sm mt-2 line-clamp-2 leading-relaxed min-h-[40px]">
          {task.description || "No description provided."}
        </p>
      </div>

      {/* Footer Info & Actions */}
      <div className="mt-6 pt-4 border-t border-slate-100 space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
          <div className="flex items-center gap-1.5">
            <FaCalendarAlt className="text-emerald-500" />
            <span>{new Date(task.dueDate).toLocaleDateString("en-GB")}</span>
          </div>

          {task.projectId?.name && (
            <div className="truncate max-w-[150px] bg-slate-50 px-2 py-0.5 rounded border border-slate-100 font-semibold text-slate-600">
              {task.projectId.name}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit(task)}
            className="flex-1 h-9 rounded-xl bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
          >
            <FaEdit />
            Edit Task
          </button>

          <button
            onClick={() => onDelete(task._id)}
            className="h-9 px-3.5 rounded-xl bg-rose-50 hover:bg-rose-600 text-rose-600 hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
          >
            <FaTrash />
            Delete
          </button>
        </div>
      </div>

    </div>
  );
};

export default TaskCard;