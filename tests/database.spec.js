var MongoClient = require('mongodb').MongoClient;

describe("Database setup", function() {
    it("should load external database configurations without parameters", function(next) {
        var database = require('../config/database')();
        MongoClient.connect(database.url+database.validate, function(err, client) {
            expect(err).toEqual(null);
            next();
        });
    });
    it("should load external database configurations with parameters", function(next) {
        var database = require('../config/database')('Mongo', 'external');
        MongoClient.connect(database.url+database.validate, function(err, client) {
            expect(err).toEqual(null);
            next();
        });
    });
    it("should load local database configurations with parameters", function(next) {
        var database = require('../config/database')('Mongo', 'local');
        MongoClient.connect(database.url+database.validate, function(err, client) {
            // Local database returns empty error object rather than null if no error for some reason.
            expect(err).toEqual({});
            next();
        });
    });
});