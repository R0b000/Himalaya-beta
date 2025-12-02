const adminRouter = require('../module/admin/admin.router');
const route = require('express').Router();

route.use('/admin', adminRouter)

module.exports = route