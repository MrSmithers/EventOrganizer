describe("Configuration setup", function() {
    it("should load demo configurations", function(next) {
        var config = require('../config/config')('local');
        expect(config.mode).toBe('local');
        next();
    });
    it("should load local configurations", function(next) {
        var config = require('../config/config')('demo');
        expect(config.mode).toBe('demo');
        next();
    });
    it("should load demo configurations", function(next) {
        var config = require('../config/config')();
        expect(config.mode).toBe('demo');
        next();
    });
});