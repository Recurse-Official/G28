const express = require("express");
const multer = require("multer");
const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid"); // Install with: npm install uuid

const app = express();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadId = req.uploadId || uuidv4(); // Generate a unique folder for each upload
    req.uploadId = uploadId;
    const uploadFolder = path.join(__dirname, "uploads", uploadId);
    if (!fs.existsSync(uploadFolder)) {
      fs.mkdirSync(uploadFolder, { recursive: true }); // Create folder if it doesn't exist
    }
    cb(null, uploadFolder);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Preserve the original file name
  },
});

const upload = multer({ storage });

// POST endpoint to handle image uploads
app.post("/upload", upload.array("images"), (req, res) => {
  const uploadFolder = path.join(__dirname, "uploads", req.uploadId); // Current upload folder
  const stitchedOutput = path.join(__dirname, "stitched", `stitched-panorama-${req.uploadId}.jpg`);

  // Get all files in the upload folder
  const imagePaths = fs.readdirSync(uploadFolder).map((file) => path.join(uploadFolder, file));
  console.log("Processing images from folder:", uploadFolder);

  // Run Python stitching script
  exec(
    `python stitch_images.py ${imagePaths.join(" ")} ${stitchedOutput}`,
    (error, stdout, stderr) => {
      // Clean up the upload folder after processing
      fs.rmSync(uploadFolder, { recursive: true, force: true }); // Delete folder and its contents

      if (error) {
        console.error("Error stitching images:", stderr);
        return res.status(500).json({ error: "Failed to stitch images" });
      }

      console.log("Stitching complete:", stdout);
      res.json({ stitchedImageUrl: `http://localhost:5000/stitched/${path.basename(stitchedOutput)}` });
    }
  );
});

// Serve stitched images
app.use("/stitched", express.static(path.join(__dirname, "stitched")));

// Start the server
app.listen(5000, () => {
  console.log("Backend running at http://localhost:5000");
});
