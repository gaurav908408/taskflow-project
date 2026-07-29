const Project = require("../models/Project");
const Task = require("../models/Task");

const getDashboard = async (req, res) => {
  try {
    const totalProjects = await Project.countDocuments({
      userId: req.user._id,
    });

    const totalTasks = await Task.countDocuments();

    const completedTasks = await Task.countDocuments({
      status: "Done",
    });

    const pendingTasks = await Task.countDocuments({
      status: {
        $ne: "Done",
      },
    });

    res.status(200).json({
      success: true,
      dashboard: {
        totalProjects,
        totalTasks,
        completedTasks,
        pendingTasks,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getDashboard,
};