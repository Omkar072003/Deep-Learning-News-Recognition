const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

// Storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = path.join(__dirname, '../storage/uploads/images');
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        // Generate unique filename with hash
        const hash = crypto.randomBytes(16).toString('hex');
        cb(null, hash);
    }
});

// File filter
const fileFilter = (req, file, cb) => {
    const allowedMimes = [
        'image/jpeg', 
        'image/jpg', 
        'image/png', 
        'image/gif',
        'video/mp4',
        'video/mpeg',
        'video/quicktime'
    ];
    
    if (allowedMimes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only JPEG, PNG, GIF images and MP4 videos are allowed.'), false);
    }
};

// Multer configuration
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 50 * 1024 * 1024 // 50MB max file size
    }
});

module.exports = upload.single('file');
