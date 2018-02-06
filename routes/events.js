var express = require('express');
var router = express.Router();

/* GET events listing. */
router.get('/', function(req, res, next) {
    res.render('Events/Landing', { title: 'Events' });
});

router.get('/view/:eventId/:hash', function(req, res, next) {
    res.render('Events/Listing', { title: 'Not Events' });
});

module.exports = router;
