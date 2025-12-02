const mongoose = require('mongoose');

const UserSessionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    accessToken: {
        actualToken: String, 
        maskedToken: String
    }, 
    refreshToken: {
        actualToken: String, 
        maskedToken: String
    }, 
}, {
    autoCreate: true, 
    autoIndex: true,
})

const UserSessionModel = new mongoose.model('/Session', UserSessionSchema);

module.exports = UserSessionModel;