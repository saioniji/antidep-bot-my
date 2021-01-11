const User = require('../models/User');

function createUser(userId, sex, age, eduLevel, maritalStatus, socialStatus, approval) {
    var user = new User(
        {
            vk_id: userId, 
            sex: sex, 
            age: age, 
            eduLevel: eduLevel,
            maritalStatus: maritalStatus,
            socialStatus: socialStatus,
            approval: approval
        });
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
    createUser
};