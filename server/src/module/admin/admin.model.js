const { required } = require("joi");
const { default: mongoose } = require("mongoose");

const AdminSchema = new mongoose.Schema({
    name: {
        type: String, 
        min: 3, 
        max: 30,
        required: true
    },
    email: {
        type: String, 
        required: true
    },
    password: {
        type: String, 
        required: true
    }
})

const AdminModel = new mongoose.model("User", AdminSchema)

module.exports = AdminModel