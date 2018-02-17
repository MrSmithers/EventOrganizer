var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    console.log(req.body);
    res.render('Users/Login', {
        title: 'Login',
        redirect: req.query.redirect || ''
    });
});

router.post('/', function(req, res, next) {
    console.log(req.body);
    res.render('Users/Login', {
        title: 'Login',
        redirect: req.body.username || ''
    });
});

module.exports = router;