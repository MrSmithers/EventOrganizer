var MongoClient = require('mongodb').MongoClient;

describe("Database setup", function() {
    it("should load external database configurations", function(next) {
        var database = require('../config/database')();
        MongoClient.connect(database.url+database.database, function(err, client) {
            expect(err).toBe(null);
            next();
        });
    });
    it("should load external database configurations", function(next) {
        var database = require('../config/database')('Mongo', 'external');
        MongoClient.connect(database.url+database.database, function(err, client) {
            expect(err).toBe(null);
            next();
        });
    });
    it("should load local database configurations", function(next) {
        var database = require('../config/database')('Mongo', 'local');
        MongoClient.connect(`mongodb://${database.url}:${database.port}/${database.database}`, function(err, client) {
            expect(err).toBe(null);
            next();
        });
    });
});