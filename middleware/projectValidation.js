const { body } = require("express-validator");

const projectValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Project name is required")
    .isLength({ min: 3 })
    .withMessage("Project name must be at least 3 characters"),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ min: 5 })
    .withMessage("Description must be at least 5 characters"),
];

module.exports = projectValidation;