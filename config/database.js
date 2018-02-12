var MongoClient = require('mongodb').MongoClient;

var db_user = 'thsm1';
var db_password = 'fLSxJQlNA4fstgiw';

var db_url = `mongodb+srv://${db_user}:${db_password}@cluster0-pbyb5.mongodb.net/test`;

module.exports = () => {
    MongoClient.connect(db_url, (err, db) => {
        if (err) {
            MongoClient.connect('127.0.0.1:27017', (err, db) => {
                if (err) throw error;

                return db;
            });
        }

        return db;
    });
}