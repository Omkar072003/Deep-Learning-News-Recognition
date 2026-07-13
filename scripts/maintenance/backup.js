const { backupDatabase, backupFile } = require('../../backend/services/maintenanceService');
backupDatabase('../backend/data/databases/content_recognition.db', '../backend/storage/backups/db_backups');
console.log('Database backup done.');
// Similarly backup files as needed.