exports.isValidFile = (mimetype) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'video/mp4', 'video/mpeg'];
  return allowedTypes.includes(mimetype);
};