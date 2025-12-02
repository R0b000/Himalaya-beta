const mongoose = require('mongoose')

const VideoSchema = new mongoose.Schema({
    public_id: {
        type: String,
        required: true,
        unique: true
    },
    secure_url: {
        type: String,
        required: true
    },
    title: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    autoCreate: true, 
    autoIndex: true,
});

const ImageSchema = new mongoose.Schema({
    images: [{
        public_id: {
            type: String,
            required: true
        },
        secure_url: {
            type: String,
            required: true
        }
    }],
    title: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    autoCreate: true,
    autoIndex: true, 
})

const VideoModel = mongoose.model('Video', VideoSchema);
const ImageModel = mongoose.model("Image", ImageSchema);

module.exports = {
    VideoModel, 
    ImageModel
}