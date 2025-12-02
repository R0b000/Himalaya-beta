const Joi = require('joi');

const RegisterUserValidationDTO = Joi.object({
    name: Joi.string()
        .min(3)
        .max(30)
        .required()
        .messages({
            'string.empty': 'Please enter your name',
            'any.required': 'Please enter your name',
        }),

    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.email': 'Please enter a valid email',
            'any.required': 'Email is required'
        }),

    password: Joi.string()
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,20}$/)
        .required()
        .messages({
            'string.pattern.base': 'Password must contain at least 1 lowercase, 1 uppercase, 1 number, and 1 special character.',
            'any.required': 'Password is required'
        })
});

const ImageValidationDTO = Joi.object({
    title: Joi.string().optional(),
    images: Joi.any()
})

const VideoValidationDTO = Joi.object({
    title: Joi.string().optional(),
    video: Joi.any()
})

module.exports = {
    RegisterUserValidationDTO,
    ImageValidationDTO,
    VideoValidationDTO
}