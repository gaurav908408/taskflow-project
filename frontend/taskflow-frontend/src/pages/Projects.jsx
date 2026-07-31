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
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  const handleEdit = (project) => {
    navigate(`/projects/edit/${project._id}`);
  };

  if (loading) return <Loader />;

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-5 mb-10">

          <div>
            <h1 className="text-4xl font-bold text-gray-800">
              📁 Projects
            </h1>

            <p className="text-gray-500 mt-2">
              Manage all your projects from one place.
            </p>
          </div>

          <button
            onClick={() => navigate("/projects/create")}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-semibold shadow-md transition hover:shadow-lg"
          >
            + New Project
          </button>

        </div>

        {/* Projects */}
        {projects.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-md p-12 text-center">

            <h2 className="text-2xl font-bold text-gray-700">
              No Projects Found
            </h2>

            <p className="text-gray-500 mt-3">
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