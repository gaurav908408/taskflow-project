const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const validate = require("../middleware/validationMiddleware");
const projectValidation = require("../middleware/projectValidation");

const {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");

// Protect all routes
router.use(protect);

// Create Project
router.post("/", projectValidation, validate, createProject);

// Get All Projects
router.get("/", getProjects);

// Get Single Project
router.get("/:id", getProjectById);

// Update Project
router.put("/:id", projectValidation, validate, updateProject);

// Delete Project
router.delete("/:id", deleteProject);

module.exports = router;