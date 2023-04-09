const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SignupSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    cpassword: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: Number,
        required: true,
        trim: true
    },
    tokens: [{
        token: {
            type: String,
            required: true,
            trim: true
        }
    }]
});

SignupSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
        this.cpassword = await bcrypt.hash(this.password, 10);
    }
    next();
})

SignupSchema.methods.generateAuthToken = async function () {
    try {
        const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET_KEY)
        this.tokens = this.tokens.concat({token:token});
        await this.save()
        return token
    } catch (error) {
        console.log(error);
    }
}


const SignupUser = new mongoose.model('NetflixSignup', SignupSchema);
module.exports = SignupUser