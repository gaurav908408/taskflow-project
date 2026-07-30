import { FaEdit, FaTrash } from "react-icons/fa";

const ProjectCard = ({ project, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all">
      <h2 className="text-xl font-bold text-gray-800">
        {project.name}
      </h2>

      <p className="text-gray-500 mt-2">
        {project.description}
      </p>

      <p className="text-sm text-gray-400 mt-4">
        Created: {new Date(project.createdAt).toLocaleDateString()}
      </p>

      <div className="flex gap-3 mt-5">
        <button
          onClick={() => onEdit(project)}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg"
        >
          <FaEdit />
          Edit
        </button>

        <button
          onClick={() => onDelete(project._id)}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          <FaTrash />
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;