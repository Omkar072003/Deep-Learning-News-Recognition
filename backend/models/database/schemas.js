const db = require('../../config/database');

const setupTables = () => {
  db.run(
    `CREATE TABLE IF NOT EXISTS uploads (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      filePath TEXT,
      fileType TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )`
  );
  
  db.run(
    `CREATE TABLE IF NOT EXISTS analysis (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT,
      filePath TEXT,
      result TEXT,
      description TEXT,
      categoryPredictions TEXT,
      confidenceRange TEXT,
      topCategory TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )`
  );
  
  db.run(
    `CREATE TABLE IF NOT EXISTS results (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      analysisId INTEGER,
      summary TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (analysisId) REFERENCES analysis(id)
    )`
  );
};

module.exports = setupTables;