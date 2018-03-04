const mongodb = require('../../models/mongo');

exports.insertEvent = function (data, next) {
    let events = mongodb.get().collection('events');

    events.insertOne(data, (err) => {
        if (err) {
            const err = new Error('Not Found');
            err.status = 404;
            next(err);
        } else {
            next(null, data._id);
        }
    });
};