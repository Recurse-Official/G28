const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadImages, getUserGallery, getAllData } = require('../controllers/imageController');

// Set up multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 } // 5 MB limit
});

// Routes
router.post('/upload', upload.array('images'), uploadImages);
router.get('/gallery/:username', getUserGallery);
router.get('/all-data', getAllData);

module.exports = router;
