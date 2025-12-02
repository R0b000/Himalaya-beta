const AdminModel = require("./admin.model");
const bcrypt = require('bcryptjs');
const UserSessionModel = require("./admin.session.model");
const cloudinarySvc = require("../../services/cloudinary.service");
const { VideoModel, ImageModel } = require("./admin.input.model");

class AdminService {
    transformData = (data) => {
        data.password = bcrypt.hashSync(data.password, 10)
        return data
    }

    saveUser = async (data) => {
        const response = await AdminModel(data)
        return response.save();
    }

    loginUser = async (data) => {
        const response = await AdminModel.findOne({
            email: data.email
        })

        return response
    }

    saveSession = async (data) => {
        const response = await UserSessionModel(data);
        return response.save()
    }

    getUserById = async (userId) => {
        const response = await AdminModel.findById(userId);
        return response;
    }

    getMyProfile = (data) => {
        return {
            name: data.name,
            email: data.email
        }
    }

    transformVideoData = async (req) => {
        if (req.file) {
            const result = await cloudinarySvc.videoUploader(req.file);
            return {
                public_id: result.public_id,
                secure_url: result.secure_url,
                title: req.body.title || ''
            };
        }

        throw new Error('No video file provided');
    };

    transformImageData = async (req) => {
        console.log('sdfasdfasdf', req.files)
        console.log(req.body)

        if (req.files && req.files.length > 0) {
            // Map each file to an upload promise
            const uploadPromises = req.files.map(file => cloudinarySvc.imageUploader(file));
            const results = await Promise.allSettled(uploadPromises);

            // Return array of uploaded file info
            const images = results
                .map(r => r.status === 'fulfilled' ? {
                    public_id: r.value.public_id,
                    secure_url: r.value.secure_url
                } : null)
                .filter(img => img !== null);

            if (images.length === 0) {
                throw new Error('Failed to upload images');
            }

            return {
                images: images,
                title: req.body.title || ''
            };
        }

        throw new Error('No image files provided');
    };

    saveVideo = async (data) => {
        const response = await VideoModel(data);
        return response.save();
    }

    saveImage = async (data) => {
        const response = await ImageModel(data);
        return response.save();
    }

    listData = async () => {
        const imageData = await ImageModel.find();
        const videoData = await VideoModel.find();

        return {imageData, videoData}
    }

    deleteVideo = async (videoId) => {
        const video = await VideoModel.findById(videoId);
        
        if (!video) {
            throw new Error('Video not found');
        }

        // Delete from Cloudinary
        await cloudinarySvc.deleteFile(video.public_id, 'video');

        // Delete from database
        await VideoModel.findByIdAndDelete(videoId);

        return { message: 'Video deleted successfully' };
    }

    deleteImage = async (imageId) => {
        const image = await ImageModel.findById(imageId);
        
        if (!image) {
            throw new Error('Image not found');
        }

        // Delete all images from Cloudinary
        if (image.images && image.images.length > 0) {
            for (const img of image.images) {
                await cloudinarySvc.deleteFile(img.public_id, 'image');
            }
        }

        // Delete from database
        await ImageModel.findByIdAndDelete(imageId);

        return { message: 'Images deleted successfully' };
    }
}

const adminSvc = new AdminService();

module.exports = adminSvc