const Result = require('../models/Result');
const { formatDate } = require('../external');

function createResult(userId) {
    var result = new Result({
            vk_id: userId,
            results: {
                depression: {
                    date: null,
                    score: null,
                    sane: null
                },
                anxiety1: {
                    date: null,
                    score: null,
                    sane: null
                },
                anxiety2: {
                    date: null,
                    score: null,
                    sane: null
                },
                stress: {
                    date: null,
                    score: null,
                    sane: null
                },
                motivation: {
                    date: null,
                    score: null,
                    sane: null
                },
                burnout: {
                    date: null,
                    exhaustion: null,
                    reduction: null,
                    depersonalization: null,
                    total: null
                },
                inclination: {
                    date: null,
                    score: null
                },
                aggression: {
                    date: null,
                    score: null,
                    sane: null
                },
                lifestyle: {
                    date: null,
                    score: null,
                    sane: null
                },
                temper: {
                    date: null,
                    score: null,
                    kind: null
                },
                eysenck: {
                    date: null,
                    kind: null,
                    neuroticism: null,
                    lie: null
                }
            }
    });
    Result.exists({vk_id: userId}, function (err, data) {
        if (err) { console.log(err); }
        else {
            if (data == false) {
                result.save(function (err) {
                    if (err) { console.log(err); }
                    else console.log('result object was created');
                });
            }
            else console.log('result object has already been created');
        }
    });
};

function updateResult(vk_id, testType, score, sanity) {
    var filter = { vk_id: vk_id };
    var result = Result.findOne(filter, function(err, res) {
        switch(testType) {
            case 'depression':
                res.results.depression = { date: formatDate(), score: score, sane: sanity };
                break;
            case 'stress':
                res.results.stress = { date: formatDate(), score: score, sane: sanity };
                break;
            case 'anxiety1':
                res.results.anxiety1 = { date: formatDate(), score: score, sane: sanity };
                break;
            case 'anxiety2':
                res.results.anxiety2 = { date: formatDate(), score: score, sane: sanity };
                break;
            case 'motivation':
                res.results.motivation = { date: formatDate(), score: score, sane: sanity };
                break;
            case 'aggression':
                res.results.aggression = { date: formatDate(), score: score, sane: sanity };
            case 'lifestyle':
                res.results.lifestyle = { date: formatDate(), score: score, sane: sanity };    
    }
        if (err) { console.log(err) }
        else {
            result.updateOne(filter, {$set: {results: res.results}}, function(err) {
                if (err) throw err;
                else 
                    console.log('result object was updated');
                    console.log('added data about ' + testType);
            });
        }
    });
};

function updateBurnout(vk_id, exhaustion, reduction, deperson, total) {
    var filter = { vk_id: vk_id };
    var result = Result.findOne(filter, function(err, res) {
        res.results.burnout = { 
            date: formatDate(), 
            exhaustion: exhaustion,
            reduction: reduction,
            depersonalization: deperson,
            total: total
        }
        if (err) { console.log(err) }
        else {
            result.updateOne(filter, {$set: {results: res.results}}, function(err) {
                if (err) throw err;
                else 
                    console.log('result object was updated');
                    console.log('added data about burnout');
            });
        }
    });
};

function updateTemper(vk_id, testType, kind, score) {
    var filter = { vk_id: vk_id };
    var result = Result.findOne(filter, function(err, res) {
        switch(testType) {
            case 'inclination':
                res.results.inclination = { date: formatDate(), score: score, kind: kind };
                break;
            case 'temper':
                res.results.temper = { date: formatDate(), score: score, kind: kind };
                break;
        }
        if (err) { console.log(err) }
        else {
            result.updateOne(filter, {$set: {results: res.results}}, function(err) {
                if (err) throw err;
                else 
                    console.log('result object was updated');
                    console.log('added data about ' + testType);
            });
        }
    });
};

function updateEysenck(vk_id, kind, neuroticism, lie) {
    var filter = { vk_id: vk_id };
    var result = Result.findOne(filter, function(err, res) {
        res.results.eysenck = { 
            date: formatDate(), 
            kind: kind,
            neuroticism: neuroticism,
            lie: lie
        }
        if (err) { console.log(err) }
        else {
            result.updateOne(filter, {$set: {results: res.results}}, function(err) {
                if (err) throw err;
                else 
                    console.log('result object was updated');
                    console.log('added data about eysenck test');
            });
        }
    });
};

module.exports = {
    createResult, updateResult, updateBurnout, updateTemper, updateEysenck
}