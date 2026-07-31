import { FaEdit, FaTrash, FaCalendarAlt } from "react-icons/fa";

const ProjectCard = ({ project, onEdit, onDelete }) => {
  return (
    <div
      className="
        bg-white
        border
        border-gray-200
        rounded-xl
        shadow-md
        hover:shadow-xl
        transition-all
        duration-300
        p-6
        w-full
      "
    >
      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-900 break-words">
        {project.name}
      </h2>

      {/* Description */}
      <p className="mt-4 text-gray-600 leading-7 min-h-[70px] break-words">
        {project.description || "No description available."}
      </p>

      {/* Date */}
      <div className="flex items-center gap-2 mt-5 text-sm text-gray-500">
        <FaCalendarAlt className="text-emerald-600" />
        <span>
          Created on{" "}
          <span className="font-medium text-gray-700">
            {new Date(project.createdAt).toLocaleDateString()}
          </span>
        </span>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 my-6"></div>

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          onClick={() => onEdit(project)}
          className="
            flex-1
            flex
            items-center
            justify-center
            gap-2
            bg-emerald-600
            hover:bg-emerald-700
            text-white
            py-2.5
            rounded-md
            font-semibold
            transition-all
            duration-300
          "
        >
          <FaEdit />
          Edit
        </button>

        <button
          onClick={() => onDelete(project._id)}
          className="
            flex-1
            flex
            items-center
            justify-center
            gap-2
            bg-red-500
            hover:bg-red-600
            text-white
            py-2.5
            rounded-md
            font-semibold
            transition-all
            duration-300
          "
        >
          <FaTrash />
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;