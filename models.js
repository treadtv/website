var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.model ('User', new mongoose.Schema({
    email: String,
    passwordHash : String
}))