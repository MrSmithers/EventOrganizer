var express = require('express');
var router = express.Router();

/* GET events listing. */
router.get('/', function(req, res, next) {
    res.render('Events/Listing', {
        title: 'Events Listing',
        search: req.query.search
    });
});

router.get('/view/:eventId/:hash', function(req, res, next) {
    res.render('Events/Landing', { title: 'Event Landing' });
});

module.exports = router;
