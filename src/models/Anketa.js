var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var AnketaSchema = new Schema({
        vk_id: Number,
        fullname: String,
        phone: Number,
        mail: String,
        workandstudies: String,
        region: String,
        position: String,
        status: String,
    },
    {
        versionKey: false
    });

const Anketa = mongoose.model('Anketa', AnketaSchema);

module.exports = Anketa;