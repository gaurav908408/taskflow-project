const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const validate = require("../middleware/validationMiddleware");
const taskValidation = require("../middleware/taskValidation");

const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  updateTaskStatus,
  deleteTask,
} = require("../controllers/taskController");

// Protect all routes
router.use(protect);

// Create Task
router.post("/", taskValidation, validate, createTask);

// Get All Tasks
router.get("/", getTasks);

// Get Single Task
router.get("/:id", getTaskById);

// Update Task
router.put("/:id", taskValidation, validate, updateTask);

router.patch("/:id/status", updateTaskStatus);
// Delete Task
router.delete("/:id", deleteTask);

module.exports = router;