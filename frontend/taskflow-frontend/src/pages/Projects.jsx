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
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Projects</h1>

        <button
          onClick={() => navigate("/projects/create")}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-lg"
        >
          + New Project
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="bg-white p-10 rounded-xl shadow text-center">
          <h2 className="text-xl font-semibold">
            No Projects Found
          </h2>

          <p className="text-gray-500 mt-2">
            Create your first project.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
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
    </Layout>
  );
};

export default Projects;