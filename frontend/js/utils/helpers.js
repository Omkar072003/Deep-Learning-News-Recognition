export function validateFile(file) {
  const allowed = ['image/jpeg', 'image/png', 'video/mp4', 'video/mpeg'];
  return allowed.includes(file.type);
}