const path = require("path");
const fs = require("fs");

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

let upload;

try {
  const multer = require("multer");

  // Storage Configuration
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const ext = path.extname(file.originalname);
      cb(null, `profile-${req.user ? req.user._id : "user"}-${uniqueSuffix}${ext}`);
    },
  });

  // File Filter (Images Only)
  const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = allowedTypes.test(file.mimetype);

    if (extName && mimeType) {
      return cb(null, true);
    } else {
      cb(new Error("Only image files (jpg, jpeg, png, webp) are allowed!"));
    }
  };

  upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter,
  });
} catch (error) {
  console.warn("⚠️ Multer package not installed. Please run 'npm i multer' inside backend folder.");
  upload = {
    single: () => (req, res, next) => {
      return res.status(500).json({
        success: false,
        message: "Multer package is missing. Please run 'npm i multer' in backend folder.",
      });
    },
  };
}

module.exports = upload;
