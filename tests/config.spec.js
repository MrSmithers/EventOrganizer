describe("Configuration setup", function() {
    it("should load external configurations with parameters", function(next) {
        var config = require('../config/config')('local');
        expect(config.mode).toBe('local');
        next();
    });
    it("should load local configurations with parameters", function(next) {
        var config = require('../config/config')('external');
        expect(config.mode).toBe('external');
        next();
    });
    it("should load external configurations without parameters", function(next) {
        var config = require('../config/config')();
        expect(config.mode).toBe('external');
        next();
    });
});