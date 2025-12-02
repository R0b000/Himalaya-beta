const multer = require('multer')
const fs = require('fs');
const { deleteFile } = require('../services/helper');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const path = './assets/';

        if (!fs.existsSync(path)) {
            fs.mkdirSync(path, { recursive: true })
        }

        cb(null, path)
    },

    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname)
    }
});

const uploader = (type = 'image') => {
    const fileFilter = (req, file, cb) => {

        let allowedExts = [
            // image extensions
            "jpg", "jpeg", "png", "gif", "bmp", "webp", "svg",
            "tiff", "tif", "ico", "avif", "heic", "heif"
        ];

        if (type === 'video') {
            allowedExts = [
                "mp4", "mov", "avi", "mkv", "wmv",
                "flv", "webm", "m4v", "mpg", "mpeg", "3gp"
            ];
        }

        const ext = file.originalname.split('.').pop().toLowerCase();

        if (!allowedExts.includes(ext)) {
            return cb(new Error("Invalid file type!"), false);
        }

        cb(null, true);
    };

    return multer({
        storage: storage,
        fileFilter: fileFilter
    });
};

module.exports = uploader;