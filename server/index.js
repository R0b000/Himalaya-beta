require('dotenv').config();

const http = require('http');
const app = require('./src/config/express.config');

// Move this BEFORE creating http server
if (process.env.NODE_ENV === 'production') {
    console.log(' Running in production mode');
    app.set('trust proxy', 1);

    const compression = require('compression');
    app.use(compression());
} else {
    console.log(' Running in development mode');
}

const PORT = process.env.PORT || 8000;
const httpServer = http.createServer(app);
const URL = '0.0.0.0'

httpServer.listen(PORT, URL, () => {
    console.log(`Server running on port ${PORT}`);
});