const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
    phonemail: {
        type: String,
        required: true,
        trim: true
    },
    mailpassword:{
        type: String,
        required: true,
        trim: true
    }
});

const Login = new mongoose.model('Login',logSchema);
module.exports = Login;