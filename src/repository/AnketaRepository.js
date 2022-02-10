const Anketa = require('../models/Anketa');

function createAnketa(userId, fullname, phone, mail, workandstudies, region, position, status) {
    var anketa = new Anketa(
        {
            vk_id: Number,
            fullname: String,
            phone: Number,
            mail: String,
            workandstudies: String,
            region: String,
            position: String,
            status: String,
        });
    Anketa.exists({vk_id: userId}, function (err, data) {
        if (err) { console.log(err); }
        else {
                anketa.save(function (err) {
                    if (err) { console.log(err); }
                    else console.log('user was saved');
                });
        }
    });
}

module.exports = {
    createAnketa
};