const { body } = require("express-validator");

const taskValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required"),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required"),

  body("projectId")
    .notEmpty()
    .withMessage("Project ID is required"),

  body("dueDate")
    .notEmpty()
    .withMessage("Due Date is required")
    .isISO8601()
    .withMessage("Invalid Date"),

  body("status")
    .optional()
    .isIn(["Todo", "In Progress", "Done"])
    .withMessage("Invalid Status"),

  body("priority")
    .optional()
    .isIn(["Low", "Medium", "High"])
    .withMessage("Invalid Priority"),
];

module.exports = taskValidation;