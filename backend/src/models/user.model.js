const mongoose = require('mongoose')
// const validator = require('validator')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    _id: { type: Schema.Types.ObjectId },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
    },
    role: {
        type: String,
        // enum: roles,
        default: 'user',
    },
    isEmailVerified: {
        type: Boolean,
        default: false,
    },
});

var User = mongoose.model('User', userSchema, 'users')

module.exports = User
