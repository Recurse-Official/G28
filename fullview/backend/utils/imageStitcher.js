const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const stitchImages = async (imagePaths) => {
  // Logic to combine images into a panoramic view
  const outputPath = path.join(__dirname, "../stitched-image.jpg");

  try {
    const images = await Promise.all(
      imagePaths.map((imagePath) => sharp(imagePath).resize({ height: 500 }).toBuffer())
    );

    await sharp({
      create: {
        width: images.length * 500,
        height: 500,
        channels: 3,
        background: { r: 0, g: 0, b: 0 },
      },
    })
      .composite(
        images.map((buffer, idx) => ({
          input: buffer,
          left: idx * 500,
          top: 0,
        }))
      )
      .toFile(outputPath);

    return outputPath;
  } catch (error) {
    throw new Error("Image stitching failed");
  }
};

module.exports = { stitchImages };
