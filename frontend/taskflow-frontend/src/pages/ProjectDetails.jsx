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
      <div className="bg-white rounded-xl shadow-md p-8">

        <div className="flex justify-between items-center mb-6">

          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              {project.name}
            </h1>

            <p className="text-gray-500 mt-2">
              {project.description}
            </p>
          </div>

          <Link
            to="/tasks"
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 rounded-lg"
          >
            + Add Task
          </Link>

        </div>

        <hr className="my-6" />

        <h2 className="text-2xl font-bold mb-5">
          Project Tasks
        </h2>

        {tasks.length === 0 ? (
          <p className="text-gray-500">
            No tasks available.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 gap-5">
            {tasks.map((task) => (
              <div
                key={task._id}
                className="border rounded-lg p-5"
              >
                <h3 className="text-xl font-semibold">
                  {task.title}
                </h3>

                <p className="text-gray-500 mt-2">
                  {task.description}
                </p>

                <div className="flex justify-between mt-4">
                  <span className="text-emerald-600 font-semibold">
                    {task.status}
                  </span>

                  <span className="text-red-500">
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