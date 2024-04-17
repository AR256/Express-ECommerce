const mongoose = require('mongoose');

const registeredUserSchema = mongoose.Schema({
    username: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true
    },
    password: {
        type:String,
        required:true
    }
});

const RegisteredUser = mongoose.model('RegisteredUser', registeredUserSchema);

module.exports = RegisteredUser;