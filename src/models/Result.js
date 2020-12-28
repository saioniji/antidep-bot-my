var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ResultSchema = new Schema({
    vk_id: Number,
    results: {
        depression: {
            date: String,
            score: Number,
            sane: Boolean
        },
        anxiety1: {
            date: String,
            score: Number,
            sane: Boolean
        },
        anxiety2: {
            date: String,
            score: Number,
            sane: Boolean
        },
        stress: {
            date: String,
            score: Number,
            sane: Boolean
        },
        motivation: {
            date: String,
            score: Number,
        },
        burnout: {
            date: String,
            /*
            tests: {
                exhaustion: Number,
                reduction: Number,
                depersonalization: Number
            },
            */
            total: Number
        },
        inclination: {
            date: String,
            score: Number
        }
    }
},
{
    versionKey: false
});

const Result = mongoose.model('Result', ResultSchema);

module.exports = Result;