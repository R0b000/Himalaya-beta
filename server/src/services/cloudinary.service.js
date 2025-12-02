const { cloudinaryConfig } = require('../config/config');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

class CloudinaryService {
    constructor() {
        cloudinary.config({
            cloud_name: cloudinaryConfig.cloud_name,
            api_key: cloudinaryConfig.api_key,
            api_secret: cloudinaryConfig.api_secret
        });
    }

    imageUploader = async (file) => {
        try {
            const result = await cloudinary.uploader.upload(file.path, {
                resource_type: "image",
                public_id: file.originalname.split('.')[0],
                overwrite: true
            });

            // Delete temporary file after upload
            if (fs.existsSync(file.path)) {
                fs.unlinkSync(file.path);
            }

            return {
                public_id: result.public_id,
                secure_url: result.secure_url
            };
        } catch (error) {
            // Clean up file on error
            if (fs.existsSync(file.path)) {
                fs.unlinkSync(file.path);
            }
            throw error;
        }
    }

    videoUploader = async (file) => {
        try {
            const result = await cloudinary.uploader.upload(file.path, {
                resource_type: "video",
                public_id: file.originalname.split('.')[0],
                overwrite: true
            });

            // Delete temporary file after upload
            if (fs.existsSync(file.path)) {
                fs.unlinkSync(file.path);
            }

            return {
                public_id: result.public_id,
                secure_url: result.secure_url
            };
        } catch (error) {
            // Clean up file on error
            if (fs.existsSync(file.path)) {
                fs.unlinkSync(file.path);
            }
            throw error;
        }
    }

    deleteFile = async (public_id, resource_type = 'image') => {
        try {
            const result = await cloudinary.uploader.destroy(public_id, {
                resource_type: resource_type
            });
            return result;
        } catch (error) {
            throw error;
        }
    }
}

const cloudinarySvc = new CloudinaryService();

module.exports = cloudinarySvc