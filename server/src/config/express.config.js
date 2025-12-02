const express = require('express');
const cors = require('cors')
const helmet = require('helmet')
const { rateLimit } = require('express-rate-limit')
const route = require('./router.config');
require('./mongoose.config')

const app = express();

const allowedUrl = [
    'http://localhost:5173',
]

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedUrl.includes(origin)) {
            return callback(null, true);
        }
        return callback(new Error("Not allowed by CORS"))
    },
    credentials: true
}))

app.use(helmet());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
})

app.use(limiter)

app.use(express.urlencoded({
    limit: '5mb',
    extended: true
}))

app.use(express.json({
    limit: '3mb'
}))

app.use('/', route);

//Invalid Url
app.use((req, res, next) => {
    res.json({
        code: 402,
        message: "Invalid Url",
        status: "Invalid Url"
    })
})

//Middleware
app.use((error, req, res, next) => {
    let data = error.data || null;
    let code = error.code || 500;
    let message = error.message || "Internal Service Error";
    let status = error.status || "Error Occured";
    let options = error.options || null;

    res.status(code).json({
        data: data,
        message: message,
        status: status,
        options: options
    })
})

module.exports = app
