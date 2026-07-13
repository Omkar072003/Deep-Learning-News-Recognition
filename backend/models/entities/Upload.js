const db = require('../../config/database');

const Upload = {
  create: (data) => {
    return new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO uploads (filePath, fileType) VALUES (?, ?)',
        [data.filePath, data.fileType],
        function (err) {
          if (err) reject(err);
          else resolve({ id: this.lastID, ...data });
        }
      );
    });
  },
  findAll: () => {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM uploads', [], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }
};

module.exports = Upload;