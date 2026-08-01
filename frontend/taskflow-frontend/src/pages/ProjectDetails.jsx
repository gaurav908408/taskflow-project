import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "../components/Layout";
import Loader from "../components/Loader";
import { getProject, getTasks } from "../services/api";
import toast from "react-hot-toast";

const ProjectDetails = () => {
  const { id } = useParams();

  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProject = async () => {
    try {
      const projectRes = await getProject(id);
      const taskRes = await getTasks();

      setProject(projectRes.data.project);

      const filteredTasks = taskRes.data.tasks.filter(
        (task) => task.projectId === id
      );

      setTasks(filteredTasks);
    } catch (error) {
      toast.error("Failed to load project");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProject();
  }, []);

  if (loading) return <Loader />;

  return (
    <Layout>
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm p-8">

        <div className="flex justify-between items-center mb-6">

          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100">
              {project.name}
            </h1>

            <p className="text-slate-500 dark:text-slate-400 mt-2">
              {project.description}
            </p>
          </div>

          <Link
            to="/tasks"
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 rounded-xl font-semibold shadow transition"
          >
            + Add Task
          </Link>

        </div>

        <hr className="my-6 border-slate-200 dark:border-slate-800" />

        <h2 className="text-2xl font-bold mb-5 text-slate-900 dark:text-slate-100">
          Project Tasks
        </h2>

        {tasks.length === 0 ? (
          <p className="text-slate-500 dark:text-slate-400">
            No tasks available.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 gap-5">
            {tasks.map((task) => (
              <div
                key={task._id}
                className="border border-slate-200 dark:border-slate-800 rounded-xl p-5 bg-slate-50/50 dark:bg-slate-950/50"
              >
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                  {task.title}
                </h3>

                <p className="text-slate-500 dark:text-slate-400 mt-2">
                  {task.description}
                </p>

                <div className="flex justify-between mt-4">
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                    {task.status}
                  </span>

                  <span className="text-rose-500 font-semibold">
                    {task.priority}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </Layout>
  );
};

export default ProjectDetails;