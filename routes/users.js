var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/profile/:userId/:hash', function(req, res, next) {
    res.render('Users/Profile', {
        title: 'Thomas Smith',
        userId: req.params.userId
    });

});

module.exports = router;
