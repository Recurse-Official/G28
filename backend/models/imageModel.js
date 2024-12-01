const mongoose = require('mongoose');

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

module.exports = ImageModel;
