const Project = require("../models/Project");

// ==============================
// Create Project
// ==============================
const createProject = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "Name and Description are required",
      });
    }

    const project = await Project.create({
      name: name.trim(),
      description: description.trim(),
      userId: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Project Created Successfully",
      project,
    });
  } catch (error) {
    console.error("Create Project Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ==============================
// Get All Projects (Pagination)
// ==============================
const getProjects = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const totalProjects = await Project.countDocuments({
      userId: req.user._id,
    });

    const projects = await Project.find({
      userId: req.user._id,
    })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      totalProjects,
      currentPage: page,
      totalPages: Math.ceil(totalProjects / limit),
      count: projects.length,
      projects,
    });
  } catch (error) {
    console.error("Get Projects Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ==============================
// Get Single Project
// ==============================
const getProjectById = async (req, res) => {
  try {
    const project = await Project.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.status(200).json({
      success: true,
      project,
    });
  } catch (error) {
    console.error("Get Project Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ==============================
// Update Project
// ==============================
const updateProject = async (req, res) => {
  try {
    const { name, description } = req.body;

    const project = await Project.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    if (name) project.name = name.trim();
    if (description) project.description = description.trim();

    await project.save();

    res.status(200).json({
      success: true,
      message: "Project Updated Successfully",
      project,
    });
  } catch (error) {
    console.error("Update Project Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ==============================
// Delete Project
// ==============================
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    await project.deleteOne();

    res.status(200).json({
      success: true,
      message: "Project Deleted Successfully",
    });
  } catch (error) {
    console.error("Delete Project Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
};