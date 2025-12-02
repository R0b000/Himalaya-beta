const adminSvc = require("./admin.service");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const { appConfig } = require("../../config/config");
const { randomNumberGeneration } = require("../../services/helper");

class AdminController {
    loginAdmin = async (req, res, next) => {
        try {
            const { email, password } = req.body;

            // Step 1: Check if user exists
            const response = await adminSvc.loginUser({ email: email });

            if (!response) {
                return res.json({
                    code: 404,
                    status: "User Not Found",
                    message: "No account found with this email."
                });
            }

            // Step 2: Compare password
            const isMatch = bcrypt.compareSync(password, response.password);

            if (!isMatch) {
                return res.json({
                    code: 401,
                    status: "Credential Error",
                    message: "Credentials do not match. Try again."
                });
            }

            const accessToken = jwt.sign({id: response._id, type: "Bearer"}, appConfig.jwtToken, {expiresIn: '24 hrs'})
            const refreshToken = jwt.sign({id: response._id, type: "Refresh"}, appConfig.jwtToken, {expiresIn: '24 hrs'})

            const sessionData  = {
                user: response._id,
                accessToken: {
                    actualToken: accessToken,
                    maskedToken: randomNumberGeneration(150)
                }, 
                refreshToken: {
                    refreshToken: refreshToken,
                    maskedToken: randomNumberGeneration(150)
                }
            };

            const sessionResponse = await adminSvc.saveSession(sessionData);

            // Step 3: Success response
            return res.json({
                data: {
                    actualToken: sessionResponse.accessToken.maskedToken,
                    refreshToken: sessionResponse.refreshToken.maskedToken
                },
                code: 200,
                status: "Success",
                message: "Thank you for logging in."
            });

        } catch (error) {
            console.log(error);
            return res.json({
                code: 500,
                status: "Error",
                message: "Something went wrong!",
                error: error.message
            });
        }
    }

    registerAdmin = async (req, res, next) => {
        try {
            let data = req.body;

            const transformedData = adminSvc.transformData(data)

            const response = await adminSvc.saveUser(transformedData);

            res.json({
                data: response,
                code: 200,
                status: "Success",
                message: "Thank you for registering"
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                code: 500,
                status: "Error",
                message: "Registration failed",
                error: error.message
            })
        }
    }

    uploadVideo = async (req, res, next) => {
        try {
            const transformedData = await adminSvc.transformVideoData(req);

            const response = await adminSvc.saveVideo(transformedData);

            res.json({
                data: response,
                code: 200, 
                status: "Success",
                message: "Video uploaded successfully"
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                code: 500,
                status: "Error",
                message: "Video upload failed",
                error: error.message
            })
        }
    }

    uploadImage = async (req, res, next) => {
        try {
            const transformedData = await adminSvc.transformImageData(req);
            console.log(transformedData)

            const response = await adminSvc.saveImage(transformedData);

            res.json({
                data: response,
                code: 200, 
                status: "Success",
                message: "Images uploaded successfully"
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                code: 500,
                status: "Error",
                message: "Image upload failed",
                error: error.message
            })
        }
    }

    listUserData = async (req, res, next) => {
        try {
            console.log('check: I am at listing.')
            const {imageData, videoData} = await adminSvc.listData();

            res.json({
                data: {
                    imageData: imageData, 
                    videoData: videoData
                },
                code: 200, 
                status: "Success",
                message: "Data fetched successfully",
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                code: 500,
                status: "Error",
                message: "Failed to fetch data",
                error: error.message
            })
        }
    }

    deleteVideo = async (req, res, next) => {
        try {
            const { id } = req.params;

            const response = await adminSvc.deleteVideo(id);

            res.json({
                data: response,
                code: 200,
                status: "Success",
                message: "Video deleted successfully"
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                code: 500,
                status: "Error",
                message: "Failed to delete video",
                error: error.message
            })
        }
    }

    deleteImage = async (req, res, next) => {
        try {
            const { id } = req.params;

            const response = await adminSvc.deleteImage(id);

            res.json({
                data: response,
                code: 200,
                status: "Success",
                message: "Images deleted successfully"
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                code: 500,
                status: "Error",
                message: "Failed to delete images",
                error: error.message
            })
        }
    }
}

const adminCtrl = new AdminController();

module.exports = adminCtrl
