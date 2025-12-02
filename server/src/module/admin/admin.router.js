const adminCtrl = require('./admin.controller');
const { RegisterUserValidationDTO, ImageValidationDTO, VideoValidationDTO } = require('./admin.validator');
const { validator } = require('../../middleware/validator');
const uploader = require('../../middleware/uploader');
const auth = require('../../middleware/auth');

const adminRouter = require('express').Router();

adminRouter.post('/register', validator(RegisterUserValidationDTO), adminCtrl.registerAdmin)
adminRouter.post('/login', adminCtrl.loginAdmin)
adminRouter.post('/video', auth(), uploader('video').single('video'), adminCtrl.uploadVideo)
adminRouter.post('/image', auth(), uploader('image').array('images', 10), adminCtrl.uploadImage)
adminRouter.get('/dashboard', auth(), adminCtrl.listUserData)
adminRouter.get('/home', adminCtrl.listUserData)
adminRouter.delete('/video/:id', auth(), adminCtrl.deleteVideo)
adminRouter.delete('/image/:id', auth(), adminCtrl.deleteImage)

module.exports = adminRouter