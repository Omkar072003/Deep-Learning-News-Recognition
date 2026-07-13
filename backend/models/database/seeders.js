const db = require('../../config/database');

const seed = () => {
  db.run(
    `INSERT INTO uploads (filePath, fileType) VALUES ('/example/path/image.png', 'image')`
  );
};

module.exports = seed;