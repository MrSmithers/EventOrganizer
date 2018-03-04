const mongodb = require('../../models/mongo');

exports.getListing = function (next) {
    let events = mongodb.get().collection('events');

    events.find({}).toArray((err, documents) => {
        if (err) {
            const err = new Error('Not Found');
            err.status = 404;
            next(err);
        }
        else {
            next(null, documents);
        }
    });
};