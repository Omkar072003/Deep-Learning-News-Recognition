// To move uploads to processed or backups directory
const fs = require('fs');
const path = require('path');

exports.moveFile = (src, destDir) => {
  const dest = path.join(destDir, path.basename(src));
  fs.renameSync(src, dest);
  return dest;
};

exports.copyFile = (src, destDir) => {
  const dest = path.join(destDir, path.basename(src));
  fs.copyFileSync(src, dest);
  return dest;
};