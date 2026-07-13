const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const dbDir = path.join(__dirname, '../data/databases');
const dbPath = path.join(dbDir, 'content_recognition.db');

// Ensure database directory exists
if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
    console.log('✅ Created database directory');
}

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('❌ Error opening database:', err);
    } else {
        console.log('✅ Connected to SQLite database');
        initializeTables();
    }
});

// Initialize database tables
function initializeTables() {
    db.serialize(() => {
        // Analysis table
        db.run(`
            CREATE TABLE IF NOT EXISTS analysis (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                type TEXT NOT NULL,
                filePath TEXT NOT NULL,
                result TEXT NOT NULL,
                newsCategory TEXT,
                confidence REAL,
                processingTime INTEGER,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `, (err) => {
            if (err) {
                console.error('Error creating analysis table:', err);
            } else {
                console.log('✅ Analysis table ready');
            }
        });

        // Users table (optional, for future authentication)
        db.run(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE NOT NULL,
                email TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Add indexes for better performance
        db.run(`CREATE INDEX IF NOT EXISTS idx_analysis_type ON analysis(type)`);
        db.run(`CREATE INDEX IF NOT EXISTS idx_analysis_category ON analysis(newsCategory)`);
        db.run(`CREATE INDEX IF NOT EXISTS idx_analysis_date ON analysis(createdAt)`);
    });
}

// Helper methods
db.runAsync = function(sql, params = []) {
    return new Promise((resolve, reject) => {
        this.run(sql, params, function(err) {
            if (err) reject(err);
            else resolve({ id: this.lastID, changes: this.changes });
        });
    });
};

db.getAsync = function(sql, params = []) {
    return new Promise((resolve, reject) => {
        this.get(sql, params, (err, row) => {
            if (err) reject(err);
            else resolve(row);
        });
    });
};

db.allAsync = function(sql, params = []) {
    return new Promise((resolve, reject) => {
        this.all(sql, params, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
};

module.exports = db;