const ImageModel = require('../models/imageModel');
const cloudinary = require('../config/cloudinary');
const sharp = require('sharp');

const uploadImages = async (req, res) => {
    const username = req.body.username;
    const jsonResponse = { username, createdAt: new Date(), images: [] };

    try {
        for (let file of req.files) {
            const fileLastModified =
                req.body[`lastModified_${file.originalname}`];

            // Compress image using Sharp
            const compressedImageBuffer = await sharp(file.buffer)
                .resize(800)
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

        // Check if the username already exists
        const existingUser = await ImageModel.findOne({ username });

        if (existingUser) {
            // Append the images data to the existing user
            existingUser.images.push(...jsonResponse.images);
            await existingUser.save();
            res.status(200).json({
                message: 'Images uploaded successfully',
                data: existingUser,
            });
        } else {
            // Create a new document for the username
            const savedDocument = await ImageModel.create(jsonResponse);
            res.status(200).json({
                message: 'Images uploaded successfully',
                data: savedDocument,
            });
        }
    } catch (error) {
        console.error('Error uploading images:', error);
        res.status(500).json({ message: 'Error uploading images', error });
    }
};


const getUserGallery = async (req, res) => {
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
};

const getAllData = async (req, res) => {
    try {
        const allData = await ImageModel.find();
        res.status(200).json(allData);
    } catch (error) {
        console.error('Error fetching all data:', error);
        res.status(500).json({ message: 'Error fetching all data', error });
    }
};

module.exports = {
    uploadImages,
    getUserGallery,
    getAllData
};
