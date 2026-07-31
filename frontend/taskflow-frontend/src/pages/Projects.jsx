import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import Loader from "../components/Loader";
import ProjectCard from "../components/ProjectCard";
import { getProjects, deleteProject } from "../services/api";
import toast from "react-hot-toast";

const Projects = () => {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadProjects = async () => {
    try {
      const { data } = await getProjects();
      setProjects(data.projects);
    } catch (error) {
      toast.error("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this project?")) return;

    try {
      await deleteProject(id);
      toast.success("Project deleted");
      loadProjects();
    } catch {
      toast.error("Delete failed");
    }
  };

  const handleEdit = (project) => {
    navigate(`/projects/edit/${project._id}`);
  };

  if (loading) return <Loader />;

  return (
    <Layout>
      <div className="w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">
              📁 Projects
            </h1>

            <p className="mt-2 text-lg text-gray-500">
              Manage all your projects from one place.
            </p>
          </div>

          {/* Button */}
          <div className="mr-24">
            <button
              onClick={() => navigate("/projects/create")}
              className="
                bg-emerald-600
                hover:bg-emerald-700
                text-white
                px-6
                py-3
                rounded-md
                font-semibold
                shadow-md
                hover:shadow-lg
                transition-all
                duration-300
              "
            >
              + New Project
            </button>
          </div>
        </div>

        {projects.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-14 text-center">
            <h2 className="text-2xl font-bold text-gray-700">
              No Projects Found
            </h2>

            <p className="mt-3 text-gray-500">
              Create your first project to get started.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {projects.map((project) => (
              <ProjectCard
                key={project._id}
                project={project}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Projects;