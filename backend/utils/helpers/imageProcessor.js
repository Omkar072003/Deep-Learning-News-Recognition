const sharp = require('sharp');

exports.processImage = async (filePath) => {
  // Resize, convert, and normalize image
  return await sharp(filePath)
    .resize({ width: 64, height: 64 })
    .normalize()
    .toBuffer();
};