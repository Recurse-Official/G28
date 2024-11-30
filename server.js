const express = require("express");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Enable CORS for the frontend
app.use(cors());

// Serve uploaded files statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Ensure uploads directory exists
const fs = require("fs");
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

// Upload endpoint
app.post("/upload", upload.array("images", 10), (req, res) => {
  const fileData = req.files.map((file) => ({
    filename: file.filename,
    path: `/uploads/${file.filename}`,
  }));
  res.json({ images: fileData });
});

// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
