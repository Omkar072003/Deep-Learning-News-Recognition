const Result = require('../models/entities/Result');

exports.getAnalysisResults = async (req, res) => {
  try {
    const results = await Result.findAll();
    res.status(200).json({ success: true, results });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};