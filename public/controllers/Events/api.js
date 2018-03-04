const mongodb = require('../../models/mongo');
const ObjectId = require('mongodb').ObjectId;

exports.getJsonListing = function (next) {
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

exports.getJsonEvent = function (id, next) {
    let events = mongodb.get().collection('events');

    events.findOne({_id: ObjectId(id)}, (err, document) => {
        if (err || document == null) {
            const err = new Error('Not Found');
            err.status = 404;
            next(err);
        }
        else {
            next(null, document);
        }
    });
};

exports.getJsonByParams = function (params, next) {
    let events = mongodb.get().collection('events');

    events.find(params).toArray((err, documents) => {
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



