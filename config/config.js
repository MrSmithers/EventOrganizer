var config = {
    local: {
        mode: 'local',
        port: 3000
    },
    demo: {
        mode: 'demo',
        port: 4000
    }
}
module.exports = function(mode) {
    // Default to local settings.
    return config[mode || process.argv[2] || 'demo'] || config.demo;
}