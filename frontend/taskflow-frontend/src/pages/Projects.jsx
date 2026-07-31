import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import Loader from "../components/Loader";
import ProjectCard from "../components/ProjectCard";
import {
  getProjects,
  deleteProject,
  createProject,
} from "../services/api";
import toast from "react-hot-toast";

const Projects = () => {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const loadProjects = async () => {
    try {
      const { data } = await getProjects();

      setProjects(data.projects);
      setFilteredProjects(data.projects);
    } catch (error) {
      toast.error("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  useEffect(() => {
    const filtered = projects.filter((project) => {
      const value = search.toLowerCase();

      return (
        project.name.toLowerCase().includes(value) ||
        (project.description || "")
          .toLowerCase()
          .includes(value)
      );
    });

    setFilteredProjects(filtered);
  }, [search, projects]);

  const handleCreate = async () => {
    if (!name.trim()) {
      return toast.error("Project name is required");
    }

    try {
      await createProject({
        name,
        description,
      });

      toast.success("Project created");

      setName("");
      setDescription("");

      loadProjects();
    } catch (error) {
      toast.error("Failed to create project");
    }
  };

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
      <section className="w-full max-w-5xl mx-auto space-y-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-2">
              📁 Manage Projects
            </h1>

            <p className="mt-1 text-slate-500 dark:text-slate-400 text-sm">
              Create, search and manage all your team projects.
            </p>
          </div>

          <div className="w-full sm:w-72">
            <input
              type="text"
              placeholder="🔍 Search Project..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
                w-full
                h-11
                rounded-xl
                border
                border-slate-200
                dark:border-slate-800
                bg-white
                dark:bg-slate-900
                text-slate-900
                dark:text-slate-100
                placeholder-slate-400
                dark:placeholder-slate-500
                px-4
                text-sm
                outline-none
                transition
                focus:ring-2
                focus:ring-emerald-500/20
                focus:border-emerald-500
                shadow-xs
              "
            />
          </div>

        </div>

        {/* Create Project Form Card */}
        <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm">

          <h2 className="text-base font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
            ✨ Create New Project
          </h2>

          <div className="flex flex-col gap-4">

            <input
              type="text"
              placeholder="Project Name *"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="
                w-full
                h-12
                rounded-xl
                border
                border-slate-200
                dark:border-slate-800
                bg-white
                dark:bg-slate-950
                text-slate-900
                dark:text-slate-100
                placeholder-slate-400
                dark:placeholder-slate-500
                px-4
                text-sm
                outline-none
                transition
                focus:border-emerald-500
                focus:ring-2
                focus:ring-emerald-500/20
              "
            />

            <textarea
              rows={3}
              placeholder="Project Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="
                w-full
                rounded-xl
                border
                border-slate-200
                dark:border-slate-800
                bg-white
                dark:bg-slate-950
                text-slate-900
                dark:text-slate-100
                placeholder-slate-400
                dark:placeholder-slate-500
                p-4
                text-sm
                outline-none
                resize-none
                transition
                focus:border-emerald-500
                focus:ring-2
                focus:ring-emerald-500/20
              "
            />

            <div className="flex justify-start pt-1">
              <button
                onClick={handleCreate}
                className="
                  h-11
                  px-7
                  rounded-xl
                  bg-emerald-600
                  hover:bg-emerald-500
                  text-white
                  text-sm
                  font-semibold
                  shadow-sm
                  transition-all
                "
              >
                + Create Project
              </button>
            </div>

          </div>

        </div>

        {/* Projects Grid: Exactly 2 Cards Per Row */}
        {filteredProjects.length === 0 ? (

          <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 py-16 text-center shadow-xs">

            <h2 className="text-xl font-bold text-slate-700 dark:text-slate-300">
              No Projects Found
            </h2>

            <p className="mt-1.5 text-slate-500 dark:text-slate-400 text-xs">
              Try creating a new project or adjust your search filter.
            </p>

          </div>

        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {filteredProjects.map((project) => (

              <ProjectCard
                key={project._id}
                project={project}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />

            ))}

          </div>

        )}

      </section>
    </Layout>
  );
};

export default Projects;