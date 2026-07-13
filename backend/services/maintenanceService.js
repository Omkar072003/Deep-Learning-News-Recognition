const fs = require('fs');

exports.backupDatabase = (dbPath, backupDir) => {
  const fileName = `backup-${Date.now()}-${path.basename(dbPath)}`;
  const dest = path.join(backupDir, fileName);
  fs.copyFileSync(dbPath, dest);
  return dest;
};

exports.backupFile = (filePath, backupDir) => {
  const fileName = `backup-${Date.now()}-${path.basename(filePath)}`;
  const dest = path.join(backupDir, fileName);
  fs.copyFileSync(filePath, dest);
  return dest;
};