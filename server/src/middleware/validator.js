const validator = (rules) => {
    return async (req, res, next) => {
        try {
            await rules.validateAsync(req.body, { abortEarly: false })
            next();
        } catch (error) {
            console.log(error)
            return res.status(400).json({
                status: "Validation Failed",
                message: error.details.map(err => err.message)
            });
        }
    }
}

module.exports = { validator }