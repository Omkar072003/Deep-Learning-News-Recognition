const Upload = require('../models/entities/Upload');

exports.uploadFile = async (req, res) => {
  try {
    const filePath = req.file.path;
    const fileType = req.file.mimetype.startsWith('image/') ? 'image' : 'video';
    await Upload.create({ filePath, fileType });
    res.status(200).json({ success: true, filePath, fileType });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};