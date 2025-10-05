// routes/uploadRoutes.js
const express = require("express");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

const router = express.Router();

// Cấu hình multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // nơi lưu file
  },
  filename: (req, file, cb) => {
    const uniqueName = uuidv4() + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

// API test upload 1 file
router.post("/single", upload.single("file"), (req, res) => {
  res.json({
    message: "File uploaded successfully",
    filename: req.file.filename,
    url: `/uploads/${req.file.filename}`
  });
});

// API test upload nhiều file
router.post("/multiple", upload.array("files", 5), (req, res) => {
  const files = req.files.map((f) => ({
    filename: f.filename,
    url: `/uploads/${f.filename}`
  }));

  res.json({
    message: "Files uploaded successfully",
    files
  });
});

module.exports = router;
