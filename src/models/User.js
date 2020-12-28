var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var UserSchema = new Schema({
    vk_id: Number
},
{
    versionKey: false
});

const User = mongoose.model('User', UserSchema);

module.exports = User;