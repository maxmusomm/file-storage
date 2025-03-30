const multer = require('multer');
const cloudinary = require('./cloudinary')
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configure Multer to store files in memory
const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'uploads',
        allowed_formats: ['jpg', 'png', 'jpeg', 'pdf']
    }
});

// Initialize Multer with the memory storage engine
const upload = multer({
    storage, limits: {
        fileSize: 5 * 1024 * 1024
    }
});


module.exports = upload;