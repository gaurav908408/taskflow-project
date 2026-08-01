import { FaEdit, FaTrash, FaCalendarAlt, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

const TaskCard = ({ task, onEdit, onDelete }) => {
  const getStatusBadge = (status) => {
    switch (status) {
      case "Todo":
        return "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700";
      case "In Progress":
        return "bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800/60";
      case "Done":
        return "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/60";
      default:
        return "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700";
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "High":
        return "bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-300 border-rose-200 dark:border-rose-800/60";
      case "Medium":
        return "bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-300 border-amber-200 dark:border-amber-800/60";
      case "Low":
        return "bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-300 border-sky-200 dark:border-sky-800/60";
      default:
        return "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700";
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
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 break-words group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-snug">
          {task.title}
        </h3>

        {/* Description */}
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-2 line-clamp-2 leading-relaxed min-h-[40px]">
          {task.description || "No description provided."}
        </p>
      </div>

      {/* Footer Info & Actions */}
      <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-medium">
          <div className="flex items-center gap-1.5">
            <FaCalendarAlt className="text-emerald-500" />
            <span>{new Date(task.dueDate).toLocaleDateString("en-GB")}</span>
          </div>

          {task.projectId?.name && (
            <div className="truncate max-w-[150px] bg-slate-50 dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-100 dark:border-slate-700 font-semibold text-slate-600 dark:text-slate-300">
              {task.projectId.name}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit(task)}
            className="flex-1 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-600 dark:hover:bg-emerald-600 text-emerald-700 dark:text-emerald-300 hover:text-white dark:hover:text-white border border-emerald-200/50 dark:border-emerald-800/60 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
          >
            <FaEdit />
            Edit Task
          </button>

          <button
            onClick={() => onDelete(task._id)}
            className="h-9 px-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/60 hover:bg-rose-600 dark:hover:bg-rose-600 text-rose-600 dark:text-rose-300 hover:text-white dark:hover:text-white border border-rose-200/50 dark:border-rose-800/60 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
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