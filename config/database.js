var db_user = 'thsm1';
var db_password = 'fLSxJQlNA4fstgiw';

var external_url = `mongodb+srv://${db_user}:${db_password}@cluster0-pbyb5.mongodb.net/`;

var config = {
    Mongo: {
        external: {
            url: external_url,
            validate: 'assignment1'
        },
        local: {
            url: '127.0.0.1:27017/',
            validate: 'assignment1'
        }
    }
};

// Default to external.
module.exports = (database, mode) => {
    // Return cloud MongoDB cluster details by default;
    return config[database || 'Mongo'][mode || 'external'] || null;
}