const Task = require("../models/Task");
const Project = require("../models/Project");

// ==========================================
// Create Task
// ==========================================
const createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      status,
      priority,
      dueDate,
      projectId,
    } = req.body;

    if (!title || !description || !dueDate || !projectId) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Due Date Validation
    if (new Date(dueDate) < new Date()) {
      return res.status(400).json({
        success: false,
        message: "Due date cannot be in the past",
      });
    }

    // Check Project Ownership
    const project = await Project.findOne({
      _id: projectId,
      userId: req.user._id,
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    const task = await Task.create({
      title: title.trim(),
      description: description.trim(),
      status,
      priority,
      dueDate,
      projectId,
      userId: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Task Created Successfully",
      task,
    });
  } catch (error) {
    console.error("Create Task Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ==========================================
// Get All Tasks (Search + Filter + Pagination)
// ==========================================
const getTasks = async (req, res) => {
  try {
    const {
      search,
      status,
      priority,
      page = 1,
      limit = 10,
    } = req.query;

    let query = {
      userId: req.user._id,
    };

    // Search
    if (search) {
      query.$or = [
        {
          title: {
            $regex: search,
            $options: "i",
          },
        },
        {
          description: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    // Status Filter
    if (status) {
      query.status = status;
    }

    // Priority Filter
    if (priority) {
      query.priority = priority;
    }

    const skip = (Number(page) - 1) * Number(limit);

    const totalTasks = await Task.countDocuments(query);

    const tasks = await Task.find(query)
      .populate("projectId", "name")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      totalTasks,
      currentPage: Number(page),
      totalPages: Math.ceil(totalTasks / Number(limit)),
      count: tasks.length,
      tasks,
    });
  } catch (error) {
    console.error("Get Tasks Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ==========================================
// Get Single Task
// ==========================================
const getTaskById = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      userId: req.user._id,
    }).populate("projectId", "name");

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    console.error("Get Task Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
// ==========================================
// Update Task
// ==========================================
const updateTask = async (req, res) => {
  try {
    const {
      title,
      description,
      status,
      priority,
      dueDate,
      projectId,
    } = req.body;

    const task = await Task.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    // If project is changed, verify ownership
    if (projectId) {
      const project = await Project.findOne({
        _id: projectId,
        userId: req.user._id,
      });

      if (!project) {
        return res.status(404).json({
          success: false,
          message: "Project not found",
        });
      }

      task.projectId = projectId;
    }

    // Due Date Validation
    if (dueDate) {
      if (new Date(dueDate) < new Date()) {
        return res.status(400).json({
          success: false,
          message: "Due date cannot be in the past",
        });
      }

      task.dueDate = dueDate;
    }

    if (title) task.title = title.trim();
    if (description) task.description = description.trim();
    if (status) task.status = status;
    if (priority) task.priority = priority;

    await task.save();

    res.status(200).json({
      success: true,
      message: "Task Updated Successfully",
      task,
    });
  } catch (error) {
    console.error("Update Task Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ==========================================
// Delete Task
// ==========================================
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    await task.deleteOne();

    res.status(200).json({
      success: true,
      message: "Task Deleted Successfully",
    });
  } catch (error) {
    console.error("Delete Task Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
};