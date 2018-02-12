describe("Database setup", function() {
    var database = require('../config/database')();
    it("is there a database running", function(next) {
        setTimeout(function() {
            console.log(database);
            expect(database).toBe(!undefined);
            next();
        }, 5000);
    });
});