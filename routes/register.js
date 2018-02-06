var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('Users/Register', {
        title: 'Register'
    });
});

module.exports = router;