const mongodb = require('../../models/mongo');
const ObjectId = require('mongodb').ObjectId;

exports.profile = function (id, next) {
    let users = mongodb.get().collection('users');

    users.findOne({_id: ObjectId(id)}, (err, document) => {
        if (err || document == null) {
            const err = new Error('Not Found');
            err.status = 404;
            next(err);
        } else {
            next(null, document);
        }
    });
};