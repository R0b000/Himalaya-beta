const mongoose = require('mongoose');
const { mongooseConfig } = require('../config/config');

(async () => {
    try {
        await mongoose.connect(mongooseConfig.url, {
            dbName: mongooseConfig.db_name
        })
        console.log("Mongoose Connected Successfully")
    } catch(error) {
        console.log(error);
    }
})()