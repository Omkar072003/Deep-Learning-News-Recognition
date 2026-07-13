const db = require('../../config/database');

const Result = {
  create: (data) => {
    return new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO results (analysisId, summary) VALUES (?, ?)',
        [data.analysisId, data.summary],
        function (err) {
          if (err) reject(err);
          else resolve({ id: this.lastID, ...data });
        }
      );
    });
  },
  findAll: () => {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM results', [], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }
};

module.exports = Result;