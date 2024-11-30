const express = require('express');
const cors = require('cors');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

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

// Set up multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 } // 5 MB limit
});

app.post('/upload', upload.array('images'), async (req, res) => {
    const username = req.body.username;
    const jsonResponse = { username, createdAt: new Date(), images: [] };

    try {
        for (let file of req.files) {
            const fileLastModified =
                req.body[`lastModified_${file.originalname}`];

            // Use Sharp to compress and resize image
            const compressedImageBuffer = await sharp(file.buffer)
                .resize(800) // Resize to width of 800px, maintain aspect ratio
                .jpeg({ quality: 80 }) // Convert to JPEG with quality 80%
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

            // Add image URL and last modified date to JSON response
            jsonResponse.images.push({
                url: result.secure_url,
                lastModified: fileLastModified,
            });
        }

        // Write JSON response to a file
        const filePath = path.join(__dirname, `${username}_images.json`);
        await fs.writeFile(filePath, JSON.stringify(jsonResponse, null, 2));

        res.status(200).json({
            message: 'Images uploaded successfully',
            data: jsonResponse,
        });
    } catch (error) {
        console.error('Error uploading images:', error);
        res.status(500).json({ message: 'Error uploading images', error });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
