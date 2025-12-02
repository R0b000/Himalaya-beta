const { appConfig } = require("../config/config");
const adminSvc = require("../module/admin/admin.service");
const jwt = require("jsonwebtoken"); // You were missing this import
const UserSessionModel = require("../module/admin/admin.session.model");

const auth = () => {
    return async (req, res, next) => {
        try {
            // 1. Get token from header
            let token = req.headers.authorization; // You need to fetch it from request headers

            if (!token) {
                return res.status(401).json({
                    code: 401,
                    status: "Token Expected",
                    message: "Token required"
                });
            }

            // Remove "Bearer " if it exists
            token = token.split(' ').pop();

            const sessionData = await UserSessionModel.findOne({
                "accessToken.maskedToken": token
            })

            // 2. Verify JWT
            let decode;
            try {
                decode = jwt.verify(sessionData.accessToken.actualToken, appConfig.jwtToken);
            } catch (err) {
                return res.status(401).json({
                    code: 401,
                    status: "Jwt Expired or Invalid",
                    message: "Please login again"
                });
            }

            // 3. Check token type
            if (decode.type !== 'Bearer') {
                return res.status(401).json({
                    code: 401,
                    status: "Invalid token",
                    message: "Invalid token type"
                });
            }

            // 4. Fetch user details
            const userDetails = await adminSvc.getUserById(decode.id);
            

            if (!userDetails) {
                return res.status(404).json({
                    code: 404,
                    status: "User Not Found",
                    message: "No user found for this token"
                });
            }

            // 5. Get full profile (optional)
            const loggedInUser = adminSvc.getMyProfile(userDetails);

            // Attach user to request
            req.loggedInUser = loggedInUser;

            // Proceed to next middleware
            next();
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                code: 500,
                status: "Server Error",
                message: "Something went wrong"
            });
        }
    }
}

module.exports = auth;
