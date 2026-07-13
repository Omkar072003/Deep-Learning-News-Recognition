exports.formatSuccess = (data) => ({
  success: true,
  data
});

exports.formatError = (error) => ({
  success: false,
  error: error.message || error
});