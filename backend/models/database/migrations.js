const db = require('../../config/database');

const migrate = () => {
  // Add extra columns, modify tables if needed
  db.run(`ALTER TABLE uploads ADD COLUMN originalName TEXT`);
};

module.exports = migrate;