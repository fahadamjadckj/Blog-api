const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {type: String, required: true, maxLength: 50},
    username: {type:String, required: true, maxLength: 50},
    password: {type:String, required: true},
    is_admin: {type: Boolean, required: true, default: false}
});

const User = mongoose.model('User', UserSchema);
module.exports = User;