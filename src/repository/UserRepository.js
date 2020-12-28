const User = require('../models/User');

function addUser(userId) {
    var user = new User({vk_id: userId});
    User.exists({vk_id: userId}, function (err, data) {
        if (err) { console.log(err); }
        else {
            if (data == false) {
                user.save(function (err) {
                    if (err) { console.log(err); }
                    else console.log('user was saved');
                });
            }
            else console.log('user has already been added');
        }
    });
};

module.exports = {
    addUser
};