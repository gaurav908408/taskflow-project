const Project = require("../models/Project");
const Task = require("../models/Task");

const getDashboard = async (req, res) => {
  try {
    const userId = req.user._id;

    // ==========================
    // Project Stats
    // ==========================
    const totalProjects = await Project.countDocuments({
      userId,
    });

    // ==========================
    // Task Stats
    // ==========================
    const totalTasks = await Task.countDocuments({
      userId,
    });

    const completedTasks = await Task.countDocuments({
      userId,
      status: "Done",
    });

    const pendingTasks = await Task.countDocuments({
      userId,
      status: {
        $in: ["Todo", "In Progress"],
      },
    });

    const inProgressTasks = await Task.countDocuments({
      userId,
      status: "In Progress",
    });

    const todoTasks = await Task.countDocuments({
      userId,
      status: "Todo",
    });

    const highPriorityTasks = await Task.countDocuments({
      userId,
      priority: "High",
    });

    const overdueTasks = await Task.countDocuments({
      userId,
      dueDate: { $lt: new Date() },
      status: { $ne: "Done" },
    });

    // ==========================
    // Recent Projects
    // ==========================
    const recentProjects = await Project.find({
      userId,
    })
      .sort({ createdAt: -1 })
      .limit(5);

    // ==========================
    // Recent Tasks
    // ==========================
    const recentTasks = await Task.find({
      userId,
    })
      .populate("projectId", "name")
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      success: true,
      dashboard: {
        totalProjects,
        totalTasks,
        completedTasks,
        pendingTasks,
        inProgressTasks,
        todoTasks,
        highPriorityTasks,
        overdueTasks,
        recentProjects,
        recentTasks,
      },
    });
  } catch (error) {
    console.error("Dashboard Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  getDashboard,
};