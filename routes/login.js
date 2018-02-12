var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('Users/Login', {
        title: 'Login',
        redirect: req.query.redirect || ''
    });
});

module.exports = router;