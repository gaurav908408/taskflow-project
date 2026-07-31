import { FaEdit, FaTrash, FaCalendarAlt, FaFolder } from "react-icons/fa";

const ProjectCard = ({ project, onEdit, onDelete }) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:shadow-emerald-500/25 transform hover:-translate-y-3 hover:scale-[1.02] hover:border-emerald-500 dark:hover:border-emerald-400 transition-all duration-300 flex flex-col justify-between h-full overflow-hidden group cursor-pointer">
      
      {/* Top Accent Line */}
      <div className="h-1.5 group-hover:h-2 w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500 transition-all duration-300" />

      {/* Body */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div className="space-y-3">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-lg shadow-xs group-hover:scale-110 transition-transform duration-300">
              <FaFolder />
            </div>

            <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider bg-slate-50 dark:bg-slate-800 px-2.5 py-1 rounded-md border border-slate-100 dark:border-slate-700">
              Project Details
            </span>
          </div>

          {/* Project Name Field */}
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Project Name:
            </span>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 break-words group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-tight mt-0.5">
              {project.name}
            </h3>
          </div>

          {/* Description Field */}
          <div className="pt-1">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Description:
            </span>
            <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed mt-0.5 min-h-[36px]">
              {project.description || "No description provided."}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500 font-medium">
            <FaCalendarAlt className="text-emerald-500" />
            <span>{new Date(project.createdAt).toLocaleDateString("en-GB")}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onEdit(project)}
              className="h-8 px-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-600 dark:hover:bg-emerald-600 text-emerald-700 dark:text-emerald-400 hover:text-white dark:hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <FaEdit />
              Edit
            </button>

            <button
              onClick={() => onDelete(project._id)}
              className="h-8 px-3 rounded-lg bg-rose-50 dark:bg-rose-950/60 hover:bg-rose-600 dark:hover:bg-rose-600 text-rose-600 dark:text-rose-400 hover:text-white dark:hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <FaTrash />
              Delete
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ProjectCard;