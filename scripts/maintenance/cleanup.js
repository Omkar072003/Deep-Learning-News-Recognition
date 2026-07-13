const fs = require('fs');
const dirs = [
  '../backend/storage/uploads/temp',
  '../backend/storage/processed/images',
  '../backend/storage/processed/videos'
];
dirs.forEach((dir) => {
  fs.readdirSync(dir).forEach((file) => {
    fs.unlinkSync(`${dir}/${file}`);
    console.log(`Deleted: ${dir}/${file}`);
  });
});
console.log('Cleanup completed.');