const express = require('express');
const cors = require('cors');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const sharp = require('sharp');
const mongoose = require('mongoose');

const app = express();
const PORT = 5000;

// Enable CORS
app.use(cors());

// Configure Cloudinary
cloudinary.config({
    cloud_name: 'dxtgk7f7a',
    api_key: '827388668912329',
    api_secret: 'LmWlhbl0GxB5srLUVtu0YKk6xOw'
});

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/imageUploader')
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('MongoDB connection error:', error));

// Define a Mongoose schema
const imageSchema = new mongoose.Schema({
    username: String,
    images: [
        {
            url: String,
            lastModified: String
        }
    ],
    createdAt: { type: Date, default: Date.now }
});
const ImageModel = mongoose.model('Image', imageSchema);

// Set up multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 } // 5 MB limit
});

// Upload images endpoint
app.post('/upload', upload.array('images'), async (req, res) => {
    const username = req.body.username;
    const jsonResponse = { username, createdAt: new Date(), images: [] };

    try {
        for (let file of req.files) {
            const fileLastModified =
                req.body[`lastModified_${file.originalname}`];

            // Compress image using Sharp
            const compressedImageBuffer = await sharp(file.buffer)
                .resize(800) // Resize to width of 800px, maintain aspect ratio
                .jpeg({ quality: 80 })
                .toBuffer();

            // Upload to Cloudinary
            const result = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream(
                    { folder: username },
                    (error, result) => {
                        if (error) return reject(error);
                        resolve(result);
                    }
                ).end(compressedImageBuffer);
            });

            jsonResponse.images.push({
                url: result.secure_url,
                lastModified: fileLastModified,
            });
        }

        const savedDocument = await ImageModel.create(jsonResponse);
        res.status(200).json({
            message: 'Images uploaded successfully',
            data: savedDocument,
        });
    } catch (error) {
        console.error('Error uploading images:', error);
        res.status(500).json({ message: 'Error uploading images', error });
    }
});

// Fetch gallery images endpoint
app.get('/gallery/:username', async (req, res) => {
    const username = req.params.username;

    try {
        const userImages = await ImageModel.findOne({ username });

        if (!userImages) {
            return res.status(404).json({ message: 'No images found for this user' });
        }

        res.status(200).json({ images: userImages.images });
    } catch (error) {
        console.error('Error fetching images:', error);
        res.status(500).json({ message: 'Error fetching images', error });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
