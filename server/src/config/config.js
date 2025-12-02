require('dotenv').config()

const mongooseConfig = {
    url: process.env.MONGOOSE_URL,
    db_name: process.env.MONGOOSE_DB
}

const cloudinaryConfig = {
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
}

const appConfig = {
    jwtToken: process.env.JWT_TOKEN
}

module.exports = {
    mongooseConfig,
    cloudinaryConfig,
    appConfig
}