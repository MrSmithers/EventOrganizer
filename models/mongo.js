const MongoClient = require('mongodb').MongoClient;

const mode = process.argv[2];

// Local includes.
const database = require('../config/database')(mode);

let state = {
    db: null,
};

exports.connect = function(next) {
    if (state.db) return next();

    MongoClient.connect(database.url+database.validate, function(err, db) {
        // Call the callback, passing in the error.
        if (err) return next(err);
        // Select database
        state.db = db.db(database.validate);
        // Call the callback without error.
        next();
    });
};

exports.get = function() {
    return state.db;
};

exports.close = function(next) {
    if (state.db) {
        state.db.close(function(err, result) {
            state.db = null;
            state.mode = null;
            // Call the callback, passing in err for the callback to deal with.
            next(err);
        });
    }
};