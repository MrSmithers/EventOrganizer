const mongodb = require('../../models/mongo');
const ObjectId = require('mongodb').ObjectId;

exports.getEvent = function (id, next) {
    let events = mongodb.get().collection('events');

    events.findOne({_id: ObjectId(id)}, (err, document) => {
        if (err || document == null) {
            const err = new Error('Not Found');
            err.status = 404;
            next(err);
        }
        else {
            let users = mongodb.get().collection('users');

            users.findOne({_id: ObjectId(document.userId)}, (err, user) => {
                if (err || user == null) {
                    const err = new Error('Not Found');
                    err.status = 404;
                    next(err);
                }
                else {
                    document.user = user;
                    next(null, document);
                }
            });
        }
    });
};