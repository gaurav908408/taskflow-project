import { FaEdit, FaTrash } from "react-icons/fa";

const ProjectCard = ({ project, onEdit, onDelete }) => {
  return (
    <div
      className="
        bg-white
        rounded-2xl
        shadow-md
        border
        border-gray-100
        p-6
        transition-all
        duration-300
        hover:-translate-y-2
        hover:shadow-xl
        flex
        flex-col
        justify-between
        h-full
      "
    >
      {/* Project Info */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800">
          {project.name}
        </h2>

        <p className="text-gray-500 mt-3 leading-7">
          {project.description}
        </p>

        <p className="text-sm text-gray-400 mt-5">
          Created :{" "}
          {new Date(project.createdAt).toLocaleDateString()}
        </p>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 mt-8">

        <button
          onClick={() => onEdit(project)}
          className="
            flex-1
            flex
            justify-center
            items-center
            gap-2
            bg-emerald-600
            hover:bg-emerald-700
            text-white
            py-3
            rounded-xl
            font-semibold
            transition
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
            justify-center
            items-center
            gap-2
            bg-red-500
            hover:bg-red-600
            text-white
            py-3
            rounded-xl
            font-semibold
            transition
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