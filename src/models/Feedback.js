var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var FeedbackSchema = new Schema({
    vk_id: Number,
    text: String,
    date: String
},
{
    versionKey: false
});

const Feedback = mongoose.model('Feedback', FeedbackSchema);

module.exports = Feedback;