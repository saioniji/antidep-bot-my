const Feedback = require('../models/Feedback');
const { formatDate } = require('../external');

function addFeedback(vk_id, text) {
    var feedback = new Feedback({ vk_id: vk_id, text: text, date: formatDate() });
    // на heroku не работает
    // поробывать insert() и create()
    feedback.save(function (err) {
        if (err) { console.log(err); }
        else console.log('feedback was saved');
    });
};

module.exports = {
    addFeedback
};