const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const piexif = require("piexifjs");

const app = express();
const PORT = 5000;
const UPLOAD_DIR = path.join(__dirname, "uploads/");
const METADATA_FILE = path.join(__dirname, "metadata.json");

app.use(cors());
app.use(express.static(UPLOAD_DIR));

// Ensure uploads and metadata directories/files exist
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR);
if (!fs.existsSync(METADATA_FILE)) fs.writeFileSync(METADATA_FILE, JSON.stringify([]));

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Helper function to extract date from EXIF metadata
const getExifDate = (filePath) => {
  try {
    const imageBuffer = fs.readFileSync(filePath);
    const exifData = piexif.load(imageBuffer.toString("binary"));

    if (exifData["0th"] && exifData["0th"][piexif.ImageIFD.DateTime]) {
      const exifDate = exifData["0th"][piexif.ImageIFD.DateTime];
      return exifDate;
    }
  } catch (error) {
    console.error("Error reading EXIF data:", error.message);
  }
  return null; // Return null if no EXIF date is found
};

// Upload endpoint
app.post("/upload", upload.array("images"), (req, res) => {
  const images = [];
  let metadata = [];

  try {
    // Safely parse metadata file
    metadata = JSON.parse(fs.readFileSync(METADATA_FILE, "utf-8"));
  } catch (error) {
    console.error("Error reading metadata file. Reinitializing...");
    metadata = [];
    fs.writeFileSync(METADATA_FILE, JSON.stringify([]));
  }

  req.files.forEach((file, index) => {
    const filePath = path.join(UPLOAD_DIR, file.filename);
    const exifDate = getExifDate(filePath);

    const date = exifDate ? exifDate : new Date().toISOString().split("T")[0]; // Fallback to current date
    const descriptionKey = `description_${index}`;
    const description = req.body[descriptionKey] || ""; // Fetch the description for this file
    const imageEntry = { filename: file.filename, date, description };

    metadata.push(imageEntry);
    images.push(imageEntry);
  });

  // Write metadata to file
  fs.writeFileSync(METADATA_FILE, JSON.stringify(metadata, null, 2));
  console.log("Metadata saved:", JSON.stringify(metadata, null, 2));

  res.json({ images });
});

// Start server
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
