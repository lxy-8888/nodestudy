
const mongoose = require('mongoose');
const usersSchema = new mongoose.Schema({
    username:String,
    password:String
});
module.exports.usersModel = mongoose.model('usersModel', usersSchema , 'users');