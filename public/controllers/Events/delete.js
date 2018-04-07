const mongodb = require('../../models/mongo');
const ObjectId = require('mongodb').ObjectId;

exports.getEvent = function (id, next) {
    let events = mongodb.get().collection('events');

    events.findOne({_id: ObjectId(id)}, (err, document) => {
        if (err) {
            const err = new Error('Not Found');
            err.status = 404;
            next(err);
        } else {
            next(null, document);
        }
    });
};

exports.deleteEvent = function (id, next) {
    let events = mongodb.get().collection('events');

    events.deleteOne({_id: ObjectId(id)}, (err) => {
        if (err) {
            const err = new Error('Not Found');
            err.status = 404;
            next(err);
        } else {
            next();
        }
    });
}