const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
  registerUser,
  loginUser,
  getMe,
  uploadProfilePicture,
} = require("../controllers/authController");

// Auth Routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);
router.post("/profile-picture", protect, upload.single("profileImage"), uploadProfilePicture);
router.put("/profile-picture", protect, upload.single("profileImage"), uploadProfilePicture);
router.post("/upload-avatar", protect, upload.single("profileImage"), uploadProfilePicture);

module.exports = router;