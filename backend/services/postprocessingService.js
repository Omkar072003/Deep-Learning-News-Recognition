exports.formatResults = (analysisResult) => {
  // Format model output for frontend
  return {
    summary: JSON.stringify(analysisResult)
  };
};