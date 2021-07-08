const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    _id: { type: Schema.Types.ObjectId },
    fullname: { type: String },
    email: { 
        type: String, 
        require: true , 
        unique : true, 
        match: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    },
    password: { type: String, require: true }
});

var User = mongoose.model('User', userSchema, 'users')

module.exports = User
