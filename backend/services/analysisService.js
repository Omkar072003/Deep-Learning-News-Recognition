const Analysis = require('../models/entities/Analysis');

exports.saveAnalysis = async (data) => {
  return await Analysis.create(data);
};

exports.getAllAnalyses = async () => {
  return await Analysis.findAll();
};