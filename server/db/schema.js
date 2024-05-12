const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    fullname:{
        type: String,
        required: [true, 'please provide your name'],
        unique: false

    },
    email:{
        type: String,
        requied: [true, "Provide an email"],
        unique: [true, "Email Exists"]
    },
    password:{
        type: String,
        required: [true, "provide password"],
        unique: false,
    }
})

module.exports = mongoose.model('Users', UserSchema);