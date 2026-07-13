const sharp = require('sharp');

exports.preprocessImage = async (filePath) => {
  // Resize and normalize image before analysis
  return await sharp(filePath)
    .resize(64, 64)
    .toBuffer();
};

// placeholder - could be expanded for video preprocessing as well
exports.preprocessVideo = async (filePath) => {
  // Add video preprocessing logic (e.g., extract frames)
  return filePath;
};