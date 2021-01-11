var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var UserSchema = new Schema({
    vk_id: Number,
    sex: String,
    age: Number,
    eduLevel: String,
    maritalStatus: String,
    socialStatus: String,
    approval: Boolean
},
{
    versionKey: false
});

const User = mongoose.model('User', UserSchema);

module.exports = User;