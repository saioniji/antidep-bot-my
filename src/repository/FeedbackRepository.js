const Feedback = require('../models/Feedback');
const { formatDate } = require('../external');

function addFeedback(vk_id, text) {
    Feedback.save({ vk_id: vk_id, text: text, date: formatDate() }, function(err) {
        if (err) { console.log(err); }
        else console.log('feedback was saved');
    });
};

module.exports = {
    addFeedback
};