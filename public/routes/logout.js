var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.clearCookie("session");
    res.render('Users/Logout', {
        title: 'Logged out',
    });

});

module.exports = router;
